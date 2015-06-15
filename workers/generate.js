

import Map from '../src/map'

onmessage = function( event ) {
    var map = new Map({
        width: 9,
        height: 9
    })

    postMessage( 'done creating a map in worker' )
}
