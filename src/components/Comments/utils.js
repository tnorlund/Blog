import { API } from 'aws-amplify'

/**
 * Gets a post through the API.
 * @param {String} slug  The slug of the post.
 * @param {String} title The title of the post.
 */
export const getPost = async ( slug, title ) => {
  try {
    const { post, error } = await API.get(
      `blogAPI`,
      `/post?slug=${ slug }&title=${ title }`
    )
    if ( error ) return { error: error }
    else return { post: post }
  } catch( error ) {
    return { error: error }
  }
}

export const getPostDetails = async ( slug, title, setWarning, setError ) => {
  try {
    const { error, post, comments } = await API.get(
      `blogAPI`,
      `/post-details?slug=${ slug }&title=${ title }`
    )
    if ( error ) setError( error )
    else return { post, comments }
  } catch( error ) { setError( error ) }
}

/**
 * Adds a post through an API call.
 * @param {String} slug         The slug of the post.
 * @param {String} title        The title of the post.
 * @param {Function} setWarning The function used to set whether the post was
 *                              retrieved successfully from the database.
 * @param {Function} setError   The function used to set the error while
 *                              retrieving data from the database.
 */
export const addPost = async ( slug, title, setWarning, setError ) => {
  try {
    const { error } = await API.post(
      `blogAPI`,
      `/post`,
      { body: { slug: slug, title: title } }
    )
    if ( error ) setError( error )
    else {
      setWarning( false )
      setError()
    }
  } catch( error ) {
    setError( error )
  }
}

/**
 * Adds a comment to a post.
 * @param {String} name          The name of the user.
 * @param {String} email         The email of the user.
 * @param {Number} userNumber    The user's number.
 * @param {String} slug          The slug of the post.
 * @param {String} title         The title of the post.
 * @param {String} text          The text of the comment.
 * @param {Function} setWarning  The function used to set whether the post was
 *                               retrieved successfully from the database.
 * @param {Function} setError    The function used to set the error while
 *                               retrieving data from the database.
 * @param {Function} setCommment The function used to set the text of the 
 *                               comment.
 */
export const addComment = async (
  name, email, userNumber, slug, title, text, setWarning, setError, setComment
) => {
  try {
    const { error } = await API.post(
      `blogAPI`,
      `/comment`,
      { body: { name, email, userNumber, slug, title, text } }
    )
    if ( error ) setError( error )
    else {
      setComment( `` )
      setWarning( false )
      setError()
    }
  } catch( error ) {
    setError( error )
  }
}