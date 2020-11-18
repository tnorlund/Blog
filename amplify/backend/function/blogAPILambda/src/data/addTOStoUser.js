const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { User, TOS, userFromItem, tosFromItem } = require( `../entities` )

/**
 * Adds a user to DynamoDB.
 * @param {String} tableName  The name of the DynamoDB table.
 * @param {Object} user       The user to add the TOS to.
 * @param {String} tosVersion The version of the Terms of Service.
 */
const addTOSToUser = async ( tableName, user, tosVersion ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  const { requestedUser, error } = await incrementTOS( tableName, user )
  if ( error ) return { error: error }
  // Set the new Terms of Service to match the user's data.
  const tos = new TOS( { 
    userNumber: user.userNumber, tosNumber: requestedUser.numberTOS,
    version: tosVersion
  } )
  try {
    await dynamoDB.putItem( {
      TableName: tableName,
      Item: tos.toItem(),
      ConditionExpression: `attribute_not_exists(PK)`
    } ).promise()
    return { tos: tos }
  } catch( error ) {
    let errorMessage = `Could not add Terms of Service to user`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `${user.name} already accepted this Terms of Service`
    return { error: errorMessage }
  }
}

/**
 * Increments the number of Terms of Service in the DynamoDB user item.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} user      The user accepting the Terms of Service.
 */
const incrementTOS = async ( tableName, user ) => {
  if ( !tableName )
    throw new Error( `Must give the name of the DynamoDB table` )
  try {
    const response = await dynamoDB.updateItem( {
      TableName: tableName,
      Key: user.key(),
      ConditionExpression: `attribute_exists(PK)`,
      UpdateExpression: `SET #count = #count + :inc`,
      ExpressionAttributeNames: { '#count': `NumberTOS` },
      ExpressionAttributeValues: { ':inc': { 'N': `1` } },
      ReturnValues: `ALL_NEW`
    } ).promise()
    if ( !response.Attributes ) return { 'error': `Could not find user` }
    return { requestedUser: userFromItem( response.Attributes ) }
  } catch( error ) {
    let errorMessage = `Could not add tos to user`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `User does not exist`
    return { 'error': errorMessage }
  }
  
}

module.exports = { addTOSToUser }