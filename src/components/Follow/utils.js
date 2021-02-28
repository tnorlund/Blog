import { updateUser  } from 'utils/auth'
import { API } from 'aws-amplify'

/**
 * Removes a project and its followers using the API.
 * @param {String} slug          The slug of the project.
 * @param {String} title         The title of the project.
 * @param {Number} numberFollows The new number of followers of the project.
 * @param {Function} setError    The function used to set an error if there is
 *                               any while retrieving data from the database.
 * @param {Function} setWarning  The function used to set whether the project
 *                               was retrieved successfully from the database.
 * @param {Function} setUser     The function used to set the user details in
 *                               session storage.
 */
export const updateProject = async(
  slug, title, numberFollows, setError, setWarning, setUser
) => {
  try {
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/project-update`,
      { body: {
        title: title, slug: slug, numberFollows: String( numberFollows )
      } }
    )
    if ( error ) setError( error )
    await updateUser( setUser )
  } catch( error ) { setError( error ) }
}

/**
 * Removes a project and its followers using the API.
 * @param {String} slug              The slug of the project.
 * @param {String} title             The title of the project.
 * @param {Function} setError        The function used to set an error if there
 *                                   is any while retrieving data from the
 *                                   database.
 * @param {Function} setWarning      The function used to set whether the
 *                                   project was retrieved successfully from
 *                                   the database.
 * @param {Function} setUser         The function used to set the user details
 *                                   in session storage.
 * @param {Function} setWorking      The function used to set whether an API
 *                                   call is being made.
 * @param {Function} setFollowNumber The function used to set the number of
 *                                   followers of the project.
 */
export const removeProject = async(
  slug, title, setError, setWarning, setUser, setWorking, setFollowNumber
) => {
  try {
    setFollowNumber( 0 )
    const result = await API.del(
      process.env.GATSBY_API_BLOG_NAME,
      `/project`,
      {
        response: true,
        body: { title, slug }
      }
    )
    // if ( error ) setError( error )
    // else setWarning( true )
    console.log( { result } )
    await updateUser( setUser )
  } catch( error ) {
    console.warn( { error } )
    setError( `Could not remove project` )
  }
  setWorking( false )
}
/**
 * Gets the project and its followers using the API.
 * @param {String}   slug     The slug of the project.
 * @param {String}   title    The title of the project.
 * @param {Function} setError The function used to set an error if there is
 *                            any while retrieving data from the database.
 */
export const getProjectDetails = async( slug, title, setError ) => {
  try {
    const result = await API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/project-details`,
      {
        response: true,
        queryStringParameters: {
          slug, title
        }
      }
    )
    return result.data
  } catch( error ) {
    if ( error.response.data == `Project does not exist` )
      return { error: error.response.data }
    setError( `Could not get project details` )
  }
}

/**
 * Gets the project through the API.
 * @param {String} slug  The slug of the project.
 * @param {String} title The title of the project.
 */
export const getProject = async ( slug, title, setError ) => {
  try {
    const result = await API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/project`,
      {
        response: true,
        queryStringParameters: { slug, title }
      }
    )
    return result.data
  } catch( error ) {
    if ( error.response.data == `Project does not exist` ) {
      return { error: error.response.data }
    }
    else setError( `Could not get project` )
  }
}

/**
 * Adds the user as a follower to the project.
 * @param {Object}   requestedUser   The user requested to follow the project.
 * @param {String}   slug            The slug of the project.
 * @param {String}   title           The title of the project.
 * @param {Function} setUser         The function used to set the user details
 *                                   in session storage.
 * @param {Function} setError        The function used to set an error if there
 *                                   is any while retrieving data from the
 *                                   database.
 * @param {Function} setFollowNumber The function used to set the number of
 *                                   users that follow the project.
 * @param {Number}   followNumber    The number of users that follow the
 *                                   project.
 * @param {Function} setFollowing    The function that sets whether the user is
 *                                   following the project or not.
 * @param {Function} setWorking      The function used to set whether an API
 *                                   call is being made.
 */
export const addFollow = async (
  requestedUser, slug, title, setUser, setError, setFollowNumber, followNumber,
  setFollowing, setWorking
) => {
  try {
    setFollowNumber( ++followNumber )
    setFollowing( true )
    const result = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/project-follow`,
      {
        response: true,
        body: {
          slug,
          title,
          name: requestedUser.name,
          email: requestedUser.email,
          username: requestedUser.username
        }
      }
    )
    console.log( result )
    // if ( error ) setError( error )
    await updateUser( setUser )
  } catch( error ) {
    console.log( `addFollow` )
    console.log( error )
    setFollowNumber( --followNumber )
    setFollowing( false )
    setError( `Could not add follow` )
  }
  setWorking( false )
}

