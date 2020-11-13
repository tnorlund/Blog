import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
import {
  UserTitle, TextInput, TextDiv, ButtonDiv, ErrorDiv, LinkDiv
} from './styles'
import Amplify, { Auth, API } from 'aws-amplify'
import config from '../aws-exports'

import { setUser, isLoggedIn, getCurrentUser, logout } from '../utils/auth'

async function listUsers() {
  let apiName = `AdminQueries`
  let path = `/listGroupsForUser/`
  let myInit = {
    queryStringParameters: {
      username: `tnorlund@icloud.com`
    },
    headers: {
      // eslint-disable-next-line max-len
      Authorization: `${( await Auth.currentSession() ).getAccessToken().getJwtToken()}`
    }
  }
  return await API.get( apiName, path, myInit )
}

export default function Login( { setModal } ) {
  // The login form uses multiple inputs. These inputs are stored in this state.
  const [loginState, setLoginState] = useState(
    { name: ``, email:``, passworda:``, passwordb:``, code:``, error:``,
      type:`login` }
  )
  // This view requests data from the api
  const [isLoading, setLoading] = useState( true )
  useEffect( () => {
    Amplify.configure( config )
    console.log( `listUsers`, listUsers() )
    // API.get( `blogAPI`, `/blog/`, {} )
    //   .then( blogResponse => console.log( `get response`, { blogResponse } ) )
    //   .catch( error => console.log( `get error`, { error } ) )
    // API.post( `blogAPI`, `/blog/`, {} )
    //   .then( blogResponse => console.log( `post Blog`, { blogResponse } ) )
    //   .catch( error => console.log( `post error`, { error } ) )

    // API.get( `AdminQueries`, `/listUsers/`, {
    //   headers: {
    //     Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
    //   }
    // } )
    //   .then( blogResponse => console.log( `get response`, { blogResponse } ) )
    //   .catch( error => console.log( `get error`, { error } ) )
    console.log( `user`, user )
  } )
  
  const user = getCurrentUser()
  console.log(`user`, user)
  const body = useStaticQuery(
    graphql`query { mdx(
      fileAbsolutePath: { regex: "/tos/index.md/" }
    ) { body } }`
  )
  // A login function that logs the user in
  const login = async() => {
    console.log(`logging in`)
    const { email, passworda } = loginState
    // First, check to see if the passwords match.
    if ( passworda == `` ) { setLoginState(
      { ...loginState, error: `Must give password` } )
    }
    // If the passwords match, proceed to set the credentials and get the user
    // attributes.
    else {
      Auth.signIn( email, passworda )
        .then( ( result ) => {
          const userInfo = {
            ...result.attributes, username: result.username
          }
          // Use the util to store the user credentials in the session
          setUser( userInfo )
          // Reload the page
          window.location.reload()
        } )
        .catch( error => {
          if ( error.code == `UserNotConfirmedException` )
            setLoginState(
              { ...loginState, type: `confirm` } )
          else
            setLoginState(
              { ...loginState, error: error.message } )
        } )
    }
  }
  // A signup function that signs the user up
  const signUp = async() => {
    const { name, email, passworda, passwordb } = loginState
    if ( passworda != passwordb ) { setLoginState(
      { ...loginState, error: `Passwords must match` }
    ) }
    else if ( passworda.length < 9 ) { setLoginState(
      { ...loginState,
        error: `Password must be greater than 8 characters.` } ) }
    else {
      Auth.signUp(
        { // email: email, 
          username: email, password: passworda,
          attributes:
          {
            // 'custom:TermsOfService': `0`,
            email:email, name: name }
        }
      )
        .then( ( result ) => {
          console.log(`result`, result)
          if ( !result.userConfirmed ) {
            setLoginState(
              { ...loginState, type: `confirm` } )
          } else {
            setLoginState(
              { ...loginState, type: `login` } )
          }
        } )
        .catch(
          error => {
            console.log({error})
            setLoginState( { ...loginState, error: error.message } )
          }
        )
    }
  }
  // A confirmation function to confirm the MFA code.
  const resend = async() => {
    const { email } = loginState
    Auth.resendSignUp( email )
      .then( result => {
        console.log(`resend result`, result)
        // if ( result == `SUCCESS` ) login()
      } )
      .catch( error => setLoginState(
        { ...loginState, error: error.message } ) )
  }
  // A forgot password function that sends confirmation code to given email
  const forgot = async() => {
    const { email } = loginState
    Auth.forgotPassword( email )
      .then( result => {
        if ( `CodeDeliveryDetails` in result )
          setLoginState(
            { ...loginState, type: `passwordConfirm` } )
      } )
      .catch( error => setLoginState(
        { ...loginState, error: error.message } ) )
  }
  // A function for confirming a new password with the emailed code
  const confirmPassword = async() => {
    const { email, code, password } = loginState
    Auth.forgotPasswordSubmit( email, code, password )
      .then( () => login() )
      .catch( error => setLoginState(
        { ...loginState, error: error.message } ) )
  }
  // A function for signing out
  const signOut = async() => {
    // API.post( `blogAPI`, `/`, { body: { PK: "#BLOG", SK: "#BLOG", Type: "blog", NumberUsers: 2, NumberPosts: 2} } )
    //   .then( blogResponse => console.log( { blogResponse } ) )
    //   .catch( error => console.log( { error } ) )
    // API.get( `blogAPI`, `/blog/`, {} )
    //   .then( blogResponse => console.log( { blogResponse } ) )
    //   .catch( error => console.log( `error`, { error } ) )
    Auth.signOut()
      .then( () => {
        logout()
        setLoginState(
          { email:``, password:``, code:``, error:``, type:`login` }
        )
        setModal( false )
      } )
  }
  // A function for setting the attribute for accepting the TermsOfService
  const acceptTOS = async() => {
    Auth.updateUserAttributes(
      Auth.user, { 'custom:TermsOfService': `1` } )
      .then( () =>  window.location.reload() )
      .catch( error => console.log( { error } ) )
  }
  if ( isLoading ) {
    return (
      <>
        loading
      </>
    ) }
  else {
    return (
      <>
        {!isLoggedIn() && loginState.type==`login` && <>
          <UserTitle>Log In</UserTitle>
          <form>
            <TextDiv>
              <TextInput
                placeholder='email'
                name='email'
                value={loginState.email}
                onChange={( event ) => {
                  setLoginState(
                    { ...loginState, email: event.target.value, error: `` } )
                }}/>
            </TextDiv>
            <TextDiv>
              <TextInput
                type='password'
                placeholder='password'
                name='password'
                value={loginState.passworda}
                onChange={( event ) => {
                  setLoginState(
                    { ...loginState, passworda: event.target.value, error:`` } )
                }}/>
            </TextDiv>
            {loginState.error && <ErrorDiv>{loginState.error}</ErrorDiv>}
            <ButtonDiv onClick={() => login()}>Login</ButtonDiv>
            <LinkDiv
              onClick={() => setLoginState(
                { ...loginState, type: `signup`, error:`` } ) }
            >Don&apos;t have an account?</LinkDiv>
            <LinkDiv
              onClick={() => setLoginState(
                { ...loginState, type: `forgot`, error:`` } ) }
            >Forgot password?</LinkDiv>
          </form>
        </>
        }
        {!isLoggedIn() && loginState.type==`signup` && <>
          <UserTitle>Sign Up</UserTitle>
          <TextDiv>
            <TextInput
              placeholder='name'
              name='name'
              value={loginState.name}
              onChange={( event ) => {
                setLoginState( { ...loginState, name: event.target.value } )
              }}/>
          </TextDiv>
          <TextDiv>
            <TextInput
              placeholder='email'
              name='email'
              value={loginState.email}
              onChange={( event ) => {
                setLoginState( { ...loginState, email: event.target.value } )
              }}/>
          </TextDiv>
          <TextDiv>
            <TextInput
              type='password'
              placeholder='password'
              name='password'
              value={loginState.passworda}
              onChange={( event ) => {
                setLoginState( { ...loginState, passworda: event.target.value } )
              }}/>
          </TextDiv>
          <TextDiv>
            <TextInput
              type='password'
              placeholder='password'
              name='password'
              value={loginState.passwordb}
              onChange={( event ) => {
                setLoginState( { ...loginState, passwordb: event.target.value } )
              }}/>
          </TextDiv>
          {loginState.error && <ErrorDiv>{loginState.error}</ErrorDiv>}
          <ButtonDiv onClick={() => signUp()}>Sign Up</ButtonDiv>
          <LinkDiv
            onClick={() => setLoginState(
              { ...loginState, type: `login`, error:`` } ) }
          >Already have an account?</LinkDiv>
        </>}
        {loginState.type==`confirm` && <> <UserTitle>Confirmation</UserTitle>
          <div css={`margin: 1em;`}>
            You must confirm your email before signing in.
          </div>
          {loginState.error && <ErrorDiv>{loginState.error}</ErrorDiv>}
          <LinkDiv onClick={() => resend() }>Didn&apos;t get an email?</LinkDiv>
        </>}
        {!isLoggedIn() && loginState.type==`forgot` && <>
          <UserTitle>Password Reset</UserTitle>
          <form>
            <TextDiv>
              <TextInput
                placeholder='email'
                name='email'
                value={loginState.email}
                onChange={( event ) => {
                  setLoginState(
                    { ...loginState, email: event.target.value, error: `` } )
                }}/>
            </TextDiv>
            {loginState.error && <ErrorDiv>{loginState.error}</ErrorDiv>}
            <ButtonDiv onClick={() => forgot()}>Submit</ButtonDiv>
            <LinkDiv
              onClick={() => setLoginState(
                { ...loginState, type: `signup`, error:`` } ) }
            >Don&apos;t have an account?</LinkDiv>
          </form>
        </>
        }
        {!isLoggedIn() && loginState.type==`passwordConfirm` && <>
          <UserTitle>Password Reset</UserTitle>
          <form>
            <TextDiv>
              <TextInput
                placeholder='code'
                name='code'
                value={loginState.code}
                onChange={( event ) => {
                  setLoginState(
                    { ...loginState, code: event.target.value, error: `` } )
                }}/>
            </TextDiv>
            <TextDiv>
              <TextInput
                type='password'
                placeholder='password'
                name='password'
                value={loginState.password}
                onChange={( event ) => {
                  setLoginState( { ...loginState, password: event.target.value } )
                }}/>
            </TextDiv>
            {loginState.error && <ErrorDiv>{loginState.error}</ErrorDiv>}
            <ButtonDiv onClick={() => confirmPassword()}>Submit</ButtonDiv>
            <LinkDiv
              onClick={() => setLoginState(
                { ...loginState, type: `signup`, error:`` } ) }
            >Don&apos;t have an account?</LinkDiv>
          </form>
        </>
        }
        {( isLoggedIn() && user[`custom:TermsOfService`] == `0` ) && <>
          <UserTitle>Terms of Service</UserTitle>
          <div css={`margin: 1em;`}>
            <Mdx>{body.mdx.body}</Mdx>
          </div>
          <ButtonDiv onClick={() => acceptTOS()}>Accept</ButtonDiv>
        </>}
        {isLoggedIn() && <>
          <UserTitle>Profile</UserTitle>
          <div css={`margin: 1em;`}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
          <ButtonDiv onClick={() => signOut()}>Sign Out</ButtonDiv>
        </>}
      </>
    ) }
}