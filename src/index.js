
import EventEmitter from 'events'

export default class DisplacementMap extends EventEmitter {
    constructor( opts ) {
        super()

        let options = opts || {}

        // Assign defaults or use opts
        // @TODO check power of 2 + 1 values
        this.width = options.width || 65
        this.height = options.height || 65

        this.smoothness = 1

        this.buffer = new ArrayBuffer( this.width * this.height )
        this.array = new Uint8Array( this.buffer )
    }

    /**
     * Enters a list of values into the array
     * @param seeds <Array:Objects> seeds should contain x, y and value params
     */
    seed( seeds: Array ) {
        //@TODO check valid seed objects
        seeds.forEach( seed => {
            this.array[ this.to1d( seed.x, seed.y ) ] = seed.value
        })
    }

    /**
     * Grabs a value from the array
     * @param x <number> x coord
     * @param y <number> y coord
     */
    get( x: number, y: number ) {
        return this.array[ this.to1d( this.wrap( x ), this.wrap( y ) ) ]
    }

    /**
     * Sets a value within the array
     * @param x <number> x coord
     * @param y <number> y coord
     * @param value <number> to set
     */
    set( x: number, y: number, value: number ) {
        this.array[ this.to1d( this.wrap( x ), this.wrap( y ) ) ] = this.clamp255( value )
    }

    /*-----------------------------------------------------------*
     *
     *  Generation methods
     *
     *-----------------------------------------------------------*/

    /**
     * Total variance * smoothness * step
     * Step decreases with each fold to produce a better result
     */
    getMidpointDisplacement( size ) {
        return this.variance() * this.smoothness * ( size / ( this.width - 1 ) )
    }

    /**
     * Averages (mean) all values passed as args
     */
    getAvg() {
        return Array.prototype.reduce.call( arguments, ( prev, num ) => prev + num ) / arguments.length
    }

    /**
     * Grabs the average of each edge point
     */
    getAvgEdge( x1, y1, x2, y2 ) {
        let size = ~~( x2 - x1 ) / 2
        return this.getAvg(
            this.get( x1 + size, y1 ),
            this.get( x1, y1 + size ),
            this.get( x2, y1 + size ),
            this.get( x1 + size, y2 )
        )
    }

    /**
     * Grabs the average from each corner point
     */
    getAvgCorner( x1, y1, x2, y2 ) {
        return this.getAvg(
            this.get( x1, y1 ),
            this.get( x2, y1 ),
            this.get( x1, y2 ),
            this.get( x2, y2 )
        )
    }

    /**
     * Get average from a central point
     */
    getAvgPoint( x, y, size ) {
        return this.getAvg(
            this.get( x, y - size ),
            this.get( x + size, y ),
            this.get( x - size, y ),
            this.get( x, y + size )
        )
    }

    /**
     * @param cb <function> iterator to call
     * @param step <float> 0...1
     */
    iterate( cb, step ) {
        let size = ( this.width - 1 ) * step
        for ( let x = 0; x < this.width - 1; x += size ) {
            for ( let y = 0; y < this.height - 1; y += size ) {
                cb( x, y, size )
            }
        }
    }

    /**
     * Starts the generation
     * @param step <float:optional> the step value or 1
     */
    performStep( step ) {
        if ( !step ) {
            step = 1
        }
        let dist = ( this.width - 1 ) * ( step )


        this.iterate( this.generateSquare, step )
        this.iterate( this.generateDiamond, step )


        if ( dist > 2 ) {
            this.performStep( step / 2 )
            return
        }

        this.emit( 'done' )
    }

    generate() {
        return new Promise( ( resolve, reject ) => {
            this.once( 'done', () => {
                resolve()
            })

            try {
                this.performStep( 1 )
            } catch( err ) {
                console.log( 'I heard an error' )
                console.log( err )
                reject( err )
            }
        })
    }

    /**
     * Performs the square step - generating a point in the center
     * @param x <number> x component of top-left corner
     * @param y <number> y component of top-left corner
     * @param size <number> size of square to calculate mid-point of
     */
    generateSquare = ( x: number, y: number, size: number ) => {
        let mid = size / 2
        let avg = this.getAvgCorner( x, y, x + size, y + size )
        this.set( x + mid, y + mid, avg + this.getMidpointDisplacement( size ) )
    }

    /**
     * Performs the diamond step - generating points at the edges
     * @param x <number> x component of top-left corner
     * @param y <number> y component of top-left corner
     * @param size <number> size of square to calculate edges of
     */
    generateDiamond = ( x: number, y: number, size: number ) => {
        let mid = size / 2

        let setCell = function( xx, yy ) {
            let avg = this.getAvgPoint( xx, yy, mid )
            //console.log( 'setting diamond point', xx, yy, avg, 'for', x, y, size )
            this.set( xx, yy, avg + this.getMidpointDisplacement( size ) )
        }.bind( this )

        setCell( x + mid, y )
        setCell( x + mid, y + size )
        setCell( x, y + mid )
        setCell( x + size, y + mid )
    }

    /*-----------------------------------------------------------*
     *
     *  Helpers
     *
     *-----------------------------------------------------------*/

    /**
     * Converts from 2d to 1d
     */
    to1d( x, y ) {
        return ( y * this.width ) + x
    }

    /**
     * Wraps 0...255 i.e. 257 becomes 1 (because 0 is important)
     */
    wrap255( value ) {
        return value & 0xff
    }

    /**
     * Wraps 0...this.width - 1
     */
    wrap( num ) {
        let min = 0
        let max = this.width - 1

        if ( num > max ) {
            return num % max
        }

        if ( num < min ) {
            return max - ( ( min - num ) % ( max - min ) )
        }

        return num
    }

    /**
     * Clamps to 0...255
     */
    clamp255( value ) {
        return Math.max( Math.min( value, 255 ), 0 )
    }

    /**
     * Clamps 0....this.width - 1
     */
    clamp( value ) {
        return Math.max( Math.min( value, this.width - 1 ), 0 )
    }

    /**
     * Returns +-127
     */
    variance() {
        return -0x80 + ( Math.random() * 0xff )
    }


}
