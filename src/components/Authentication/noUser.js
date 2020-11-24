import React, { useState } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { updateUserBySession } from 'utils/auth'
import {
  Title, TextInput, SelectedButton, WarningDiv, WarningIcon, OptionsDiv,
  OptionDiv, NewTextInput, Description
} from './styles'
import { Auth, API } from 'aws-amplify'

/**
 * Handles the state of the modal view while logging in.
 * @param {String}   email      The user's email.
 * @param {String}   password   The user's password.
 * @param {Function} setUser    The function used to set the user's detail into
 *                              session storage.
 * @param {Function} setConfirm The function used to set whether to resend the
 *                              confirmation email.
 */
const handleLoggingIn = async (
  email, password, setUser, setError, setConfirm
) => {
  try {
    const session = await Auth.signIn( email, password )
    await updateUserBySession( session, setUser )
  } catch ( error ) {
    if ( error.code == `UserNotConfirmedException` )
      setConfirm( true )
    setError( error.message )
  }
}

/**
 * Handles the state of the modal view when signing up.
 * @param {String}   email    The user's email.
 * @param {String}   password The user's password.
 * @param {String}   name     The user's name.
 * @param {Function} setError The function used to set the error if one occurs.
 */
const handleSigningUp = async ( email, password, name, setError ) => {
  try {
    const { error, blog } = await API.get( `blogAPI`, `/blog` )
    if ( error ) setError( error )
    else {
      const result = await Auth.signUp( {
        username: email, password: password, attributes: {
          email: email, name: name,
          'custom:UserNumber': `${ blog.numberUsers + 1 }`
        }
      } )
      console.log( result )
    }
  } catch( error ) {
    setError( error.message )
  }
}

/**
 *
 * @param {String} email
 * @param {Function} setError
 */
const handleForgotPassword = async ( email, setError ) => {
  try {
    return await Auth.forgotPassword( email )
  } catch ( error ) { setError( error.message ) }
}

/**
 *
 * @param {*} email
 * @param {*} password
 * @param {*} code
 * @param {*} setError
 */
const handleCheckCode = async ( email, password, code, setError ) => {
  try {
    return await Auth.forgotPasswordSubmit( email, code, password )
  } catch ( error ) {
    setError( error.message )
  }
}

export default function NoUser( setUser ) {
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
      handleLoggingIn( email, password, setUser, setError, setConfirm )
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
      { page == `login`
      && <>
        <Title>Login</Title>
        { newUser
        && <Description>
          Use the link in the email sent to you to confirm your email address.
        </Description> }
        <NewTextInput
          placeholder={ `Email` }
          onChange={ ( event ) => {
            setEmail( event.target.value )
            setError()
          } }
          value={ email }
        />
        <NewTextInput
          type='password'
          placeholder='Password'
          onChange={ ( event ) => {
            setPassword( event.target.value )
            setError()
          } }
          // value={ password }
        />
        <OptionsDiv>
          <OptionDiv onClick={ () => {
            setEmail( `` )
            setPassword( `` )
            setPage( `signup` )
          } }>Sign Up</OptionDiv> |
          <OptionDiv onClick={ () => {
            setEmail( `` )
            setPassword( `` )
            setPage( `forgot` )
          } }>Forgot Password</OptionDiv>{
            needConfirm && <>|<OptionDiv>Resend Email</OptionDiv></>
          }
        </OptionsDiv>
        { error && <WarningDiv><WarningIcon/>
          <div
            css={`display: inline-block;
          vertical-align: middle;`}
          >{ error }</div>
        </WarningDiv>}
        <SelectedButton onClick={ () => login() }>
          Login
        </SelectedButton>
      </> }
      { page == `signup`
      && <>
        <Title>Sign Up</Title>
        <NewTextInput
          placeholder={ `Email` }
          onChange={ ( event ) => {
            setEmail( event.target.value )
            setError()
          } }
          value={ email }
        />
        <NewTextInput
          placeholder={ `Name` }
          onChange={ ( event ) => {
            setName( event.target.value )
            setError()
          } }
          value={ name }
        />
        <NewTextInput
          placeholder='Password'
          type='password'
          onChange={ ( event ) => {
            setPassword( event.target.value )
            setError()
          } }
          value={ password }
        />
        <NewTextInput
          placeholder='Password'
          type='password'
          onChange={ ( event ) => {
            setDuplicatePassword( event.target.value )
            setError()
          } }
          value={ duplicatePassword }
        />
        <OptionsDiv>
          <OptionDiv onClick={ () => {
            setEmail( `` )
            setPassword( `` )
            setName( `` )
            setDuplicatePassword( `` )
            setError()
            setPage( `login` )
          } } >Log In</OptionDiv>
        </OptionsDiv>
        { error && <WarningDiv><WarningIcon/>
          <div
            css={`display: inline-block;
          vertical-align: middle;`}
          >{ error }</div>
        </WarningDiv>}
        <SelectedButton onClick={ () => signup() }>
          Submit
        </SelectedButton>
      </> }
      { page == `forgot`
      && <>
        <Title>Forgot Password</Title>
        <NewTextInput
          placeholder={ `Email` }
          onChange={ ( event ) => {
            setEmail( event.target.value )
            setError()
          } }
          value={ email }
        />
        <OptionsDiv>
          <OptionDiv onClick={ () => {
            setEmail( `` )
            setError()
            setPage( `login` )
          } }>Sign In</OptionDiv>
        </OptionsDiv>
        { error && <WarningDiv><WarningIcon/>
          <div
            css={`display: inline-block;
          vertical-align: middle;`}
          >{ error }</div>
        </WarningDiv>}
        <SelectedButton onClick={ () => forgot() }>
          Submit
        </SelectedButton>
      </> }
      { page == `confirm`
      && <>
        <Title>Confirm Email</Title>
        <NewTextInput
          placeholder={ `Code` }
          onChange={ ( event ) => {
            setCode( event.target.value )
            setError()
          } }
          value={ code }
        />
        <NewTextInput
          placeholder='Password'
          type='password'
          onChange={ ( event ) => {
            setPassword( event.target.value )
            setError()
          } }
          value={ password }
        />
        <NewTextInput
          placeholder='Password'
          type='password'
          onChange={ ( event ) => {
            setDuplicatePassword( event.target.value )
            setError()
          } }
          value={ duplicatePassword }
        /><OptionsDiv>
          <OptionDiv onClick={ () => {
            setEmail( `` )
            setPassword( `` )
            setDuplicatePassword( `` )
            setError()
            setPage( `login` )
          } }>Sign In</OptionDiv>
        </OptionsDiv>
        { error && <WarningDiv><WarningIcon/>
          <div
            css={`display: inline-block;
          vertical-align: middle;`}
          >{ error }</div>
        </WarningDiv>}
        <SelectedButton onClick={ () => submit() }>
          Submit
        </SelectedButton>
      </> }
    </>
  )
}