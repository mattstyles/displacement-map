/**
 * Worker thread
 */

/**
 * Generates points on a line
 *
 * @input buf8 <Uint8Array>
 */


var buf8


function variance() {
    return -0x80 + ( Math.random() * 0xff )
}


function generateMidpoint( start, end ) {
    var middle = ( end - start ) / 2
    var avg = ( buf8[ end ] + buf8[ start ] ) / 2

    // Take average of 2 end points of segment
    // * 1 is a smoothness/roughness variable
    // variance decreases as segment length decreases
    buf8[ middle ] = avg * 1 + ( variance() * ( end - start ) / buf8.length - 1 )
}


function generate( step ) {
    if ( !step ) {
        step = 1
    }

    var size = ( buf8.length - 1 ) / step

    for ( var i = 0; i < buf8.length - 1; i += size ) {
        generateMidpoint( i, i + size )
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
