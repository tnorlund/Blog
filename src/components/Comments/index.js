import React, { useState, useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { getPostDetails } from './utils'
import { Title, TextInput } from './styles'
import {
  SubmitComment, Error, Comment, Warning, AdminControls, User
} from './components'
import Modal from 'components/Modal'

// TODO
// [ ] Set component in index

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
  // The comment where to show the reply text input
  const [ reply, setReply ] = useState( `` )
  // The user being displayed in the modal view
  const [ open, setModal ] = useState( false )
  // Whether to show the name change or not.
  const [ showNewName, setShowNewName ] = useState( true )
  // When a user wants to change their name.
  const [ newName, setNewName ] = useState()
  // The commenter details shown in the modal view.
  const [ commenter, setCommenter ] = useState( {
    name: undefined, dateString: undefined, isAdmin: false
  } )
  useEffect( () => {
    getPostDetails( slug, title, setWarning, setError ).then(
      ( { post, comments } ) => {
        // If the post does not exist in the data base, there are no
        // comments, and the user is an administrator, allow them to create the
        // post.
        if ( !post && user && user.isAdmin ) setWarning( true )
        setCommentComponents( Object.values( comments ).map(
          ( comment ) => Comment( {
            slug, title, comment, user, working, setWorking, setError,
            setWarning, showReply, setShowReply, reply, setReply,
            setModal, setCommenter
          } )
        ) )
      } ).catch( ( error ) => setError( error ) )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, title, user,
    // warning,
    working, showReply,
    // reply
  ] )
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
      <Modal { ...{ open, setModal } } contents={ User( {
        name: commenter.name, dateString: commenter.dateString,
        email: commenter.email, userNumber: commenter.userNumber,
        isAdmin: commenter.isAdmin,
        newName, setNewName,
        setWorking, working, setError
      } ) } />
    </>
  )
}