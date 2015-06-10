import path from 'path'
import tape from 'tape'

import { clamp, wrap, random } from '../maths'


tape( 'Clamp :: ' + path.basename( __filename ), t => {
    t.plan( 8 )

    t.equal( clamp({ num: .5 }), .5, 'clamp should have default parameters' )
    t.equal( clamp({ num: 2, min: 0, max: 10 }), 2, 'clamp should return a num within the range' )
    t.equal( clamp({ num: .75, min: 0, max: 1 }), .75, 'clamp should work with floats' )
    t.equal( clamp({ num: 2, min: 0, max: 1 }), 1, 'clamp should clamp to the upper bound' )
    t.equal( clamp({ num: 2, min: 10, max: 100 }), 10, 'clamp should clamp to the lower bound' )
    t.equal( clamp({ num: 20, min: -10, max: 10 }), 10, 'clamp should work with negatives' )
    t.equal( clamp({ num: -50, min: -10, max: 10 }), -10, 'clamp should clamp to a lower negative bound' )
    t.equal( clamp({ num: 0, min: -20, max: -10 }), -10, 'clamp should clamp to an upper negative bound' )
})


tape( 'Wrap :: ' + path.basename( __filename ), t => {
    t.plan( 7 )

    t.equal( wrap({ num: 0 }), 0, 'wrap should have default parameters' )

    t.equal( wrap({
        num: 8,
        min: 10,
        max: 15
    }), 13, 'wrap should wrap from bottom around to top for positive values' )

    t.equal( wrap({
        num: 2,
        min: 10,
        max: 15
    }), 12, 'wrap should wrap from bottom around to top over a larger distance for positive values' )

    t.equal( wrap({
        num: -2,
        min: 0,
        max: 5
    }), 3, 'wrap should wrap from bottom around to top for negative values' )

    t.equal( wrap({
        num: -7,
        min: 0,
        max: 5
    }), 3, 'wrap should wrap from bottom around to top over a larger distance for negative values' )

    t.equal( wrap({
        num: 12,
        min: 0,
        max: 10
    }), 2, 'wrap should wrap from top around to the bottom' )

    t.equal( wrap({
        num: 22,
        min: 0,
        max: 10
    }), 2, 'wrap should wrap from top around to the bottom over a larger distance' )
})
