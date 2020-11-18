import React, { useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useEventListener } from 'hooks'
import { Close, ModalBehind, ModalDiv } from './styles'
import Amplify, { Auth, API } from 'aws-amplify'
import ReactLoading from 'react-loading'
import credentials from '../../aws-exports'

import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import Check from './check'
import Forgot from './forgot'
import ForgotSubmit from './forgotSubmit'
import TermsOfService from './tos'

/**
 * Gets the current Cognito User Session if the user is logged in.
 */
async function getCurrentSession() {
  return await Auth.currentSession()
}

/**
 * Gets the useful user data from the current Cognito user session.
 * @param {Object} CognitoUserSession The current cognito user session.
 */
const parseUser = ( CognitoUserSession ) => {
  const { name, email, ...restOfUser } = CognitoUserSession.idToken.payload
  return {
    name: name, email: email, userNumber: restOfUser[ `custom:UserNumber` ]
  }
}

/**
 * Requests the user using the API.
 * @param {Object} requestedUser The parsed user data.
 */
const userFromDB = async( requestedUser ) => {
  Amplify.configure( credentials )
  try {
    const { user, error } = await API.get(
      `blogAPI`,
      `/user-details?name=${
        requestedUser.name.replace(` `, `\ `)
      }&email=${
        requestedUser.email
      }&number=${
        requestedUser.userNumber
      }`
    )
    if ( error ) return { error: error }
    else return { user: user }
  } catch( error ) { return { error: error } }
}

/**
 * Handles the state of the modal view.
 * @param {String} tosVersion The current version of the Terms of Service.
 *
 * This function handles the state of the modal view by requesting the user
 * details from the DB and determining whether the user needs to accept a Terms
 * of Service agreement.
 */
const handleState = async ( tosVersion ) => {
  let requestedUser, tos
  const session = await getCurrentSession()
  const parsedUser = parseUser( session )
  const { user, error } = await userFromDB( parsedUser )
  console.log(`user`, user)
  // When an error occurs, default to the login state.
  if ( error )  return { error: error, state: `login` }
  // Iterate over the different elements returned in order to parse them.
  user.map( element => {
    if ( element.name && element.email )
      requestedUser = element
  } )
  // When no user details are returned from the DB, set the state to login.
  if ( !requestedUser ) return { state: `login` }
  // When the user has not agreed to any Terms of Service, set the state to
  // Terms of Service.
  if ( requestedUser.numberTOS == 0 ) 
    return { user: requestedUser, state: `tos` }
  // Otherwise, the user will be shown their profile.
  else return { user: requestedUser, state: `profile` }
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
  // Get the version of the current TOS
  const tosVersion = new Date(
    useStaticQuery( graphql`
      { mdx(
        fileAbsolutePath: { regex: "/tos/" }
      ) { frontmatter { version } } }
    ` ).mdx.frontmatter.version
  )
  // Before the modal view is rendered, set the styles of the document.
  useEffect( () => {
    if ( open ) document.body.style.overflowY = `hidden`
    if ( ref.current ) {
      ref.current.style.zIndex = 3
      // ref.current.style.width = `100px`
      // ref.current.style.height = `100px`
    }
    handleState( tosVersion ).then( 
      ( { user, requestedUser, error, state } ) => {
        console.log( `requestedUser`, requestedUser )
        setUser( user )
        setAuthState( state )
      } )
    // Set the state of the modal view to not be loading.
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
            {
              authState == `tos` &&
              <TermsOfService user={user} setModal={setModal} />
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