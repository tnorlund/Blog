const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const {
  userFromItem, tosFromItem, projectFollowFromItem, commentFromItem
} = require( `../entities` )

/**
 * @typedef  {Object} userResponse The object returned by the function that
 *                                 gets the details of the user.
 * @property {String}   error      The error that occurs when attempting to get
 *                                 the details of the user.
 * @property {Object}   user       The user object from the database.
 * @property {[Object]} tos        The Terms of Services the user has from the
 *                                 database.
 * @property {[Object]} comments   The comments the user has from the database.
 * @property {[Object]} follows    The projects the user follows.
 */

/**
 * Retrieves the user from DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} user      The user requested.
 * @returns {userResponse}   The result of accessing the database.
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
    // Iterate over the results and parse them into their matching objects.
    let requestedUser
    let tos = []
    let follows = []
    let comments = []
    result.Items.map( ( item ) => {
      switch ( item.Type.S ) {
        case `user`:
          requestedUser = userFromItem( item )
          break
        case `terms of service`:
          tos.push( tosFromItem( item ) )
          break
        case `project follow`:
          follows.push( projectFollowFromItem( item ) )
          break
        case `comment`:
          comments.push( commentFromItem( item ) )
          break
        default: throw Error( `Could not parse type ${ item.Type.S }` )
      }
    } )
    return { user: requestedUser, tos, comments, follows }
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `ERROR getUserDetails`, error )
    return { error: `Could not get user` }
  }
}

module.exports = { getUserDetails }