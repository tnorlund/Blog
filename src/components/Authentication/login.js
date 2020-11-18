import React, { useState } from 'react'
import { Title, TextDiv, TextInput, ButtonDiv, Error, Link } from './styles'
import { Auth } from 'aws-amplify'

export default function Login( { setAuthState, setModal } ) {
  // Sets the state for the login form.
  const [ loginState, setLoginState ] = useState( {
    email: ``, password: ``, error: ``
  } )
  // A login function that logs the user in
  const login = async() => {
    const { email, password } = loginState
    // First, check to see if the passwords match.
    if ( password == `` ) { setLoginState( {
      ...loginState, error: `Must give password`
    } ) }
    // If the passwords match, proceed to set the credentials and get the user
    // attributes.
    else {
      Auth.signIn( email, password )
        .then( () => {
          // Once the credentials have been set, remove the modal view.
          setModal( false )
        } )
        .catch( error => {
          if ( error.code == `UserNotConfirmedException` ) setLoginState( {
            ...loginState, error: `Never confirmed email address`
          } )
          else setLoginState( { ...loginState, error: error.message } )
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
      <Link onClick={() => setAuthState( `signup` )}
      >Don&apos;t have an account?</Link>
      <Link onClick={() => setAuthState( `forgot` )}
      >Forgot Password?</Link>
      <ButtonDiv onClick={ () => login() }>Login</ButtonDiv>
    </>
  )
}