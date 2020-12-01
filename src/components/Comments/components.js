import React from 'react'
import {
  addPost, addComment, deleteComment, deletePost,
  addUpVote, addDownVote, removeVote, getTextInput, resetTextInput,
  replyToComment
} from './utils'
import {
  Title, TextInput,
  WarningDiv, WarningButton, WarningIcon,
  SelectedButton, UnselectedButton,
  CommentText, CommentDiv, CommentOption, CommentOptions,
  Up, Down, SelectedDown, SelectedUp
} from './styles'
import { timeSince } from 'utils/date'

export const UpVote = ( {
  myUpVote, working, setWorking, currentUserName, email,
  currentUserNumber, slug, commentNumber, commentDateAdded,
  setError, setWarning, commentUserNumber, myDownVote, replyChain
} ) =>
  <>
    {
      myUpVote && <SelectedUp onClick={ () => {
        if ( !working ) {
          setWorking( true )
          removeVote(
            currentUserName, email, currentUserNumber, slug,
            commentNumber, true, commentDateAdded, myUpVote.dateAdded,
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
              commentNumber, false, commentDateAdded, myDownVote.dateAdded,
              setError, setWarning
            ).then(
              () => addUpVote(
                currentUserName, email, commentUserNumber, slug, replyChain,
                setError, setWarning
              ).then( () => setWorking( false ) )
            )
          else
            addUpVote(
              currentUserName, email, commentUserNumber, slug, replyChain,
              setError, setWarning
            ).then( () => setWorking( false ) )
        }
      } }/>
    }
  </>

export const DownVote = ( {
  myDownVote, working, setWorking, currentUserName, email, currentUserNumber,
  slug, commentNumber, commentDateAdded, setError, setWarning,
  commentUserNumber, myUpVote, replyChain
} ) =>
  <>
    {
      myDownVote && <SelectedDown onClick={
        () => {
          if ( !working ) {
            setWorking( true )
            removeVote(
              currentUserName, email, currentUserNumber, slug,
              commentNumber, false, commentDateAdded, myDownVote.dateAdded,
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
                commentNumber, true, commentDateAdded, myUpVote.dateAdded,
                setError, setWarning
              ).then(
                () => addDownVote(
                  currentUserName, email, commentUserNumber, slug, replyChain,
                  setError, setWarning
                ).then( () => setWorking( false ) )
              )
            else
              addDownVote(
                currentUserName, email, commentUserNumber, slug, replyChain,
                setError, setWarning
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
  showDelete, working, setWorking, slug, title, setError, setWarning, comment,
  user
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
                  comment.userName, user.email, comment.userNumber, slug,
                  title, comment.dateAdded, setError, setWarning
                ).then( () => setWorking( false ) )
              }
            } }>Delete
          </CommentOption>|
        </>
    }
  </>

