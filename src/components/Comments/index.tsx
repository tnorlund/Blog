import React, { useState, useEffect, Suspense } from 'react'
import { useSessionStorage } from '../../hooks'
import { AUTH_KEY } from '../../utils/constants'
import { Title, TextInput } from './styles'
import {
  SubmitComment, 
  // Error, 
  CommentComponent, Warning, AdminControls, User
} from './components'
import Modal from '../Modal'
import { API } from 'aws-amplify'
import { type } from 'os'



/**
 * @typedef CommentsProps
 * @param {string} slug The blog post's slug.
 * @param {string} title The blog post's title.
 */
interface CommentsProps {
  slug: string,
  title: string,
}

interface Vote {
  dateAdded: string,
  username: string,
  up: boolean
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
  userCommentNumber: number,
  dateString?: string, 
  username?: string,
  email?: string,
  isAdmin: boolean
}

interface PostDetails {
  post: Post,
  comments: Comment[]
}

type PostDetailsRejection = {

}

const createResource = ( promise: Promise<any> ) => {
  let status = 'pending'
  let result = promise.then(
    details => { status = 'success'; result = details; },
    ( rejection : any ) => { status = 'rejected'; result = rejection; }
  )
  return {
    read() {
      if (status === 'pending') throw result
      if (status === 'error') throw result
      if (status === 'success') return result
      throw new Error('This should be impossible')
    },
  }
}

const createPostDetailsResource = ( title: string, slug : string ) => {
  return createResource(
    API.get(
      process.env.GATSBY_API_BLOG_NAME,
      `/post-details`,
      { response: true, queryStringParameters: { slug, title } }
    )
  )
}

const PostDetails = ( slug: string, title: string ) => {
  const [postComments, setPostComments] = React.useState<any>('')
  const [postResource, setPostResource] = React.useState<any>(null)
  React.useEffect( () => {
    if ( !postComments ) { setPostResource(null); return; }
    setPostResource( createPostDetailsResource( title, slug ) )
  }, [ postComments ] )

  return <>

  </>
}

export default PostDetails;

// export default function Comments( { slug, title } : CommentsProps ) {
//   // Get the current user data
//   const user = useSessionStorage( AUTH_KEY )[0]
//   // Sets the warning whether to add a project or not.
//   const [ warning, setWarning ] = useState<boolean>( false )
//   // Sets an error if one occurs.
//   const [ error, setError ] = useState<string>()
//   // Sets an the user's comment text.
//   const [ comment, setComment ] = useState<string>( `` )
//   // Sets whether currently making an API request.
//   const [ working, setWorking ] = useState<boolean>( false )
//   // The comment components
//   const [ commentComponents, setCommentComponents ] = useState( [] )
//   // The comment key of the comment the user is replying to
//   const [ showReply, setShowReply ] = useState<string>()
//   // The comment where to show the reply text input
//   const [ reply, setReply ] = useState<string>( `` )
//   // The user being displayed in the modal view
//   const [ open, setModal ] = useState<boolean>( false )
//   // When a user wants to change their name.
//   const [ newName, setNewName ] = useState<string>()
//   // The commenter details shown in the modal view.
//   const [ commenter, setCommenter ] = useState<Commenter>( {
//     name: undefined, dateString: undefined, isAdmin: false
//   } )
//   useEffect( () => {
//     API.get(
//       process.env.GATSBY_API_BLOG_NAME,
//       `/post-details`,
//       { response: true, queryStringParameters: { slug, title } }
//     ).then( result => {
//       // TODO - Why is this here???
//       if( !result.data.post && user && user.isAdmin ) setWarning( true )
//       setCommentComponents( Object.values( result.data.comments ).map(
//         (comment : Comment) => CommentComponent( {
//             slug, title, comment, user, working, setWorking, setError,
//             setWarning, showReply, setShowReply, reply, setReply,
//             setModal, setCommenter
//           } )
//       ) )
//     } ).catch( error => {
//       if (
//         error.response &&
//         error.response.data == `Post does not exist` &&
//         user && user.isAdmin
//       ) setWarning( true )
//     } )
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ slug, title, user, working, showReply ] )
//   return(
//     <>
//       <AdminControls 
//         user={user} warning={warning} working={working} setWorking={setWorking}
//         slug={slug} title={title}
//       />
//       {// If there is no warning, show the comment title and the option to add
//       //  comments.
//         !warning &&
//           <>
//             <Title>Comments</Title>
//             { user &&
//               <>
//                 <TextInput
//                   id={`NewComment`} contentEditable={ `true` }
//                   // content = { comment }
//                 />
//                 <Error error={ error } />
//                 <SubmitComment { ...{
//                   working, setWorking, user, slug, title, setWarning, setError,
//                   setComment
//                 } } />
//               </>
//             }
//             <>{ commentComponents }</>
//           </>
//       }
//       <Warning { ...{ warning, slug, title, setWarning, setError } }/>
//       <Modal { ...{ open, setModal } } 
//         contents={ User( {
//           name: commenter.name, dateString: commenter.dateString,
//           email: commenter.email, userNumber: commenter.userNumber,
//           isAdmin: commenter.isAdmin, username: commenter.username,
//           newName, setNewName,
//           setWorking, working, setError
//         } ) } 
//       />
//     </>
//   )
// }

