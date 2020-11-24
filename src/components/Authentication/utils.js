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
      const result = await Auth.signUp( {
        username: email, password: password, attributes: {
          email: email, name: name,
          'custom:UserNumber': `${ blog.numberUsers + 1 }`
        }
      } )
      console.log( result )
    }
  } catch( error ) {
    setError( error.message )
  }
}

/**
 *
 * @param {String} email
 * @param {Function} setError
 */
export const handleForgotPassword = async ( email, setError ) => {
  try {
    return await Auth.forgotPassword( email )
  } catch ( error ) { setError( error.message ) }
}

/**
 *
 * @param {*} email
 * @param {*} password
 * @param {*} code
 * @param {*} setError
 */
export const handleCheckCode = async ( email, password, code, setError ) => {
  try {
    return await Auth.forgotPasswordSubmit( email, code, password )
  } catch ( error ) {
    setError( error.message )
  }
}

/**
 * 
 * @param {Function} setUser 
 * @param {Function} setError 
 */
export const handleLoggingOut = async ( setUser, setError ) => {
  try {
    await Auth.signOut()
    setUser( undefined )
  } catch ( error ) {
    console.log( error )
    setError( error.message )
  }
}