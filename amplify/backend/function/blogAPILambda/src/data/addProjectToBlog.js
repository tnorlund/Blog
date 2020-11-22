const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { Blog, blogFromItem } = require( `../entities` )

/**
 * Adds a project to DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} project   The project to add.
 */
const addProjectToBlog = async ( tableName, project ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  const { error } = await incrementNumberProjects( tableName )
  if ( error ) return { error: error }
  try {
    await dynamoDB.putItem( {
      TableName: tableName,
      Item: project.toItem(),
      ConditionExpression: `attribute_not_exists(PK)`
    } ).promise()
    return { project: project }
  } catch( error ) {
    let errorMessage = `Could not add project to blog`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `${project.title} is already in DynamoDB`
    return { 'error': errorMessage }
  }
}

/**
 * Increments the number of projects in the DynamoDB blog item.
 * @param {String} tableName The name of the DynamoDB table.
 */
const incrementNumberProjects = async ( tableName ) => {
  if ( !tableName )
    throw new Error( `Must give the name of the DynamoDB table` )
  let blog = new Blog( {} )
  try {
    const response = await dynamoDB.updateItem( {
      TableName: tableName,
      Key: blog.key(),
      ConditionExpression: `attribute_exists(PK)`,
      UpdateExpression: `SET #count = #count + :inc`,
      ExpressionAttributeNames: { '#count': `NumberProjects` },
      ExpressionAttributeValues: { ':inc': { 'N': `1` } },
      ReturnValues: `ALL_NEW`
    } ).promise()
    if ( !response.Attributes ) return { 'error': `Could not find blog` }
    return { 'blog': blogFromItem( response.Attributes ) }
  } catch( error ) {
    let errorMessage = `Could not add user to blog`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `Blog does not exist`
    return { 'error': errorMessage }
  }
}

module.exports = { addProjectToBlog }