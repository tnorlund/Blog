import React from 'react'
import {
  FollowButton, FollowingButton, FollowDiv, FollowDetails, Follower,
  FollowNumber,
  WarningDiv, AdminWarning, WarningButton, WarningDescription,
  Title, Controls, Less, More, ControlsNumber,
  User, Name, DateDiv, Remove,
  EmailButton
} from './styles'
import {
  addFollow, removeFollow, addProject, removeProject, updateProject,
  copyStringToClipboard
} from './utils'

const AddFollow = ( {
  user, slug, title, setUser, setError, setFollowNumber,
  followNumber, setFollowing, working, setWorking
} ) => <>
  <FollowButton onClick={
    () => {
      if ( !working ) {
        setWorking( true )
        addFollow(
          user, slug, title, setUser, setError, setFollowNumber,
          followNumber, setFollowing, setWorking
        ) } }
  } >Follow</FollowButton>
</>

const RemoveFollow = ( {
  user, slug, title, setUser, setError, setFollowNumber,
  followNumber, setFollowing, working, setWorking
} ) => <>
  <FollowingButton onClick={
    () => {
      if ( !working ) {
        setWorking( true )
        removeFollow( user, slug, title, setUser, setError, setFollowNumber,
          followNumber, setFollowing, setWorking
        )
      }
    }
  } >Following</FollowingButton>
</>

export const Following = ( {
  user, slug, title, setUser, setError, setFollowNumber,
  followNumber, setFollowing, isFollowing, working, setWorking
} ) =>
  <FollowDiv>
    { ( followNumber > 0 ) && <FollowDetails>
      <div><Follower /></div>{
        <FollowNumber>{ followNumber }</FollowNumber>
      }
    </FollowDetails> }
    { ( followNumber <= 0 ) && <div></div>}
    {user &&
    <div css={`margin-top:0.3em;`}>
      {user && !isFollowing && <AddFollow {
        ...{
          user, slug, title, setUser, setError, setFollowNumber,
          followNumber, setFollowing, working, setWorking
        }
      }/> }
      {isFollowing && <RemoveFollow {
        ...{
          user, slug, title, setUser, setError, setFollowNumber,
          followNumber, setFollowing, working, setWorking
        }
      }/>}
    </div>}
    {!user && <div></div>}
  </FollowDiv>

export const Warning = ( {
  isAdmin, slug, title, setWarning, setError, working, setWorking
} ) =>
  <WarningDiv>
    <div><AdminWarning/>Project not in database</div>
    { isAdmin && <div><WarningButton onClick={
      () => { if ( !working ) {
        setWorking( true )
        addProject( slug, title, setWarning, setError, setWorking ) } }
    }>Add Project</WarningButton></div> }
  </WarningDiv>

export const Error = ( { error } ) => <>
  <WarningDiv>
    <AdminWarning/><WarningDescription>{error}</WarningDescription>
  </WarningDiv>
</>

export const AdminControls = ( {
  slug, title, setError, setWarning, setUser, setModal, setWorking, working,
  setFollowNumber, setFollowing
} ) =>
  <WarningDiv>
    <div><FollowButton onClick={
      () => setModal( true )
    }>Project Details</FollowButton></div>
    <div><WarningButton onClick={
      () => {
        if ( !working ) {
          setWorking( true )
          setFollowing( false )
          removeProject(
            slug, title, setError, setWarning, setUser, setWorking,
            setFollowNumber
          ) } }
    }>Remove Project</WarningButton></div>
  </WarningDiv>

export /**
* Creates the modal view for administrative control over the project.
* @param {Object}   details    The project details and its followers.
* @param {Function} setUser    The function used to set the user details in
*                              session storage.
* @param {Function} setError   The function used to set an error if there is
*                              any while retrieving data from the database.
* @param {Function} setWarning The function used to set whether the project
*                              was retrieved successfully from the database.
*/
const ProjectDetails = (
  title, slug, numberFollows, followers, setUser, setError, setWarning,
  setFollowNumber, followNumber, setFollowing, setWorking
) => {
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
                slug, title, setUser, setError, setFollowNumber, followNumber,
                setFollowing, setWorking
              ) } />
            </User>
          ) )
        }
      </div>
      <EmailButton onClick={
        () => copyStringToClipboard(
          followers.map( follower => follower.email ).join( `, ` ) )
      }>Followers&apos;s Emails</EmailButton>
    </>
  )
}