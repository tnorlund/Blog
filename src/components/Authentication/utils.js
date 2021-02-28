import { Auth, API } from 'aws-amplify'
import { updateUserBySession, updateUser } from 'utils/auth'
import { useSessionStorage } from 'hooks'
import { VISITOR_KEY } from 'utils/constants'

import { v4 as uuidv4 } from 'uuid'


/**
 * Handles the state of the modal view while logging in.
 * @param {String}   email      The user's email.
 * @param {String}   password   The user's password.
 * @param {Function} setUser    The function used to set the user's detail into
 *                              session storage.
 * @param {Function} setConfirm The function used to set whether to resend the
 *                              confirmation email.
 */
export const handleLoggingIn = async (
  email, password, setUser, setError, setConfirm
) => {
  try {
    const session = await Auth.signIn( email, password )
    console.log( session )
    await updateUserBySession( session, setUser )
  } catch ( error ) {
    if ( error.code == `UserNotConfirmedException` )
      setConfirm( true )
    setError( error.message )
  }
}

/**
 * Handles the state of the modal view when signing up.
 * @param {String}   email    The user's email.
 * @param {String}   password The user's password.
 * @param {String}   name     The user's name.
 * @param {Function} setError The function used to set the error if one occurs.
 */
export const handleSigningUp = async ( email, password, name, setError ) => {
  try {
    await Auth.signUp( {
      username: email, password: password,
      attributes: {
        email: email, name: name,
      }
    } )
  } catch( error ) {
    setError( error.message )
  }
}

export const resendConfrimationEmail = async (
  email, setError, setNewUser
) => {
  try {
    await Auth.resendSignUp( email )
    setError()
    setNewUser( false )
  } catch ( error ) {
    setError( error )
  }
}

/**
 * Sends a code to the user's email in order for them to verify their identity.
 * @param {String} email
 * @param {Function} setError
 */
export const handleForgotPassword = async ( email, setError ) => {
  try {
    return await Auth.forgotPassword( email )
  } catch ( error ) { setError( error.message ) }
}

/**
 * Resets the user's password after submitting the code emailed to them.
 * @param {String}   email       The user's email.
 * @param {String}   password    The user's new password.
 * @param {String}   code        The code emailed to the user.
 * @param {Function} setError    The function used to set the error if one
 *                               occurs.
 */
export const handleCheckCode = async ( email, password, code, setError ) => {
  try {
    return await Auth.forgotPasswordSubmit( email, code, password )
  } catch ( error ) {
    setError( error.message )
  }
}

/**
 * Logs the user out and removes the user data from the session storage.
 * @param {Function} setUser  The function used to set the user's detail into
 *                            session storage.
 * @param {Function} setError The function used to set the error if one occurs.
 * @param {Function} setEmail The function used to set the user's email.
 */
export const handleLoggingOut = async ( setUser, setError, setEmail ) => {
  try {
    await Auth.signOut()
    setUser( undefined )
    setEmail( `` )
  } catch ( error ) { setError( error.message ) }
}

/**
 * Requests a name change for the current user.
 * @param {String}   name           The current user's name.
 * @param {String}   email          The current user's email.
 * @param {Number}   userNumber     The current user's number.
 * @param {String}   newName        The new name requested by the user.
 * @param {Function} setUser        The function used to set the user's detail
 *                                  into session storage.
 * @param {Function} setError       The function used to set the error if one
 *                                  occurs.
 * @param {Function} setShowNewName The function used to show the text input of
 *                                  a new name for a user.
 */
export const handleNewName = async (
  name, email, userNumber, newName, setUser, setError, setShowNewName
) => {
  try {
    const { error } = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/user-name`,
      { body: { name, email, userNumber, newName } }
    )
    if ( error ) setError( error )
    else { setShowNewName( false ); setUser(); updateUser( setUser ) }
  } catch ( error ) {
    setError( error.message )
  }
}

/**
 * Adds a terms of service to the current user signed in.
 * @param {Object} user       The current user signed in.
 * @param {String} version    The version of the terms of service.
 * @param {Function} setError The function used to set the error if one occurs.
 * @param {Function} setUser  The function used to set the user's detail into
 *                            session storage.
 */
export const handleTOS = async ( user, version, setError, setUser ) => {
  console.log( { version } )
  try {
    // const { error } =
    const result = await API.post(
      process.env.GATSBY_API_BLOG_NAME, `/tos`,
      { body: {
        name: user.name, email: user.email, username: user.username,
        version: version
      } }
    )
    console.log( result )
    if ( result.error ) setError( result.error )
    else { setUser(); updateUser( setUser ) }
  } catch( error ) { setError( error.message ) }
}