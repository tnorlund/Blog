/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import DarkToggle from '../DarkToggle'
import Nav from '../Nav'
import Authentication from '../Authentication'
import Privacy from '../Privacy'
import { HeaderDiv, Logo, IconDiv, Div, Icon, Icons } from './styles'
import { Configure } from 'utils/auth'
import { useSessionStorage, useEventListener } from 'hooks'
import { PRIVACY_KEY, VISITOR_KEY } from 'utils/constants'
import { handlePrivacy } from 'utils/analytics'
import { v4 as uuidv4 } from 'uuid'
import { Auth } from 'aws-amplify'

import { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'

/** Ensure that Amplify is configured on each page. */
Configure()

/** Add Kinesis Firehose to the Amplify Analytics object. */
Analytics.addPluggable( new AWSKinesisFirehoseProvider() )

export default function Header( { site } ) {
  const { Favicon } = Icons
  const [open, setModal] = useState( false )
  /**
   * The object used to determine whether the visitor has agreed to the
   * privacy policy.
   */
  const [ privacy, setPrivacy ] = useSessionStorage( PRIVACY_KEY )

  // Store the unique ID of the visitor in session storage as soon as the page
  // loads.
  const [ visitorKey, setVisitorKey ] = useSessionStorage( VISITOR_KEY )
  if ( !visitorKey ) setVisitorKey( uuidv4() )

  // Show the privacy view when is is the visitor's first time. In order to
  // avoid the modal view popping up on page load, only show the window after
  // the visitor has scrolled down.
  const [privacyShow, setPrivacyShow] = useState( false )

  /* Handle the analytics of the scroll event. */
  useEventListener(
    `scroll`,
    () => handlePrivacy( privacy, setPrivacyShow, setPrivacy )
  )

  useEffect( () => {
    const urlParams = new URLSearchParams( window.location.search )
    const encoded = urlParams.get( `data` )
    const code = urlParams.get( `code` )
    if ( encoded ) {
      const decoded = JSON.parse( atob( encoded ) )
      if ( decoded.userName && code )
        Auth.confirmSignUp(
          decoded.userName, code
        ).catch( error =>  console.warn( { error } ) )
    }
  }, [] )

  return (
    <>
      <HeaderDiv>
        <Logo to="/" title={site.title} rel="home">
          tnor
        </Logo>
        {/* <Favicon/> */}
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
