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
 * Gets the current Cognito User Session and parses the data.
 *
 * @returns Undefined if no user is logged in or a modified session Object if
 *          someone is logged in.
 */
export const getCurrentSession = async () => {
  try {
    const session = await Auth.currentSession()
    console.log( `session`, session )
    return {
      name: session.idToken.payload.name,
      email: session.idToken.payload.email,
      userNumber: session.idToken.payload[ `custom:UserNumber` ],
      groups: session.idToken.payload[ `cognito:groups` ],
      // eslint-disable-next-line max-len
      isAdmin: session.idToken.payload[ `cognito:groups` ].indexOf( `Admin` ) >= 0,
      session: session
    }
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
 * Sets the user data in session storage.
 * @param {Function} setUser The function that sets the user details in the
 *                           session storage.
 */
export const updateUser = async ( setUser ) => {
  const {
    name, email, userNumber, isAdmin
  } = await getCurrentSession()
  try {
    const { user, tos, comments, follows, error } = await API.get(
      `blogAPI`,
      `/user-details?name=${ name }&email=${ email }&number=${ userNumber }`
    )
    if ( error ) console.error( error )
    setUser( {
      ...user, tos, comments, follows,
      isAdmin
    } )
  } catch( error ) { console.error( error ) }
}

/**
 * Updates the session storage with CognitoUser object.
 *
 * TODO
 * [ ] Add comments of the user.
 * [ ] Handle errors
 *
 * @param {Object} session   The CognitoUser returned from logging in.
 * @param {Function} setUser The function used to set the session storage
 *                           with the users details.
 */
export const updateUserBySession = async ( session, setUser ) => {
  // Get the required user detail to retrieve the user from the database.
  const { name, email } = session.attributes
  const userGroups = session.signInUserSession.idToken
    .payload[`cognito:groups`]
  try {
    const { user, tos, comments, follows, error } = await API.get(
      `blogAPI`,
      `/user-details?name=${ name }&email=${ email }&number=${
        session.attributes[`custom:UserNumber`]
      }`
    )
    if ( error ) console.error( error )
    // Reassemble the user.
    const requestedUser = {
      ...user, tos, comments, follows,
      isAdmin: userGroups.indexOf( `Admin` ) >= 0
    }
    setUser( requestedUser )
  } catch( error ) { console.error( error ) }
}