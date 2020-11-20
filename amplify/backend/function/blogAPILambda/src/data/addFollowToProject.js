const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { projectFromItem } = require( `../entities` )

/**
 * Adds a project's follow to DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} project   The project to add.
 */
const addFollowToProject = async ( tableName, project ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  const {
    projectResponse, error
  } = await incrementNumberFollows( tableName, project )
  console.log( projectResponse )
  // if ( error ) return { error: error }
  // try {
  //   await dynamoDB.putItem( {
  //     TableName: tableName,
  //     Item: project.toItem(),
  //     ConditionExpression: `attribute_not_exists(PK)`
  //   } ).promise()
  //   return { project: project }
  // } catch( error ) {
  //   let errorMessage = `Could not add project to blog`
  //   if ( error.code === `ConditionalCheckFailedException` )
  //     errorMessage = `${project.title} is already in DynamoDB`
  //   return { 'error': errorMessage }
  // }
}

/**
 * Increments a project's number of followers in DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} project   The project to increment the number of followers.
 */
const incrementNumberFollows = async ( tableName, project ) => {
  if ( !tableName )
    throw new Error( `Must give the name of the DynamoDB table` )
  try {
    const response = await dynamoDB.updateItem( {
      TableName: tableName,
      Key: project.key(),
      ConditionExpression: `attribute_exists(PK)`,
      UpdateExpression: `SET #count = #count + :inc`,
      ExpressionAttributeNames: { '#count': `NumberFollows` },
      ExpressionAttributeValues: { ':inc': { 'N': `1` } },
      ReturnValues: `ALL_NEW`
    } ).promise()
    if ( !response.Attributes ) return { 'error': `Could not find project` }
    project.numberFollows = response.Attributes.NumberFollows.N
    return { 'projectResponse': project }
  } catch( error ) {
    let errorMessage = `Could not follow project`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `Project does not exist`
    return { 'error': errorMessage }
  }
  
}

module.exports = { addFollowToProject }