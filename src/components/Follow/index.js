import React, { useState, useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import Modal from 'components/Modal'
import {
  FollowButton, FollowingButton, FollowDiv, Follower, FollowDetails,
  AdminWarning, WarningDiv, WarningButton, FollowNumber, Title, User,
  Name, DateDiv, Remove, More, Less, Controls, ControlsNumber,
  WarningDescription, EmailButton
} from './styles'
import { AUTH_KEY } from 'utils/constants'
import {
  removeFollow, getProject, addFollow, addProject, getProjectDetails,
  removeProject, updateProject
} from './utils'

/**
 * Adds a string to the user's clipboard.
 * @param {String} str The string added to the clipboard.
 */
function copyStringToClipboard ( str ) {
  // Create new element
  let el = document.createElement( `textarea` )
  // Set value (string to be copied)
  el.value = str
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute( `readonly`, `` )
  el.style = { position: `absolute`, left: `-9999px` }
  document.body.appendChild( el )
  // Select text inside element
  el.select()
  // Copy text to clipboard
  document.execCommand( `copy` )
  // Remove temporary element
  document.body.removeChild( el )
}

/**
 * Creates the modal view for administrative control over the project.
 * @param {Object}   details    The project details and its followers.
 * @param {Function} setUser    The function used to set the user details in
 *                              session storage.
 * @param {Function} setError   The function used to set an error if there is
 *                              any while retrieving data from the database.
 * @param {Function} setWarning The function used to set whether the project
 *                              was retrieved successfully from the database.
 */
function ProjectDetails( details, setUser, setError, setWarning ) {
  const { title, slug, numberFollows } = details[0]
  const followers = details.slice( 1, details.length )
  const emails = followers.map( follower => follower.email ).join( `, ` )
  return(
    <>
      <Title>{ title }</Title>
      <Controls>
        <div><Less onClick={ () => updateProject(
          slug, title, numberFollows - 1, setError, setWarning, setUser
        ) }/></div>
        <ControlsNumber>{ numberFollows }</ControlsNumber>
        <div><More onClick={ () => updateProject(
          slug, title, numberFollows + 1, setError, setWarning, setUser
        ) }/></div>
      </Controls>
      <div>
        {
          followers.map( ( { userName, email, userNumber, dateFollowed } ) => (
            <User key={ userName }>
              <Name>{ userName }</Name>
              <DateDiv>{ new Date( dateFollowed ).toDateString() }</DateDiv>
              <Remove onClick={ () => removeFollow(
                { name: userName, email: email, userNumber: userNumber },
                slug, title, setUser, setError
              ) } />
            </User>
          ) )
        }
      </div>
      <EmailButton onClick={
        () => copyStringToClipboard( emails )
      }>Followers&apos;s Emails</EmailButton>
    </>
  )
}

export default function Follow( { slug, title } ) {
  // Get the current user data
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
  // Set the project data
  const [ followNumber, setFollowNumber ] = useState( 0 )
  // Sets the warning whether to add a project or not.
  const [ warning, setWarning ] = useState( false )
  // Sets an error if one occurs.
  const [ error, setError ] = useState()
  // Sets whether to show the modal view of the project's details.
  const [ projectDetails, setProjectDetails ] = useState( {
    open: false, content: undefined
  } )
  // Before anything is rendered to the screen, get the project's data.
  // Before the modal view is rendered, set the styles of the document.
  useEffect( () => {
    getProject( slug, title, setError ).then( ( { project, error } ) => {
      if ( error == `Project does not exist` && user.isAdmin )
        setWarning( true )
      else setFollowNumber( project.numberFollows )
    } )
    if ( user && user.isAdmin ) {
      getProjectDetails( slug, title, setError ).then(
        ( project ) =>
          setProjectDetails( { ...projectDetails, content: project } )
      )
    }
  }, [ user, warning, slug, title ] )
  return(
    <>
      {// If the project is not in the database and the current user is Admin,
      //  give the option to add the project to the database.
        warning
      && <WarningDiv>
        <div><AdminWarning/>Project not in database</div>
        <div><WarningButton onClick={
          () => { addProject( slug, title, setWarning, setError ) }
        }>Add Project</WarningButton></div>
      </WarningDiv>
      }
      {
        !warning
        && <FollowDiv>
          <FollowDetails>
            <div><Follower /></div><FollowNumber>{ followNumber }</FollowNumber>
          </FollowDetails>
          <div>
            {// If the user is logged in and they are not following the project.
              user &&
              user.follows.map( follow => follow.slug ).indexOf( slug ) < 0
            && <FollowButton onClick={
              () => addFollow( user, slug, title, setUser, setError )
            } >Follow</FollowButton> }

            {// If the user is logged in and they are following the project.
              user &&
              user.follows.map( follow => follow.slug ).indexOf( slug ) >= 0
            && <FollowingButton onClick={
              () => removeFollow( user, slug, title, setUser, setError )
            } >Following</FollowingButton> }
          </div>
        </FollowDiv>
      }
      {// If the user is an Admin, give the option to remove project.
        user && user.isAdmin && !warning
        && <WarningDiv>
          <div><FollowButton onClick={
            () => {
              setProjectDetails( { ...projectDetails, open: true } )
            }
          }>Project Details</FollowButton></div>
          <div><WarningButton onClick={
            () => removeProject( slug, title, setError, setWarning, setUser )
          }>Remove Project</WarningButton></div>
        </WarningDiv>
      }
      {
        error
      && <WarningDiv>
        <AdminWarning/><WarningDescription>{error}</WarningDescription>
      </WarningDiv>
      }
      {
        projectDetails.content && projectDetails.content.length > 0 && !warning
        && <Modal open={ projectDetails.open } closeModal={
          () => setProjectDetails( { ...projectDetails, open: false } )
        } contents={
          ProjectDetails(
            projectDetails.content, setUser, setError, setWarning
          )
        }/>
      }
    </>
  )
}