import React from 'react'
import DarkToggle from '../DarkToggle'
import User from '../User'
import Nav from '../Nav'
import { HeaderDiv, Logo } from './styles'

export default function Header( { site } ) {
  return (
    <HeaderDiv>
      <Logo to="/" title={site.title} rel="home">
        tnor
      </Logo>
      <Nav />
      <User />
      <DarkToggle />
    </HeaderDiv>
  )
}
