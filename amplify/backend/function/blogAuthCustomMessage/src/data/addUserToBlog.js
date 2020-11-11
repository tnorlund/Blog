const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { Blog, blogFromItem } = require( `../entities` )

/**
 * Adds a user to DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {User} user        The user added to the blog.
 */
const addUserToBlog = async ( tableName, user ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )

  const { blog, error } = await incrementNumberUsers( tableName )
  if ( error ) return { error: error }

  // eslint-disable-next-line no-console
  console.log( `addUserToBlog`, blog )

  user.userNumber = blog.numberUsers
  const response = await dynamoDB.putItem( {
    TableName: tableName,
    Item: user.toItem(),
    ConditionExpression: `attribute_not_exists(PK)`
  } ).promise()
    .catch( error => {
      let errorMessage = `Could not add user to blog`
      if ( error.code === `ConditionalCheckFailedException` )
        errorMessage = `${user.name} is already in DynamoDB`
      return { 'error': errorMessage }
    } )
  // eslint-disable-next-line no-console
  console.log( `response`, response )
}

/**
 * Increments the number of users in the DynamoDB blog item.
 * @param {String} tableName The name of the DynamoDB table.
 */
const incrementNumberUsers = async ( tableName ) => {
  if ( !tableName )
    throw new Error( `Must give the name of the DynamoDB table` )
  let blog = new Blog( {} )
  // eslint-disable-next-line no-console
  console.log( `new Blog`, blog )
  // eslint-disable-next-line no-console
  console.log( `blog key`, blog.key() )
  const response = await dynamoDB.updateItem( {
    TableName: tableName,
    Key: blog.key(),
    ConditionExpression: `attribute_exists(PK)`,
    UpdateExpression: `SET #count = #count + :inc`,
    ExpressionAttributeNames: {
      '#count': `NumberUsers`
    },
    ExpressionAttributeValues: {
      ':inc': { 'N': `1` }
    },
    ReturnValues: `ALL_NEW`
  } ).promise()
    .catch( error => {
      let errorMessage = `Could not add user to blog`
      if ( error.code === `ConditionalCheckFailedException` )
        errorMessage = `Blog does not exist`
      return { 'error': errorMessage }
    } )
  if ( !response.Attributes ) return { 'error': `Could not find blog` }
  return { 'blog': blogFromItem( response.Attributes ) }
}

module.exports = { addUserToBlog }