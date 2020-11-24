import React, { useState } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { updateUserBySession } from 'utils/auth'
import { Title, TextDiv, TextInput, ButtonDiv, Error, Link } from './styles'
import { Auth } from 'aws-amplify'

/**
 * Handles the state of the modal view while logging in.
 * @param {String}   email    The user's email.
 * @param {String}   password The user's password.
 * @param {Function} setUser  The function used to set the user's detail into
 *                            session storage.
 */
const handleLoggingIn = async ( email, password, setUser ) => {
  console.log( `setUser`, setUser )
  try {
    const session = await Auth.signIn( email, password )
    await updateUserBySession( session, setUser )
  } catch ( error ) {
    if ( error.code == `UserNotConfirmedException` )
      // eslint-disable-next-line no-console
      console.log( `TODO ask user for another email.` )
    else console.log( `login error`, error )
  }

}

export default function Login( { setWorking } ) {
  // Sets the state for the login form.
  const [ loginState, setLoginState ] = useState( {
    email: ``, password: ``, error: ``
  } )
  // Gets the user data from session storage.
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )

  // A login function that logs the user in
  const login = async() => {
    const { email, password } = loginState
    // First, check to see if the passwords match.
    if ( password == `` ) { setLoginState( {
      ...loginState, error: `Must give password`
    } ) } else {
      setWorking( true )
      handleLoggingIn( email, password, setUser )
        .then( () => {
          setWorking( false )
        } )
    }
  }
  return(
    <>
      <Title>Login</Title>
      <TextDiv>
        <TextInput
          placeholder='email' name='email' value={ loginState.email }
          onChange={ event => { setLoginState(
            { ...loginState, email: event.target.value, error: `` }
          ) } }
        />
      </TextDiv>
      <TextDiv>
        <TextInput
          type='password'
          placeholder='password'
          name='password'
          value={loginState.password}
          onChange={ event => { setLoginState(
            { ...loginState, password: event.target.value, error: `` }
          ) } }
        />
      </TextDiv>
      {loginState.error && <Error>{loginState.error}</Error>}
      {/* <Link onClick={() => setAuthState( `signup` )}
      >Don&apos;t have an account?</Link>
      <Link onClick={() => setAuthState( `forgot` )}
      >Forgot Password?</Link> */}
      <ButtonDiv onClick={ () => login() }>Login</ButtonDiv>
    </>
  )
}