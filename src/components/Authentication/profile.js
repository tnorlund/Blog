import React from 'react'
import { Title, ButtonDiv, BodyDiv } from './styles'
import Amplify, { Auth, API } from 'aws-amplify'
import credentials from '../../aws-exports'



export default function Profile( { user, setModal } ) {
  // A function for signing out
  const signOut = async() => {
    Amplify.configure( credentials )
    const response = await API.post(
      `blogAPI`, `/user`,
      { body: {
        name: `Tyler Norlund`, email: `tnorlund@icloud.com`
      } } )
      .catch( error => console.log( `Errored: `, error ) )
    console.log(`response`, response )
    // Auth.signOut()
    //   .then( () => setModal( false ) )
    //   .catch( error => {
    //     // eslint-disable-next-line no-console
    //     console.log( `errored signing out`, error )
    //   } )
  }
  console.log(user)
  const { name, email } = user.idToken.payload
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