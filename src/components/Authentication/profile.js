import React from 'react'
import { Title, ButtonDiv, BodyDiv } from './styles'
import Amplify, { Auth, API } from 'aws-amplify'
import credentials from '../../aws-exports'



export default function Profile( { user, setModal } ) {
  // A function for signing out
  const signOut = async() => {
    Auth.signOut()
      .then( () => window.location.reload() )
      .catch( error => {
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