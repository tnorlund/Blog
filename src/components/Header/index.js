/* eslint-disable max-len */
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

// import Amplify, {
//   Auth, API, Analytics, AWSKinesisFirehoseProvider
// } from 'aws-amplify'


/** Ensure that Amplify is configured on each page. */
Configure()

export default function Header( { site } ) {

  const [open, setModal] = useState( false )
  // Logic for showing whether privacy
  const privacy = useSessionStorage( PRIVACY_KEY )[0]

  // Store the unique ID of the visitor in session storage as soon as the page
  // loads.
  const [ visitorKey, setVisitorKey ] = useSessionStorage( VISITOR_KEY )
  if ( !visitorKey ) setVisitorKey( uuidv4() )

  // Show the privacy view when is is the visitor's first time. In order to
  // avoid the modal view popping up on page load, only show the window after
  // the visitor has scrolled down.
  const [privacyShow, setPrivacyShow] = useState( false )
  useEventListener( `scroll`, () => {
    if (
      window.scrollY > 100 &&
      ( !privacy || ( privacy && privacy.shownWindow == false ) )
    ) setPrivacyShow( true )
    // TODO
    // [ ] Terraform Cognito User Pool and Identity Pool
    // ---
    // console.log( {
    //   id: visitorKey,
    //   date: new Date().toISOString(),
    //   title: `Resume`,
    //   slug: `/resume`,
    //   app: privacy && privacy.browser? window.navigator.userAgent : undefined,
    //   Y: privacy && privacy.scroll? window.scrollY : undefined,
    //   X: privacy && privacy.scroll? window.scrollX : undefined,
    //   height: privacy && privacy.windowSize? window.screen.height : undefined,
    //   width: privacy && privacy.windowSize ? window.screen.width : undefined,
    // } )
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
