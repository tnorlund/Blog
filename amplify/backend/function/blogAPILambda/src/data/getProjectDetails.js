const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const {
  projectFromItem, projectFollowFromItem
} = require( `../entities` )

/**
 * Retrieves the project and its followers from DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} user      The user requested.
 */
const getProjectDetails = async ( tableName, project ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  try {
    const result = await dynamoDB.query( {
      TableName: tableName,
      IndexName: `GSI1`,
      KeyConditionExpression: `#gsi1pk = :gsi1pk`,
      ExpressionAttributeNames: { '#gsi1pk': `GSI1PK` },
      ExpressionAttributeValues: { ':gsi1pk': project.gsi1pk() },
      ScanIndexForward: true
    } ).promise()
    if ( !result.Items ) return { error: `Project does not exist` }
    return { project: result.Items.map( ( item ) => {
      switch ( item.Type.S ) {
        case `project`: return projectFromItem( item )
        case `project follow`: return projectFollowFromItem( item )
        default: throw Error( `Could not parse type ${item.Type.S}` )
      }
    } ) }
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `ERROR getProjectDetails`, error )
    return { error: `Could not get project details` }
  }
}

module.exports = {
  getProjectDetails
}