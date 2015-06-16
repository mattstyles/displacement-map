// Start rotation to check for jank
var icon = document.querySelector( '.js-icon' )
var rotate = 0
var animate = function() {
    icon.style.transform = 'rotate( ' + rotate + 'deg )'
    rotate = ( rotate + 1 ) % 360
    requestAnimationFrame( animate )
}
animate()

document.querySelector( '.js-btnGenerate' ).addEventListener( 'click', function() {
    console.log( 'generating...' )
    generate()
})


import MapGenerator from '../lib'
import range from 'lodash.range'

const WIDTH = 0x101
const HEIGHT = 0x101
const CELL_SIZE = 2
const THREADS = 4

let mapGenerator = new MapGenerator()

let canvas = document.createElement( 'canvas' )
let ctx = canvas.getContext( '2d' )
canvas.classList.add( 'Surface', 'js-surface' )
canvas.setAttribute( 'width', WIDTH * CELL_SIZE )
canvas.setAttribute( 'height', HEIGHT * CELL_SIZE )

document.body.appendChild( canvas )


// Color interp
function lerp( value ) {
    return 'rgba( 255, 255, 255, ' + ( value / 0xff ) + ' )'
}

function render( arr ) {
    ctx.clearRect( 0, 0, WIDTH * CELL_SIZE, HEIGHT * CELL_SIZE )
    for (let y = 0; y < HEIGHT; y++ ) {
        for ( let x = 0; x < WIDTH; x++ ) {
            ctx.fillStyle = lerp( arr[ ( y * WIDTH ) + x ] )
            ctx.fillRect( x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE )
        }
    }
}

function generate() {
    let start = window.performance.now()

    let buf = new ArrayBuffer( WIDTH * HEIGHT )
    let buf8 = new Uint8Array( buf )
    buf8[ 0 ] = 0xff

    Promise.all( range( THREADS ).map( () => {
        return mapGenerator.generate({
            map: buf8,
            width: WIDTH,
            height: HEIGHT
        })
    }))
        .then( res => {
            console.log( 'all done' )
            console.log( res )
            let time = window.performance.now() - start
            console.log( 'generation time', time.toFixed( 2 ), 'ms' )

            render( res[ 0 ] )
        })
}


window.render = render
window.mapGenerator = mapGenerator
window.generate = generate
