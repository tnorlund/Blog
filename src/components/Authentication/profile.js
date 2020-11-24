import React, { useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { Title, ButtonDiv, BodyDiv, WarningIcon } from './styles'
import { Auth } from 'aws-amplify'

export default function Profile( setWorking, currentUser ) {
  console.log( `rendering profile` )
  // Gets the user data from session storage.
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
  // A function for signing out
  const signOut = async() => {
    setWorking( true )
    Auth.signOut()
      .then( () => {
        setUser( undefined )
        setWorking( false )
      } )
      .catch( error => {
        // eslint-disable-next-line no-console
        console.log( `errored signing out`, error )
      } )
  }
  const { name, email } = currentUser
  return(
    <>
      <Title>Profile</Title>
      <BodyDiv>
        <p><b>Name: </b>{name}</p>
        <p><b>Email: </b>{email}</p>
        <WarningIcon/>
      </BodyDiv>
      <ButtonDiv onClick={ () => signOut() }>Sign Out</ButtonDiv>
    </>
  )
}