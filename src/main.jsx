
import './utils/font'

import React from 'react'

import dispatcher from './dispatchers/appDispatcher'
import MapComponent from 'mapComponent'

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container">
                <MapComponent />
            </div>
        )
    }
}

React.render( <App />, document.body )
