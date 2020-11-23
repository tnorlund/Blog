const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()

/**
 * Adds a Blog to a DynamoDB table
 * @param   {String} tableName The name of the DynamoDB table.
 * @param   {Blog}   project   The blog object added.
 */
const updateProject = async ( tableName, project ) => {
  try {
    await dynamoDB.updateItem( {
      TableName: tableName,
      Key: project.key(),
      ConditionExpression: `attribute_exists(PK)`,
      UpdateExpression: `SET #numberFollows = :numberFollows`,
      ExpressionAttributeNames: {
        '#numberFollows': `NumberFollows`,
      },
      ExpressionAttributeValues: {
        ':numberFollows': { 'N': String( project.numberFollows ) }
      },
      ReturnValues: `ALL_NEW`
    } ).promise()
    return( { project: project } )
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `ERROR, updateProject `, error )
    let errorMessage = `Could not update project`
    if ( error.code == `ConditionalCheckFailedException` )
      errorMessage = `Blog already exists`
    return { error: errorMessage }
  }
}

module.exports = {
  updateProject
}