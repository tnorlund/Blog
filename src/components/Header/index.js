import React from 'react'
import DarkToggle from '../DarkToggle'
import Nav from '../Nav'
import Authentication from '../Authentication'

import { AUTH_KEY } from 'utils/constants'
import { HeaderDiv, Logo, IconDiv, Div, Icon } from './styles'
import { useSessionStorage, useQueryParam } from 'hooks'
import { Configure } from 'utils/auth'

/** Ensure that Amplify is configured on each page. */
Configure()

export default function Header( { site } ) {
  // const [modal, setModal] = useSessionStorage( AUTH_KEY, false )
  const [modal, setModal] = useQueryParam( `user`, false )
  // Set the state of the authorization process. Start the process with `login`
  // const [authState, setAuthState] = useQueryParam( `auth`, `login` )
  return (
    <>
      <HeaderDiv>
        <Logo to="/" title={site.title} rel="home">
          tnor
        </Logo>
        <IconDiv>
          <Nav />
        </IconDiv>
        <IconDiv>
          <Div>
            <Icon onClick={ () => setModal( true ) }/>
          </Div>
          <DarkToggle />
        </IconDiv>
      </HeaderDiv>
      <Authentication
        open={ modal } setModal={ setModal }
      />
    </>
  )
}
