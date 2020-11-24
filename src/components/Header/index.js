import React, { useState } from 'react'
import DarkToggle from '../DarkToggle'
import Nav from '../Nav'
import Authentication from '../Authentication'
import { HeaderDiv, Logo, IconDiv, Div, Icon } from './styles'
import { Configure } from 'utils/auth'

/** Ensure that Amplify is configured on each page. */
Configure()

export default function Header( { site } ) {
  const [open, setModal] = useState( false )
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
    </>
  )
}
