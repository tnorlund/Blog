// TODO
// [ ] Remove a specific follower from the project

import React, { useState, useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import Modal from 'components/Modal'
import { AUTH_KEY } from 'utils/constants'
import {
  FollowButton, FollowingButton, FollowDiv, FollowDetails, Follower,
  FollowNumber,
  WarningDiv, AdminWarning, WarningButton, WarningDescription,
  Title, Controls, Less, More, ControlsNumber,
  User, Name, DateDiv, Remove,
  EmailButton
} from './styles'
import {
  Following, Warning, Error, AdminControls, ProjectDetails
} from './components'
import { updateUser  } from 'utils/auth'

import { API } from 'aws-amplify'

export default function Follow( { slug, title } ) {
  // Get the current user data
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
  // Set the project data
  const [ followNumber, setFollowNumber ] = useState( 0 )
  // Sets the warning whether to add a project or not.
  const [ warning, setWarning ] = useState( false )
  // Sets an error if one occurs.
  const [ error, setError ] = useState()
  // Sets whether the user is an administrator or not.
  const [ isAdmin, setAdmin ] = useState( false )
  // Sets whether the user is following the project.
  const [ isFollowing, setFollowing ] = useState( false )
  // Sets whether an API call is being made
  const [ working, setWorking ] = useState( false )
  // Sets whether the project details modal view is shown or not.
  const [ open, setModal ] = useState( false )
  const [ followers, setFollowers ] = useState( [] )

  useEffect( () => {
    /**
     * Get the project and set the project's information using the hooks.
     */
    API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/project`,
      {
        response: true,
        queryStringParameters: { slug, title }
      }
    ).then( result => {
      setFollowNumber( result.data.numberFollows )
    } ).catch( error => {
      if ( error.response.data == `Project does not exist` )
        setWarning( true )
    } )

    if ( user ) {
      /**
       * When the project is found in the projects the user follows, set the
       * button to following.
       */
      if ( user.follows )
        user.follows.map( ( project ) => {
          if ( project.title == title && project.slug == slug )
            setFollowing( true )
        } )
      /**
       * Request the project details when the user signed in is an
       * administrator.
       */
      if ( user.isAdmin ) {
        setAdmin( true )
        /**
         * Get the project details and set the project's followers based on the
         * result of the request.
         */
        API.get(
          process.env.GATSBY_API_BLOG_NAME,
          `/project-details`,
          {
            response: true,
            queryStringParameters: { slug, title }
          }
        ).then( result => {
          setFollowers( result.data.followers.map(
            follower => { return { ...follower, key: follower.username } }
          ) )
        } ).catch( error => {
          console.warn( error.response )
        } )
      }
    }
  }, [ slug, title, user, working ] )
  return(
    <>
      { warning &&
      <WarningDiv>
        <div><AdminWarning/>Project not in database</div>
        { isAdmin &&
          <div><WarningButton onClick={
            () => {
              if ( !working ) {
                setWorking( true )
                API.post(
                  process.env.GATSBY_API_BLOG_NAME,
                  `/project`,
                  { response: true, body: { slug, title } }
                ).then( () => { setError(); setWorking( false ) }
                ).catch( () => {
                  setError( `Could not add project` ); setWorking( false )
                } )
              } }
          }>Add Project</WarningButton></div>
        }
      </WarningDiv>
      }
      { !warning && <Following { ...{
        user, slug, title, setUser, setError, setFollowNumber, followNumber,
        setFollowing, isFollowing, working, setWorking
      } }/> }
      { user && user.isAdmin && !warning && <AdminControls { ...{
        slug, title, setError, setWarning, setUser, setModal, setWorking,
        working, setFollowNumber, setFollowing
      } } /> }
      { error && <Error error={error} /> }
      { !warning && <Modal
        open={ open } setModal={ setModal }
        contents={ ProjectDetails(
          title, slug, followNumber, followers, setUser, setError, setWarning,
          setFollowNumber, followNumber, setFollowing, setWorking
        ) }/>
      }
    </>
  )
}