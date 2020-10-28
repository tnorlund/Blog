import React, { useState } from 'react'
import DarkToggle from '../DarkToggle'
import User from '../User'
import Nav from '../Nav'
import Modal from 'components/Modal'
import { HeaderDiv, Logo, UserTitle } from './styles'
import { useQueryParam } from 'hooks'



export default function Header( { site } ) {
  // const [modal, setModal] = useState( `User` )
  const [modal, setModal] = useQueryParam( `user`, false )
  // const setter = idx => {
  //   setUrlProject(`User`)
  //   setModal(idx)
  // }
  
  console.log({modal})

  return (
    <>
      <HeaderDiv>
        <Logo to="/" title={site.title} rel="home">
          tnor
        </Logo>
        <Nav />
        <User setModal={setModal} />
        <DarkToggle />
      </HeaderDiv>
      <Modal
        open={modal}
        setModal={setModal}
      >
        <UserTitle>Sign In</UserTitle>
      </Modal>
    </>
  )
}
