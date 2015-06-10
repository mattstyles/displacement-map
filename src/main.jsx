
import './utils/font'

import React from 'react'

import dispatcher from './dispatchers/appDispatcher'
import MyComponent from 'myComponent'

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container">
                <h1>Hello React</h1>
                <MyComponent />
            </div>
        )
    }
}

React.render( <App />, document.body )
