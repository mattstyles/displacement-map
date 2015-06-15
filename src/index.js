
import Map from './map'

/**
 * WorkerString magic - regex replaces this empty string with built worker code string
 * @TODO this is fragile and will need some love
 */
var workerString = ''


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
        let fn = workerString
        let blob = new Blob( [ fn ] )
        let URI = window.URL.createObjectURL( blob )
        let worker = new window.Worker( URI )

        worker.onmessage = event => {
            console.log( 'received msg from worker' )
            console.log( event.data )
            console.log( event.data.buffer )
            console.log( event.data.array )
        }

        let options = this.opts
        worker.postMessage({
            options: options,
            seed: [
                { x: 0, y: 0, value: 0x80 },
                { x: options.width - 1, y: 0, value: 0x80 },
                { x: 0, y: options.height - 1, value: 0x80 },
                { x: options.width - 1, y: options.height - 1, value: 0x80 }
            ]
        })



        return this.map.generate()
    }

    get() {
        return this.map.get( ...arguments )
    }

}
