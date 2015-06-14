
export default class DisplacementMap {
    constructor() {
        this.width = 65

        this.buffer = new ArrayBuffer( this.width * this.width )
        this.array = new Uint8Array( this.buffer )

        this.generate()

        console.log( this.array )

        console.log( this.to1d( 4, 0 ) )
        console.log( this.to1d( 2, 1 ) )
    }

    to1d( x, y ) {
        return ( y * this.width ) + x
    }

    generate() {
        // No universal TypedArray.map so go old school
        for ( let x = 0; x < this.array.length; x++ ) {
            this.array[ x ] = ~~( Math.random() * 0xff )
        }

        return this.array
    }
}
