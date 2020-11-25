import { Auth, API } from 'aws-amplify'
import { updateUserBySession } from 'utils/auth'

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
    const { error, blog } = await API.get( `blogAPI`, `/blog` )
    if ( error ) setError( error )
    else {
      await Auth.signUp( {
        username: email, password: password, attributes: {
          email: email, name: name,
          'custom:UserNumber': `${ blog.numberUsers + 1 }`
        }
      } )
    }
  } catch( error ) { setError( error.message ) }
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
    setUser()
    setEmail( `` )
  } catch ( error ) { setError( error.message ) }
}