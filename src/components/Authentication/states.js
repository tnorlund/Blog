import React from 'react'
import {
  Title, SelectedButton, WarningDiv, WarningIcon, OptionsDiv,
  OptionDiv, NewTextInput, Description, UserType, UserDetails,
  UnselectedButton
} from './styles'
import { timeSince } from 'utils/date'
import { handleNewName } from './utils'

export const Login = ( {
  newUser, setEmail, setError, setPassword, email, setPage, error, needConfirm,
  login, resendConfrimationEmail, setNewUser
} ) => <>
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
      needConfirm && <>|<OptionDiv onClick={
        () => { resendConfrimationEmail( email, setError, setNewUser ) }
      }>Resend Email</OptionDiv></>
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
</>

export const SignUp = ( {
  email, setEmail,
  error, setError,
  name, setName,
  password, setPassword,
  duplicatePassword, setDuplicatePassword,
  setPage, signup
} ) => <>
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
</>


export const Forgot = ( {
  email, setEmail,
  error, setError,
  setPage, forgot
} ) => <>
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
</>


export const Confirm = ( {
  code, setCode,
  password, setPassword,
  duplicatePassword, setDuplicatePassword,
  error, setError,
  setEmail,
  setPage, submit
} ) => <>
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
</>

export const User = ( {
  error, handleLoggingOut, setUser, setError,
  setEmail, newName, setNewName, showNewName, setShowNewName, user
} ) => <>
  <UserDetails>
    <Title>{user.name}</Title>
    {user.isAdmin && <UserType>Administrator</UserType>}
  </UserDetails>
  <Description>Joined { timeSince(
    String( user.dateJoined )
  ) }</Description>
  {
    !showNewName && <UnselectedButton
      onClick={ () => setShowNewName( !showNewName ) }
    >Change Name</UnselectedButton>
  }
  {
    showNewName && <>
      <NewTextInput
        placeholder={ user.name }
        type='name'
        onChange={ ( event ) => {
          setNewName( event.target.value )
          setError()
        } }
        value={ newName }
      />
      <SelectedButton onClick={
        () =>  handleNewName(
          user.name, user.email, user.userNumber, newName, setUser, setError,
          setShowNewName
        ) }
      > Submit </SelectedButton>
    </>
  }
  { error && <WarningDiv><WarningIcon/>
    <div
      css={`display: inline-block;
    vertical-align: middle;`}
    >{ error }</div>
  </WarningDiv> }
  <SelectedButton onClick={
    () => handleLoggingOut( setUser, setError, setEmail ) }
  >
    Sign Out
  </SelectedButton>
</>