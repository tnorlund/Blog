const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { postFromItem } = require( `../entities` )

/**
 * Retrieves the project from DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} post      The post requested.
 */
const getPost = async ( tableName, post ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  try {
    const result = await dynamoDB.getItem( {
      TableName: tableName,
      Key: post.key()
    } ).promise()
    if ( !result.Item ) return { error: `Project does not exist` }
    else return { post: postFromItem( result.Item ) }
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `ERROR getPost `, error )
    return { error: `Could not get project` }
  }
}

module.exports = {
  getPost
}