import Amplify, { Auth, API } from 'aws-amplify'

/**
 * Configures the Amplify SDK.
 */
export const Configure = () => {
  Amplify.configure( {
    "aws_project_region": process.env.GATSBY_AWS_REGION,
    "aws_cloud_logic_custom": [
      {
        "name": process.env.GATSBY_API_ADMIN_NAME,
        "endpoint": process.env.GATSBY_API_ADMIN_ENDPOINT,
        "region": process.env.GATSBY_AWS_REGION
      },
      {
        "name": process.env.GATSBY_API_BLOG_NAME,
        "endpoint": process.env.GATSBY_API_BLOG_ENDPOINT,
        "region": process.env.GATSBY_AWS_REGION
      }
    ],
    "aws_cognito_identity_pool_id": process.env.GATSBY_COGNITO_IDENTITY_POOL_ID,
    "aws_cognito_region": process.env.GATSBY_AWS_REGION,
    "aws_user_pools_id": process.env.GATSBY_USER_POOLS_ID,
    "aws_user_pools_web_client_id": process.env.GATSBY_USER_POOLS_CLIENT_ID,
    "oauth": {},
    "aws_dynamodb_all_tables_region": process.env.GATSBY_AWS_REGION,
    "aws_dynamodb_table_schemas": [
      {
        "tableName": process.env.GATSBY_DYNAMO_TABLE,
        "region": process.env.GATSBY_AWS_REGION
      }
    ]
  } )
}

/**
 * Gets the current Cognito User Session if the user is logged in.
 */
export const getCurrentSession = async () => {
  try {
    const session = await Auth.currentSession()
    return { session: session }
  } catch ( error ) {
    if ( error === `No current user` )
      return { session: undefined }
    return { sessionError: error }
  }
}

/**
 * @typedef {Object} ParsedUser
 * @param {String} name The name of the user.
 * @param {String} email The email of the user.
 * @param {Number|String} userNumber The number of the user.
 */

/**
 * Gets the useful user data from the current Cognito user session.
 * @param {Object} CognitoUserSession The current cognito user session.
 * @returns {ParsedUser} The parsed user data.
 */
export function parseUser( CognitoUserSession ) {
  const { name, email, ...restOfUser } = CognitoUserSession.idToken.payload
  return {
    name: name, email: email, userNumber: restOfUser[`custom:UserNumber`]
  }
}

/**
 * Requests the user using the API.
 * @param {Object} requestedUser The parsed user data.
 * @returns {{dbError: String, user: String}} Either the error or the user from
 *   the database.
 */
export const userFromDB = async( requestedUser ) => {
  // Check to see if the require parameters are given.
  if ( !requestedUser.name ) return { dbError: `No name given` }
  if ( !requestedUser.email ) return { dbError: `No email given` }
  if ( !requestedUser.userNumber ) return { dbError: `No number given` }
  // Destructure the requested user.
  const { name, email, userNumber } = requestedUser
  try {
    const { user, error } = await API.get(
      `blogAPI`,
      `/user-details?name=${name}&email=${ email }&number=${ userNumber }`
    )
    if ( error ) return { dbError: error }
    else return { user: user }
  } catch( error ) { return { dbError: error } }
}
