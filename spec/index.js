
import path from 'path'
import minimist from 'minimist'
import glob from 'glob'

let argv = minimist( process.argv.slice( 2 ) )


glob( path.join( __dirname, '../', argv._[ 0 ] ), ( err, files ) => {
    files.forEach( file => {
        require( path.resolve( file ) )
    })
})
