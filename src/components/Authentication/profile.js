import React from 'react'
import { Title, ButtonDiv, BodyDiv } from './styles'
import Amplify, { Auth, API } from 'aws-amplify'
import credentials from '../../aws-exports'



export default function Profile( { user, setModal } ) {
  // A function for signing out
  const signOut = async() => {
    Amplify.configure( credentials )
    await API.get( `blogAPI`, `/user?name=Tyler\ Norlund&email=tnorlund@icloud.com&number=14` )
      .then( result => console.log( `result`, result ) )
      .catch( error => console.log( `error`, error ) )
    const response = await API.get( `blogAPI`, `/user-details?name=Tyler\ Norlund&email=tnorlund@icloud.com&number=14` )
      .catch( error => console.log( `Errored: `, error ) )
    console.log(`response`, response )




    // Auth.signOut()
    //   .then( () => setModal( false ) )
    //   .catch( error => {
    //     // eslint-disable-next-line no-console
    //     console.log( `errored signing out`, error )
    //   } )
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