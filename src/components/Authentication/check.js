import React from 'react'
import { Title, BodyDiv, ButtonDiv } from './styles'

export default function Check( { setAuthState } ) {
  return(
    <>
      <Title>Email Check</Title>
      <BodyDiv>
        Check your email for the confirmation.
      </BodyDiv>
      <ButtonDiv onClick={ () => setAuthState( `login` ) }>Login</ButtonDiv>
    </>
  )
}