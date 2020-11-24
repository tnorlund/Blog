import React, { useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useEventListener, useSessionStorage } from 'hooks'
import Modal from 'components/Modal'


import { ModalDiv } from './styles'
import ReactLoading from 'react-loading'
import { getCurrentSession, updateUser  } from 'utils/auth'

import { AUTH_KEY, TOS_KEY } from 'utils/constants'

import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import Check from './check'
import Forgot from './forgot'
import ForgotSubmit from './forgotSubmit'
import TermsOfService from './tos'


export default function Authentication( { open, close } ) {
  // The session's state of the authentication modal view.
  // State for Authentication process
  const [ authState, setAuthState ] = useState()
  // User stored in session storage
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
  // A variable used to determine an operation is happening.
  const [ working, setWorking ] = useState( false )

  // Get the reference to the Auth modal view.
  const ref = useRef()
  // When the user hits the escape key, close out of the modal.
  useEventListener( `keydown`, ( event ) => {
    if( event?.key === `Escape` ) setModal( false )
  } )
  // Get the version of the current TOS
  const [tos, ] = useSessionStorage( TOS_KEY, new Date(
    useStaticQuery( graphql`
      { mdx(
        fileAbsolutePath: { regex: "/tos/" }
      ) { frontmatter { version } } }
    ` ).mdx.frontmatter.version
  ) )
  // Before the modal view is rendered, set the styles of the document.
  // useEffect( () => {
  //   console.log( `rendering` )
  //   console.log( user )
  //   if ( open ) document.body.style.overflowY = `hidden`
  //   if ( ref.current ) { ref.current.style.zIndex = 3 }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   open,
  //   // user
  // ] )

  return(
    <Modal open={ open } closeModal={ () => close() } contents={Login()}/>
  )


    
    // return (
    //   <ModalBehind open={open} onClick={ () => setModal( false ) }>
    //     <ModalDiv
    //       onClick={ event => event.stopPropagation() }
    //       { ...{ ref } }
    //     >
    //       <Close onClick={ () => setModal( false ) } />

    //       { // The Login view can either log the user in or change to the
    //         // signup or forgot views.
    //         !user && <Login setWorking={ setWorking }/> }

    //       { // The Profile view can only log out.
    //         user && <Profile setWorking={ setWorking } currentUser={ user } /> }

    //       { // The signup state goes to either the login or check state
    //         authState == `signup` && <SignUp setAuthState={setAuthState} /> }

    //       { // The check state just says "Check your email" and doesn't go to
    //         // any other page.
    //         authState == `check` && <Check setAuthState={setAuthState} /> }

    //       { // The forgot state goes to sign in or the forgotSubmit state.
    //         authState == `forgot` && <Forgot setAuthState={setAuthState} /> }

    //       { // The forgotSubmit state only goes to the login state.
    //         authState == `forgotSubmit` &&
    //           <ForgotSubmit setAuthState={setAuthState} /> }
    //       { // The Terms of Service state only goes to the profile state.
    //         authState == `tos` &&
    //           <TermsOfService user={user} />
    //       }
    //     </ModalDiv>
    //   </ModalBehind>
    // )
}