import React from 'react'
import {
  addPost, addComment, deleteComment, deletePost,
  addUpVote, addDownVote, removeVote, getTextInput, resetTextInput
} from './utils'
import {
  Title,
  WarningDiv, WarningButton, WarningIcon,
  SelectedButton, UnselectedButton,
  CommentText, CommentDiv, CommentOption, CommentOptions,
  Up, Down, SelectedDown, SelectedUp
} from './styles'
import { timeSince } from 'utils/date'

export const UpVote = ( {
  myUpVote, working, setWorking, currentUserName, email,
  currentUserNumber, slug, commentNumber, dateAdded, setError, setWarning,
  commentUserNumber, myDownVote
} ) =>
  <>
    {
      myUpVote && <SelectedUp onClick={ () => {
        if ( !working ) {
          setWorking( true )
          removeVote(
            currentUserName, email, currentUserNumber, slug,
            commentNumber, true, dateAdded, myUpVote.dateAdded,
            setError, setWarning
          ).then( () => setWorking( false ) )
        }
      } } />
    } {
      !myUpVote && <Up onClick={ () => {
        if ( !working ) {
          setWorking ( true )
          if ( myDownVote )
            removeVote(
              currentUserName, email, currentUserNumber, slug,
              commentNumber, false, dateAdded, myDownVote.dateAdded,
              setError, setWarning
            ).then(
              () => addUpVote(
                currentUserName, email, commentUserNumber, slug, commentNumber,
                dateAdded, setError, setWarning
              ).then( () => setWorking( false ) )
            )
          else
            addUpVote(
              currentUserName, email, commentUserNumber, slug, commentNumber,
              dateAdded, setError, setWarning
            ).then( () => setWorking( false ) )
        }
      } }/>
    }
  </>

export const DownVote = ( {
  myDownVote, working, setWorking, currentUserName, email, currentUserNumber,
  slug, commentNumber, dateAdded, setError, setWarning, commentUserNumber,
  myUpVote
} ) =>
  <>
    {
      myDownVote && <SelectedDown onClick={
        () => {
          if ( !working ) {
            setWorking( true )
            removeVote(
              currentUserName, email, currentUserNumber, slug,
              commentNumber, false, dateAdded, myDownVote.dateAdded,
              setError, setWarning
            ).then( () => setWorking( false ) )
          }
        }
      }/>
    } {
      !myDownVote && <Down onClick={
        () => {
          if ( !working ) {
            setWorking ( true )
            if ( myUpVote )
              removeVote(
                currentUserName, email, currentUserNumber, slug,
                commentNumber, true, dateAdded, myUpVote.dateAdded,
                setError, setWarning
              ).then(
                () => addDownVote(
                  currentUserName, email, commentUserNumber, slug,
                  commentNumber, dateAdded, setError, setWarning
                ).then( () => setWorking( false ) )
              )
            else
              addDownVote(
                currentUserName, email, commentUserNumber, slug,
                commentNumber, dateAdded, setError, setWarning
              ).then( () => setWorking( false ) )
          }
        }
      }/>
    }
  </>

export const SubmitComment = ( {
  working, setWorking, user, slug, title, setWarning, setError, setComment
} ) => <div css={ `margin: 0.5em; margin-top: 0;` }>
  { <SelectedButton
    onClick={ () => {
      if ( !working ) {
        setWorking( true )
        addComment(
          user.name, user.email, user.userNumber, slug, title,
          getTextInput( `NewComment` ), setWarning, setError,
          setComment
        ).then( () => {
          setWorking( false ); resetTextInput( `NewComment` )
          setComment( `` )
        } )
      }
    } }
    css={ `margin-left: auto;` }
  >Submit</SelectedButton> }
</div>

export const Error = ( { error } ) =>
  <>
    {
      error && <WarningDiv>
        <WarningIcon/><div css={`padding: 0.5em;`}>{ error }</div>
      </WarningDiv>
    }
  </>

