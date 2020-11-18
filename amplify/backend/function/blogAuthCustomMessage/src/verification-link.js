const { User } = require( `./entities` )
const { addUserToBlog } = require( `./data` )
const async = require( `async` )

exports.handler = ( event, context, callback ) => {
  // Define the URL that you want the user to be directed to after verification
  // is complete
  if ( event.triggerSource === `CustomMessage_SignUp` ) {
    const { codeParameter } = event.request
    const { region, userName } = event
    const { clientId } = event.callerContext
    const redirectUrl = `${process.env.REDIRECTURL}/?username=${userName}`
    const resourcePrefix = process.env.RESOURCENAME.split( `CustomMessage` )[0]

    // Get the user attributes
    const { name, email } = event.request.userAttributes

    // Set the table name
    let tableName = `blogDB`
    if( process.env.ENV && process.env.ENV !== `NONE` )
      tableName = tableName + `-` + process.env.ENV

    // Add this user to the DynamoDB.
    const user = new User( { name: name, email: email } )
    // async.asyncify( async () => {
    //   const { response, error } = await addUserToBlog( tableName, user )
    //   // eslint-disable-next-line no-console
    //   if ( error ) console.log( `error`, error )
    //   else console.log( `response`, response )
    // } )

    // async.auto( {
    //   'addUser':  async.asyncify( async () => {
    //     const { response, error } = await addUserToBlog( tableName, user )
    //     // eslint-disable-next-line no-console
    //     if ( error ) console.log( `error`, error )
    //     else console.log( `response`, response )
    //   } )
    // },  ( error, response ) => {
    //   if ( error ) {
    //     // eslint-disable-next-line no-console
    //     console.log( `Could not add ${user.name} to DynamoDB: ${error}` )
    //   } else {
    //     // eslint-disable-next-line no-console
    //     console.log( `response: `, response )
    //   }
    // } )

    // eslint-disable-next-line no-console
    console.log( `Attempting to add user to DynamoDB` )
    addUserToBlog( tableName, user )
    // eslint-disable-next-line no-console
    console.log( `added user to DynamoDB` )

    // Look through the different regions to see which region the event was
    // called from.
    const hyphenRegions = [
      `us-east-1`, `us-west-1`, `us-west-2`,
      `ap-southeast-1`, `ap-southeast-2`, `ap-northeast-1`,
      `eu-west-1`, `sa-east-1`,
    ]
    const separator = hyphenRegions.includes( region ) ? `-` : `.`

    // Set the payload for the link to authenticate the user.
    const payload = Buffer.from(
      JSON.stringify( { userName, redirectUrl, region, clientId } )
    ).toString( `base64` )

    // Set the response
    // eslint-disable-next-line max-len
    const bucketUrl = `http://${resourcePrefix}verificationbucket-${process.env.ENV}.s3-website${separator}${region}.amazonaws.com`
    const url = `${bucketUrl}/?data=${payload}&code=${codeParameter}`
    const message = `${process.env.EMAILMESSAGE}. \n ${url}`
    event.response.smsMessage = message
    event.response.emailSubject = process.env.EMAILSUBJECT
    event.response.emailMessage = message
    // Make the callback to complete the event.
    callback( null, event )
  } else {
    callback( null, event )
  }
}
