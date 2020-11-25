import React, { useState, useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import Modal from 'components/Modal'
import { AUTH_KEY } from 'utils/constants'
import { getProject, getProjectDetails } from './utils'
import {
  Following, Warning, Error, AdminControls, ProjectDetails
} from './components'

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
  // Sets whether the user is an administrator or not.
  const [ isAdmin, setAdmin ] = useState( false )
  // Sets whether the user is following the project.
  const [ isFollowing, setFollowing ] = useState( false )
  // Sets whether an API call is being made
  const [ working, setWorking ] = useState( false )
  // Sets whether the project details modal view is shown or not.
  const [ open, setModal ] = useState( false )
  const [ followers, setFollowers ] = useState( [] )
  // Before anything is rendered to the screen, get the project's data.
  // Before the modal view is rendered, set the styles of the document.
  useEffect( () => {
    getProject( slug, title, setError ).then( ( { project, error } ) => {
      // If the project is not in the database and the use is an administrator,
      // give them the opportunity to create the project.
      if ( error == `Project does not exist` )
        setWarning( true )
      else setFollowNumber( project.numberFollows )
    } )
    if ( user ) {
      // Iterate over the projects the user follows. If the title is found in
      // the projects they follow, set the state to following.
      user.follows.map( ( project ) => {
        if ( project.title == title && project.slug == slug )
          setFollowing( true )
      } )
      if ( user.isAdmin ) {
        setAdmin( true )
        getProjectDetails( slug, title, setError ).then(
          ( followers ) => { 
            setFollowers( followers )
            setProjectDetails( { ...projectDetails, content: followers } )
          }
        )
      }
    }
  }, [ user ] )
  return(
    <>
      { warning && <Warning { ...{
        isAdmin, slug, title, setWarning, setError, working, setWorking
      } } /> }
      { !warning && <Following { ...{
        user, slug, title, setUser, setError, setFollowNumber, followNumber,
        setFollowing, isFollowing, working, setWorking
      } }/> }
      { user && user.isAdmin && !warning && <AdminControls { ...{
        slug, title, setError, setWarning, setUser, setModal, setWorking,
        working, setFollowNumber, setFollowing
      } } /> }
      { error && <Error error={error} /> }
      { projectDetails.content && projectDetails.content.length > 0 && !warning
        && <Modal open={ open } setModal={ setModal } contents={ ProjectDetails(
          projectDetails.content, setUser, setError, setWarning
        ) }/> }
    </>
  )
}