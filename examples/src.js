
import Map from '../lib'

const WIDTH = 257
const HEIGHT = 257
const CELL_SIZE = 3

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


for ( let x = 1; x < WIDTH - 1; x++ ) {
    for (let y = 1; y < HEIGHT - 1; y++ ) {
        ctx.fillStyle = lerp( map.get( x, y ) )
        ctx.fillRect( x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE )
    }
}


document.body.appendChild( canvas )
