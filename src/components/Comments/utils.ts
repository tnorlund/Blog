import Amplify, { API } from 'aws-amplify'
import { timeSince } from '../../utils/date'

interface User {
  name: string,
  username: string,
  email: string
  isAdmin: boolean
}

/**
 * Removes the contents of an editable div.
 * @param {string} id The HTML ID of the dive requested to remove the contents
 *                    of.
 */
export const resetTextInput = ( id: string ) => {
  const textDiv = document.getElementById( id )
  if ( textDiv ) textDiv.innerHTML = ``
}

/**
 * Sets the contents of a div using a React Hook.
 * @param {string} id The HTML ID of the div requested to query from.
 */
export const getTextInput = ( id:string ) => {
  const textDiv = document.getElementById( id )
  if ( textDiv ) return textDiv.innerHTML
  return undefined
}

/**
 * Gets a post through the API.
 * @param {string} slug  The slug of the post.
 * @param {string} title The title of the post.
 */
export const getPost = async ( slug: string, title: string ) => {
  try {
    const { post, error } = await API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/post?slug=${ slug }&title=${ title }`,
      {}
    )
    if ( error ) return { error: error }
    else return { post: post }
  } catch( error ) { return { error: error } }
}

/**
 * Gets the post and its comments through the API.
 * @param {string} slug         The slug of the post.
 * @param {string} title        The title of the post.
 * @param {Function} setWarning The function used to set whether the post was
 *                              retrieved successfully from the database.
 * @param {Function} setError   The function used to set the error while
 *                              retrieving data from the database.
 */
export const getPostDetails = async ( slug: string, title: string, setWarning: Function, setError: Function ) => {
  Amplify.register( API )
  try {
    const { error, post, comments } = await API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/post-details?slug=${ slug }&title=${ title }`,
      {}
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
export const addPost = async ( slug: string, title: string, setWarning: Function, setError: Function ) => {
  try {
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME,
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
export const deletePost = async ( slug: string, title: string, setWarning: Function, setError: Function ) => {
  try {
    const { error } = await API.del(
      process.env.GATSBY_API_BLOG_NAME, `/post`,
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
  name: string, email: string, userNumber: number, slug: string, title: string, replyChain: [string], setError: Function, setWarning: Function
) => {
  try {
    const { error } = await API.del(
      process.env.GATSBY_API_BLOG_NAME, `/comment`,
      { body: { name, email, userNumber, slug, title, replyChain } } )
    if ( error ) setError( error )
    else { setWarning( false ); setError() }
  } catch( error ) { setError( String( error ) ) }
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
 * @param {Function} setComment  The function used to set the text of the
 *                               comment.
 */
export const addComment = async (
  name: string, email: string, userNumber: number, slug: string, title: string, text: string, setWarning: Function, setError: Function, setComment: Function
) => {
  if ( text != `` ) {
    try {
      const { error } = await API.post(
        process.env.GATSBY_API_BLOG_NAME,
        `/comment`,
        { body: { name, email, userNumber, slug, title, text } }
      )
      if ( error ) setError( error )
      else { setComment( `` ); setWarning( false ); setError() }
    } catch( error ) { setError( error ) }
  }
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
  name: string, email: string, userNumber: number, slug: string, title: string, text: string, replyChain: [string], setWarning: Function, setError: Function,
) => {
  try {
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME,
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
  name: string, email: string, userNumber: number, commentUserNumber: number, slug: string, replyChain: number, setError: Function,
  setWarning: Function
) => {
  try {
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/vote`,
      { body: {
        name, email, userNumber, slug, commentUserNumber, replyChain, up: true
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
  name: string, email: string, userNumber: number, commentUserNumber: number, slug: string, replyChain: number, setError: Function,
  setWarning: Function
) => {
  try {
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/vote`,
      { body: {
        name, email, userNumber, slug, commentUserNumber, replyChain, up: false
      } }
    )
    if ( error ) setError( error )
    else { setWarning( false ); setError() }
  } catch( error ) { setError( error ) }
}

/**
 * Removes a vote from a comment.
 * @param {String}   name              The name of the user.
 * @param {String}   email             The email of the user.
 * @param {Number}   userNumber        The user's number.
 * @param {String}   slug              The slug of the post.
 * @param {Number}   commentUserNumber The comment number that is being removed.
 * @param {Boolean}  up                Whether the vote is an up-vote or a
 *                                     down-vote.
 * @param {String}   commentDateAdded  The date-time the comment was added.
 * @param {String}   voteDateAdded     The date-time the vote was added.
 * @param {Function} setError          The function used to set the error while
 *                                     retrieving data from the database.
 * @param {Function} setWarning        The function used to set whether the post
 *                                     was retrieved successfully from the
 *                                     database.
 */
export const removeVote = async (
  name: string, email: string, userNumber: number, slug: string, 
  commentNumber: number, up: boolean, commentDateAdded: string,
  voteDateAdded: string, setError: Function, setWarning: Function
) => {
  try {
    const { error } = await API.del(
      process.env.GATSBY_API_BLOG_NAME, `/vote`,
      { body: {
        name, email, userNumber, slug, commentNumber, up, commentDateAdded,
        voteDateAdded
      } } )
    if ( error ) setError( error )
    else { setWarning( false ); setError() }
  } catch( error ) { setError( error ) }
}

/**
 * Dynamically gets the user's details.
 * @param {String}   userNumber   The user's number.
 * @param {Function} setError     The function used to set the error while
 *                                retrieving data from the database.
 * @param {User}     currentUser  The current user that is signed in to the
 *                                session.
 * @param {Function} setCommenter The function used to set the attributes of
 *                                the commenter's modal view
 */
export const getUser = async (
  userNumber: string, setError: Function, currentUser: User, 
  setCommenter: Function
) => {
  try {
    const { user, error } = await API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/user?userNumber=${ userNumber }`,
      {}
    )
    if ( error ) setError( error )
    else {
      if ( currentUser ) {
        if ( currentUser.isAdmin ) {
          setCommenter( {
            name: user.name, email: user.email, userNumber: user.userNumber,
            dateString: timeSince( user.dateJoined ),
            isAdmin: true,
          } )
        } else
          setCommenter( {
            name: user.name, dateString: timeSince( user.dateJoined ),
            isAdmin: false
          } )
      } else
        setCommenter( {
          name: user.name, dateString: timeSince( user.dateJoined ),
          isAdmin: false
        } )
    }
  } catch( error ) {
    setError( error )
  }
}

/**
 * Changes the name of a user.
 * @param {String}   name       The old name of the user.
 * @param {String}   email      The email of the user.
 * @param {String}   userNumber The number of the user.
 * @param {String}   newName    The new name to change to.
 * @param {Function} setError   The function used to set the error while
 *                              accessing the database.
 */
export const handleNewName = async (
  name: string, email: string, userNumber: string, newName: string, setError: Function
) => {
  try {
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/user-name`,
      { body: { name, email, userNumber, newName } }
    )
    if ( error ) setError( error )
  } catch ( error ) {
    setError( error.message )
  }
}

/**
 * Disables and signs a specific user out.
 * @param {String}   userNumber The number of the user.
 * @param {Function} setError   The function used to set the error while
 *                              accessing the database.
 */
export const disableUser = async ( userNumber: string, setError: Function ) => {
  try {
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/disable-user`,
      { body: { userNumber } }
    )
    if ( error ) setError( error )
  } catch ( error ) { setError( error ) }
}