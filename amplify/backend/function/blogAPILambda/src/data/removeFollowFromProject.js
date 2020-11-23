const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const { ProjectFollow } = require( `../entities` )

// TODO
// [ ] Remove user's Project Follow
// [ ] Recount the numbers of the Project's Follows
// [ ]   - Get the Project's Follows
// [ ]   - Set the correct counts for each Project's Follows

const removeFollowFromProject = async ( tableName, user, project ) => {
  if ( !tableName ) throw Error( `Must give the name of the DynamoDB table` )
  try {
    // Increment the number of the project's followers.
    const {
      projectResponse, projectError
    } = await decrementNumberProjectFollows( tableName, project )
    if ( projectError ) return { error: projectError }
    // eslint-disable-next-line no-console
    console.log( `projectResponse`, projectResponse )
    // Increment the number of projects the user follows.
    const { userResponse, userError } = await decrementNumberUserFollows(
      tableName, user
    )
    if ( userError ) return { error: userError }
    // eslint-disable-next-line no-console
    console.log( `userResponse`, userResponse )
    // Add the project's follow to the DB.
    const projectFollow = new ProjectFollow( {
      userName: userResponse.name, userNumber: userResponse.userNumber,
      userFollowNumber: userResponse.numberFollows,
      slug: projectResponse.slug, title: projectResponse.title,
      projectFollowNumber: projectResponse.numberFollows
    } )
    // eslint-disable-next-line no-console
    console.log( `projectFollow.toItem()`, projectFollow.toItem() )
    await dynamoDB.deleteItem( {
      TableName: tableName,
      Key: projectFollow.key(),
      ConditionExpression: `attribute_exists(PK)`
    } ).promise()
    return { user: userResponse, project: projectResponse }
  } catch( error ) {
    // eslint-disable-next-line no-console
    console.log( `error`, error )
    // eslint-disable-next-line max-len
    let errorMessage = `Could not remove ${user.name} as a follower to ${project.title}`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `${user.name} is not following ${project.title}`
    return { 'error': errorMessage }
  }
}

/**
 * Decrements a project's number of followers in DynamoDB.
 * @param {String} tableName The name of the DynamoDB table.
 * @param {Object} project   The project to increment the number of followers.
 */
const decrementNumberProjectFollows = async ( tableName, project ) => {
  if ( !tableName )
    throw new Error( `Must give the name of the DynamoDB table` )
  try {
    const response = await dynamoDB.updateItem( {
      TableName: tableName,
      Key: project.key(),
      ConditionExpression: `attribute_exists(PK)`,
      UpdateExpression: `SET #count = #count - :dec`,
      ExpressionAttributeNames: { '#count': `NumberFollows` },
      ExpressionAttributeValues: { ':dec': { 'N': `1` } },
      ReturnValues: `ALL_NEW`
    } ).promise()
    if ( !response.Attributes )
      return { 'projectError': `Could not find project` }
    // project.numberFollows = response.
    // Send the original back to ensure the correct keys are set.
    return { 'projectResponse': project }
  } catch( error ) {
    let errorMessage = `Could not follow project`
    if ( error.code === `ConditionalCheckFailedException` )
      errorMessage = `Project does not exist`
    return { 'projectError': errorMessage }
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

module.exports = { removeFollowFromProject }