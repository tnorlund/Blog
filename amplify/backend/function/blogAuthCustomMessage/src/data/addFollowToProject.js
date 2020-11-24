const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { ProjectFollow } = require( `../entities` )

/**
 * Adds a project's follow to DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} project   The project to add.
 */
const addFollowToProject = async ( tableName, user, project ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  try {
    // Increment the number of the project's followers.
    const {
      projectResponse, projectError
    } = await incrementNumberProjectFollows( tableName, project )
    if ( projectError ) return { error: projectError }
    // Increment the number of projects the user follows.
    const { userResponse, userError } = await incrementNumberUserFollows(
      tableName, user
    )
    if ( userError ) return { error: userError }
    // Add the project's follow to the DB.
    const projectFollow = new ProjectFollow( {
      userName: userResponse.name, userNumber: userResponse.userNumber,
      userFollowNumber: userResponse.numberFollows, email: userResponse.email,
      slug: projectResponse.slug, title: projectResponse.title,
      projectFollowNumber: projectResponse.numberFollows
    } )
    await dynamoDB.putItem( {
      TableName: tableName,
      Item: projectFollow.toItem(),
      ConditionExpression: `attribute_not_exists(PK)`
    } ).promise()
    return { projectFollow: projectFollow }
  } catch( error ) {
    let errorMessage = `Could not add ${user.name} as a follower to 
      ${project.title}`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `${ user.name } is already following ${ project.title }`
    return { 'error': errorMessage }
  }
}

/**
 * Increments a project's number of followers in DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} project   The project to increment the number of followers.
 */
const incrementNumberProjectFollows = async ( tableName, project ) => {
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
    if ( !response.Attributes )
      return { 'projectError': `Could not find project` }
    project.numberFollows = response.Attributes.NumberFollows.N
    return { 'projectResponse': project }
  } catch( error ) {
    let errorMessage = `Could not follow project`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `Project does not exist`
    return { 'projectError': errorMessage }
  }
}

/**
 * Increments a user's number of projects that they follow in DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} user      The user to increment the number of projects they
 *                           follow.
 */
const incrementNumberUserFollows = async ( tableName, user ) => {
  if ( !tableName )
    throw new Error( `Must give the name of the DynamoDB table` )
  try {
    const response = await dynamoDB.updateItem( {
      TableName: tableName,
      Key: user.key(),
      ConditionExpression: `attribute_exists(PK)`,
      UpdateExpression: `SET #count = #count + :inc`,
      ExpressionAttributeNames: { '#count': `NumberFollows` },
      ExpressionAttributeValues: { ':inc': { 'N': `1` } },
      ReturnValues: `ALL_NEW`
    } ).promise()
    if ( !response.Attributes ) return { 'userError': `Could not find project` }
    user.numberFollows = response.Attributes.NumberFollows.N
    return { 'userResponse': user }
  } catch( error ) {
    let errorMessage = `Could not follow project`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `User does not exist`
    return { 'userError': errorMessage }
  }
}

module.exports = { addFollowToProject }