const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { projectFromItem } = require( `../entities` )

/**
 * Retrieves the project from DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} project   The project requested.
 */
const getProject = async ( tableName, project ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  try {
    const result = await dynamoDB.getItem( {
      TableName: tableName,
      Key: project.key()
    } ).promise()
    if ( !result.Item ) return { error: `Project does not exist` }
    else return { project: projectFromItem( result.Item ) }
  } catch( error ) {
    return { error: `Could not get project` }
  }
}

module.exports = {
  getProject
}