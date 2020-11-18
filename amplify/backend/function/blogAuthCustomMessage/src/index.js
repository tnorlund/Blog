/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_BLOGDB_ARN
	STORAGE_BLOGDB_NAME
Amplify Params - DO NOT EDIT *//*
  this file will loop through all js modules which are uploaded to the lambda
  resource, provided that the file names (without extension) are included in
  the "MODULES" env variable. "MODULES" is a comma-delimited string.
*/

exports.handler = ( event, context, callback ) => {
  const modules = process.env.MODULES.split( `,` )
  for ( let i = 0; i < modules.length; i += 1 ) {
    const { handler } = require( `./${modules[i]}` )
    handler( event, context, callback )
  }
}
