const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { userFromItem } = require( `../entities` )

/**
 * Retrieves the user from DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} user      The user requested.
 */
const getUser = async ( tableName, user ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  try {
    console.log(`user.key`, user.key())
    const result = await dynamoDB.getItem( {
      TableName: tableName,
      Key: user.key()
    } ).promise()
    if ( !result.Item ) return { error: `User does not exist` }
    return { user: userFromItem( result.Item ) }
  } catch( error ) {
    console.log( `Failed to get user`, error )
    return { error: `Could not get user` }
  }
}

module.exports = {
  getUser
}