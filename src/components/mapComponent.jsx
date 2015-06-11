
import React from 'react'
import classnames from 'classnames'
import rnd from 'lodash.random'

import { clamp, wrap } from 'utils/maths'

import DisplacementMap from './displacementMap'


export default class MapComponent extends React.Component {
    static defaultProps = {
        size: 65 * 4,
        gridSize: 65,
        roughness: 1.25,
        useWrap: false,
        smooth: false
    }

    constructor( props ) {
        super( props )

        this.mounted = false
        this.cellSize = this.props.size / this.props.gridSize

        this.map = new DisplacementMap( this.props )

        // Seed map
        this.map.grid[ 0 ][ 0 ] = 1
        this.map.grid[ this.props.gridSize - 1 ][ 0 ] = 1
        this.map.grid[ this.props.gridSize - 1 ][ this.props.gridSize - 1 ] = 0
        this.map.grid[ 0 ][ this.props.gridSize - 1 ] = -1
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
        this.map.generate( 1 )
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
        this.map.grid.forEach( ( row, x ) => {
            row.forEach( ( cell, y ) => {
                this.drawCell( x, y, cell )
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
