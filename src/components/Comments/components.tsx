import React, { FC } from 'react'
import { getTextInput, resetTextInput } from './utils'
import {
  Title, TextInput,
  WarningDiv, WarningButton, WarningIcon,
  SelectedButton, UnselectedButton,
  CommentText, CommentDiv, CommentOption, CommentOptions, UserName,
  Up, Down, SelectedDown, SelectedUp, VoteNumber, VoteDiv,
  ModalView, ModalDescription, ModalUserName, AdminButton, NewTextInput,
  SubmitDiv
} from './styles'
import { timeSince } from '../../utils/date'
import { Markup } from 'interweave'
import { API } from 'aws-amplify'
import { Interface } from 'readline'

interface Vote {
  dateAdded: string,
  username: string,
  up: boolean
}

interface User {
  name: string,
  username: string,
  email: string
  isAdmin: boolean
}

interface Comment {
  name: string
  dateAdded: string
  replyChain: [string]
  username: string,
  vote: number,
  text: string
  votes: [Vote]
  replies: [Comment]
}

interface Commenter {
  name?: string, 
  dateString?: string, 
  username?: string,
  email?: string,
  isAdmin: boolean
}

interface  UpVoteProps {
  myUpVote: Vote | undefined, 
  working: boolean, 
  setWorking: React.Dispatch<React.SetStateAction<boolean>>, 
  slug: string, 
  myDownVote: Vote | undefined, 
  user: User, 
  comment: Comment
}
export const UpVote = ( {
  myUpVote, working, setWorking, slug, myDownVote, user, comment
} : UpVoteProps ) =>
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

interface  DownVoteProps {
  myDownVote: Vote | undefined, 
  working: boolean, 
  setWorking: React.Dispatch<React.SetStateAction<boolean>>, 
  slug: string, 
  myUpVote: Vote | undefined, 
  user: User, 
  comment: Comment
}
export const DownVote = ( {
  myDownVote, working, setWorking, slug, myUpVote, user, comment
} : DownVoteProps ) =>
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

interface  SubmitCommentProps {
  working: boolean, 
  setWorking: React.Dispatch<React.SetStateAction<boolean>>, 
  user: User, 
  slug: string,
  title: string, 
  setWarning: React.Dispatch<React.SetStateAction<boolean>>, 
  setError: React.Dispatch<React.SetStateAction<string|undefined>>,
  setComment: React.Dispatch<React.SetStateAction<string>>,
}
export const SubmitComment = ( {
  working, setWorking, user, slug, title, setWarning, setError, setComment
} : SubmitCommentProps ) => <SubmitDiv>
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
        ).then( () => {
          setWorking( false )
          setComment( `` )
          resetTextInput( `NewComment` )
          setWarning( false )
          setError( undefined )
        } ).catch( () => {
          setError( `Could not post comment` )
          setWorking( false )
          resetTextInput( `NewComment` )
          setComment( `` )
        } )
      }
    } }
    style={ { marginLeft: `auto` } }
  >Submit</SelectedButton> }
</SubmitDiv>

interface ErrorProps {
  error: string | undefined
}
export const Error = ( { error } : ErrorProps ) =>
  <>
    {
      error && <WarningDiv>
        <WarningIcon/><div style={{ padding: `0.5em` }}>{ error }</div>
      </WarningDiv>
    }
  </>

interface WarningProps {
  warning: boolean,
  slug: string,
  title: string,
  setWarning: React.Dispatch<React.SetStateAction< boolean > >, 
  setError: React.Dispatch<React.SetStateAction< string | undefined > >, 
}
export const Warning = ( 
  { warning, slug, title, setWarning, setError } : WarningProps 
) => <> {
  warning && <WarningDiv>
    <div><WarningIcon/>Post not in database</div>
    <div><WarningButton onClick={
      () => API.post(
        process.env.GATSBY_API_BLOG_NAME,
        `/post`,
        { response: true, body: { slug, title } }
      ).then( () => { setWarning( false ); setError( undefined ) }
      ).catch( () => setError( `Could not add post` ) )
    }>Add Post</WarningButton></div>
  </WarningDiv>
} </>

interface AdminControlsProps {
  user: User,
  warning: boolean
  working: boolean,
  setWorking: React.Dispatch<React.SetStateAction< boolean > >,
  slug: string,
  title: string
}
export const AdminControls = ( 
  { user, warning, working, setWorking, slug, title } : AdminControlsProps 
) => <> {
  user && user.isAdmin && !warning && <WarningDiv>
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
} </>

