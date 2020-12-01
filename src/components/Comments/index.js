import React, { useState, useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { getPostDetails } from './utils'
import { Title, TextInput } from './styles'
import {
  SubmitComment, Error, Comment, Warning, AdminControls
} from './components'

// TODO
// [X] Show replies
// [X] Show comments when no one is logged in
// [ ] Hide options when user does not own comment or not logged in
// [ ] Prevent empty comment submission
// [ ] HTML render comments
// [ ] Fix deleting comments
// [ ]   - Delete all replies and votes on delete
// [ ] Add up-vote when submitting a reply or comment

export default function Comments( { slug, title } ) {
  // Get the current user data
  const user = useSessionStorage( AUTH_KEY )[0]
  // Sets the warning whether to add a project or not.
  const [ warning, setWarning ] = useState( false )
  // Sets an error if one occurs.
  const [ error, setError ] = useState()
  // Sets an the user's comment text.
  const [ comment, setComment ] = useState( `` )
  // Sets whether currently making an API request.
  const [ working, setWorking ] = useState( false )
  // The comment components
  const [ commentComponents, setCommentComponents ] = useState( [] )
  // The comment key of the comment the user is replying to
  const [ showReply, setShowReply ] = useState()
  const [ reply, setReply ] = useState( `` )
  // Before anything is rendered to the screen, get the post's comments.
  useEffect( () => {
    getPostDetails( slug, title, setWarning, setError ).then(
      ( { post, comments } ) => {
        console.log( `re-rendering` )
        // If the post does not exist in the data base, there are no
        // comments, and the user is an administrator, allow them to create the
        // post.
        if ( !post && user && user.isAdmin ) setWarning( true )
        setCommentComponents( Object.values( comments ).map(
          ( comment ) => Comment( {
            slug, title, comment, user, working, setWorking, setError,
            setWarning, showReply, setShowReply, reply, setReply
          } )
        ) )
      } ).catch( ( error ) => setError( error ) )
  }, [slug, title, user, warning, working, showReply] )
  return(
    <>
      <AdminControls { ...{
        user, warning, setWarning, working, setWorking, slug, title, setError,
        setComment
      } }/>
      {// If there is no warning, show the comment title and the option to add
      //  comments.
        !warning &&
          <>
            <Title>Comments</Title>
            { user &&
              <>
                <TextInput
                  id={`NewComment`} contentEditable={ `true` }
                  content = { comment }
                />
                <Error error={ error } />
                <SubmitComment { ...{
                  working, setWorking, user, slug, title, setWarning, setError,
                  setComment
                } } />
              </>
            }
            <>{ commentComponents }</>
          </>
      }
      <Warning { ...{ warning, slug, title, setWarning, setError } }/>
    </>
  )
}