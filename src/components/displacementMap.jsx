
import React from 'react'
import classnames from 'classnames'
import rnd from 'lodash.random'

import { clamp, wrap } from 'utils/maths'


export default class DisplacementMap extends React.Component {
    static defaultProps = {
        size: 660,
        gridSize: 33
    }

    constructor( props ) {
        super( props )

        this.mounted = false
        this.cellSize = this.props.size / this.props.gridSize

        this.grid = []

        for ( let i = 0; i < this.props.gridSize; i++ ) {
            let row = []
            for ( let j = 0; j < this.props.gridSize; j++ ) {
                row.push( 0 )
            }
            this.grid.push( row )
        }
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

        this.generate( 0, 0, this.props.gridSize - 1, this.props.gridSize - 1, 1 )
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
            max: this.props.gridSize
        })
    }

    getAverage( x, y, size ) {
        return ( wrap( x - size ) + wrap( x + size ) + wrap( y - size ) + wrap( y + size ) ) / 4
    }

    getCell( x, y ) {
        let cell = this.grid[ this.wrap( x ) ][ this.wrap( y ) ]

        return cell || 0
    }

    setCell( x, y, value ) {
        this.grid[ this.wrap( x ) ][ this.wrap( y ) ] = value
    }

    generate( x1, y1, x2, y2, gen ) {
        console.log( 'generation:', gen )
        this.generateSquare( x1, y1, x2, y2, 1 / gen )
        this.recurse( x1, y1, x2, y2, gen + 1 )
    }

    recurse( x1, y1, x2, y2, gen ) {
        let dist = ( x2 - x1 ) / 2

        if ( dist >= 2 ) {
            this.generate( x1, y1, x1 + dist, y1 + dist, gen )
            this.generate( x1 + dist, y1, x2, y1 + dist, gen )
            this.generate( x1, y1 + dist, x1 + dist, y2, gen )
            this.generate( x1 + dist, y1 + dist, x2, y2, gen )
        }
    }

    generateSquare( x1, y1, x2, y2, gen ) {
        let size = ( x2 - x1 ) / 2
        let mid = {
            x: x1 + size,
            y: y1 + size
        }
        let avg = this.getAverage( mid.x, mid.y, size )
        // console.log( gen, mid.x, mid.y, ( avg + this.random( gen ) ).toFixed( 2 ) )
        this.setCell( mid.x, mid.y, avg + this.random( gen ) )

        // this.recurse( x1, y1, x2, y2, gen )
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

        if ( cell === 0 ) {
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
