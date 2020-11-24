import React, { useState, useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { getPost, addPost, addComment, getPostDetails } from './utils'
import {
  Title,
  WarningDiv, WarningButton, WarningIcon,
  SelectedButton, UnselectedButton,
  TextInput,
  CommentText, CommentDiv, CommentOption, CommentOptions
} from './styles'

/**
 * Converts an ISO formatted date into a Date object.
 * @param {String} dateString An ISO formatted date.
 * @returns A Date object.
 */
const parseDate = ( dateString ) => {
  const parsed = dateString.split( /\D+/ )
  return( new Date( Date.UTC(
    parsed[0], --parsed[1], parsed[2], parsed[3], parsed[4], parsed[5],
    parsed[6]
  ) ) )
}

/**
 * Sets the contents of a div using a React Hook.
 * @param {String}   id     The HTML ID of the div requested to query from.
 * @param {Function} setter The React Hook used to set the value.
 */
const handleTextInput = ( id, setter ) => {
  // console.log( `handleTextInput`, 
  //   document.getElementById( id ).innerHTML
  //     .replace( /<div>/g, `\n` )
  //     .replace( /<\/div>/g, `` )
  //     .replace( /<br>/g, `` )
  // )
  // console.log( `setter`, setter )
  setter(
    document.getElementById( id ).innerHTML
      .replace( /<div>/g, `\n` )
      .replace( /<\/div>/g, `` )
      .replace( /<br>/g, `` )
  )
  console.log( `tyler` )
  setter( `tyler` )
}

const getTextInput = ( id ) => document.getElementById( id ).innerHTML
  .replace( /<div>/g, `\n` )
  .replace( /<\/div>/g, `` )
  .replace( /<br>/g, `` )

const resetTextInput = ( id ) => {
  document.getElementById( id ).innerHTML = ``
}

function yearsBetween( date1, date2 ) {
  return Math.abs(
    new Date( Math.abs( date1 - date2 ) ).getUTCFullYear() - 1970
  )
}

function monthsBetween( date1, date2 ) {
  let months = ( date2.getFullYear() - date1.getFullYear() ) * 12
  months -= date1.getMonth()
  months += date2.getMonth()
  return months <= 0 ? 0 : months
}

function daysBetween( date1, date2 ) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24
  // Calculate the difference in milliseconds
  const differenceMs = Math.abs( date1 - date2 )
  // Convert back to days and return
  return Math.round( differenceMs / ONE_DAY )
}

function hoursBetween( date1, date2 ) {
  return Math.floor( ( Math.abs( date1 - date2 ) / 1000 ) / 60 / 60 )
}

function minutesBetween( date1, date2 ) {
  return Math.floor( ( Math.abs( date1 - date2 ) / 1000 ) / 60 )
}

function secondsBetween( date1, date2 ) {
  return Math.floor( Math.abs( date1 - date2 ) / 1000 )
}

function handleDateString( dateAdded ) {
  let dateString
  if ( secondsBetween( parseDate( dateAdded ), new Date() ) < 60 )
    dateString = `${
      secondsBetween( parseDate( dateAdded ), new Date() )
    } sec ago`
  else if (
    minutesBetween( parseDate( dateAdded ), new Date() ) < 60 &&
    minutesBetween( parseDate( dateAdded ), new Date() ) > 0
  ) dateString = `${
    minutesBetween( parseDate( dateAdded ), new Date() )
  } min ago`
  else if (
    hoursBetween( parseDate( dateAdded ), new Date() ) < 60 &&
    hoursBetween( parseDate( dateAdded ), new Date() ) > 0
  ) dateString = `${
    hoursBetween( parseDate( dateAdded ), new Date() )
  } hr ago`
  else if (
    daysBetween( parseDate( dateAdded ), new Date() ) < 31 &&
    daysBetween( parseDate( dateAdded ), new Date() ) > 0
  ) {
    if ( daysBetween( parseDate( dateAdded ), new Date() ) > 1 )
      dateString = `${
        daysBetween( parseDate( dateAdded ), new Date() )
      } days ago`
    else dateString = `${
      daysBetween( parseDate( dateAdded ), new Date() )
    } day ago`
  }
  else if (
    monthsBetween( parseDate( dateAdded ), new Date() ) < 31 &&
    monthsBetween( parseDate( dateAdded ), new Date() ) > 0
  ) {
    if ( monthsBetween( parseDate( dateAdded ), new Date() ) > 1 )
      dateString = `${
        monthsBetween( parseDate( dateAdded ), new Date() )
      } months ago`
    else dateString = `${
      monthsBetween( parseDate( dateAdded ), new Date() )
    } month ago`
  } else {
    if ( yearsBetween( parseDate( dateAdded ),  new Date() ) > 1 )
      dateString = `${
        yearsBetween( parseDate( dateAdded ),  new Date() )
      } years ago`
    else dateString = `${
      yearsBetween( parseDate( dateAdded ),  new Date() )
    } year ago`
  }
  return dateString
}

