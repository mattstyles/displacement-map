
// Run with babel-node

import fs from 'fs'
import path from 'path'

// var babel = require( 'babel' )

let worker = fs.readFileSync( path.join( __dirname, '../lib/worker-bundle.js' ), 'utf8' )
let file = fs.readFileSync( path.join( __dirname, '../lib/index.js' ), 'utf8' )
// let babelConfig = JSON.parse( fs.readFileSync( path.join( __dirname, '../.babelrc' ), 'utf8' ))
// let output = babel.transform( file, babelConfig )

// fs.writeFileSync( path.join( __dirname, '../lib/worker-bundle.js' ), output.code, 'utf8' )


// Replace quotes in code
let escaped = worker.replace( /\'/g, '\\\'' )

// Wrap code in quotes to make a string
let replaced = file.replace( 'workerString = \'\'', 'workerString = \'' + escaped + '\'' )

// Regex replace magic line with wrapped code string ready for worker to execute
fs.writeFileSync( path.join( __dirname, '../lib/index.js' ), replaced, 'utf8' )

console.log( 'worker built' )
