

/**
 * WorkerString magic - regex replaces this empty string with built worker code string
 * @TODO this is fragile and will need some love
 */
var displacementLineWorkerString = ''
var displacementMapWorkerString = ''

var workerblob = new Blob( [ displacementMapWorkerString ] )
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

                resolve( event.data.map )
            }

            worker.postMessage({
                map: opts.map,
                width: opts.width,
                height: opts.height
            })
        })
    }
}
