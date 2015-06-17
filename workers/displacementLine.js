/**
 * Worker thread
 */

/**
 * Generates points on a line
 *
 * @input buf8 <Uint8Array>
 */


var buf8



function generate( step ) {
    if ( !step ) {
        step = 1
    }


    if ( size > 2 ) {
        generate( size * .5 )
        return
    }

    done()
}



self.addEventListener( 'message', function( event ) {
    buf8 = event.data.buf8

    generate()
})

function done() {
    self.postMesssage({
        buf8: buf8
    })
}
