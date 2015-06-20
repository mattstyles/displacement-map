

/**
 * WorkerString magic - regex replaces this empty string with built worker code string
 * @TODO this is fragile and will need some love
 */
var displacementLineWorkerString = ''
var displacementMapWorkerString = ''

var mapBlob = new Blob( [ displacementMapWorkerString ] )
var mapURI = window.URL.createObjectURL( mapBlob )

var lineBlob = new Blob( [ displacementLineWorkerString ] )
var lineURI = window.URL.createObjectURL( lineBlob )


export default class Generator {
    constructor( opts ) {

        this.opts = opts || {}
    }

    debug() {
        if ( !this.opts.debug ) {
            return
        }

        console.log( ...arguments )
    }

    generate( opts ) {
        return new Promise( ( resolve, reject ) => {
            let worker = new window.Worker( mapURI )

            worker.onmessage = event => {
                this.debug( 'worker status:', event.data )
                worker.terminate()

                resolve( event.data.map )
            }

            worker.postMessage({
                map: opts.map,
                width: opts.width,
                height: opts.height,
                roughness: opts.roughness
            })
        })
    }

    generateLine( opts ) {
        return new Promise( ( resolve, reject ) => {
            let worker = new window.Worker( lineURI )

            worker.onmessage = event => {
                this.debug( 'line worker status', event.data )
                worker.terminate()

                resolve( event.data.buf8 )
            }

            worker.postMessage({
                buf8: opts.buf8,
                roughness: opts.roughness
            })
        })
    }
}
