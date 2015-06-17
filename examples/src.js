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

// Map canvas
let canvas = document.createElement( 'canvas' )
let ctx = canvas.getContext( '2d' )
canvas.classList.add( 'Surface', 'js-surface' )
canvas.setAttribute( 'width', WIDTH * CELL_SIZE )
canvas.setAttribute( 'height', HEIGHT * CELL_SIZE )
document.body.appendChild( canvas )

// Line canvas
let canvas2 = document.createElement( 'canvas' )
let ctx2 = canvas2.getContext( '2d' )
canvas2.classList.add( 'Surface', 'js-surface' )
canvas2.setAttribute( 'width', WIDTH * CELL_SIZE )
canvas2.setAttribute( 'height', HEIGHT * CELL_SIZE )
document.body.appendChild( canvas2 )

// Color interp
function lerp( value ) {
    return 'rgba( 255, 255, 255, ' + ( value / 0xff ) + ' )'
}

function lerpRed( value ) {
    // 128-255
    return 'rgba( ' + ~~( 0x80 + ( ( value * 0xff ) / 2 ) ) + ', 0, 0, 1 )'
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

function renderLine( arr ) {
    ctx2.clearRect( 0, 0, WIDTH * CELL_SIZE, HEIGHT * CELL_SIZE )
    for ( let i = 0; i < WIDTH; i++ ) {
        ctx2.fillStyle = lerpRed( i / WIDTH )
        ctx2.fillRect( i * CELL_SIZE, 0, CELL_SIZE, arr[ i ] / 0xff * ( HEIGHT * CELL_SIZE ) )
    }
}

function generate() {
    let start = window.performance.now()

    let buf = new ArrayBuffer( WIDTH * HEIGHT )
    let buf8 = new Uint8Array( buf )
    buf8[ 0 ] = 0x80
    buf8[ WIDTH - 1 ] = 0x80
    buf8[ ( HEIGHT * WIDTH ) - WIDTH ] = 0x80
    buf8[ ( HEIGHT * WIDTH ) - 1 ] = 0x80

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

    let lineBuf = new Uint8Array( WIDTH )
    lineBuf[ 0 ] = 0x80
    lineBuf[ WIDTH - 1 ] = 0x80
    mapGenerator.generateLine({
        buf8: lineBuf
    })
        .then( res => {
            console.log( 'line generation done' )
            console.log( res )

            renderLine( res )
        })
}


window.render = render
window.mapGenerator = mapGenerator
window.generate = generate
