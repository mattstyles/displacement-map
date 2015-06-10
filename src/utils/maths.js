
export function clamp({ num = 0, min = 0, max = 1 }) {
    return num > min
        ? num < max
            ? num
            : max
        : min
}

export function wrap({ num = 0, min = 0, max = 1 }) {
    if ( max === 0 ) {
        throw new Error( 'maths:wrap invalid parameter/s' )
    }

    if ( num > max ) {
        return num % max
    }

    if ( num < min ) {
        return max - ( ( min - num ) % ( max - min ) )
    }

    return num
}
