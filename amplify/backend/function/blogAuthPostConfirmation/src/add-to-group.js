/* eslint-disable-line */ const aws = require('aws-sdk');

exports.handler = async ( event, context, callback ) => {
  console.log(`event`, { event } )
  console.log(`context`, { context } )
  console.log(`callback`, { callback } )
  console.log(`process`, { process } )
  // Set up the Cognito Identity Service Provider to later handle adding the
  // new user to the specific group.
  // eslint-disable-next-line max-len
  const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider( { apiVersion: `2016-04-18` } )
  // Create the DynamoDB document to later add the user details.
  const dynamoDB = new aws.DynamoDB.DocumentClient()
  const groupParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
  }

  const addUserParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  }

  try {
    await cognitoIdentityServiceProvider.getGroup( groupParams ).promise()
  } catch ( e ) {
    await cognitoIdentityServiceProvider.createGroup( groupParams ).promise()
  }

  try {
    // eslint-disable-next-line max-len
    await cognitoIdentityServiceProvider.adminAddUserToGroup( addUserParams ).promise()
    callback( null, event )
  } catch ( e ) {
    callback( e )
  }
}
