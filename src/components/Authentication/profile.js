import React from 'react'
import { Title, TextDiv, TextInput, ButtonDiv, BodyDiv } from './styles'
import { Auth } from 'aws-amplify'

// A function for signing out
const signOut = async() => {
  Auth.signOut()
    .then( () => {
      window.location.reload()
    } )
}

export default function Profile( user ) {
  const { name, email } = user.user.idToken.payload
  // A function for signing out
  const signOut = async() => {
    Auth.signOut()
  }
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