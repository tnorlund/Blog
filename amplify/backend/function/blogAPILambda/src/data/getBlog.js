const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { Blog, blogFromItem } = require( `../entities` )

/**
 * Retrieves the blog data from DynamoDB.
 * @param {String} tableName The name of the DynamoDB table
 */
const getBlog = async ( tableName ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  const blog = new Blog( {} )
  try {
    const result = await dynamoDB.getItem( {
      TableName: tableName,
      Key: blog.key()
    } ).promise()
    if ( !result.Item ) return { error: `Blog does not exist` }
    return { blog: blogFromItem( result.Item ) }
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `Failed to get blog`, error )
    return { error: `Could not retrieve blog` }
  }
}

module.exports = {
  getBlog
}