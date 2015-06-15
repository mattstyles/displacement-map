
import Map from './map'

/**
 * WorkerString magic - regex replaces this empty string with built worker code string
 * @TODO this is fragile and will need some love
 */
var workerString = ''

var workerblob = new Blob( [ workerString ] )
var workerURI = window.URL.createObjectURL( workerblob )


export default class Generator {
    constructor( opts ) {

        this.opts = opts
        // this.map = new Map( this.opts )
        // this.map.seed([
        //     { x: 0, y: 0, value: 0x80 },
        //     { x: this.opts.width - 1, y: 0, value: 0x80 },
        //     { x: 0, y: this.opts.height - 1, value: 0x80 },
        //     { x: this.opts.width - 1, y: this.opts.height - 1, value: 0x80 }
        // ])
    }

    generate() {
        return new Promise( ( resolve, reject ) => {
            let worker = new window.Worker( workerURI )

            worker.onmessage = event => {
                // console.log( 'received msg from worker' )
                console.log( 'worker status:', event.data.msg )
                // console.log( event.data.array )

                // For now just map worker generated map straight on to this map
                // @TODO check how this plays with the buffer, probably needs a fromArray method
                // this.map.array = event.data.array

                worker.terminate()

                resolve( event.data.array )
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
        })
    }

    get() {
        return this.map.get( ...arguments )
    }

}
