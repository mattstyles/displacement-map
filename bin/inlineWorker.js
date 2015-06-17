
// Run with babel-node

import fs from 'fs'
import path from 'path'


function inlineWorker( worker, output ) {
    let workerFile = fs.readFileSync( path.resolve( worker ), 'utf8' )
    let file = fs.readFileSync( path.resolve( output ), 'utf8' )

    // Replace quotes in code
    let escaped = workerFile.replace( /\'/g, '\\\'' )

    // Wrap code in quotes to make a string
    let replaceString = path.basename( worker, '.js' ) + 'String'
    let replaced = file.replace( replaceString + ' = \'\'', replaceString + ' = \'' + escaped + '\'' )

    // Regex replace magic line with wrapped code string ready for worker to execute
    fs.writeFileSync( path.resolve( output ), replaced, 'utf8' )

    console.log( '  worker inlined', worker )
}


inlineWorker( './lib/displacementMapWorker.js', './lib/index.js' )
inlineWorker( './lib/displacementLineWorker.js', './lib/index.js' )
