import React, { useState, useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import {
  getPost, addPost, addComment, getPostDetails, deleteComment
} from './utils'
import {
  Title,
  WarningDiv, WarningButton, WarningIcon,
  SelectedButton, UnselectedButton,
  TextInput,
  CommentText, CommentDiv, CommentOption, CommentOptions
} from './styles'
import { timeSince } from 'utils/date'

// TODO
// [ ] Refactor 'uploading' to working.

/**
 * Sets the contents of a div using a React Hook.
 * @param {String}   id     The HTML ID of the div requested to query from.
 */
const getTextInput = ( id ) => document.getElementById( id ).innerHTML
  .replace( /<div>/g, `\n` )
  .replace( /<\/div>/g, `` )
  .replace( /<br>/g, `` )

const resetTextInput = ( id ) => {
  document.getElementById( id ).innerHTML = ``
}

/**
 * Component for each comment.
 * @param {Object}   comment
 * @param {Object}   currentUser
 * @param {Boolean}  working
 * @param {Function} setWorking
 */
const Comment = (
  slug, title, comment, currentUser, working, setWorking, setError, setWarning
) => {
  const { dateAdded, text, postCommentNumber } = comment
  console.log( dateAdded )
  const commentUserName = comment.userName
  const commentUserNumber = comment.userNumber
  const { email, isAdmin } = currentUser
  const currentUserName = currentUser.name
  const currentUserEmail = currentUser.email
  const currentUserNumber = currentUser.userNumber
  // Only show the delete option if the user is logged in and the user is and
  // administrator, or show the option if the user is logged in and the comment
  // is theirs.
  const showDelete = currentUser && ( isAdmin || (
    commentUserName == currentUserName &&
    commentUserNumber == currentUserNumber
  ) )
  return(
    <CommentDiv key={ commentUserName + dateAdded + text }>
      <Title>{ commentUserName } - { timeSince( dateAdded ) }</Title>
      <CommentText>{ text }</CommentText>
      { currentUser && <CommentOptions>
        {
          showDelete && <><CommentOption onClick={ () => {
            if ( !working ) {
              setWorking( true )
              deleteComment(
                commentUserName, currentUserEmail, commentUserNumber, slug,
                title, dateAdded, setError, setWarning
              ).then( () => {
                setWorking( false )
              } )
            }
          } }>Delete</CommentOption>|</>
        }
        <CommentOption>Reply</CommentOption>
      </CommentOptions>}
    </CommentDiv>
  )
}

export default function Comments( { slug, title } ) {
  // Get the current user data
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
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
  // Sets whether currently making an API request.
  const [ working, setWorking ] = useState( false )
  // The comment components
  const [ commentComponents, setCommentComponents ] = useState( [] )
  // Before anything is rendered to the screen, get the post's comments.
  useEffect( () => {
    getPostDetails( slug, title, setWarning, setError ).then(
      ( { post, comments, error } ) => {
        if ( error ) setError( error )
        // If the post does not exist in the data base, there are no
        // comments, and the user is an administrator, allow them to create the
        // post.
        if ( !post && comments.length == 0 && user && user.isAdmin )
          setWarning( true )
        // setComments( comments )
        setCommentComponents( comments.map(
          ( comment ) => Comment(
            slug, title, comment, user, working, setWorking, setError,
            setWarning
          )
        ) )
      } ).catch( ( error ) => setError( error ) )
  }, [slug, title, user, warning, working] )
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
              if ( !working ) {
                setWorking( true )
                addComment(
                  user.name, user.email, user.userNumber, slug, title,
                  getTextInput( `NewComment` ), setWarning, setError, setComment
                ).then( () => {
                  setWorking( false ); resetTextInput( `NewComment` )
                  setComment( `` )
                } )
              }
            } }
            css={`
            margin-left: auto;
          `}>Submit</SelectedButton>}
        </div></>
        }
        { commentComponents }
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