import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createResource } from './index'
import { CommentInput } from './styles'
import { Button, LoadingButton } from '../styles/Button'
import { API } from 'aws-amplify'


interface User {
  name: string, username: string, email: string, isAdmin: boolean
}

interface SubmitCommentProps {
  slug: string, title: string, user: User
}

interface Resource {
  config: any, data: PostDetails, 
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

const createCommentResource = ( 
  text:string, title: string, slug: string, user: User 
) => {
  const { name, email, username } = user
  // console.log( { name, email, username, slug, title, text } )
  return createResource( API.post(
    process.env.GATSBY_API_BLOG_NAME,
    `/comment`,
    { response: true, body: { 
      name, email, username, slug, title, text 
    } }
  ) )
}

const SubmitCommentFallback = () => <LoadingButton />

interface ErrorFallbackProps { 
  canReset: boolean, error: any, resetErrorBoundary: any
}
const ErrorFallback = ( { canReset, error, resetErrorBoundary}: ErrorFallbackProps )  => {
  return <>Error</>
}

interface SubmitCommentErrorBoundaryProps {
  onReset: () => void, resetKeys: string[], children: JSX.Element, 
  text: string
}
const SubmitCommentErrorBoundary = ( parentProps: SubmitCommentErrorBoundaryProps ) => {
  // console.log( { parentProps } )
  const canReset = Boolean(parentProps.onReset || parentProps.resetKeys)
  return (
    <ErrorBoundary
      fallbackRender={props => <ErrorFallback canReset={canReset} {...props} />}
      {...parentProps}
    />
  )
}

interface SubmitComment { postResource: {read: () => Resource} }
const SubmitComment = ( { slug, title, user }: SubmitCommentProps ) => {
  const [commentText, setCommentText] = React.useState<string>('')
  const [commentResource, setCommentResource] = React.useState<any>(null)
  // React.useEffect(() => {
  //   if (!commentText) { setCommentResource(null); return; }
  //   // setCommentResource( createCommentResource( commentText, title, slug, user ) )
  //   // console.log({commentResource})
  // }, [commentText])

  function handleSubmit(_commentText:string) { setCommentText(_commentText); }

  function handleReset() { setCommentText(''); }
  
  return <>
    <CommentInput 
      placeholder="New comment..." 
      value={commentText}
      onChange={ ( event ) => setCommentText( event.target.value ) }
    />
    <div>
     {
      commentText ? 
        <SubmitCommentErrorBoundary 
          onReset={handleReset}
          resetKeys={[commentText]}
          text={commentText}
        >
          <React.Suspense fallback={<SubmitCommentFallback />}>
            <Button
              onClick={ () => { setCommentResource( createCommentResource( commentText, title, slug, user ) ) } }
            >Submit</Button>
          </React.Suspense>
        </SubmitCommentErrorBoundary> : 
        <Button selectable={false}>Submit</Button>
      }
    </div>
    
    {/* <LoadingButton />
    <Button selectable={false}>Submit</Button> */}
  </> 
}

export default SubmitComment