import rnd from 'lodash.random'
import { clamp, wrap } from 'utils/maths'


export default class DisplacementMap {
    constructor( options ) {
        this.opts = Object.assign({
            size: 65 * 10,
            gridSize: 65,
            roughness: 1.25,
            useWrap: false,
            smooth: false,
            seed: []
        }, options )


        // Generate initial array
        this.grid = []

        for ( let i = 0; i < this.opts.gridSize; i++ ) {
            let row = []
            for ( let j = 0; j < this.opts.gridSize; j++ ) {
                row.push( null )
            }
            this.grid.push( row )
        }

        this.opts.seed.forEach( cell => {
            this.grid[ cell.x ][ cell.y ] = cell.value
        })
    }


    /*-----------------------------------------------------------*
     *
     *  Generation methods
     *
     *-----------------------------------------------------------*/

    random( gen ) {
        // Returning 0 creates no random variance
        return this.opts.smooth
            ? 0
            : 0 + ( rnd( -1, 1, true ) * gen * this.opts.roughness )
    }

    wrap( num ) {
        return wrap({
            num: num,
            min: 0,
            max: this.opts.gridSize - 1
        })
    }

    clamp( num ) {
        return clamp({
            num: num,
            min: 0,
            max: this.opts.gridSize - 1
        })
    }

    getSquareAverage( x1, y1, x2, y2 ) {
        // top left, top right, bottom right, bottom left
        let valid = 0
        let points = [
            this.getCell( x1, y1 ),
            this.getCell( x2, y1 ),
            this.getCell( x2, y2 ),
            this.getCell( x1, y2 )
        ].map( point => {
            if ( point !== null ) {
                valid++
                return point
            }

            //console.log( 'invalid point found', x1, y1, x2, y2 )
            return point
        })

        return points.reduce( ( prev, num ) => prev + num ) / valid
    }

    getDiamondAverage( x, y, size ) {
        // left, right, top, bottom
        let valid = 0
        let points = [
            this.getCell( x - size, y ),
            this.getCell( x + size, y ),
            this.getCell( x, y - size ),
            this.getCell( x, y + size )
        ].map( point => {
            if ( point !== null ) {
                valid++
                return point
            }

            //console.log( 'invalid point found for diamond at', x, y, size )
            return point
        })

        return points.reduce( ( prev, num ) => prev + num ) / valid
    }

    getCell( x, y ) {
        return this.opts.useWrap === true
            ? this.grid[ this.wrap( x ) ][ this.wrap( y ) ]
            : this.grid[ this.clamp( x ) ][ this.clamp( y ) ]
    }

    setCell( x, y, value ) {
        if ( this.getCell( x, y ) !== null ) {
            return
        }

        this.opts.useWrap === true
            ? this.grid[ this.wrap( x ) ][ this.wrap( y ) ] = value
            : this.grid[ this.clamp( x ) ][ this.clamp( y ) ] = value
    }

    generate( step ) {
        console.log( '  step:', step )

        let dist = ( this.opts.gridSize - 1 ) * step

        // Square pass
        for ( let x = 0; x < this.opts.gridSize - 1; x += dist ) {
            for ( let y = 0; y < this.opts.gridSize - 1; y += dist) {
                this.generateSquare( x, y, x + dist, y + dist, step )
            }
        }

        // Diamond pass
        for ( let x = 0; x < this.opts.gridSize - 1; x += dist ) {
            for ( let y = 0; y < this.opts.gridSize - 1; y += dist) {
                this.generateDiamond( x, y, x + dist, y + dist, step )
            }
        }

        if ( dist > 2 ) {
            this.generate( step / 2 )
        }
    }

    generateSquare( x1, y1, x2, y2, step ) {
        let size = ( x2 - x1 ) / 2
        let mid = {
            x: x1 + size,
            y: y1 + size
        }

        let avg = this.getSquareAverage( x1, y1, x2, y2 )
        //console.log( 'gen:square', x1, y1, x2, y2, mid.x, mid.y, size, ( avg + this.random( step ) ).toFixed( 2 ) )

        this.setCell( mid.x, mid.y, avg )
    }

    generateDiamond( x1, y1, x2, y2, step ) {
        let size = ( x2 - x1 ) / 2

        //console.log( 'gen:diamond', x1, y1, x2, y2 )

        this.setCell( x1 + size, y1, this.getDiamondAverage( x1 + size, y1, size ) + this.random( step ) )
        this.setCell( x2, y1 + size, this.getDiamondAverage( x2, y1 + size, size ) + this.random( step ) )
        this.setCell( x1 + size, y2, this.getDiamondAverage( x1 + size, y2, size ) + this.random( step ) )
        this.setCell( x1, y1 + size, this.getDiamondAverage( x1, y1 + size, size ) + this.random( step ) )

    }



}
