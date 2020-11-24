const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const {
  projectFromItem, projectFollowFromItem, User
} = require( `../entities` )

// Get project details
// [ ] Delete project follows
// [X]  - decrement User project follow
// [ ] Delete project

const removeProject = async ( tableName, project ) => {
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
    const projectDetails = result.Items.map( ( item ) => {
      switch ( item.Type.S ) {
        case `project`: return projectFromItem( item )
        case `project follow`: return projectFollowFromItem( item )
        default: throw Error( `Could not parse type ${item.Type.S}` )
      }
    } )
    const requestedProject = projectDetails[0]
    const requestedFollowers = projectDetails.slice( 1, projectDetails.length )
    // Decrement the number of projects each follower follows and then delete
    // the project follow.
    requestedFollowers.map( async ( requestedFollow ) => {
      const requestedUser = new User( {
        name: requestedFollow.userName, email: requestedFollow.email,
        userNumber: requestedFollow.userNumber
      } )
      const { userError } = await decrementNumberUserFollows(
        tableName, requestedUser
      )
      if ( userError ) throw new Error(
        `Cannot decrement number of follows for ${requestedFollow.userName}`
      )
      else await dynamoDB.deleteItem( {
        TableName: tableName,
        Key: requestedFollow.key(),
        ConditionExpression: `attribute_exists(PK)`
      } ).promise()
    } )
    // Delete the project.
    await dynamoDB.deleteItem( {
      TableName: tableName,
      Key: requestedProject.key(),
      ConditionExpression: `attribute_exists(PK)`
    } ).promise()
    return { project: project }
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `ERROR removeProject`, error )
    return { error: `Could not get user` }
  }
}

/**
 * Decrements a user's number of projects that they follow in DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} user      The user to increment the number of projects they
 *                           follow.
 */
const decrementNumberUserFollows = async ( tableName, user ) => {
  if ( !tableName )
    throw new Error( `Must give the name of the DynamoDB table` )
  try {
    const response = await dynamoDB.updateItem( {
      TableName: tableName,
      Key: user.key(),
      ConditionExpression: `attribute_exists(PK)`,
      UpdateExpression: `SET #count = #count - :dec`,
      ExpressionAttributeNames: { '#count': `NumberFollows` },
      ExpressionAttributeValues: { ':dec': { 'N': `1` } },
      ReturnValues: `ALL_NEW`
    } ).promise()
    if ( !response.Attributes ) return { 'userError': `Could not find project` }
    // Remove the last fo
    user.numberFollows = String(
      parseInt( response.Attributes.NumberFollows.N ) + 1
    )
    // Send the original back to esnure the correct keys are set.
    return { 'userResponse': user }
  } catch( error ) {
    let errorMessage = `Could not unfollow project`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `User does not exist`
    return { 'userError': errorMessage }
  }
}

module.exports = { removeProject }