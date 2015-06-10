
import React from 'react'
import classnames from 'classnames'

import { clamp } from 'utils/maths'


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
        console.log( 'mounted' )

        this.mounted = true
        this.canvas = React.findDOMNode( this )

        console.log( this.grid )
        this.renderGrid()
    }

    componentDidUnmount() {
        this.mounted = false
    }

    clear() {
        this.ctx.clearRect( 0, 0, this.props.size, this.props.size )
    }

    drawCell( x, y, cell ) {
        let x1 = clamp({ num: x, max: this.props.gridSize - 1 })
        let y1 = clamp({ num: y, max: this.props.gridSize - 1 })

        this.ctx.fillStyle = 'red'  // @TODO lerp grid value
        this.ctx.fillRect( x1 * this.cellSize, y1 * this.cellSize, this.cellSize, this.cellSize )
    }

    renderGrid() {
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
