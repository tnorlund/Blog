import React, { useState } from "react"
import {
  UserTitle, TextInput, TextDiv, ButtonDiv, ErrorDiv, LinkDiv
} from './styles'
import { Auth } from 'aws-amplify'
import { setUser, isLoggedIn } from '../utils/auth'
import { useQueryParam } from 'hooks'


export default function Login( { setModal } ) {
  const [loginState, setLoginState] = useState(
    { email:``, password:``, code:``, error:``, type:`login` }
  )
  // A login function that logs the user in
  const login = async() => {
    const { email, password } = loginState
    Auth.signIn( email, password )
      .then( ( result ) => {
        const userInfo = {
          ...result.attributes, username: result.username
        }
        setUser( userInfo )
        setModal( false )
      } )
      .catch( error => {
        if ( error.message == `User is not confirmed.` )
          setLoginState(
            { ...loginState, type: `confirm` } )
        else
          setLoginState(
            { ...loginState, error: error.message } )
      } )
  }
  // A signup function that signs the user up
  const signUp = async() => {
    const { email, password } = loginState
    Auth.signUp( email, password )
      .then( ( result ) => {
        if ( !result.userConfirmed ) {
          setLoginState(
            { ...loginState, type: `confirm` } )
        } else {
          setLoginState(
            { ...loginState, type: `login` } )
        }
      } )
      .catch(
        error => setLoginState( { ...loginState, error: error.message } )
      )
  }
  // A confirmation function to confirm the MFA code.
  const confirm = async() => {
    const { email, code } = loginState
    Auth.confirmSignUp( email, code )
      .then( result => {
        if ( result == `SUCCESS` ) login()
      } )
      .catch( error => setLoginState(
        { ...loginState, error: error.message } ) )
  }
  return (
    <>
      {loginState.type==`login` && <> <UserTitle>Log In</UserTitle>
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
              value={loginState.password}
              onChange={( event ) => {
                setLoginState(
                  { ...loginState, password: event.target.value, error:`` } )
              }}/>
          </TextDiv>
          {loginState.error && <ErrorDiv>{loginState.error}</ErrorDiv>}
          <ButtonDiv onClick={() => login()}>Login</ButtonDiv>
          <LinkDiv
            onClick={() => setLoginState( { ...loginState, type: `signup` } ) }
          >Don&apos;t have an account?</LinkDiv>
        </form>
      </>
      }
      {loginState.type==`signup` && <> <UserTitle>Sign Up</UserTitle>
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
            value={loginState.password}
            onChange={( event ) => {
              setLoginState( { ...loginState, password: event.target.value } )
            }}/>
        </TextDiv>
        {loginState.error && <ErrorDiv>{loginState.error}</ErrorDiv>}
        <ButtonDiv onClick={() => signUp()}>Sign Up</ButtonDiv>
        <LinkDiv
          onClick={() => setLoginState( { ...loginState, type: `login` } ) }
        >Already have an account?</LinkDiv>
      </>}
      {loginState.type==`confirm` && <> <UserTitle>Confirmation</UserTitle>
        <TextDiv>
          <TextInput
            placeholder='code'
            name='code'
            value={loginState.code}
            onChange={( event ) => {
              setLoginState( { ...loginState, code: event.target.value } )
            }}/>
        </TextDiv>
        {loginState.error && <ErrorDiv>{loginState.error}</ErrorDiv>}
        <ButtonDiv onClick={() => confirm()}>Confirm</ButtonDiv>
      </>}
    </>
  )
}