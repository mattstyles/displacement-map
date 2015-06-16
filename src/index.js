

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
    }

    generate( opts ) {
        return new Promise( ( resolve, reject ) => {
            let worker = new window.Worker( workerURI )

            worker.onmessage = event => {
                console.log( 'worker status:', event.data )
                worker.terminate()

                resolve( event.data.array )
            }

            let options = this.opts
            worker.postMessage({
                map: opts.map,
                width: opts.width,
                height: opts.height,
                seed: [
                    { x: 0, y: 0, value: 0x80 },
                    { x: options.width - 1, y: 0, value: 0x80 },
                    { x: 0, y: options.height - 1, value: 0x80 },
                    { x: options.width - 1, y: options.height - 1, value: 0x80 }
                ]
            })
        })
    }
}
