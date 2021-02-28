import React from 'react'
import {
  addPost, addComment, deleteComment, deletePost,
  addUpVote, addDownVote, removeVote, getTextInput, resetTextInput,
  replyToComment, getUser, handleNewName, disableUser
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
import Amplify, { API } from 'aws-amplify'


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
          API.del(
            process.env.GATSBY_API_BLOG_NAME,
            `/vote`,
            { response: true, body: {
              name: user.name,
              email: user.email,
              username: user.username,
              slug,
              up: true,
              commentDateAdded: comment.dateAdded,
              voteDateAdded: myUpVote.dateAdded,
              replyChain: comment.replyChain
            } }
          ).then( () => setWorking( false )
          ).catch( () => setWorking( false ) )
        }
      } } />
    } {
      /**
       * When the user has not up-voted this comment
       */
      !myUpVote && <Up onClick={ () => {
        if ( !working && typeof user != `undefined` ) {
          setWorking ( true )
          if ( myDownVote )
            API.del(
              process.env.GATSBY_API_BLOG_NAME,
              `/vote`,
              { response: true, body: {
                name: user.name,
                email: user.email,
                username: user.username,
                slug,
                up: false,
                commentDateAdded: comment.dateAdded,
                voteDateAdded: myDownVote.dateAdded,
                replyChain: comment.replyChain
              } }
            ).then( () => API.post(
              process.env.GATSBY_API_BLOG_NAME,
              `/vote`,
              { response: true, body: {
                name: user.name,
                email: user.email,
                username: user.username,
                commentUsername: comment.username,
                slug,
                commentDateAdded: comment.dateAdded,
                up: true,
                replyChain: comment.replyChain
              } }
            ).then( () => setWorking( false )
            ).catch( () => setWorking( false ) )
            ).catch( () => setWorking( false ) )
          else
            API.post(
              process.env.GATSBY_API_BLOG_NAME,
              `/vote`,
              { response: true, body: {
                name: user.name,
                email: user.email,
                username: user.username,
                commentUsername: comment.username,
                slug,
                commentDateAdded: comment.dateAdded,
                up: true,
                replyChain: comment.replyChain
              } }
            ).then( () => setWorking( false )
            ).catch( () => setWorking( false ) )
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
            API.del(
              process.env.GATSBY_API_BLOG_NAME,
              `/vote`,
              { response: true, body: {
                name: user.name,
                email: user.email,
                username: user.username,
                slug,
                up: false,
                commentDateAdded: comment.dateAdded,
                voteDateAdded: myDownVote.dateAdded,
                replyChain: comment.replyChain
              } }
            ).then( () => setWorking( false )
            ).catch( () => setWorking( false ) )
          }
        }
      }/>
    } {
      !myDownVote && <Down onClick={
        () => {
          if ( !working && typeof user != `undefined` ) {
            setWorking ( true )
            if ( myUpVote )
              API.del(
                process.env.GATSBY_API_BLOG_NAME,
                `/vote`,
                { response: true, body: {
                  name: user.name,
                  email: user.email,
                  username: user.username,
                  slug,
                  up: true,
                  commentDateAdded: comment.dateAdded,
                  voteDateAdded: myUpVote.dateAdded,
                  replyChain: comment.replyChain
                } }
              ).then( () =>
                API.post(
                  process.env.GATSBY_API_BLOG_NAME,
                  `/vote`,
                  { response: true, body: {
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    commentUsername: comment.username,
                    slug,
                    commentDateAdded: comment.dateAdded,
                    up: false,
                    replyChain: comment.replyChain
                  } }
                ).then( () => setWorking( false )
                ).catch( () => setWorking( false ) )
              ).catch( () => setWorking( false ) )
            else
              API.post(
                process.env.GATSBY_API_BLOG_NAME,
                `/vote`,
                { response: true, body: {
                  name: user.name,
                  email: user.email,
                  username: user.username,
                  commentUsername: comment.username,
                  slug,
                  commentDateAdded: comment.dateAdded,
                  up: false,
                  replyChain: comment.replyChain
                } }
              ).then( () => setWorking( false )
              ).catch( () => setWorking( false ) )
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
        API.post(
          process.env.GATSBY_API_BLOG_NAME,
          `/comment`,
          { response: true, body: {
            name: user.name,
            email: user.email,
            username: user.username,
            slug, title, text: getTextInput( `NewComment` )
          } }
        ).then( result => {
          console.log( { result } )
          setWorking( false )
          setComment( `` )
          resetTextInput( `NewComment` )
          setWarning( false )
          setError()
        } ).catch( error => {
          console.log( { error } )
          setError( `Could not post comment` )
          setWorking( false )
          resetTextInput( `NewComment` )
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
          () => API.post(
            process.env.GATSBY_API_BLOG_NAME,
            `/post`,
            { response: true, body: { slug, title } }
          ).then( () => { setWarning( false ); setError() }
          ).catch( () => setError( `Could not add post` ) )
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
            API.del(
              process.env.GATSBY_API_BLOG_NAME,
              `/post`,
              { response: true, body: { slug, title } }
            ).then( () => setWorking( false )
            ).catch( () => setWorking( false ) )
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
    { showDelete &&
        <>
          <CommentOption
            onClick={ () => {
              if ( !working ) {
                setWorking( true )
                API.del(
                  process.env.GATSBY_API_BLOG_NAME, `/comment`,
                  {
                    response: true,
                    body: {
                      name: user.name,
                      email: user.email,
                      username: user.username,
                      slug,
                      title,
                      dateAdded: comment.dateAdded,
                      replyChain: comment.replyChain
                    }
                  }
                ).then( () => {
                  setWarning( false ); setError(); setWorking( false )
                } ).catch( () => {
                  setError( `Could not remove comment` ); setWorking( false )
                } )
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
    comment.name == user.name &&
    comment.username == user.username
  ) ) )
  // Get the down-vote if the user has made one on this comment.
  const myDownVotes = Object.values( comment.votes ).filter( ( vote ) => {
    if (
      user &&
      // vote.name == user.name &&
      vote.username == user.username &&
      !vote.up ) return vote
  } )
  const myDownVote = (
    ( myDownVotes.length == 1 ) ? myDownVotes[ 0 ] : undefined
  )
  // Get the up-vote if the user has made one on this comment
  const myUpVotes = Object.values( comment.votes ).filter( ( vote ) => {
    if (
      user &&
      // vote.name == user.name &&
      vote.username == user.username &&
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
        key={ comment.name + comment.dateAdded + comment.text }
      >
        <div css={`display: flex;`}>
          <UserName
            onClick={ () => {
              console.log( { comment } )
              API.get(
                process.env.GATSBY_API_BLOG_NAME, `/user`,
                {
                  response: true,
                  queryStringParameters: {
                    name: ``,
                    email: ``,
                    username: comment.username,
                  }
                }
              ).then( result => {
                if ( user ) {
                  if ( user.isAdmin )
                    setCommenter( {
                      name: result.data.user.name,
                      email: result.data.user.email,
                      username: result.data.user.username,
                      dateString: timeSince( result.data.user.dateJoined ),
                      isAdmin: true
                    } )
                  else
                    setCommenter( {
                      name: result.data.user.name,
                      dateString: timeSince( result.data.dateJoined ),
                      isAdmin: false
                    } )
                } else {
                  setCommenter( {
                    name: result.data.user.name,
                    dateString: timeSince( result.data.dateJoined ),
                    isAdmin: false
                  } )
                }
                setModal( true )
              } ).catch( error => {
                console.log( `could not get user` )
                console.log( { error } )
                setError( `Could not get user` )
                setCommenter( {
                  name: `tyler`, email: `myemail`, username: `username`,
                  dateString: `datestring`, isAdmin: true
                } )
              } )

              // getUser(
              //   comment.userNumber, setError, user, setCommenter
              // ).then(
              //   () => {
              //     setModal( true )
              //   } )
            } }
          >{ comment.name }</UserName>
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
                    comment.name + comment.dateAdded + comment.text
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
        { showReply == comment.name + comment.dateAdded + comment.text &&
      <div>
        <TextInput
          id={ comment.name + comment.dateAdded + comment.text }
          contentEditable={ `true` }
          content = { reply }
          css={`margin-right: 0; `}
        />
        <div css={ `margin: 0.5em; margin-top: 0; margin-right: 0;` }>
          <SelectedButton
            onClick={ () => {
              if ( !working ) {
                setWorking( true )
                API.post(
                  process.env.GATSBY_API_BLOG_NAME, `/reply`,
                  {
                    response: true,
                    body: {
                      name: user.name,
                      email: user.email,
                      username: user.username,
                      text: getTextInput(
                        comment.name + comment.dateAdded + comment.text
                      ),
                      replyChain: comment.replyChain.concat( [
                        comment.dateAdded
                      ] ),
                      slug,
                      title,
                    }
                  }
                ).then( () => {
                  setReply( `` )
                  resetTextInput(
                    comment.name + comment.dateAdded + comment.text
                  )
                  setShowReply( ` ` )
                  setWorking( false )
                } ).catch( () => {
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
      <CommentDiv key={ comment.name + comment.dateAdded + comment.text }>
        <div css={`display: flex;`}>
          <UserName
            onClick={
              () => {
                API.get(
                  process.env.GATSBY_API_BLOG_NAME, `/user`,
                  {
                    response: true,
                    queryStringParameters: {
                      name: ``, email: ``,
                      username: comment.username,
                    }
                  }
                ).then( result => {
                  if ( user ) {
                    if ( user.isAdmin )
                      setCommenter( {
                        name: result.data.user.name,
                        email: result.data.user.email,
                        username: result.data.user.username,
                        dateString: timeSince( result.data.user.dateJoined ),
                        isAdmin: true
                      } )
                    else
                      setCommenter( {
                        name: result.data.user.name,
                        dateString: timeSince( result.data.user.dateJoined ),
                        isAdmin: false
                      } )
                  } else {
                    setCommenter( {
                      name: result.data.user.name,
                      dateString: timeSince( result.data.user.dateJoined ),
                      isAdmin: false
                    } )
                  }
                  setModal( true )
                } ).catch( () => setError( `Could not get user` ) )
              }
            }
          >{ comment.name }</UserName>
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
                    comment.name + comment.dateAdded + comment.text
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
        { showReply == comment.name + comment.dateAdded + comment.text &&
        <div>
          <TextInput
            id={ comment.name + comment.dateAdded + comment.text }
            contentEditable={ `true` }
            content = { reply }
            css={`margin-right: 0; `}
          />
          <div css={ `margin: 0.5em; margin-top: 0; margin-right: 0;` }>
            <SelectedButton
              onClick={ () => {
                if ( !working ) {
                  setWorking( true )
                  API.post(
                    process.env.GATSBY_API_BLOG_NAME, `/reply`,
                    {
                      response: true,
                      body: {
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        text: getTextInput(
                          comment.name + comment.dateAdded + comment.text
                        ),
                        replyChain: [ comment.dateAdded ],
                        slug,
                        title,
                      }
                    }
                  ).then( () => {
                    setReply( `` )
                    resetTextInput(
                      comment.name + comment.dateAdded + comment.text
                    )
                    setShowReply( ` ` )
                    setWorking( false )
                  } ).catch( () => setWorking( false ) )
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
  setWorking, working, setError, username
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
        API.post(
          process.env.GATSBY_API_BLOG_NAME, `/user-name`,
          { response: true, body: { name, email, username, newName } }
        ).then( () => setWorking( false )
        ).catch( () => {
          setError( `Could not change name` )
          setWorking( false )
        } )
      }

    } }>Change Name</AdminButton>
    <AdminButton onClick={ () => {
      if ( !working ) {
        setWorking( true )
        API.post(
          process.env.GATSBY_API_BLOG_NAME, `/disable-user`,
          { response: true, body: { username } }
        ).then( () => setWorking( false )
        ).catch( () => {
          setError( `Could not change name` ); setWorking( false )
        } )
      }
    } }
    >Disable</AdminButton></>
  }
</>