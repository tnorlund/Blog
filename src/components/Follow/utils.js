import { getCurrentSession, updateUser  } from 'utils/auth'
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
      `blogAPI`,
      `/project-update`,
      { body: {
        title: title, slug: slug, numberFollows: String( numberFollows )
      } }
    )
    if ( error ) setError( error )
    const { session, sessionError } = await getCurrentSession()
    if ( sessionError ) setError( sessionError )
    // const { user, dbError } = await updateUser( session )
    if ( dbError ) setError( dbError )
    // else setUser( user )
  } catch( error ) { 
    console.log(`error`, error )
    setError( error ) 
  }
}

/**
 * Removes a project and its followers using the API.
 * @param {String} slug         The slug of the project.
 * @param {String} title        The title of the project.
 * @param {Function} setError   The function used to set an error if there is
 *                              any while retrieving data from the database.
 * @param {Function} setWarning The function used to set whether the project
 *                              was retrieved successfully from the database.
 * @param {Function} setUser    The function used to set the user details in
 *                              session storage.
 */
export const removeProject = async(
  slug, title, setError, setWarning, setUser
) => {
  try {
    const { error } = await API.del(
      `blogAPI`,
      `/project`,
      { body: { title: title, slug: slug } }
    )
    if ( error ) setError( error )
    else setWarning( true )
    const { session, sessionError } = await getCurrentSession()
    if ( sessionError ) setError( sessionError )
    const { user, dbError } = await updateUser( session )
    if ( dbError ) setError( dbError )
    // else setUser( user )
  } catch( error ) { setError( error ) }
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
    const { project, error } = await API.get(
      `blogAPI`,
      `/project-details?slug=${ slug }&title=${ title }`
    )
    if ( error ) setError( error )
    else return( project )
  } catch( error ) { setError( error ) }
}

/**
* Removes the user's follow from the project.
* @param {Object}   requestedUser The user requested to leave the project.
* @param {String}   slug          The slug of the project.
* @param {String}   title         The title of the project.
* @param {Function} setUser       The function used to set the user details in
*                                 session storage.
*/
export const removeFollow = async (
  requestedUser, slug, title, setUser, setError
) => {
  try {
    // const { user, project, error }
    const { error } = await API.del(
      `blogAPI`,
      `/project-follow`,
      { body: {
        slug: slug,
        title: title,
        name: requestedUser.name,
        email: requestedUser.email,
        userNumber: requestedUser.userNumber
      } }
    )
    if ( error ) setError( error )
    const { session, sessionError } = await getCurrentSession()
    if ( sessionError ) setError( sessionError )
    // const { user, dbError } = await updateUser( session )
    if ( dbError ) setError( dbError )
    // setUser( user )
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
      `blogAPI`,
      `/project?slug=${ slug }&title=${ title }`
    )
    if ( error ) return { error: error }
    return { project: project }
  } catch( error ) { return { error: error } }
}

/**
 * Adds the user as a follower to the project.
 * @param {Object}   requestedUser The user requested to follow the project.
 * @param {String}   slug          The slug of the project.
 * @param {String}   title         The title of the project.
 * @param {Function} setUser       The function used to set the user details in
 *                                 session storage.
 * @param {Function} setError      The function used to set an error if there is
 *                                 any while retrieving data from the database.
 */
export const addFollow = async (
  requestedUser, slug, title, setUser, setError
) => {
  try {
    const { error } = await API.post(
      `blogAPI`,
      `/project-follow`,
      { body: {
        slug: slug,
        title: title,
        name: requestedUser.name,
        email: requestedUser.email,
        userNumber: requestedUser.userNumber
      } }
    )
    if ( error ) setError( error )
    const { session, sessionError } = await getCurrentSession()
    if ( sessionError ) setError( sessionError )
    // const { user, dbError } = await updateUser( session )
    if ( dbError ) setError( dbError )
    // setUser( user )
  } catch( error ) { setError( error ) }
}

/**
 * Adds a project through the API.
 * @param {String}   slug       The slug of the project.
 * @param {String}   title      The title of the project.
 * @param {Function} setWarning The function used to set whether the project
 *                              was retrieved successfully from the database.
 * @param {Function} setError   The function used to set an error if there is
 *                              any while retrieving data from the database.
 */
export const addProject = async ( slug, title, setWarning, setError ) => {
  const { error } = await API.post(
    `blogAPI`,
    `/project`,
    { body: { slug: slug, title: title } }
  )
  if ( error ) setError( error )
  else {
    setWarning( false )
    setError()
  }
}