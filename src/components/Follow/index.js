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
// import { ProjectDetails
// } from './components'
import { updateUser  } from 'utils/auth'
import { API } from 'aws-amplify'

/**
 * Adds a string to the user's clipboard.
 * @param {String} str The string added to the clipboard.
 */
const copyStringToClipboard = ( str ) => {
  let element = document.createElement( `textarea` )
  element.value = str
  element.setAttribute( `readonly`, `` )
  element.style = { position: `absolute`, left: `-9999px` }
  document.body.appendChild( element )
  element.select()
  document.execCommand( `copy` )
  document.body.removeChild( element )
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
  // Sets whether the user is an administrator or not.
  const [ isAdmin, setAdmin ] = useState( false )
  // Sets whether the user is following the project.
  const [ isFollowing, setFollowing ] = useState( false )
  // Sets whether an API call is being made
  const [ working, setWorking ] = useState( false )
  // Sets whether the project details modal view is shown or not.
  const [ open, setModal ] = useState( false )
  const [ followers, setFollowers ] = useState( [] )

  const WarningComp = <>
    <WarningDiv>
      <div><AdminWarning/>Project not in database</div>
      { isAdmin &&
    <div><WarningButton
      onClick={
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
  </>

  const ErrorComp = <>
    <WarningDiv>
      <AdminWarning/><WarningDescription>{ error }</WarningDescription>
    </WarningDiv>
  </>

  const FollowingComp = <FollowDiv>
    {
      /**
       * Show the number of followers when it is greater than 0. Otherwise,
       * show an empty div.
       */
      ( followNumber > 0 ) && <FollowDetails>
        <div><Follower /></div>{ <FollowNumber>{ followNumber }</FollowNumber> }
      </FollowDetails>
    } { ( followNumber <= 0 ) && <div></div>}
    {
      /**
       * When a user is signed in, show the button to either follow or unfollow
       * the project.
       */
      user && <div css={`margin-top:0.3em;`}>
        {
          user && !isFollowing && <FollowButton onClick={
            () => {
            /**
             * Increase the number of the project's followers. This is first
             * done by the React Hook, and then is set by the response from the
             * API.
             */
              if ( !working ) {
                setWorking( true )
                setFollowNumber( followNumber + 1 )
                setFollowing( true )
                API.post(
                  process.env.GATSBY_API_BLOG_NAME, `/project-follow`,
                  {
                    response: true,
                    body: {
                      slug, title, name: user.name, email: user.email,
                      username: user.username
                    }
                  }
                ).then( () => { updateUser( setUser ); setWorking( false ) }
                ).catch( () => {
                  setFollowNumber( followNumber - 1 )
                  setFollowing( false )
                  setError( `Could not add follow` )
                  setWorking( false )
                } )
              }
            }
          } >Follow</FollowButton>
        }
        {
          isFollowing && <FollowingButton onClick={
            () => {
            /**
             * Decrease the number of the project's followers. This is first
             * done by the React Hook, and then is set by the response from the
             * API.
             */
              if ( !working ) {
                setWorking( true )
                setFollowNumber( followNumber - 1 )
                setFollowing( true )
                API.del(
                  process.env.GATSBY_API_BLOG_NAME, `/project-follow`,
                  {
                    response: true,
                    body: {
                      slug, title, name: user.name, email: user.email,
                      username: user.username
                    }
                  }
                ).then( () => { updateUser( setUser ); setWorking( true ) }
                ).catch( () => {
                  setFollowNumber( followNumber + 1 )
                  setFollowing( false )
                  setError( `Could not add follow` )
                  setWorking( false )
                } )
              }
            }
          } >Following</FollowingButton>
        }
      </div>
    }
    {
      /**
       * When no user is signed in, show an empty div.
       */
      !user && <div></div>
    }
  </FollowDiv>

  const AdminControls = <WarningDiv>
    <div><FollowButton onClick={
      () => setModal( true )
    }>Project Details</FollowButton></div>
    <div><WarningButton onClick={
      () => {
        if ( !working ) {
          setWorking( true )
          setFollowing( false )
          API.del(
            process.env.GATSBY_API_BLOG_NAME,
            `/project`,
            { response: true, body: { title, slug } }
          ).then( () => updateUser( setUser )
          ).catch( () => console.warn( `Could not remove Project` ) )
        }
      }
    }>Remove Project</WarningButton></div>
  </WarningDiv>

  const ProjectDetails = <Modal
    open={ open } setModal={ setModal }
    contents={
      <>
        <Title>{ title }</Title>
        <Controls>
          <div><Less onClick={
            () => {
              API.post(
                process.env.GATSBY_API_BLOG_NAME, `/project-update`,
                { body: {
                  title: title, slug: slug,
                  numberFollows: String( followNumber - 1 )
                } }
              ).then( () => updateUser( setUser )
              ).catch( () => console.warn( `could not update Project` )
              )
            }
          } /></div>
          <ControlsNumber>{ followNumber }</ControlsNumber>
          <div><More onClick={
            () => {
              API.post(
                process.env.GATSBY_API_BLOG_NAME, `/project-update`,
                { body: {
                  title: title, slug: slug,
                  numberFollows: String( followNumber + 1 )
                } }
              ).then( () => updateUser( setUser )
              ).catch( () => console.warn( `could not update Project` )
              )
            }
          } /></div>
        </Controls>
        <div>
          {
            followers.map( ( { name, email, username, dateFollowed } ) => (
              <User key={ username }>
                <Name>{ name }</Name>
                <DateDiv>{ new Date( dateFollowed ).toDateString() }</DateDiv>
                <Remove onClick={ () => {
                  if ( !working ) {
                    setWorking( true )
                    setFollowNumber( followNumber - 1 )
                    setFollowing( true )
                    API.del(
                      process.env.GATSBY_API_BLOG_NAME, `/project-follow`,
                      {
                        response: true,
                        body: { slug, title, name, email, username }
                      }
                    ).then( () => { updateUser( setUser ); setWorking( true ) }
                    ).catch( () => {
                      setFollowNumber( followNumber + 1 )
                      setFollowing( false )
                      setError( `Could not add follow` )
                      setWorking( false )
                    } )
                  }
                }
                } />
              </User>
            ) )
          }
        </div>
        <EmailButton onClick={
          () => copyStringToClipboard(
            followers.map( follower => follower.email ).join( `, ` ) )
        }>Followers&apos;s Emails</EmailButton>
      </>
    }
  />

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
      if (
        error.response &&
        error.response.data == `Project does not exist`
      )
        setWarning( true )
      else{
        // TODO - Set error when the API is not accessible
        console.warn( `API not working` )
        // setError( `Could not use API` )
      }
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
      { warning && <WarningComp/> }
      {/* { !warning && <FollowingComp /> } */}
      { user && user.isAdmin && !warning && <AdminControls /> }
      { error && <ErrorComp /> }
      {/* { !warning && <ProjectDetails /> } */}
    </>
  )
}