export const Comment = ( {
  slug, title, comment, user, working, setWorking, setError, setWarning,
  showReply, setShowReply, reply, setReply, isReply = false
} ) => {
  console.log( `comment`, comment )
  // Only show the delete option if the user is logged in and the user is and
  // administrator, or show the option if the user is logged in and the comment
  // is theirs.
  const showDelete = Boolean( user && ( user.isAdmin || (
    comment.userName == user.name &&
    comment.userNumber == user.userNumber
  ) ) )
  const { dateAdded, text, vote } = comment
  const commentDateAdded = comment.dateAdded
  const commentUserNumber = comment.userNumber
  const { email } = user
  const currentUserName = user.name
  const currentUserNumber = user.userNumber
  const commentNumber = comment.postCommentNumber
  const replyChain = comment.replyChain.concat( [comment.dateAdded] )
  if ( isReply )
    console.log( `replyChain`, replyChain )
  // Get the down-vote if the user has made one on this comment.
  const myDownVotes = Object.values( comment.votes ).filter( ( vote ) => {
    if ( vote.userName == user.name &&
      vote.userNumber == user.userNumber &&
      !vote.up ) return vote
  } )
  const myDownVote = (
    ( myDownVotes.length == 1 ) ? myDownVotes[ 0 ] : undefined
  )
  // Get the up-vote if the user has made one on this comment
  const myUpVotes = Object.values( comment.votes ).filter( ( vote ) => {
    if ( vote.userName == user.name &&
      vote.userNumber == user.userNumber &&
      vote.up ) return vote
  } )
  const myUpVote = (
    ( myUpVotes.length == 1 ) ? myUpVotes[ 0 ] : undefined
  )
  console.log( `myUpVote`, myUpVote )
  const replies = Object.values( comment.replies ).map(
    repliedComment => Comment( {
      slug, title, comment:repliedComment, user, working, setWorking, setError,
      setWarning, showReply, setShowReply, reply, setReply, isReply: true
    } )
  )
  if ( isReply )
    return(
      <CommentDiv
        css={`padding-right: 0;`}
        key={ comment.userName + comment.dateAdded + text }
      >
        <Title>{ comment.userName } - { timeSince( comment.dateAdded ) }</Title>
        <CommentText>{ text }</CommentText>
        {
          user && <CommentOptions>
            <Delete { ...{
              showDelete, working, setWorking, slug, title, setError,
              setWarning, comment, user
            } }/>
            <CommentOption
              onClick={ () => {
                if ( !working )
                  setShowReply( comment.userName + comment.dateAdded + text )
              } }
            >Reply</CommentOption>|
            <div css={`padding-top: 0.3em;`}>
              <DownVote { ...{
                myDownVote, working, setWorking, currentUserName, email,
                currentUserNumber, slug, commentNumber, commentDateAdded,
                dateAdded, setError, setWarning, commentUserNumber, myUpVote,
                replyChain
              } }/>
              {vote}
              <UpVote { ...{
                myUpVote, working, setWorking, currentUserName, email,
                currentUserNumber, slug, commentNumber, commentDateAdded,
                dateAdded, setError, setWarning, commentUserNumber, myDownVote,
                replyChain
              } }/>
            </div>
          </CommentOptions>
        }
        { showReply == comment.userName + comment.dateAdded + text &&
      <div>
        <TextInput
          id={ comment.userName + comment.dateAdded + text }
          contentEditable={ `true` }
          content = { reply }
          css={`margin-right: 0; `}
        />
        <div css={ `margin: 0.5em; margin-top: 0; margin-right: 0;` }>
          <SelectedButton
            onClick={ () => {
              if ( !working ) {
                setWorking( true )
                replyToComment(
                  user.name, user.email, user.userNumber, slug, title,
                  getTextInput( comment.userName + comment.dateAdded + text ),
                  [ comment.dateAdded ], setWarning, setError, setReply
                ).then( () => {
                  setWorking( false )
                  setShowReply()
                  resetTextInput( comment.userName + comment.dateAdded + text )
                  setReply( `` )
                } )
              }
            } }
            css={ `margin-left: auto;` }
          >Reply</SelectedButton>
        </div>
      </div>
        }
        <div css={`border-left: 1px solid var(--color-text);`}>{ replies }</div>
      </CommentDiv>
    )
  else
    return(
      <CommentDiv key={ comment.userName + comment.dateAdded + text }>
        <Title>{ comment.userName } - { timeSince( comment.dateAdded ) }</Title>
        <CommentText>{ text }</CommentText>
        {
          user && <CommentOptions>
            <Delete { ...{
              showDelete, working, setWorking, slug, title, setError,
              setWarning, comment, user
            } }/>
            <CommentOption
              onClick={ () => {
                if ( !working )
                  setShowReply( comment.userName + comment.dateAdded + text )
              } }
            >Reply</CommentOption>|
            <div css={`padding-top: 0.3em;`}>
              <DownVote { ...{
                myDownVote, working, setWorking, currentUserName, email,
                currentUserNumber, slug, commentNumber, commentDateAdded,
                dateAdded, setError, setWarning, commentUserNumber, myUpVote,
                replyChain
              } }/>
              {vote}
              <UpVote { ...{
                myUpVote, working, setWorking, currentUserName, email,
                currentUserNumber, slug, commentNumber, commentDateAdded,
                dateAdded, setError, setWarning, commentUserNumber, myDownVote,
                replyChain
              } }/>
            </div>
          </CommentOptions>
        }
        { showReply == comment.userName + comment.dateAdded + text &&
        <div>
          <TextInput
            id={ comment.userName + comment.dateAdded + text }
            contentEditable={ `true` }
            content = { reply }
            css={`margin-right: 0; `}
          />
          <div css={ `margin: 0.5em; margin-top: 0; margin-right: 0;` }>
            <SelectedButton
              onClick={ () => {
                if ( !working ) {
                  setWorking( true )
                  replyToComment(
                    user.name, user.email, user.userNumber, slug, title,
                    getTextInput( comment.userName + comment.dateAdded + text ),
                    [ comment.dateAdded ], setWarning, setError, setReply
                  ).then( () => {
                    setWorking( false )
                    resetTextInput(
                      comment.userName + comment.dateAdded + text
                    )
                    setShowReply()
                    setReply( `` )
                  } )
                }
              } }
              css={ `margin-left: auto;` }
            >Reply</SelectedButton>
          </div>
        </div>
        }
        <div css={`border-left: 1px solid var(--color-text);`}>{ replies }</div>
      </CommentDiv>
    )
}