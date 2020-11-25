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
    return { session: {
      name: session.idToken.payload.name,
      email: session.idToken.payload.email,
      userNumber: session.idToken.payload[ `custom:UserNumber` ],
      groups: session.idToken.payload[ `cognito:groups` ],
      // eslint-disable-next-line max-len
      isAdmin: session.idToken.payload[ `cognito:groups` ].indexOf( `Admin` ) >= 0,
      session: session
    } }
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
  console.log( `updateUserBySession` )
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



/**
 * Requests the user using the API.
 * @param {Object} requestedUser The parsed user data.
 * @returns {{dbError: String, user: String}} Either the error or the user from
 *   the database.
 */

 /**
  * Gets the user data using the API.
  * @param {*} requestedUser 
  */
// export const updateUser = async( requestedUser ) => {
//   // Check to see if the require parameters are given.
//   if ( !requestedUser.name ) return { dbError: `No name given` }
//   if ( !requestedUser.email ) return { dbError: `No email given` }
//   if ( !requestedUser.userNumber ) return { dbError: `No number given` }
//   // Destructure the requested user.
//   const { name, email, userNumber } = requestedUser
//   try {
//     const { user, error } = await API.get(
//       `blogAPI`,
//       `/user-details?name=${ name }&email=${ email }&number=${ userNumber }`
//     )
//     if ( error ) return { dbError: error }
//     if ( user.length < 1 ) return { user: undefined }
//     else {
//       const userDetails = new User( { ...( user.shift() ), ...requestedUser } )
//       user.map( element => {
//         if ( element.userNumber && element.version )
//           userDetails.addTOS( element )
//         if ( element.slug && element.title )
//           userDetails.addFollow( element )
//       } )
//       return { user: userDetails }
//     }
//   } catch( error ) { return { dbError: error } }
// }

/**
 * Converts an ISO formatted date into a Date object.
 * @param {String} dateString An ISO formatted date.
 * @returns A Date object.
 */
const parseDate = ( dateString ) => {
  const parsed = dateString.split( /\D+/ )
  return( new Date( Date.UTC(
    parsed[0], --parsed[1], parsed[2], parsed[3], parsed[4], parsed[5],
    parsed[6]
  ) ) )
}

export class Follow {
  constructor( { slug, title } ) {
    if ( typeof slug === undefined )
      throw Error( `Must give the slug of the project.` )
    this.slug = slug
    if ( typeof title === undefined )
      throw Error( `Must give the title of the project.` )
    this.title = title
  }
}

export class TOS {
  constructor( { dateAccepted, tosNumber, userNumber, version } ) {
    if ( typeof dateAccepted === undefined )
      throw Error( `Must give the date the Terms of Service was accepted.` )
    this.dateAccepted = parseDate( dateAccepted )
    if ( typeof tosNumber === undefined )
      throw Error( `Must give the number of Terms of Services agreed to.` )
    this.tosNumber = parseInt( tosNumber )
    if ( typeof userNumber === undefined )
      throw Error( `Must give the user's number.` )
    this.userNumber = parseInt( userNumber )
    if ( typeof version === undefined )
      throw Error( `Must give the Terms of Service's version.` )
    this.version = parseDate( version )
  }
}

export class User {
  constructor( {
    name, email, userNumber, numberFollows, numberTOS, dateJoined, groups,
    isAdmin
  } ) {
    if ( typeof name === undefined ) throw Error( `Must give user's name` )
    this.name = name
    if ( typeof email === undefined ) throw Error( `Must give user's email` )
    this.email = email
    if ( typeof userNumber === undefined )
      throw Error( `Must give user's userNumber` )
    this.userNumber = parseInt( userNumber )
    if ( typeof numberFollows === undefined )
      throw Error( `Must give user's numberFollows` )
    this.numberFollows = parseInt( numberFollows )
    if ( typeof NumberTOS === undefined )
      throw Error( `Must give user's NumberTOS` )
    this.tosNumber = parseInt( numberTOS )
    if ( typeof dateJoined === undefined )
      throw Error( `Must give user's dateJoined` )
    this.dateJoined = parseDate( dateJoined )
    if ( typeof groups === undefined )
      throw Error( `Must give user's groups` )
    this.groups = groups
    if ( typeof isAdmin === undefined )
      throw Error( `Must give whether user is Admin` )
    this.isAdmin = isAdmin
    this.terms = []
    this.follows = []
  }
  addTOS( details ) {
    this.terms.push( new TOS( { ...details } ) )
  }
  addFollow( details ) {
    this.follows.push( new Follow( { ...details } ) )
  }
}

// export class Comment {
//   constructor( { dateAdded, slug, postCommentNumber, numberVotes} )
// }
