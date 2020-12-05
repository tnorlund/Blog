import React from 'react'
import {
  addPost, addComment, deleteComment, deletePost,
  addUpVote, addDownVote, removeVote, getTextInput, resetTextInput,
  replyToComment, getUser, handleNewName
} from './utils'
import {
  Title, TextInput,
  WarningDiv, WarningButton, WarningIcon,
  SelectedButton, UnselectedButton,
  CommentText, CommentDiv, CommentOption, CommentOptions, UserName,
  Up, Down, SelectedDown, SelectedUp, VoteNumber, VoteDiv,
  ModalView, ModalDescription, ModalUserName, AdminButton, NewTextInput
} from './styles'
import { timeSince } from 'utils/date'
import { Markup } from 'interweave'


// TODO
// [ ] Show user info in a modal view
// [ ] Allow admin control to change name of user

export const UpVote = ( {
  myUpVote, working, setWorking, slug, setError, setWarning,
  myDownVote, user, comment
} ) =>
  <>
    {
      myUpVote && <SelectedUp onClick={ () => {
        if ( !working ) {
          setWorking( true )
          removeVote(
            user.name, user.email, user.userNumber, slug,
            comment.postCommentNumber, true, comment.dateAdded,
            myUpVote.dateAdded, setError, setWarning
          ).then( () => setWorking( false ) )
        }
      } } />
    } {
      !myUpVote && <Up onClick={ () => {
        if ( !working && typeof user != `undefined` ) {
          setWorking ( true )
          if ( myDownVote )
            removeVote(
              user.name, user.email, user.userNumber, slug,
              comment.userNumber, false, comment.dateAdded,
              myDownVote.dateAdded, setError, setWarning
            ).then(
              () => addUpVote(
                user.name, user.email, user.userNumber, comment.userNumber,
                slug, comment.replyChain.concat( [comment.dateAdded] ),
                setError, setWarning
              ).then( () => setWorking( false ) )
            )
          else
            addUpVote(
              user.name, user.email, user.userNumber, comment.userNumber, slug,
              comment.replyChain.concat( [comment.dateAdded] ),
              setError, setWarning
            ).then( () => setWorking( false ) )
        }
      } }/>
    }
  </>

export const DownVote = ( {
  myDownVote, working, setWorking, slug, setError, setWarning, myUpVote, user,
  comment
} ) =>
  <>
    {
      myDownVote && <SelectedDown onClick={
        () => {
          if ( !working ) {
            setWorking( true )
            removeVote(
              user.name, user.email, user.userNumber, slug,
              comment.userNumber, false, comment.dateAdded,
              myDownVote.dateAdded, setError, setWarning
            ).then( () => setWorking( false ) )
          }
        }
      }/>
    } {
      !myDownVote && <Down onClick={
        () => {
          if ( !working && typeof user != `undefined` ) {
            setWorking ( true )
            if ( myUpVote )
              removeVote(
                user.name, user.email, user.userNumber, slug,
                comment.userNumber, true, comment.dateAdded,
                myUpVote.dateAdded, setError, setWarning
              ).then(
                () => addDownVote(
                  user.name, user.email, user.userNumber, comment.userNumber,
                  slug, comment.replyChain.concat( [comment.dateAdded] ),
                  setError, setWarning
                ).then( () => setWorking( false ) )
              )
            else
              addDownVote(
                user.name, user.email, user.userNumber, comment.userNumber,
                slug, comment.replyChain.concat( [comment.dateAdded] ),
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
                  title, comment.replyChain.concat( [comment.dateAdded] ),
                  setError, setWarning
                ).then( () => { setTimeout( 100 ); setWorking( false ) } )
              }
            } }>Delete
          </CommentOption>|
        </>
    }
  </>

