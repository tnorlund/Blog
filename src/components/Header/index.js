import React from 'react'
import DarkToggle from '../DarkToggle'
import User from '../User'
import Nav from '../Nav'
import Modal from 'components/Modal'
import { HeaderDiv, Logo, UserTitle, IconDiv } from './styles'
import { useQueryParam } from 'hooks'



export default function Header( { site } ) {
  const [modal, setModal] = useQueryParam( `user`, false )
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
          <User setModal={setModal} />
          <DarkToggle />
        </IconDiv>
      </HeaderDiv>
      <Modal open={modal} setModal={setModal}>
        <UserTitle>Sign In</UserTitle>
      </Modal>
    </>
  )
}
