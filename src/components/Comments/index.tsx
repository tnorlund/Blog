import React, { useState, useEffect, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSessionStorage } from '../../hooks'
import { AUTH_KEY } from '../../utils/constants'
import { Button, LoadingButton } from '../styles/Button'
import { 
  Title, TextInput, 
  WarningIcon, WarningDiv, WarningText,
  CommentText, CommentDiv, CommentDetails, CommenterName, 
    CommentDate, CommentDash, CommentOptions, CommentOption,
    ReplyIcon, TrashIcon, Up, Down, SelectedUp
} from './styles'
import { timeSince } from '../../utils/date'
import Loading from '../Icons/Loading'
// import {
//   // SubmitComment, 
//   // Error, 
//   CommentComponent, Warning, AdminControls, User
// } from './components'
import Modal from '../Modal'
import { API } from 'aws-amplify'
import SubmitComment from './submitComment'
import SubmitReply from './submitReply'

/**
 * @typedef CommentsProps
 * @param {string} slug The blog post's slug.
 * @param {string} title The blog post's title.
 */
interface CommentsProps {
  slug: string,
  title: string,
}

interface PostDetails {
  post: Post,
  comments: Comments
}

/**
 * @typedef Post
 * @param {string} slug The post's slug. *Note* that this is not the root URL.
 * @param {string} title The post's title.
 * @param {number} numberComments The number of comments the post has.
 */
interface Post {
  slug: string, title: string, numberComments: number
}

/**
 * @typedef Comments
 * @param {string} commentDate The datetime the comment was made.
 * @param {Comment} comment The comment Object.
 */
interface Comments {
  [commentDate: string]: Comment
}

interface Comment {
  username: string, userCommentNumber: number, name: string, slug: string,
  text: string, vote: number, numberVotes: number, dateAdded: string, 
  replyChain: ReplyChain, replies: Replies, votes: Votes
}

interface Vote {
  username: string, name: string, slug: string, voteNumber: number, 
  up: boolean, dateAdded: string, replyChain: ReplyChain
}

/**
 * @typedef ReplyChain
 * An array of the dates the comment is replying to or vote applied to.
 */
interface ReplyChain {
  [index: number]: string
}

/**
 * @typedef Replies
 * The replies of a specific comment.
 */
interface Replies {
  [index: string]: Comment;
}

/**
 * @typedef Votes
 * The replies of a specific comment.
 */
 interface Votes {
  [index: string]: Vote;
}

interface User {
  comments: Comment[],
  dateJoined: string,
  email: string,
  follows: any,
  isAdmin: boolean,
  name: string,
  numberComments: number,
  numberFollows: number,
  numberVotes: number,
  tos: any,
  totalKarma: number,
  username: string
}



export const createResource = ( promise: Promise<any> ) => {
  let status = 'pending'
  let result = promise.then(
    ( details: any ) => { status = 'success'; result = details; },
    ( rejection : any ) => { status = 'error'; result = rejection; }
  )
  return {
    read() {
      if ( status === 'pending' ) throw result
      if ( status === 'error' ) throw result
      if ( status === 'success' ) return result
      throw new Error( 'This should be impossible' )
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

/**
 * 
 * @typedef ErrorFallbackProps
 * @param {boolean} canReset Whether the request can be sent again.
 * @param {any} error The error that occurs. This is typically a JSON object.
 * @param {function} resetErrorBoundary The function used to make the additional request???
 */
interface ErrorFallbackProps { 
  canReset: boolean, error: any, resetErrorBoundary: any, slug: string, title: string
}
/**
 * 
 * @param param0 
 * @returns 
 */
function ErrorFallback( { canReset, error, resetErrorBoundary, slug, title }: ErrorFallbackProps ) {
  console.log( { error } )
  if ( canReset && postNotExist(error) ) {
    // When the API payload says that there's no Post, give the option to 
    // create the post in the DB.
    return <>
      <Title>Comments</Title>
      <WarningDiv>
        <WarningIcon />
        <WarningText>Post details not in database.</WarningText>
      </WarningDiv>
      <Button warning={true} onClick={ 
        () => API.post(
          process.env.GATSBY_API_BLOG_NAME,
          `/post`,
          { body: { slug: slug, title: title } }
        )
        .then( () => resetErrorBoundary() )
        .catch( () => console.warn( `could not create post` ) ) 
      }>Create Post</Button>
    </>
  }
  else return <>
    <Title>Comments</Title>
    <WarningDiv>
      <WarningIcon />
      <WarningText>Could not get post details.</WarningText>
    </WarningDiv>
    <Button warning={true} onClick={resetErrorBoundary}>Try Again</Button>
  </>
}

const postNotExist = ( error: any ) => error.response.data == "Post does not exist"


interface PostDetailsFallbackProps {
  title: string
}
const PostDetailsFallback = ( { title } : PostDetailsFallbackProps ) => <>
  <Title>Comments</Title>
  <Loading />
</>

interface PostErrorBoundaryProps {
  onReset: () => void, resetKeys: string[], children: JSX.Element, 
  slug: string, title: string
}
function PostErrorBoundary(parentProps : PostErrorBoundaryProps) {
  const canReset = Boolean( parentProps.onReset || parentProps.resetKeys )
  const { slug, title } = parentProps
  return (
    <ErrorBoundary
      fallbackRender={props => <ErrorFallback canReset={canReset} slug={slug} title={title} {...props} />}
      {...parentProps}
    />
  )
}

//TODO
// - Render replies
// - Suspense sending reply
interface Resource {
  config: any, data: PostDetails, 
}
interface PostResource { 
  postResource: { read: () => Resource }, slug: string, title: string, user?: User 
}
const PostInfo = ( { postResource, slug, title,  user }: PostResource ) => {
  const resource = postResource.read()
  return  <>
    <Title>Comments</Title>
    { user ? <SubmitComment slug={slug} title={title} user={user}/> : <></> }
    <React.Fragment>{ 
      Object.entries( resource.data.comments ).map( 
        ( [ datetime, comment ] ) => <SubmitReply 
          slug={slug} 
          title={title} 
          datetime={datetime} 
          comment={comment} 
          user={user}
        />
      )
    }</React.Fragment>
  </>
}

interface PostDetailsProps { slug: string, title: string }
const PostDetails = ( { slug, title }: PostDetailsProps ) => {
  const [postComments, setPostComments] = React.useState<any>('')
  const [postResource, setPostResource] = React.useState<any>(null)
  const [user, setUser] = useSessionStorage( AUTH_KEY )
  React.useEffect( () => {
    setPostResource( createPostDetailsResource( title, slug ) )
  }, [ postComments ] )

  /**
   * Resets the post details.
   */
  const handleReset = () => { setPostComments(''); }

  return <>
    { postResource ? (
      <PostErrorBoundary
        onReset={handleReset}
        resetKeys={[postResource]}
        slug={ slug } title={ title }
      >
        <React.Suspense
          fallback={<PostDetailsFallback title={ title } />}
        >
          <PostInfo postResource={ postResource } slug={slug} title={title} user={user}/>
        </React.Suspense>
      </PostErrorBoundary>
    ) : ( <><Title>Comments</Title></>) }
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

