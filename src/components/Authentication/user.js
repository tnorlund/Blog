import React, { useState } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import {
  Title, TextInput, SelectedButton, WarningDiv, WarningIcon, OptionsDiv,
  OptionDiv, NewTextInput, Description
} from './styles'
import { timeSince } from 'utils/date'
import { Auth } from 'aws-amplify'

export default function User( passedUser, setUser ) {
  // Sets an error if one occurs.
  const [ error, setError ] = useState()
  const signOut = async () => {
    try {
      await Auth.signOut()
      setUser( {} )
    } catch ( error ) { setError( error.message ) }
  }
  console.log( passedUser )
  const { name, dateJoined, email, isAdmin } = passedUser
  // const dateString = timeSince( dateJoined )
  if ( name ) return(
    <>
      <Title>{name}</Title>
      <Description>Administrator</Description>
      {/* <Description>Joined { dateString }</Description> */}
      { error && <WarningDiv><WarningIcon/>
        <div
          css={`display: inline-block;
          vertical-align: middle;`}
        >{ error }</div>
      </WarningDiv> }
      <SelectedButton onClick={ () => signOut() }>
          Sign Out
      </SelectedButton>
    </>
  )
  else
    return(
      <></>
    )
}