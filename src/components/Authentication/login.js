import React, { useState } from 'react'
import { Title, TextDiv, TextInput, ButtonDiv, Error } from './styles'
import { Auth } from 'aws-amplify'
import { setUser } from '../../utils/auth'

export default function Login() {
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
        .then( ( result ) => {
          const userInfo = {
            ...result.attributes, username: result.username
          }
          // Use the util to store the user credentials in the session
          setUser( userInfo )
          // Reload the page
          window.location.reload()
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
      <ButtonDiv onClick={ () => login() }>Login</ButtonDiv>
    </>
  )
}