
import React from 'react'
import classnames from 'classnames'
import rnd from 'lodash.random'

import { clamp, wrap } from 'utils/maths'


export default class DisplacementMap extends React.Component {
    static defaultProps = {
        size: 129 * 5,
        gridSize: 129,
        roughness: 2.5,
        useWrap: false,
        smooth: false
    }

    constructor( props ) {
        super( props )

        this.mounted = false
        this.cellSize = this.props.size / this.props.gridSize

        this.grid = []

        for ( let i = 0; i < this.props.gridSize; i++ ) {
            let row = []
            for ( let j = 0; j < this.props.gridSize; j++ ) {
                row.push( null )
            }
            this.grid.push( row )
        }

        // Seed corners
        this.grid[ 0 ][ 0 ] = 1
        this.grid[ this.props.gridSize - 1 ][ 0 ] = 1
        this.grid[ this.props.gridSize - 1 ][ this.props.gridSize - 1 ] = 1
        this.grid[ 0 ][ this.props.gridSize - 1 ] = 1

        // Seed center point
        this.grid[ ( this.props.gridSize - 1 ) / 2 ][ ( this.props.gridSize - 1 ) / 2 ] = -1
    }

    get ctx() {
        if ( !this.mounted ) {
            throw new Error( 'can not access unmounted canvas' )
        }

        return this.canvas.getContext( '2d' )
    }

    componentDidMount() {
        this.mounted = true
        this.canvas = React.findDOMNode( this )

        //this.generate( 0, 0, this.props.gridSize - 1, this.props.gridSize - 1, 1 )
        this.generate( 1 )
        this.renderGrid()
    }

    componentDidUnmount() {
        this.mounted = false
    }


    /*-----------------------------------------------------------*
     *
     *  Generation methods
     *
     *-----------------------------------------------------------*/

    random( gen ) {
        // Returning 0 creates no random variance
        return this.props.smooth
            ? 0
            : 0 + ( rnd( -1, 1, true ) * gen * this.props.roughness )
    }

    wrap( num ) {
        return wrap({
            num: num,
            min: 0,
            max: this.props.gridSize - 1
        })
    }

    clamp( num ) {
        return clamp({
            num: num,
            min: 0,
            max: this.props.gridSize - 1
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
        return this.props.useWrap === true
            ? this.grid[ this.wrap( x ) ][ this.wrap( y ) ]
            : this.grid[ this.clamp( x ) ][ this.clamp( y ) ]
    }

    setCell( x, y, value ) {
        if ( this.getCell( x, y ) !== null ) {
            return
        }

        this.props.useWrap === true
            ? this.grid[ this.wrap( x ) ][ this.wrap( y ) ] = value
            : this.grid[ this.clamp( x ) ][ this.clamp( y ) ] = value
    }

    generate( step ) {
        console.log( '  step:', step )

        let dist = ( this.props.gridSize - 1 ) * step

        // Square pass
        for ( let x = 0; x < this.props.gridSize - 1; x += dist ) {
            for ( let y = 0; y < this.props.gridSize - 1; y += dist) {
                this.generateSquare( x, y, x + dist, y + dist, step )
            }
        }

        // Diamond pass
        for ( let x = 0; x < this.props.gridSize - 1; x += dist ) {
            for ( let y = 0; y < this.props.gridSize - 1; y += dist) {
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


    /*-----------------------------------------------------------*
     *
     *  Render methods
     *
     *-----------------------------------------------------------*/

    lerpColor( value ) {
        // Transform -1...1 to 0...1
        let opacity = .5 + ( value * 0.5 )
        return 'rgba( 255, 255, 255, ' + clamp({ num: opacity }) + ')'
    }

    clear() {
        this.ctx.clearRect( 0, 0, this.props.size, this.props.size )
    }

    drawCell( x, y, cell ) {
        let x1 = clamp({ num: x, max: this.props.gridSize - 1 })
        let y1 = clamp({ num: y, max: this.props.gridSize - 1 })

        this.ctx.fillStyle = this.lerpColor( cell )  // @TODO lerp grid value using cell param

        if ( cell === null ) {
            this.ctx.fillStyle = 'rgb(64,0,0)'
        }
        this.ctx.fillRect( x1 * this.cellSize, y1 * this.cellSize, this.cellSize, this.cellSize )
    }

    renderGrid() {
        this.clear()
        this.grid.forEach( ( row, x ) => {
            row.forEach( ( cell, y ) => {
                this.drawCell( x, y, cell )
                // console.log( x, y, cell.toFixed( 2 ) )
            })
        })
    }

    render() {
        let classes = classnames({
            'canvas': true,
            'js-canvas': true
        })

        return (
            <canvas
                ref="canvas"
                className={ classes }
                height={ this.props.size }
                width={ this.props.size }
            ></canvas>
        )
    }
}