export const Comment = ( {
  slug, title, comment, user, working, setWorking, setError, setWarning,
  showReply, setShowReply, reply, setReply,
  setModal, setCommenter, isReply = false
} ) => {
  // Only show the delete option if the user is logged in and the user is and
  // administrator, or show the option if the user is logged in and the comment
  // is theirs.
  const showDelete = Boolean( user && ( user.isAdmin || (
    comment.userName == user.name &&
    comment.userNumber == user.userNumber
  ) ) )
  // Get the down-vote if the user has made one on this comment.
  const myDownVotes = Object.values( comment.votes ).filter( ( vote ) => {
    if (
      user && vote.userName == user.name &&
      vote.userNumber == user.userNumber &&
      !vote.up ) return vote
  } )
  const myDownVote = (
    ( myDownVotes.length == 1 ) ? myDownVotes[ 0 ] : undefined
  )
  // Get the up-vote if the user has made one on this comment
  const myUpVotes = Object.values( comment.votes ).filter( ( vote ) => {
    if (
      user && vote.userName == user.name &&
      vote.userNumber == user.userNumber &&
      vote.up ) return vote
  } )
  const myUpVote = (
    ( myUpVotes.length == 1 ) ? myUpVotes[ 0 ] : undefined
  )
  const replies = Object.values( comment.replies ).map(
    repliedComment => Comment( {
      slug, title, comment:repliedComment, user, working, setWorking, setError,
      setWarning, showReply, setShowReply, reply, setReply,
      setModal, setCommenter, isReply: true
    } )
  )
  if ( isReply )
    return(
      <CommentDiv
        css={`padding-right: 0;`}
        key={ comment.userName + comment.dateAdded + comment.text }
      >
        <div css={`display: flex;`}>
          <UserName
            onClick={ () => {
              getUser(
                comment.userNumber, setError, user, setCommenter
              ).then(
                () => {
                  setModal( true )
                } )
            } }
          >{ comment.userName }</UserName>
          <Title> - { timeSince( comment.dateAdded ) }</Title>
        </div>
        <CommentText><Markup content={comment.text} /></CommentText>
        {
          user && <CommentOptions>
            <Delete { ...{
              showDelete, working, setWorking, slug, title, setError,
              setWarning, comment, user
            } }/>
            <CommentOption
              onClick={ () => {
                if ( !working )
                  setShowReply(
                    comment.userName + comment.dateAdded + comment.text
                  )
              } }
            >Reply</CommentOption>|
            <VoteDiv>
              <DownVote { ...{
                myDownVote, working, setWorking, slug, setError, setWarning,
                myUpVote, user, comment
              } }/>
              <VoteNumber>{comment.vote}</VoteNumber>
              <UpVote { ...{
                myUpVote, working, setWorking, slug, setError, setWarning,
                myDownVote, user, comment
              } }/>
            </VoteDiv>
          </CommentOptions>
        }
        {
          !user && <CommentOptions>
            <VoteDiv>
              <DownVote { ...{
                myDownVote, working, setWorking, slug, setError, setWarning,
                myUpVote, user, comment
              } }/>
              <VoteNumber>{comment.vote}</VoteNumber>
              <UpVote { ...{
                myUpVote, working, setWorking, slug, setError, setWarning,
                myDownVote, user, comment
              } }/>
            </VoteDiv>
          </CommentOptions>
        }
        { showReply == comment.userName + comment.dateAdded + comment.text &&
      <div>
        <TextInput
          id={ comment.userName + comment.dateAdded + comment.text }
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
                  getTextInput(
                    comment.userName + comment.dateAdded + comment.text
                  ),
                  comment.replyChain.concat( [comment.dateAdded] ),
                  setWarning, setError
                ).then( () => {
                  setReply( `` )
                  resetTextInput(
                    comment.userName + comment.dateAdded + comment.text
                  )
                  setShowReply( ` ` )
                  setWorking( false )
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
      <CommentDiv key={ comment.userName + comment.dateAdded + comment.text }>
        <div css={`display: flex;`}>
          <UserName
            onClick={
              () => {
                getUser(
                  comment.userNumber, setError, user, setCommenter
                ).then(
                  () => {
                    setModal( true )
                  } )
              }
            }
          >{ comment.userName }</UserName>
          <Title> - { timeSince( comment.dateAdded ) }</Title>
        </div>
        <CommentText>
          <Markup content={comment.text} />
        </CommentText>
        {
          user && <CommentOptions>
            <Delete { ...{
              showDelete, working, setWorking, slug, title, setError,
              setWarning, comment, user
            } }/>
            <CommentOption
              onClick={ () => {
                if ( !working )
                  setShowReply(
                    comment.userName + comment.dateAdded + comment.text
                  )
              } }
            >Reply</CommentOption>|
            <VoteDiv>
              <DownVote { ...{
                myDownVote, working, setWorking, slug, setError, setWarning,
                myUpVote, user, comment
              } }/>
              <VoteNumber>{comment.vote}</VoteNumber>
              <UpVote { ...{
                myUpVote, working, setWorking, slug, setError, setWarning,
                myDownVote, user, comment
              } }/>
            </VoteDiv>
          </CommentOptions>
        }
        {
          !user && <CommentOptions>
            <VoteDiv>
              <DownVote { ...{
                myDownVote, working, setWorking, slug, setError, setWarning,
                myUpVote, user, comment
              } }/>
              <VoteNumber>{comment.vote}</VoteNumber>
              <UpVote { ...{
                myUpVote, working, setWorking, slug, setError, setWarning,
                myDownVote, user, comment
              } }/>
            </VoteDiv>
          </CommentOptions>
        }
        { showReply == comment.userName + comment.dateAdded + comment.text &&
        <div>
          <TextInput
            id={ comment.userName + comment.dateAdded + comment.text }
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
                    getTextInput(
                      comment.userName + comment.dateAdded + comment.text
                    ),
                    [ comment.dateAdded ], setWarning, setError
                  ).then( () => {
                    setReply( `` )
                    resetTextInput(
                      comment.userName + comment.dateAdded + comment.text
                    )
                    setShowReply( ` ` )
                    setWorking( false )
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

export const User = ( {
  name, dateString, isAdmin, email, userNumber, newName, setNewName,
  setWorking, working, setError
} ) => <>
  <ModalView>
    <ModalUserName>{name}</ModalUserName>
  </ModalView>
  <ModalDescription>Joined { dateString }</ModalDescription>
  { isAdmin && <>
    <NewTextInput
      placeholder={ name }
      type='name'
      onChange={ ( event ) => {
        setNewName( event.target.value )
      } }
    />
    <AdminButton onClick={ () => {
      if ( !working ) {
        setWorking( true )
        handleNewName( name, email, userNumber, newName, setError )
          .then( () => setWorking( false ) )
      }
    } }>Change Name</AdminButton>
    <AdminButton>Disable</AdminButton></>
  }
</>