interface DeleteProps {
  showDelete: boolean, 
  working: boolean, 
  setWorking: React.Dispatch<React.SetStateAction< boolean > >, 
  slug: string, 
  title: string, 
  setError: React.Dispatch<React.SetStateAction< string | undefined > >, 
  setWarning: React.Dispatch<React.SetStateAction< boolean > >, 
  comment: Comment,
  user: User
}
export const Delete = ( 
  { 
    showDelete, working, setWorking, slug, title, setError, setWarning, comment,
    user 
  } : DeleteProps 
) => <> { showDelete && <> 
  <CommentOption onClick={ () => {
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
        setWarning( false ); setError( undefined); setWorking( false )
      } ).catch( () => {
        setError( `Could not remove comment` ); setWorking( false )
      } )
    }
  } }>Delete</CommentOption>|
</> } </>

interface CommentProps {
  slug: string, 
  title: string, 
  comment: Comment, 
  user: User, 
  working: boolean, 
  setWorking: React.Dispatch<React.SetStateAction<boolean>>, 
  setError: React.Dispatch<React.SetStateAction<string|undefined>>, 
  setWarning: React.Dispatch<React.SetStateAction<boolean>>, 
  showReply: string, 
  setShowReply: React.Dispatch<React.SetStateAction<string>>, 
  reply: string, 
  setReply: React.Dispatch<React.SetStateAction<string>>,
  setModal: React.Dispatch<React.SetStateAction<boolean>>, 
  setCommenter: React.Dispatch<React.SetStateAction<Commenter> >, 
  isReply: boolean
}
export const CommentComponent = (
  {
    slug, title, comment, user, working, setWorking, setError, setWarning,
    showReply, setShowReply, reply, setReply,
    setModal, setCommenter, isReply = false
  } : CommentProps
) => {
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
      vote.username == user.username &&
      vote.up ) return vote
  } )
  const myUpVote = (
    ( myUpVotes.length == 1 ) ? myUpVotes[ 0 ] : undefined
  )
  const replies = Object.values( comment.replies ).map(
    repliedComment => CommentComponent( {
      slug, title, comment:repliedComment, user, working, setWorking, setError,
      setWarning, showReply, setShowReply, reply, setReply,
      setModal, setCommenter, isReply: true
    } )
  )
  if ( isReply )
    return(
      <CommentDiv
        style={{ paddingRight: 0 }}
        key={ comment.name + comment.dateAdded + comment.text }
      >
        <div style={{ display: `flex` }}>
          <UserName
            onClick={ () => {
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
              } ).catch( () => {
                setError( `Could not get user` )
                setCommenter( {
                  name: `tyler`, email: `myemail`, username: `username`,
                  dateString: `datestring`, isAdmin: true
                } )
              } )
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
              } } />
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
          // content = { reply }
          style={{ marginRight: `0`}}
        />
        <div style={{ margin: `0.5em`, marginTop: `0`, marginRight: `0`}}>
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
            style={{ marginLeft: `auto` }}
          >Reply</SelectedButton>
        </div>
      </div>
        }
        <div style={{ borderLeft: `1px solid var(--color-text)` }}>
          { replies }
        </div>
      </CommentDiv>
    )
  else
    return(
      <CommentDiv key={ comment.name + comment.dateAdded + comment.text }>
        <div style={{display: `flex`}}>
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
            // content={ reply }
            style={{marginRight: `0`}}
          />
          <div
            style={{ margin: `0.5em`, marginTop: `0`, marginRight: `0` }}>
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
              style={{ marginLeft: `auto`}}
            >Reply</SelectedButton>
          </div>
        </div>
        }
        <div 
          style={{ borderLeft: `1px solid var(--color-text)` }}
        >{ replies }</div>
      </CommentDiv>
    )
}

interface UserProps {
  name: string,
  dateString: string,
  isAdmin: boolean,
  email: string|undefined,
  newName: string,
  setNewName: React.Dispatch<React.SetStateAction<string>>,
  username: string,
  working: boolean,
  setWorking: React.Dispatch<React.SetStateAction<boolean>>, 
  setError: React.Dispatch<React.SetStateAction<string|undefined>>, 
}
export const User = ( {
  name, dateString, isAdmin, email, newName, setNewName,
  setWorking, working, setError, username
} : UserProps ) => <>
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