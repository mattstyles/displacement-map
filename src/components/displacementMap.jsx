
import React from 'react'
import classnames from 'classnames'
import rnd from 'lodash.random'

import { clamp, wrap } from 'utils/maths'


export default class DisplacementMap extends React.Component {
    static defaultProps = {
        size: 129 * 5,
        gridSize: 129
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
        this.grid[ 0 ][ 0 ] = 0
        this.grid[ 0 ][ this.props.gridSize - 1 ] = 0
        this.grid[ this.props.gridSize - 1 ][ 0 ] = 0
        this.grid[ this.props.gridSize - 1 ][ this.props.gridSize - 1 ] = 0

        // Seed center point
        // this.grid[ ( this.props.gridSize - 1 ) / 2 ][ ( this.props.gridSize - 1 ) / 2 ] = 1
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
        return 0 + ( rnd( -1, 1, true ) * gen )
    }

    wrap( num ) {
        return wrap({
            num: num,
            min: 0,
            max: this.props.gridSize - 1
        })
    }

    getAverage( x, y, size ) {
        return (
            this.getCell( x - size, y ) +
            this.getCell( x + size, y ) +
            this.getCell( x, y - size ) +
            this.getCell( x, y + size )
        ) / 4
    }

    getCell( x, y ) {
        let cell = this.grid[ this.wrap( x ) ][ this.wrap( y ) ]

        return cell || 0
    }

    setCell( x, y, value ) {
        this.grid[ this.wrap( x ) ][ this.wrap( y ) ] = value
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
        let avg = this.getAverage( mid.x, mid.y, size )
        //console.log( 'gen:square', x1, y1, x2, y2, mid.x, mid.y, size, ( avg + this.random( step ) ).toFixed( 2 ) )
        this.setCell( mid.x, mid.y, avg + this.random( step ) )
    }

    generateDiamond( x1, y1, x2, y2, step ) {
        let size = ( x2 - x1 ) / 2
        let mid = {
            x: x1 + size,
            y: y1 + size
        }

        //console.log( 'gen:diamond', x1, y1, x2, y2 )

        this.setCell( x1 + size, y1, this.getAverage( x1 + size, y1, size ) + this.random( step ) )
        this.setCell( x2, y1 + size, this.getAverage( x2, y1 + size, size ) + this.random( step ) )
        this.setCell( x1 + size, y2, this.getAverage( x1 + size, y2, size ) + this.random( step ) )
        this.setCell( x1, y1 + size, this.getAverage( x1, y1 + size, size ) + this.random( step ) )

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
