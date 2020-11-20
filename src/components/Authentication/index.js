import React, { useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useEventListener, useSessionStorage } from 'hooks'
import { Close, ModalBehind, ModalDiv } from './styles'
import ReactLoading from 'react-loading'
import { getCurrentSession, parseUser, userFromDB } from 'utils/auth'

import { AUTH_KEY, TOS_KEY } from 'utils/constants'

import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import Check from './check'
import Forgot from './forgot'
import ForgotSubmit from './forgotSubmit'
import TermsOfService from './tos'

/**
 * Handles the state of the modal view.
 * @param {String} tosVersion The current version of the Terms of Service.
 *
 * This function handles the state of the modal view by requesting the user
 * details from the DB and determining whether the user needs to accept a Terms
 * of Service agreement.
 */
const handleState = async ( tosVersion ) => {
  let requestedUser
  /** @type {[Object]} The agreed to Terms of Services. */
  let tos = []
  /** @type {String} The most recent Terms of Service agreed to. */
  let recentVersion

  const { session, sessionError } = await getCurrentSession()
  // When there is no user signed in, the session is undefined.
  if ( !session ) return { state: `login` }
  // When an error occurs, default to the login state.
  if ( sessionError ) return { error: sessionError, state: `login` }
  const { user, dbError } = await userFromDB( parseUser( session ) )
  // When an error occurs, default to the login state.
  if ( dbError ) return { error: dbError, state: `login` }
  // Iterate over the different elements returned in order to parse them.
  user.map( element => {
    if ( element.name && element.email )
      requestedUser = element
    if ( element.userNumber && element.version )
      tos.push( element )
  } )
  // When no user details are returned from the DB, set the state to login.
  if ( !requestedUser ) return { state: `login` }
  // When the user has not agreed to any Terms of Service, set the state to
  // Terms of Service.
  if ( requestedUser.numberTOS == 0 )
    return { user: requestedUser, state: `tos` }
  // Iterate over the different Terms of Services already agreed to to find
  // the most recent version.
  tos.map( element => {
    if ( tos.length == 1 ) recentVersion = element.version
  } )
  // When the most recent agreed to Terms of Service is not this one, set the
  // state to Terms of Service so that the user can agree to the most recent
  // version.
  if ( Date( tosVersion ) != Date( recentVersion ) )
    return { user: requestedUser, state: `tos` }
  // Otherwise, the user will be shown their profile.
  return { user: requestedUser, state: `profile` }
}

export default function Authentication( { open, setModal } ) {
  // The session's state of the authentication modal view.
  // const [modal, setModal] = useSessionStorage( AUTH_KEY, false )
  // Use a state for whether the page is still loading data from the server.
  const [ loading, setLoading ] = useState( true )
  // State for Authentication process
  const [ authState, setAuthState ] = useState( `login` )
  // State for User
  const [ user, setUser ] = useState()
  // Don't want Session storage to handle user data.
  // const [ user, setUser ] = useSessionStorage( USER_KEY )


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
  useEffect( () => {
    setLoading( true )
    if ( open ) document.body.style.overflowY = `hidden`
    if ( ref.current ) {
      ref.current.style.zIndex = 3
      // ref.current.style.width = `100px`
      // ref.current.style.height = `100px`
    }
    if (
      authState == `login` || authState == `profile` || authState == `tos`
    ) handleState( tos ).then(
      ( { user, error, state } ) => {
        // eslint-disable-next-line no-console
        if ( error ) console.log( `error`, error )
        setUser( user )
        setAuthState( state )
      } )
    // Set the state of the modal view to not be loading.
    setLoading( false )
  }, [ open, authState, tos, loading ] )

  if ( open )
    return (
      <ModalBehind open={open} onClick={ () => setModal( false ) }>
        {
          // The modal view will either be authenticated or not.
          loading &&
          <ModalDiv
            onClick={ event => event.stopPropagation() } { ...{ ref } }
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

            { // The Login view can either log the user in or change to the
              // signup or forgot views.
              authState == `login` &&
              <Login setLoading={setLoading} setAuthState={setAuthState}/> }

            { // The Profile view can only log out.
              authState == `profile` &&
              <Profile user={user} setAuthState={setAuthState} /> }

            { // The signup state goes to either the login or check state
              authState == `signup` && <SignUp setAuthState={setAuthState} /> }

            { // The check state just says "Check your email" and doesn't go to
              // any other page.
              authState == `check` && <Check setAuthState={setAuthState} /> }

            { // The forgot state goes to sign in or the forgotSubmit state.
              authState == `forgot` && <Forgot setAuthState={setAuthState} /> }

            { // The forgotSubmit state only goes to the login state.
              authState == `forgotSubmit` &&
              <ForgotSubmit setAuthState={setAuthState} /> }
            { // The Terms of Service state only goes to the profile state.
              authState == `tos` &&
              <TermsOfService user={user} setLoading={setLoading} />
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