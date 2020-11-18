import React, { useState } from 'react'
import { Title, TextDiv, TextInput, ButtonDiv, Error, Link } from './styles'
import { Auth } from 'aws-amplify'


export default function ForgotSubmit( { setAuthState } ) {
  // Sets the state for the forgot password form.
  const [ forgotState, setForgotState ] = useState( {
    email: ``, code:``, password:{ a:``, b:`` }, error: ``
  } )
  // A login function that signs the user up
  const forgot = async() => {
    if ( forgotState.password.a != forgotState.password.b ) setForgotState( {
      ...forgotState, error:`Passwords must match`
    } )
    else {
      Auth.forgotPasswordSubmit(
        forgotState.email, forgotState.code, forgotState.password.a
      )
        .then( () => setAuthState( `login` ) )
        .catch( error => {
          if ( error.name == `UserNotFoundException` )
            setForgotState( {
              ...forgotState, error: `Email not associated with an account.`
            } )
          else
            // eslint-disable-next-line no-console
            console.log( `error`, error )
        } )
    }
  }
  return(
    <>
      <Title>Forgot Password</Title>
      <TextDiv>
        <TextInput
          placeholder='email' name='email' value={ forgotState.email }
          onChange={ event => { setForgotState(
            { ...forgotState, email: event.target.value, error: `` }
          ) } }
        />
      </TextDiv>
      <TextDiv>
        <TextInput
          placeholder='code' name='code' value={ forgotState.code }
          onChange={ event => { setForgotState(
            { ...forgotState, code: event.target.value, error: `` }
          ) } }
        />
      </TextDiv>
      <TextDiv>
        <TextInput
          type='password'
          placeholder='password'
          name='password'
          value={forgotState.password.a}
          onChange={ event => setForgotState( {
            ...forgotState,
            password: { a: event.target.value, b: forgotState.password.b },
            error: ``
          } ) }
        />
      </TextDiv>
      <TextDiv>
        <TextInput
          type='password'
          placeholder='password'
          name='password'
          value={forgotState.password.b}
          onChange={ event => setForgotState( {
            ...forgotState,
            password: { a: forgotState.password.a, b: event.target.value },
            error: `` } ) }
        />
      </TextDiv>
      {forgotState.error && <Error>{forgotState.error}</Error>}
      <Link onClick={() => setAuthState( `login` )}
      >Already have an account?</Link>
      <ButtonDiv onClick={ () => forgot() }>Submit</ButtonDiv>
    </>
  )
}