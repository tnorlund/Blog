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
    const { error } = await API.del(
      process.env.GATSBY_API_BLOG_NAME, `/project`,
      { body: { title: title, slug: slug } }
    )
    if ( error ) setError( error )
    else setWarning( true )
    await updateUser( setUser )
  } catch( error ) { setError( error ) }
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
    const { project, followers, error } = await API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/project-details?slug=${ slug }&title=${ title }`
    )
    if ( error ) setError( error )
    else return( { project, followers } )
  } catch( error ) { setError( error ) }
}

/**
 * Gets the project through the API.
 * @param {String} slug  The slug of the project.
 * @param {String} title The title of the project.
 */
export const getProject = async ( slug, title ) => {
  try {
    const { project, error } = await API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/project?slug=${ slug }&title=${ title }`
    )
    if ( error ) return { error: error }
    return { project: project }
  } catch( error ) { return { error: error } }
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
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/project-follow`,
      { body: {
        slug: slug,
        title: title,
        name: requestedUser.name,
        email: requestedUser.email,
        userNumber: requestedUser.userNumber
      } }
    )
    if ( error ) setError( error )
    await updateUser( setUser )
  } catch( error ) {
    setFollowNumber( --followNumber )
    setFollowing( false )
    setError( error )
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
    const { error } = await API.del(
      process.env.GATSBY_API_BLOG_NAME, `/project-follow`,
      { body: {
        slug: slug,
        title: title,
        name: requestedUser.name,
        email: requestedUser.email,
        userNumber: requestedUser.userNumber
      } }
    )
    if ( error ) setError( error )
    await updateUser( setUser )
  } catch( error ) {
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
  const { error } = await API.post(
    process.env.GATSBY_API_BLOG_NAME, `/project`,
    { body: { slug: slug, title: title } }
  )
  if ( error ) setError( error )
  else {
    setWarning( false )
    setError()
  }
  setWorking( false )
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