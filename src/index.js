
export default class DisplacementMap {
    constructor() {
        this.width = 65
        this.height = 65

        this.buffer = new ArrayBuffer( this.width * this.height )
        this.array = new Uint8Array( this.buffer )

        this.generate()

        console.log( this.array )

        console.log( this.to1d( 4, 0 ) )
        console.log( this.to1d( 2, 1 ) )
    }

    /*-----------------------------------------------------------*
     *
     *  Generation methods
     *
     *-----------------------------------------------------------*/

     generate() {
         // No universal TypedArray.map so go old school
         for ( let x = 0; x < this.array.length; x++ ) {
             this.array[ x ] = ~~( Math.random() * 0xff )
         }

         return this.array
     }


    /*-----------------------------------------------------------*
     *
     *  Helpers
     *
     *-----------------------------------------------------------*/

    /**
     * Converts from 2d to 1d
     */
    to1d( x, y ) {
        return ( y * this.width ) + x
    }

    /**
     * Wraps 0...255 i.e. 257 becomes 1 (because 0 is important)
     */
    wrap( value ) {
        return value & 0xff
    }

    /**
     * Clamps to 0...255
     */
    clamp( value ) {
        return Math.max( Math.min( value, 255 ), 0 )
    }

}
