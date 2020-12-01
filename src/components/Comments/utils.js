import { API } from 'aws-amplify'

/**
 * Removes the contents of an editable div.
 * @param {String} id The HTML ID of the dive requested to remove the contents
 *                    of.
 */
export const resetTextInput = ( id ) => {
  document.getElementById( id ).innerHTML = ``
}

/**
 * Sets the contents of a div using a React Hook.
 * @param {String}   id     The HTML ID of the div requested to query from.
 */
export const getTextInput = ( id ) => document.getElementById( id ).innerHTML
  .replace( /<div>/g, `\n` )
  .replace( /<\/div>/g, `` )
  .replace( /<br>/g, `` )
  .replace( /&nbsp;/g, `` )
  .replace( /<b>/g, `` )
  .replace( /<\/b>/g, `` )

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
  } catch( error ) { return { error: error } }
}

/**
 * Gets the post and its comments through the API.
 * @param {String} slug         The slug of the post.
 * @param {String} title        The title of the post.
 * @param {Function} setWarning The function used to set whether the post was
 *                              retrieved successfully from the database.
 * @param {Function} setError   The function used to set the error while
 *                              retrieving data from the database.
 */
export const getPostDetails = async ( slug, title, setWarning, setError ) => {
  try {
    const { error, post, comments } = await API.get(
      `blogAPI`,
      `/post-details?slug=${ slug }&title=${ title }`
    )
    if ( error ) { setError( error ); return { error: error } }
    else return { post, comments }
  } catch( error ) { setError( `Couldn't get post details` ) }
}

/**
 * Adds a post through an API call.
 * @param {String}   slug       The slug of the post.
 * @param {String}   title      The title of the post.
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
    else { setWarning( false ); setError() }
  } catch( error ) { setError( error ) }
}

/**
 * Deletes the post through an API call.
 * @param {String}   slug       The slug of the post.
 * @param {String}   title      The title of the post.
 * @param {Function} setWarning The function used to set whether the post was
 *                              retrieved successfully from the database.
 * @param {Function} setError   The function used to set the error while
 *                              retrieving data from the database.
 */
export const deletePost = async ( slug, title, setWarning, setError ) => {
  try {
    const { error } = await API.del(
      `blogAPI`, `/post`,
      { body: { slug, title } } )
    if ( error ) setError( error )
    else setError()
  } catch( error ) { setError( error ) }
}

/**
 * Adds a post through an API call.
 * @param {String}   name       The name of the user.
 * @param {String}   email      The email of the user.
 * @param {Number}   userNumber The user's number.
 * @param {String}   slug       The slug of the post.
 * @param {String}   title      The title of the post.
 * @param {String}   dateAdded  The date the comment was added.
 * @param {Function} setWarning The function used to set whether the post was
 *                              retrieved successfully from the database.
 * @param {Function} setError   The function used to set the error while
 *                              retrieving data from the database.
 */
export const deleteComment = async (
  name, email, userNumber, slug, title, dateAdded, setError, setWarning
) => {
  try {
    const { error } = await API.del(
      `blogAPI`, `/comment`,
      { body: { name, email, userNumber, slug, title, dateAdded } } )
    if ( error ) setError( error )
    else { setWarning( false ); setError() }
  } catch( error ) { setError( error ) }
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
    else { setComment( `` ); setWarning( false ); setError() }
  } catch( error ) { setError( error ) }
}

/**
 * Adds a reply to a comment.
 * @param {String}   name        The name of the user.
 * @param {String}   email       The email of the user.
 * @param {Number}   userNumber  The user's number.
 * @param {String}   slug        The slug of the post.
 * @param {String}   title       The title of the post.
 * @param {String}   text        The text of the comment.
 * @param {[String]} replyChain  A list of the comment's dates the reply is
 *                               being added to.
 * @param {Function} setWarning  The function used to set whether the post was
 *                               retrieved successfully from the database.
 * @param {Function} setError    The function used to set the error while
 *                               retrieving data from the database.
 * @param {Function} setCommment The function used to set the text of the
 *                               comment.
 */
export const replyToComment = async (
  name, email, userNumber, slug, title, text, replyChain, setWarning, setError,
) => {
  try {
    const { error } = await API.post(
      `blogAPI`,
      `/reply`,
      { body: { name, email, userNumber, slug, title, text, replyChain } }
    )
    if ( error ) setError( error )
    else { setWarning( false ); setError() }
  } catch( error ) {
    setError( `Network error` )
  }

}

/**
 * Adds an up-vote to a comment.
 * @param {String}   name        The name of the user.
 * @param {String}   email       The email of the user.
 * @param {Number}   userNumber  The user's number.
 * @param {String}   slug        The slug of the post.
 * @param {Number}   replyChain The comment's date-time that is being up-voted.
 * @param {String}   dateAdded   The date-time the comment was created.
 * @param {Function} setError    The function used to set the error while
 *                               retrieving data from the database.
 * @param {Function} setWarning  The function used to set whether the post
 *                               was retrieved successfully from the database.
 */
export const addUpVote = async (
  name, email, userNumber, slug, replyChain, setError, setWarning
) => {
  try {
    const { error } = await API.post(
      `blogAPI`, `/vote`,
      { body: {
        name, email, userNumber, slug, replyChain, up: true
      } }
    )
    if ( error ) setError( error )
    else { setWarning( false ); setError() }
  } catch( error ) { setError( error ) }
}

/**
 * Adds a down-vote to a comment.
 * @param {String}   name        The name of the user.
 * @param {String}   email       The email of the user.
 * @param {Number}   userNumber  The user's number.
 * @param {String}   slug        The slug of the post.
 * @param {Number}   replyChain The comment number that is being down-voted.
 * @param {String}   dateAdded   The date-time the comment was added.
 * @param {Function} setError    The function used to set the error while
 *                               retrieving data from the database.
 * @param {Function} setWarning  The function used to set whether the post
 *                               was retrieved successfully from the database.
 */
export const addDownVote = async (
  name, email, userNumber, slug, replyChain, setError, setWarning
) => {
  try {
    const { error } = await API.post(
      `blogAPI`, `/vote`,
      { body: {
        name, email, userNumber, slug, replyChain, up: false
      } }
    )
    if ( error ) setError( error )
    else { setWarning( false ); setError() }
  } catch( error ) { setError( error ) }
}

/**
 * Removes a vote from a comment.
 * @param {String}   name             The name of the user.
 * @param {String}   email            The email of the user.
 * @param {Number}   userNumber       The user's number.
 * @param {String}   slug             The slug of the post.
 * @param {Number}   commentNumber    The comment number that is being removed.
 * @param {Boolean}  up               Whether the vote is an up-vote or a
 *                                    down-vote.
 * @param {String}   commentDateAdded The date-time the comment was added.
 * @param {String}   voteDateAdded    The date-time the vote was added.
 * @param {Function} setError         The function used to set the error while
 *                                    retrieving data from the database.
 * @param {Function} setWarning       The function used to set whether the post
 *                                    was retrieved successfully from the
 *                                    database.
 */
export const removeVote = async (
  name, email, userNumber, slug, commentNumber, up, commentDateAdded,
  voteDateAdded, setError, setWarning
) => {
  try {
    const { error } = await API.del(
      `blogAPI`, `/vote`,
      { body: {
        name, email, userNumber, slug, commentNumber, up, commentDateAdded,
        voteDateAdded
      } } )
    if ( error ) setError( error )
    else { setWarning( false ); setError() }
  } catch( error ) { setError( error ) }
}