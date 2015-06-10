
import React from 'react'
import classnames from 'classnames'

export default class DisplacementMap extends React.Component {
    static defaultProps = {
        size: 640
    }

    constructor( props ) {
        super( props )

        this.ctx = null
    }

    componentDidMount() {
        console.log( 'mounted' )

        let canvas = React.findDOMNode( this )
        this.ctx = canvas.getContext( '2d' )
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