export const Warning = ( { warning, slug, title, setWarning, setError } ) =>
  <>
    {
      warning && <WarningDiv>
        <div><WarningIcon/>Post not in database</div>
        <div><WarningButton onClick={
          () => addPost( slug, title, setWarning, setError )
        }>Add Post</WarningButton></div>
      </WarningDiv>
    }
  </>

export const AdminControls = ( {
  user, warning, setWarning, working, setWorking, slug, title, setError,
  setComment
} ) =>
  <>
    {
      user && user.isAdmin && !warning
      && <WarningDiv>
        <div><UnselectedButton>Post Details</UnselectedButton></div>
        <div><WarningButton onClick={ () => {
          if ( !working ) {
            setWorking( true )
            deletePost( slug, title, setWarning, setError ).then( () => {
              setWorking( false ); resetTextInput( `NewComment` )
              setComment( `` )
            } )
          }
        } }>Remove Post</WarningButton></div>
      </WarningDiv>
    }
  </>

export const Delete = ( {
  showDelete, working, setWorking, commentUserName, currentUserEmail,
  commentUserNumber, slug, title, dateAdded, setError, setWarning
} ) =>
  <>
    {
      showDelete &&
        <>
          <CommentOption
            onClick={ () => {
              if ( !working ) {
                setWorking( true )
                deleteComment(
                  commentUserName, currentUserEmail, commentUserNumber, slug,
                  title, dateAdded, setError, setWarning
                ).then( () => setWorking( false ) )
              }
            } }>Delete
          </CommentOption>|
        </>
    }
  </>

export const Comment = ( {
  slug, title, comment, user, working, setWorking, setError, setWarning
} ) => {
  const { dateAdded, text, vote } = comment
  const commentUserName = comment.userName
  const commentUserNumber = comment.userNumber
  const { email, isAdmin } = user
  const currentUserName = user.name
  const currentUserEmail = user.email
  const currentUserNumber = user.userNumber
  const commentNumber = comment.postCommentNumber
  // Only show the delete option if the user is logged in and the user is and
  // administrator, or show the option if the user is logged in and the comment
  // is theirs.
  const showDelete = user && ( isAdmin || (
    commentUserName == currentUserName &&
    commentUserNumber == currentUserNumber
  ) )
  // Get the down-vote if the user has made one on this comment.
  const myDownVotes = comment.votes.filter( ( vote ) => {
    if ( vote.userName == currentUserName &&
      vote.userNumber == currentUserNumber &&
      !vote.up ) return vote
  } )
  const myDownVote = (
    ( myDownVotes.length == 1 ) ? myDownVotes[ 0 ] : undefined
  )
  // Get the up-vote if the user has made one on this comment
  const myUpVotes = comment.votes.filter( ( vote ) => {
    if ( vote.userName == currentUserName &&
      vote.userNumber == currentUserNumber &&
      vote.up ) return vote
  } )
  const myUpVote = (
    ( myUpVotes.length == 1 ) ? myUpVotes[ 0 ] : undefined
  )
  return(
    <CommentDiv key={ commentUserName + dateAdded + text }>
      <Title>{ commentUserName } - { timeSince( dateAdded ) }</Title>
      <CommentText>{ text }</CommentText>
      {
        user && <CommentOptions>
          <Delete { ...{
            showDelete, working, setWorking, commentUserName,
            currentUserEmail, commentUserNumber, slug, title, dateAdded,
            setError, setWarning
          } }/>
          <CommentOption>Reply</CommentOption>|
          <div css={`padding-top: 0.3em;`}>
            <DownVote { ...{
              myDownVote, working, setWorking, currentUserName, email,
              currentUserNumber, slug, commentNumber, dateAdded, setError,
              setWarning, commentUserNumber, myUpVote
            } }/>
            {vote}
            <UpVote { ...{
              myUpVote, working, setWorking, currentUserName, email,
              currentUserNumber, slug, commentNumber, dateAdded, setError,
              setWarning, commentUserNumber, myDownVote
            } }/>
          </div>
        </CommentOptions>
      }
    </CommentDiv>
  )
}