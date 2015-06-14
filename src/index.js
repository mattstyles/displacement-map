
export default class DisplacementMap {
    constructor( opts ) {
        let options = opts || {}

        // Assign defaults or use opts
        // @TODO check power of 2 + 1 values
        this.width = options.width || 65
        this.height = options.height || 65

        this.buffer = new ArrayBuffer( this.width * this.height )
        this.array = new Uint8Array( this.buffer )

        // Seed corners
        this.array[ this.to1d( 0, 0 ) ] = 255
        this.array[ this.to1d( 0, this.height - 1 ) ] = 255
        this.array[ this.to1d( this.width - 1, 0 ) ] = 255
        this.array[ this.to1d( this.width - 1, this.height - 1 ) ] = 255

        this.generate( 1 )

        console.log( this.array )

    }

    get( x, y ) {
        return this.array[ this.to1d( this.wrap( x ), this.wrap( y ) ) ]
    }

    set( x, y, value ) {
        this.array[ this.to1d( this.wrap( x ), this.wrap( y ) ) ] = this.clamp( value )
    }

    /*-----------------------------------------------------------*
     *
     *  Generation methods
     *
     *-----------------------------------------------------------*/

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
      * @param cb <function> iterator to call
      * @param step <float> 0...1
      */
     iterate( cb, step ) {
         let size = ( this.width - 1 ) * step
         for ( let x = 0; x < this.width - 1; x += size ) {
             for ( let y = 0; y < this.height - 1; y += size ) {
                 cb( x, y, x + size, y + size, step )
             }
         }
     }

     generate( step ) {
         let dist = ( this.width - 1 ) * step

         //  this.iterate( function( x1, y1, x2, y2 ) {
         //      console.log( x1, y1, x2, y2 )
         //      this.set( x1, y1, 127 )
         //  }.bind( this ), step )
         this.iterate( this.generateSquare, step )


         if ( dist > 2 ) {
             this.generate( step / 2 )
         }
     }

     generateSquare = ( x1, y1, x2, y2, step ) => {
         console.log( 'square', x1, y1, x2, y2 )
         let mid = ~~( x2 - x1 ) / 2
         let avg = this.getAvgCorner( x1, y1, x2, y2 )
         this.set( x1 + mid, y1 + mid, avg )
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
    wrap( value ) {
        return value & 0xff
    }

    /**
     * Clamps to 0...255
     */
    clamp( value ) {
        return Math.max( Math.min( value, 255 ), 0 )
    }

}
