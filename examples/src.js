
import Map from '../lib/map'
import MapGenerator from '../lib'
import range from 'lodash.range'

const WIDTH = 65
const HEIGHT = 65
const CELL_SIZE = 2
const THREADS = 16

let mapGenerator = new MapGenerator({
    width: WIDTH,
    height: HEIGHT
})

// let map = new Map({
//     width: WIDTH,
//     height: HEIGHT
// })

// Seed corners to half-weight
// map.seed([
//     { x: 0, y: 0, value: 0x80 },
//     { x: WIDTH - 1, y: 0, value: 0x80 },
//     { x: 0, y: HEIGHT - 1, value: 0x80 },
//     { x: WIDTH - 1, y: HEIGHT - 1, value: 0x80 }
// ])

let canvas = document.createElement( 'canvas' )
canvas.classList.add( 'Surface', 'js-surface' )
canvas.setAttribute( 'width', WIDTH * CELL_SIZE )
canvas.setAttribute( 'height', HEIGHT * CELL_SIZE )

let ctx = canvas.getContext( '2d' )

function lerp( value ) {
    // console.log( value )
    return 'rgba( 255, 255, 255, ' + ( value / 0xff ) + ' )'
}

function render( arr ) {
    for ( let chunkx = 1; chunkx <= THREADS / 2; chunkx++ ) {
        for ( let chunky = 1; chunky <= THREADS / 2; chunky++ ) {
            console.log( 'render chunk', chunkx, chunky )
            for ( let x = 0; x < WIDTH; x++ ) {
                for (let y = 0; y < HEIGHT; y++ ) {
                    // ctx.fillStyle = lerp( map.get( x, y ) )
                    //console.log( 'render cell', x * chunkx, y * chunky, ( y * WIDTH * chunkx ) + x * chunky )
                    ctx.fillStyle = lerp( arr[ ( y * WIDTH * chunkx ) + x * chunky ] )
                    ctx.fillRect( x * CELL_SIZE + ( (chunkx-1) * WIDTH ), y * CELL_SIZE + ( (chunky-1) * HEIGHT ), CELL_SIZE, CELL_SIZE )
                }
            }
        }
    }

}

function generate() {
    let start = window.performance.now()
    // map.generate()
    //     .then( () => {
    //         let time = window.performance.now() - start
    //         console.log( 'generation time', time.toFixed( 2 ), 'ms' )
    //     })
    //     .then( render )
    //     .catch( err => console.log( err ) )
    // map.generate().then( render )

    // Multiple worker process spawn
    // Promise.all( range( THREADS ).map( () => {
    //     return mapGenerator.generate()
    // }))
    //     .then( res => {
    //         console.log( '  spawn worker: all done')
    //         let time = window.performance.now() - start
    //         console.log( 'generation time', time.toFixed( 2 ), 'ms' )
    //     })


    let seqstart = window.performance.now()
    Promise.all( range( THREADS ).map( () => {
        let map = new Map({
            width: WIDTH,
            height: HEIGHT
        })
        map.seed([
            { x: 0, y: 0, value: 0x80 },
            { x: WIDTH - 1, y: 0, value: 0x80 },
            { x: 0, y: HEIGHT - 1, value: 0x80 },
            { x: WIDTH - 1, y: HEIGHT - 1, value: 0x80 }
        ])
        return map.generate()
    }))
        .then( res => {
            console.log( '  sequential: all done' )
            console.log( res )
            let time = window.performance.now() - seqstart
            console.log( 'generation time', time.toFixed( 2 ), 'ms' )

            // Try to cat all arrays together to have a stab at rendering
            var arr = res.reduce( ( prev, curr ) => {
                for ( let i = 0; i < curr.length; i++ ) {
                    prev.push( curr[ i ] )
                }
                return prev
            }, [] )
            console.log( arr )
            window.arr = arr
            render( arr )
        })
}


generate()
//render()


document.body.appendChild( canvas )


window.render = render
window.mapGenerator = mapGenerator
window.generate = generate
