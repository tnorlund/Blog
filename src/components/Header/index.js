import React, { useState } from 'react'
import DarkToggle from '../DarkToggle'
import Nav from '../Nav'
import Authentication from '../Authentication'
import Privacy from '../Privacy'
import { HeaderDiv, Logo, IconDiv, Div, Icon } from './styles'
import { Configure } from 'utils/auth'
import { useSessionStorage, useEventListener } from 'hooks'
import { PRIVACY_KEY, VISITOR_KEY } from 'utils/constants'
import { v4 as uuidv4 } from 'uuid'


/** Ensure that Amplify is configured on each page. */
Configure()

export default function Header( { site } ) {

  const [open, setModal] = useState( false )
  // Logic for showing whether privacy
  const privacy = useSessionStorage( PRIVACY_KEY )[0]
  const [ visitorKey, setVisitorKey ] = useSessionStorage( VISITOR_KEY )
  if ( !visitorKey ) setVisitorKey( uuidv4() )
  // Show the privacy view when is is the visitor's first time.
  const [privacyShow, setPrivacyShow] = useState( false )
  useEventListener( `scroll`, () => {
    if (
      window.scrollY > 100 &&
      (
        !privacy ||
        ( privacy && privacy.shownWindow == false )
      )
    ) setPrivacyShow( true )
  } )
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
