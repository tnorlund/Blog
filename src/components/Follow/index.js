import React, { useState, useEffect } from 'react'
import { useTransition, Spring, useSpring, config } from 'react-spring'

import {
  FollowButton, FollowingButton, FollowDiv, Icon, TextDiv, FollowNumber
} from './styles'
import { useSessionStorage } from 'hooks'
import { API } from 'aws-amplify'
import { AUTH_KEY } from 'utils/constants'

const addFollow = async ( requestedUser, slug, title ) => {
  await API.post(
    `blogAPI`,
    `/project`,
    { body: {
      slug: slug,
      title: title,
      name: requestedUser.name,
      email: requestedUser.email,
      userNumber: requestedUser.userNumber
    } }
  )
  try {
    const { projectFollow, error } = await API.post(
      `blogAPI`,
      `/project-follow`,
      { body: {
        slug: slug,
        title: title,
        name: requestedUser.name,
        email: requestedUser.email,
        userNumber: requestedUser.userNumber
      } }
    )
    if ( error ) console.log( `error`, error )
    console.log( `projectFollow`, projectFollow )
    // setLoading( true )
    // if ( error ) return { error: error }
    // else return { user: user }
  } catch( error ) {
    // return { error: error }
    console.log( `errored`, error )
  }
}

const removeFollow = async ( requestedUser, slug, title ) => {
  // await API.post(
  //   `blogAPI`,
  //   `/project`,
  //   { body: {
  //     slug: slug,
  //     title: title,
  //     name: requestedUser.name,
  //     email: requestedUser.email,
  //     userNumber: requestedUser.userNumber
  //   } }
  // )
  try {
    // const { user, project, error } 
    const response = await API.del(
      `blogAPI`,
      `/project-follow`,
      { body: {
        slug: slug,
        title: title,
        name: requestedUser.name,
        email: requestedUser.email,
        userNumber: requestedUser.userNumber
      } }
    )
    // console.log( `user`, user )
    // console.log( `project`, project )
    // console.log( `error`, error )
    console.log( `response`, response )
  } catch( error ) {
    console.log( `errored`, error )
  }
}

const getProject = async ( slug, title ) => {
  try {
    const { project, error } = await API.get(
      `blogAPI`,
      `/project?slug=${ slug }&title=${ title }`
    )
    if ( error ) return { error: error }
    return { project: project }
  } catch( error ) { return { error: error } }
}


export default function Follow( { slug, title } ) {
  // Get the current user data
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
  // Set the project data
  const [ projectDetails, setProjectDetails ] = useState( {
    numberFollowers: 0
  } )
  // Set whether to show or not.
  const [ show, setShow ] = useState( false )
  // React-spring
  const fade = useSpring( {
    config: config.wobbly,
    opacity: show ? 1 : 0,
    delay: 800,
    duration: 1000
  } )
  // Before anything is rendered to the screen, get the project's data.
  // Before the modal view is rendered, set the styles of the document.
  useEffect( () => {
    console.log(`getting data`)
    getProject( slug, title ).then( ( { project, error } ) => {
      if ( error == "Project does not exist" ) {
        console.log(error)
      }
      else setProjectDetails( { numberFollowers: project.numberFollows } )
      setShow( true )
      console.log(`got data`)
    } )
  }, [] )
  return(
    <FollowDiv style={{...fade}}>
      {
        projectDetails.numberFollowers > 0
        && <TextDiv>
          <Icon />
          <FollowNumber>{projectDetails.numberFollowers}</FollowNumber>
        </TextDiv>
      }
      {// If the user is logged in and they are not following the project.
        user
      && user.follows.map( follow => follow.slug ).indexOf( slug ) < 0
      && <FollowButton onClick={
        () => addFollow( user, slug, title )
      } >Follow</FollowButton>}
      {// If the user is logged in and they are following the project.
        user
      && user.follows.map( follow => follow.slug ).indexOf( slug ) >= 0
      && <FollowingButton onClick={
        () => removeFollow( user, slug, title )
      } >Following</FollowingButton>}
    </FollowDiv>
  )
}