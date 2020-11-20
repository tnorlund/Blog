import React from 'react'
import { Title, ButtonDiv, BodyDiv } from './styles'
import { Auth } from 'aws-amplify'

export default function Profile( { user, setAuthState } ) {
  // A function for signing out
  const signOut = async() => {
    Auth.signOut()
      .then( () => setAuthState( `login` ) )
      .catch( error => {
        // eslint-disable-next-line no-console
        console.log( `errored signing out`, error )
      } )
  }
  const { name, email } = user
  return(
    <>
      <Title>Profile</Title>
      <BodyDiv>
        <p><b>Name: </b>{name}</p>
        <p><b>Email: </b>{email}</p>
      </BodyDiv>
      <ButtonDiv onClick={ () => signOut() }>Sign Out</ButtonDiv>
    </>
  )
}