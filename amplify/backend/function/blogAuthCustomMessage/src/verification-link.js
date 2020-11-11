const aws = require( `aws-sdk` )
const { Blog, User } = require( `./entities` )
const { createBlog, addUserToBlog, getBlog } = require( `./data` )
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
    if( process.env.ENV && process.env.ENV !== `NONE` ) {
      tableName = tableName + `-` + process.env.ENV
    }
    const blog = new Blog( {} )
    // eslint-disable-next-line no-console
    console.log( `verification-link`, blog )
    // Add this user to the DynamoDB.
    const user = new User( { name: name, email: email } )
    // addUserToBlog( tableName, user )
    // console.log(`completed addUserToBlog`)

    const hyphenRegions = [
      `us-east-1`,
      `us-west-1`,
      `us-west-2`,
      `ap-southeast-1`,
      `ap-southeast-2`,
      `ap-northeast-1`,
      `eu-west-1`,
      `sa-east-1`,
    ]

    const seperator = hyphenRegions.includes( region ) ? `-` : `.`

    const payload = Buffer.from(
      JSON.stringify( {
        userName,
        redirectUrl,
        region,
        clientId,
      } )
    ).toString( `base64` )
    // eslint-disable-next-line max-len
    const bucketUrl = `http://${resourcePrefix}verificationbucket-${process.env.ENV}.s3-website${seperator}${region}.amazonaws.com`
    const url = `${bucketUrl}/?data=${payload}&code=${codeParameter}`
    const message = `${process.env.EMAILMESSAGE}. \n ${url}`
    event.response.smsMessage = message
    event.response.emailSubject = process.env.EMAILSUBJECT
    event.response.emailMessage = message
    // eslint-disable-next-line no-console
    console.log( `event.response`, event.response )
    async.auto( {
      addUserToBlog: async.apply( addUserToBlog, tableName, user )
    }, callback( null, event ) )
    // callback( null, event )
  } else {
    callback( null, event )
  }
}
