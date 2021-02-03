import React, { useState } from 'react'
import DarkToggle from '../DarkToggle'
import Nav from '../Nav'
import Authentication from '../Authentication'
import Privacy from '../Privacy'
import { HeaderDiv, Logo, IconDiv, Div, Icon } from './styles'
import { Configure } from 'utils/auth'
import { useSessionStorage } from 'hooks'
import { PRIVACY_KEY } from 'utils/constants'

/** Ensure that Amplify is configured on each page. */
Configure()

export default function Header( { site } ) {

  const [open, setModal] = useState( false )
  // Logic for showing whether privacy
  const privacy = useSessionStorage( PRIVACY_KEY )[0]
  // Show the privacy view when is is the visitor's first time.
  const [privacyShow, setPrivacyShow] = useState(
    !privacy ||
    ( privacy && privacy.shownWindow == false )
  )
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
      <Authentication { ...{ open, setModal } } />
      <Privacy { ...{ open: privacyShow, setModal: setPrivacyShow }}/>
    </>
  )
}
