const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { Blog, blogFromItem } = require( `../entities` )

/**
 * Resets the DynamoDB blog item to 0.
 * @param   {String} tableName The name of the DynamoDB table.
 * @returns {Map}              Whether the blog was added to the DB.
 */
const resetBlog = async ( tableName ) => {
  const blog = new Blog( {} )
  try {
    const result = await dynamoDB.updateItem( {
      TableName: tableName,
      Key: blog.key(),
      ConditionExpression: `attribute_exists(PK)`,
      UpdateExpression: `SET #users = :users, #posts = :posts`,
      ExpressionAttributeNames: {
        '#users': `NumberUsers`, '#posts': `NumberPosts`
      },
      ExpressionAttributeValues: {
        ':users':  { 'N': String( blog.numberUsers ) },
        ':posts': { 'N': String( blog.numberPosts ) },
      },
      ReturnValues: `ALL_NEW`
    } ).promise()
    return {
      blog: blogFromItem( result.Attributes )
    }
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `Error resetting the blog` )
    let errorMessage = `Could not reset the blog`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `Blog does not exist`
    return { error: errorMessage }
  }
}

module.exports = {
  resetBlog
}