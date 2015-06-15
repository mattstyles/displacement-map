
import Map from '../lib'

const WIDTH = 65
const HEIGHT = 65
const CELL_SIZE = 10

let map = new Map({
    width: WIDTH,
    height: HEIGHT
})

// Seed corners to half-weight
map.seed([
    { x: 0, y: 0, value: 0x80 },
    { x: WIDTH - 1, y: 0, value: 0x80 },
    { x: 0, y: HEIGHT - 1, value: 0x80 },
    { x: WIDTH - 1, y: HEIGHT - 1, value: 0x80 }
])

let canvas = document.createElement( 'canvas' )
canvas.classList.add( 'Surface', 'js-surface' )
canvas.setAttribute( 'width', WIDTH * CELL_SIZE )
canvas.setAttribute( 'height', HEIGHT * CELL_SIZE )

let ctx = canvas.getContext( '2d' )

function lerp( value ) {
    return 'rgba( 255, 255, 255, ' + ( value / 0xff ) + ' )'
}

function render() {
    for ( let x = 1; x < WIDTH - 1; x++ ) {
        for (let y = 1; y < HEIGHT - 1; y++ ) {
            ctx.fillStyle = lerp( map.get( x, y ) )
            ctx.fillRect( x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE )
        }
    }
}

function generate() {
    let start = window.performance.now()
    map.generate()
        .then( () => {
            let time = window.performance.now() - start
            console.log( 'generation time', time.toFixed( 2 ), 'ms' )
        })
        .then( render )
        .catch( err => console.log( err ) )
}


generate()
//render()


document.body.appendChild( canvas )


window.render = render
window.map = map
window.generate = generate
