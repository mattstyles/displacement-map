
import React from 'react'
import classnames from 'classnames'
import DisplacementMap from './displacementMap'

import { clamp } from 'utils/maths'

export default class MapComponent extends React.Component {
    static defaultProps = {
        size: 65 * 8,
        gridSize: 65,
        roughness: 1.25,
        useWrap: false,
        smooth: false
    }

    constructor( props ) {
        super( props )

        this.mounted = false
        this.cellSize = this.props.size / this.props.gridSize

        this.map = new DisplacementMap( Object.assign({
            seed: [
                { x: 0, y: 0, value: 1 },
                { x: this.props.gridSize - 1, y: 0, value: 1 },
                { x: this.props.gridSize - 1, y: this.props.gridSize - 1, value: 1 },
                { x: 0, y: this.props.gridSize - 1, value: -1 }
            ]
        }, this.props ))
        this.map.generate( 1 )

        let right = []
        for ( let y = 0; y < this.props.gridSize; y++ ) {
            right.push({
                x: 0,
                y: y,
                value: this.map.grid[ this.props.gridSize - 1 ][ y ]
            })
        }

        right.push( { x: this.props.gridSize - 1, y: 0, value: 0 } )
        right.push( { x: this.props.gridSize - 1, y: this.props.gridSize - 1, value: 0 } )

        this.map2 = new DisplacementMap( Object.assign({
            seed: right
        }, this.props ))
        this.map2.generate( 1 )
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
        //this.map.generate( 1 )
        this.renderGrid()
    }

    componentDidUnmount() {
        this.mounted = false
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

    drawCell( x, y, cell, start ) {
        let x1 = clamp({ num: x, max: this.props.gridSize - 1 })
        let y1 = clamp({ num: y, max: this.props.gridSize - 1 })

        this.ctx.fillStyle = this.lerpColor( cell )  // @TODO lerp grid value using cell param

        if ( cell === null ) {
            this.ctx.fillStyle = 'rgb(64,0,0)'
        }
        this.ctx.fillRect( start + x1 * this.cellSize, y1 * this.cellSize, this.cellSize, this.cellSize )
    }

    renderGrid() {
        this.clear()
        this.cellSize = 4
        this.map.grid.forEach( ( row, x ) => {
            row.forEach( ( cell, y ) => {
                this.drawCell( x, y, cell, 0 )
                //console.log( x, y, cell.toFixed( 2 ) )
            })
        })
        this.map2.grid.forEach( ( row, x ) => {
            row.forEach( ( cell, y ) => {
                this.drawCell( x, y, cell, 260 )
                //console.log( x, y, cell.toFixed( 2 ) )
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
