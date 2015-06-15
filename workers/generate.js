

import Map from '../src/map'

onmessage = function( event ) {
    var map = new Map( event.data.options )

    map.seed( event.data.seed )
    map.generate()
        .then( () => {
            postMessage({
                msg: '200 OK',
                buffer: map.buffer,
                array: map.array
            })
        })

    // postMessage( map.buffer )
}
