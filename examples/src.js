
import Map from '../lib'

const WIDTH = 5
const HEIGHT = 5
const CELL_SIZE = 100

let map = new Map({
    width: WIDTH,
    height: HEIGHT
})

window.map = map

let canvas = document.createElement( 'canvas' )
canvas.classList.add( 'Surface', 'js-surface' )
canvas.setAttribute( 'width', WIDTH * CELL_SIZE )
canvas.setAttribute( 'height', HEIGHT * CELL_SIZE )

let ctx = canvas.getContext( '2d' )

function lerp( value ) {
    return 'rgba( 255, 255, 255, ' + ( value / 0xff ) + ' )'
}


for ( let x = 0; x < WIDTH; x++ ) {
    for (let y = 0; y < HEIGHT; y++ ) {
        ctx.fillStyle = lerp( map.get( x, y ) )
        ctx.fillRect( x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE )
    }
}


document.body.appendChild( canvas )