/**
 * Removes the user's follow from the project.
 * @param {Object}   requestedUser   The user requested to leave the project.
 * @param {String}   slug            The slug of the project.
 * @param {String}   title           The title of the project.
 * @param {Function} setUser         The function used to set the user details
 *                                   in session storage.
 * @param {Function} setError        The function used to set an error if there
 *                                   is any while retrieving data from the
 *                                   database.
 * @param {Function} setFollowNumber The function used to set the number of
 *                                   users that follow the project.
 * @param {Number}   followNumber    The number of users that follow the
 *                                   project.
 * @param {Function} setFollowing    The function that sets whether the user is
 *                                   following the project or not.
 * @param {Function} setWorking      The function used to set whether an API
 *                                   call is being made.
 */
export const removeFollow = async (
  requestedUser, slug, title, setUser, setError, setFollowNumber, followNumber,
  setFollowing, setWorking
) => {
  try {
    setFollowing( false )
    setFollowNumber( --followNumber )
    const result = await API.del(
      process.env.GATSBY_API_BLOG_NAME,
      `/project-follow`,
      {
        response: true,
        body: {
          slug: slug,
          title: title,
          name: requestedUser.name,
          email: requestedUser.email,
          username: requestedUser.username
        }
      }
    )
    // if ( error ) setError( error )
    await updateUser( setUser )
  } catch( error ) {
    console.log( error )
    setFollowing( true )
    setFollowNumber( ++followNumber )
    setError( error )
  }
  setWorking( false )
}

/**
 * Adds a project through the API.
 * @param {String}   slug       The slug of the project.
 * @param {String}   title      The title of the project.
 * @param {Function} setWarning The function used to set whether the project
 *                              was retrieved successfully from the database.
 * @param {Function} setError   The function used to set an error if there is
 *                              any while retrieving data from the database.
 * @param {Function} setWorking The function used to set whether an API call is
 *                              being made.
 */
export const addProject = async (
  slug, title, setWarning, setError, setWorking
) => {
  setWorking( true )
  try {
    const result = await API.post(
      process.env.GATSBY_API_BLOG_NAME,
      `/project`,
      {
        response: true,
        body: { slug, title }
      }
    )
    console.log( { result } )
  } catch( error ) {
    console.log( { error } )
  }
  // const { error } = await API.post(
  //   process.env.GATSBY_API_BLOG_NAME, `/project`,
  //   { body: { slug: slug, title: title } }
  // )
  // if ( error ) setError( error )
  // else {
  //   setWarning( false )
  //   setError()
  // }
  // setWorking( false )
}

/**
 * Adds a string to the user's clipboard.
 * @param {String} str The string added to the clipboard.
 */
export const copyStringToClipboard = ( str ) => {
  let element = document.createElement( `textarea` )
  element.value = str
  element.setAttribute( `readonly`, `` )
  element.style = { position: `absolute`, left: `-9999px` }
  document.body.appendChild( element )
  element.select()
  document.execCommand( `copy` )
  document.body.removeChild( element )
}