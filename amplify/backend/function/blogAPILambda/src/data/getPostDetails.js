const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const {
  postFromItem, commentFromItem
} = require( `../entities` )

/**
 * @typedef {Object} postResponse The object returned by the function that gets
 *                                the details of a post.
 * @property {String}   error     The error that occurs when attempting to get
 *                                the details of a post.
 * @property {Object}   post      The post object from the database.
 * @property {[Object]} comments  The comment objects from the database.
 */

/**
 * Retrieves the project and its followers from DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} user      The user requested.
 * @returns {postResponse}   The result of accessing the database.
 */
const getPostDetails = async ( tableName, post ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  try {
    const result = await dynamoDB.query( {
      TableName: tableName,
      IndexName: `GSI1`,
      KeyConditionExpression: `#gsi1pk = :gsi1pk`,
      ExpressionAttributeNames: { '#gsi1pk': `GSI1PK` },
      ExpressionAttributeValues: { ':gsi1pk': post.gsi1pk() },
      ScanIndexForward: true
    } ).promise()
    if ( !result.Items ) return { error: `Post does not exist` }
    // Iterate over the results and parse then into their matching objects.
    let comments = []
    let requestedPost
    result.Items.map( ( item ) => {
      switch ( item.Type.S ) {
        case `post`:
          requestedPost = postFromItem( item )
          break
        case `comment`:
          comments.push(
            commentFromItem( item ) )
          break
        default: throw Error(
          `Could not parse type ${ item.Type.S }`
        )
      }
    } )
    return { post: requestedPost, comments }
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `ERROR getPostDetails`, error )
    return { error: `Could not get project details` }
  }
}

module.exports = {
  getPostDetails
}