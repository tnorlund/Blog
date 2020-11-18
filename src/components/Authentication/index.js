import React, { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'hooks'
import { Close, ModalBehind, ModalDiv } from './styles'
import amplify, { Auth, API } from 'aws-amplify'
import ReactLoading from "react-loading"

import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import Check from './check'
import Forgot from './forgot'
import ForgotSubmit from './forgotSubmit'


/**
 * Gets the current Cognito User Session if the user is logged in.
 */
async function getCurrentSession() {
  return await Auth.currentSession()
}

export default function Authentication( { open, setModal } ) {
  // Use a state for whether the page is still loading data from the server.
  const [ loading, setLoading ] = useState( true )
  // State for Authentication process
  const [ authState, setAuthState ] = useState( `login` )
  // State for User
  const [ user, setUser ] = useState()
  // Get the reference to the Auth modal view.
  const ref = useRef()
  // When the user hits the escape key, close out of the modal.
  useEventListener( `keydown`, ( event ) => {
    if( event?.key === `Escape` ) setModal()
  } )
  // Before the modal view is rendered, set the styles of the document.
  useEffect( () => {
    if ( open ) document.body.style.overflowY = `hidden`
    if ( ref.current ) {
      ref.current.style.zIndex = 3
      // ref.current.style.width = `100px`
      // ref.current.style.height = `100px`
    }

    getCurrentSession()
      .then( result => {
        setUser( result )
        setAuthState( `profile` )
      } )
      .catch( error => {
        console.log(`error`, error)
        if ( error == `No current user` ) setAuthState( `login` )
      } )
    setLoading( false )
  }, [ open ] )

  if ( open )
    return (
      <ModalBehind open={open} onClick={ () => setModal( false ) }>
        {
          // The modal view will either be authenticated or not.
          loading &&
          <ModalDiv
            onClick={ event => event.stopPropagation() }
            { ...{ ref } }
          >
            <ReactLoading type={`spokes`} color={
              getComputedStyle( document.documentElement )
                .getPropertyValue( `--color-b` )
            }/>
          </ModalDiv>
        }
        {
          !loading &&
          <ModalDiv
            onClick={ event => event.stopPropagation() }
            { ...{ ref } }
          >
            <Close onClick={ () => setModal( false ) } />
            {
              authState == `login` &&
              <Login setAuthState={setAuthState} setModal={setModal}/>
            }
            {
              authState == `profile` &&
              <Profile user={user} setModal={setModal}/>
            }
            {
              authState == `signup` &&
              <SignUp setAuthState={setAuthState} />
            }
            {
              authState == `check` &&
              <Check/>
            }
            {
              authState == `forgot` &&
              <Forgot setAuthState={setAuthState} />
            }
            {
              authState == `forgotSubmit` &&
              <ForgotSubmit setAuthState={setAuthState} />
            }
          </ModalDiv>
        }
      </ModalBehind>
    )
  else {
    // When the modal is not being viewed, reset the styles
    if ( typeof document !== `undefined` )
      document.body.style.removeProperty( `overflow-y` )
    if ( ref.current ) ref.current.style.removeProperty( `z-index` )
    return null
  }
}