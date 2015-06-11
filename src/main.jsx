
import './utils/font'

import React from 'react'

import dispatcher from './dispatchers/appDispatcher'
import DisplacementMap from 'displacementMap'

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container">
                <DisplacementMap />
            </div>
        )
    }
}

React.render( <App />, document.body )
