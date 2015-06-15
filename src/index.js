
import Map from './map'


var workerString = ''/* Build:Worker */


export default class Generator {
    constructor( opts ) {

        this.opts = opts
        this.map = new Map( this.opts )
        this.map.seed([
            { x: 0, y: 0, value: 0x80 },
            { x: this.opts.width - 1, y: 0, value: 0x80 },
            { x: 0, y: this.opts.height - 1, value: 0x80 },
            { x: this.opts.width - 1, y: this.opts.height - 1, value: 0x80 }
        ])
    }

    generate() {

        console.log( workerString )

        function start( event ) {
            setTimeout( () => {
                postMessage( 'I have finished' )
            }, 1000 )

            console.log( event.data.map )
        }

        // let fn = 'onmessage = ' + workerString
        let fn = workerString
        //let fn = 'onmessage = ' + start.toString()
        let blob = new Blob( [ fn ] )
        let URI = window.URL.createObjectURL( blob )
        let worker = new window.Worker( URI )

        worker.onmessage = event => {
            console.log( 'received msg from worker' )
            console.log( event )
        }

        let options = this.opts
        let map = new Map( options )
        console.log( 'main: ', map )
        worker.postMessage({
            // map: new Map( options )
            // seed: [
            //     { x: 0, y: 0, value: 0x80 },
            //     { x: options.width - 1, y: 0, value: 0x80 },
            //     { x: 0, y: options.height - 1, value: 0x80 },
            //     { x: options.width - 1, y: options.height - 1, value: 0x80 }
            // ],
            map: 'hello world map'
        })



        return this.map.generate()
    }

    get() {
        return this.map.get( ...arguments )
    }

}
