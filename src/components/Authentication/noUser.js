import React, { useState } from 'react'
import {
  handleLoggingIn, handleCheckCode, handleForgotPassword, handleSigningUp,
  handleLoggingOut
} from './utils'
import { timeSince } from 'utils/date'
import { Login, SignUp, Forgot, Confirm, User } from './states'

export default function NoUser( user, setUser ) {
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

  // A login function that logs the user in
  const login = async() => {
    if ( email == `` || password == `` )
      setError( `Must give both email and password.` )
    else {
      setError()
      await handleLoggingIn( email, password, setUser, setError, setConfirm )
      setEmail( `` )
      setPassword( `` )
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

  // eslint-disable-next-line no-console

  let dateString
  if ( user ) {
    dateString = timeSince( String( user.dateJoined ) )
  }

  return(
    <>
      {!user && <>
        { page == `login`
      && <Login {
        ...{ newUser, setEmail, setError, setPassword, email, setPage, error,
          needConfirm, login }
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
        user && <User {
          ...{ name: user.name, dateString, error, handleLoggingOut, setUser,
            setError }
        }/>
      }

    </>
  )
}