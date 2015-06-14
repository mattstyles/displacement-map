
import Map from '../lib'
let map = new Map()

window.map = map

let canvas = document.createElement( 'canvas' )
canvas.classList.add( 'Surface', 'js-surface' )
canvas.setAttribute( 'width', 400 )
canvas.setAttribute( 'height', 400 )

document.body.appendChild( canvas )
