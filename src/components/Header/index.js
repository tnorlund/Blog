import React from 'react'
import DarkToggle from '../DarkToggle'
import User from '../User'
import Nav from '../Nav'
import Modal from '../Modal'
import Authentication from '../Authentication'
import Login from 'views/Login'
import { HeaderDiv, Logo, UserTitle, IconDiv } from './styles'
import { useQueryParam } from 'hooks'



export default function Header( { site } ) {
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
          <User setModal={setModal} />
          <DarkToggle />
        </IconDiv>
      </HeaderDiv>
      <Authentication
        open={ modal } setModal={ setModal }
      />
      {/* <Modal open={modal} setModal={setModal}>
        <Login setModal={setModal}/>
      </Modal> */}
    </>
  )
}
