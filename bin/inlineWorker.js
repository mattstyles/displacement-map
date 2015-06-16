
// Run with babel-node

import fs from 'fs'
import path from 'path'
import parse from 'minimist'

let argv = parse( process.argv.slice( 2 ) )

// -w input worker file
// -t file to transform

let worker = fs.readFileSync( path.resolve( './lib/displacementWorker.js' ), 'utf8' )
let file = fs.readFileSync( path.resolve( './lib/index.js' ), 'utf8' )

// Replace quotes in code
let escaped = worker.replace( /\'/g, '\\\'' )

// Wrap code in quotes to make a string
let replaced = file.replace( 'workerString = \'\'', 'workerString = \'' + escaped + '\'' )

// Regex replace magic line with wrapped code string ready for worker to execute
fs.writeFileSync( path.join( __dirname, '../lib/index.js' ), replaced, 'utf8' )

console.log( '  worker inlined' )
