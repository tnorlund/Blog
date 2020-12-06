import React, { useState } from 'react'
import {
  handleLoggingIn, handleCheckCode, handleForgotPassword, handleSigningUp,
  handleLoggingOut, resendConfrimationEmail
} from './utils'
import { timeSince } from 'utils/date'
import { Login, SignUp, Forgot, Confirm, User, TOS } from './states'
import { graphql, useStaticQuery } from "gatsby"


// TODO
// [ ] Show terms of service when user has not agreed to most recent
export default function HandleStates( user, setUser ) {
  // Sets the state for the login form.
  const [ email, setEmail ] = useState( `` )
  // Sets the state for the login form.
  const [ password, setPassword ] = useState( `` )
  // Sets the state for the login form.
  const [ duplicatePassword, setDuplicatePassword ] = useState( `` )
  // Sets the user's name.
  const [ name, setName ] = useState( `` )
  // Sets the code emailed to the user.
  const [ code, setCode ] = useState( `` )
  // Sets an error if one occurs.
  const [ error, setError ] = useState()
  // Sets an option to resend email confirmation
  const [ needConfirm, setConfirm ] = useState( false )
  // Sets the state of the modal view.
  const [ page, setPage ] = useState( `login` )
  // When a user first signs up, show them at the login screen.
  const [ newUser, setNewUser ] = useState( false )
  // Sets whether to show the new name option when showing
  const [ showNewName, setShowNewName ] = useState( false )
  // When a user wants to change their name.
  const [ newName, setNewName ] = useState()
  // The version of the Terms of Service
  const terms = useStaticQuery( graphql`
    query { mdx(fileAbsolutePath: {regex: "/tos.index.md/"}) {
      frontmatter { version }, body
    } }
  ` ).mdx
  // A login function that logs the user in
  const login = async() => {
    if ( email == `` || password == `` )
      setError( `Must give both email and password.` )
    else {
      setError()
      await handleLoggingIn( email, password, setUser, setError, setConfirm )
    }
  }

  // A sign up function that signs the user up
  const signup = async () => {
    if (
      email == `` || password == `` || name == `` || duplicatePassword == ``
    ) setError( `Must give email, name, and password.` )
    else if ( password != duplicatePassword )
      setError( `Passwords much match.` )
    else {
      setError()
      handleSigningUp( email, password, name, setError )
      setNewUser( true )
      setPage( `login` )
    }
  }

  // A password reset function used to send the email
  const forgot = async () => {
    if ( email == `` ) setError( `Must give email.` )
    else {
      setError()
      await handleForgotPassword( email, setError )
      setPage( `confirm` )
    }
  }

  // A submit confirm password reset function.
  const submit = async () => {
    if (
      password == `` || duplicatePassword == `` || code == ``
    ) setError( `Must give code and password.` )
    else if ( password != duplicatePassword )
      setError( `Passwords much match.` )
    else {
      setError()
      handleCheckCode( email, password, code, setError )
    }
  }

  return(
    <>
      {!user && <>
        { page == `login`
      && <Login {
        ...{ newUser, setEmail, setError, setPassword, email, setPage, error,
          needConfirm, login, resendConfrimationEmail, setNewUser }
      }/> }
        { page == `signup`
      && <SignUp {
        ...{ email, setEmail, error, setError, name, setName, password,
          setPassword, duplicatePassword, setDuplicatePassword, setPage, signup
        }
      }/> }
        { page == `forgot`
      && <Forgot {
        ...{ email, setEmail, error, setError, setPage, forgot }
      }/>}
        { page == `confirm`
      && <Confirm {
        ...{ code, setCode, password, setPassword, duplicatePassword,
          setDuplicatePassword, error, setError, setEmail, setPage, submit }
      }/>}
      </>}
      {
        user &&
        Object.keys( user.tos )
          .indexOf( terms.frontmatter.version ) >= 0 && <User {
          ...{ name: user.name, dateString: timeSince(
            String( user.dateJoined )
          ), error, handleLoggingOut, setUser, setError, isAdmin:user.isAdmin,
          setEmail, newName, setNewName, showNewName, setShowNewName, user }
        }/>
      }
      {
        user && Object.keys( user.tos )
          .indexOf( terms.frontmatter.version ) < 0 && <TOS
          body={terms.body} user={user} version={ terms.frontmatter.version }
          setError={ setError } error={ error } setUser={ setUser }
        />
      }
    </>
  )
}