/**
 * Component for each comment.
 * @param {Object} comment 
 * @param {Object} currentUser 
 */
const Comment = ( comment, currentUser ) => {
  const { userName, dateAdded, text, userNumber } = comment
  // Only show the delete option if the user is logged in and the user is and
  // administrator, or show the option if the user is logged in and the comment
  // is theirs.
  const showDelete = currentUser && ( currentUser.isAdmin || (
    userName == currentUser.name && userNumber == currentUser.userNumber
  ) )
  return(
    <CommentDiv key={ userName + dateAdded + text }>
      <Title>{ userName } - { handleDateString( dateAdded ) }</Title>
      <CommentText>{ text }</CommentText>
      { currentUser && <CommentOptions>
        {
          showDelete && <><CommentOption>Delete</CommentOption>|</>
        }
        <CommentOption>Reply</CommentOption>
      </CommentOptions>}
    </CommentDiv>
  )
}

export default function Comments( { slug, title } ) {
  // Get the current user data
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
  // Set the number of comments in the post
  const [ commentNumber, setCommentNumber ] = useState( 0 )
  // Sets the warning whether to add a project or not.
  const [ warning, setWarning ] = useState( false )
  // Sets an error if one occurs.
  const [ error, setError ] = useState()
  // Sets whether to show the modal view of the post's details.
  const [ postDetails, setPostDetails ] = useState( {
    open: false, content: undefined
  } )
  // Sets an the user's comment text.
  const [ comment, setComment ] = useState( `` )
  // Sets the comments of the post.
  const [ comments, setComments ] = useState( [] )
  const [ uploading, setUpload ] = useState( false )
  // Before anything is rendered to the screen, get the post's comments.
  useEffect( () => {
    getPostDetails( slug, title, setWarning, setError ).then(
      ( { post, comments, error } ) => {
        // If the project does not exist and the user is an administrator
        // give them the opportunity to add the post to the database.
        if ( error == `Project does not exist` && user.isAdmin )
          setWarning( true )
        setCommentNumber( post.numberComments )
        setComments( comments )
      } ).catch( ( error ) => setError( error ) )
  }, [ user, warning, uploading ] )
  return(
    <>
      {// If the user is an administrator, give the option to remove the post
      //  from the database.
        user && user.isAdmin && !warning
      && <WarningDiv>
        <div><UnselectedButton>Post Details</UnselectedButton></div>
        <div><WarningButton>Remove Post</WarningButton></div>
      </WarningDiv> }
      {// If there is no warning, show the comment title and the option to add
      //  comments.
        !warning
      && <><Title>Comments</Title>
        { user
        && <><TextInput
          id={`NewComment`}
          contentEditable={ `true` }
          content = { comment }
        />
        {
          error
        && <WarningDiv>
          <WarningIcon/><div css={`padding: 0.5em;`}>{error}</div>
        </WarningDiv>
        }
        <div css={`
          margin: 0.5em;
          margin-top: 0;
        `}>
          {<SelectedButton
            onClick={ () => {
              setUpload( true )
              addComment(
                user.name, user.email, user.userNumber, slug, title,
                getTextInput( `NewComment` ), setWarning, setError, setComment
              ).then( () => {
                setUpload( false )
                resetTextInput( `NewComment` )
                setComment( `` )
              } )
            } }
            css={`
            margin-left: auto;
          `}>Submit</SelectedButton>}
        </div></>
        }
        {// If there are comments from the database, show them here.
          comments.length > 0 && comments.map(
            ( comment ) => Comment( comment, user )
          )
        }
      </> }
      {// If the post is not found in the database, give the option to add it
      //  to the database.
        warning
        && <WarningDiv>
          <div><WarningIcon/>Post not in database</div>
          <div><WarningButton onClick={
            () => addPost( slug, title, setWarning, setError )
          }>Add Post</WarningButton></div>
        </WarningDiv> }
    </>
  )
}