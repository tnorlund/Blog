import React, { useState } from 'react'
import { Title, TextDiv, TextInput, ButtonDiv, Error, Link } from './styles'
import Amplify, { Auth, API } from 'aws-amplify'
import credentials from '../../aws-exports'
// async function

export default function SignUp( { setAuthState } ) {
  // Sets the state for the signup form.
  const [ signUpState, setSignUpState ] = useState( {
    email: ``, name:``, password: { a:``, b:`` }, error: ``
  } )
  // A login function that signs the user up
  const signup = async() => {
    if ( signUpState.password.a != signUpState.password.b )
      setSignUpState( { ...signUpState, error: `Passwords must match` } )
    else {
      // Amplify.configure( credentials )
      const { statusCode, body } = await API.get( `blogAPI`, `/blog` )
      if ( statusCode != 200 )
        setSignUpState( { ...signUpState, error: `Couldn't get Blog data` } )
      else {
        // Cognito uses some custom attributes
        const attributes = {
          email: signUpState.email, name: signUpState.name,
          'custom:UserNumber': `${body.numberUsers + 1}`
        }
        Auth.signUp( {
          username: signUpState.email, password: signUpState.password.a,
          attributes: attributes
        } ).then( result => {
          if ( !result.userConfirmed ) setAuthState( `check` )
        } ).catch( error => {
          console.log( `error`, error )
          setSignUpState( { ...signUpState, error: error.message } )
        } )}
    }
  }
  return(
    <>
      <Title>Sign Up</Title>
      <TextDiv>
        <TextInput
          placeholder='email' name='email' value={ signUpState.email }
          onChange={ event => { setSignUpState(
            { ...signUpState, email: event.target.value, error: `` }
          ) } }
        />
      </TextDiv>
      <TextDiv>
        <TextInput
          placeholder='name' name='name' value={ signUpState.name }
          onChange={ event => { setSignUpState(
            { ...signUpState, name: event.target.value, error: `` }
          ) } }
        />
      </TextDiv>
      <TextDiv>
        <TextInput
          type='password'
          placeholder='password'
          name='password'
          value={signUpState.password.a}
          onChange={ event => setSignUpState( {
            ...signUpState,
            password: { a: event.target.value, b: signUpState.password.b },
            error: ``
          } ) }
        />
      </TextDiv>
      <TextDiv>
        <TextInput
          type='password'
          placeholder='password'
          name='password'
          value={signUpState.password.b}
          onChange={ event => setSignUpState( {
            ...signUpState,
            password: { a: signUpState.password.a, b: event.target.value },
            error: `` } ) }
        />
      </TextDiv>
      {signUpState.error && <Error>{signUpState.error}</Error>}
      <Link onClick={() => setAuthState( `login` )}
      >Already have an account?</Link>
      <ButtonDiv onClick={ () => signup() }>Sign Up</ButtonDiv>
    </>
  )
}