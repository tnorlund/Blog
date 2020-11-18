import React, { useState } from 'react'
import { Title, TextDiv, TextInput, ButtonDiv, Error, Link } from './styles'
import { Auth } from 'aws-amplify'


export default function Forgot( { setAuthState } ) {
  // Sets the state for the forgot password form.
  const [ forgotState, setForgotState ] = useState( {
    email: ``, error: ``
  } )
  // A login function that signs the user up
  const forgot = async() => {
    Auth.forgotPassword( forgotState.email )
      .then( () => setAuthState( `forgotSubmit` ) )
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
      {forgotState.error && <Error>{forgotState.error}</Error>}
      <Link onClick={() => setAuthState( `login` )}
      >Already have an account?</Link>
      <ButtonDiv onClick={ () => forgot() }>Submit</ButtonDiv>
    </>
  )
}