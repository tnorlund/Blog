const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { userFromItem, tosFromItem } = require( `../entities` )

/**
 * Retrieves the user from DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} user      The user requested.
 */
const getUserDetails = async ( tableName, user ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  try {
    const result = await dynamoDB.query( {
      TableName: tableName,
      KeyConditionExpression: `#pk = :pk`,
      ExpressionAttributeNames: { '#pk': `PK` },
      ExpressionAttributeValues: { ':pk': user.pk() },
      ScanIndexForward: false
    } ).promise()
    if ( !result.Items ) return { error: `User does not exist` }
    return { user: result.Items.map( ( item ) => {
      switch ( item.Type.S ) {
        case `user`: return userFromItem( item )
        case `terms of service`: return tosFromItem( item )
        default: throw Error( `Could not parse type ${item.Type.S}` )
      }
    } ) }
  } catch( error ) {
    console.log( `Failed to get user`, error )
    return { error: `Could not get user` }
  }
}

module.exports = {
  getUserDetails
}