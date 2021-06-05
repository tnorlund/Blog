import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createResource } from './index'
import { timeSince } from '../../utils/date'
import { CommentInput, CommentText, CommentDiv, CommentDetails, CommenterName, 
  CommentDate, CommentDash, CommentOptions, CommentOption,
  ReplyIcon, TrashIcon, Up, Down, SelectedUp
} from './styles'
import { Button, LoadingButton } from '../styles/Button'
import { API } from 'aws-amplify'

interface SubmitReplyProps {
  slug: string, title: string, datetime: string, user?: User, comment: Comment
}

interface User {
  name: string, username: string, email: string, isAdmin: boolean
}

interface Comment {
  username: string, userCommentNumber: number, name: string, slug: string,
  text: string, vote: number, numberVotes: number, dateAdded: string, 
  replyChain: [string], replies: Replies, votes: Votes
}

interface Vote {
  username: string, name: string, slug: string, voteNumber: number, 
  up: boolean, dateAdded: string, replyChain: [string]
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

const createReplyResource = ( 
  text:string, replyChain:string[], title: string, slug: string, user?: User 
) => {
  if ( !user ) return
  const { name, email, username } = user
  return createResource( API.post(
    process.env.GATSBY_API_BLOG_NAME,
    `/reply`,
    { response: true, body: { 
      name, email, username, slug, title, text, replyChain 
    } }
  ) )
}

const SubmitReplyFallback = () => <LoadingButton />

interface ErrorFallbackProps { 
  canReset: boolean, error: any, resetErrorBoundary: any
}
const ErrorFallback = ( { canReset, error, resetErrorBoundary}: ErrorFallbackProps )  => {
  return <>Error</>
}
interface SubmitReplyErrorBoundaryProps {
  onReset: () => void, resetKeys: string[], children: JSX.Element, 
  text: string
}
const SubmitReplyErrorBoundary = ( parentProps: SubmitReplyErrorBoundaryProps ) => {
  const canReset = Boolean(parentProps.onReset || parentProps.resetKeys)
  return (
    <ErrorBoundary
      fallbackRender={props => <ErrorFallback canReset={canReset} {...props} />}
      {...parentProps}
    />
  )
}

const SubmitReply = ( { slug, title, datetime, user, comment }: SubmitReplyProps ) => {
  const { text, name, vote, username, replies, votes } = comment
  const signedIn = typeof user != `undefined`
  const ownsComment = signedIn && user?.username == username
  const ownsUpVote = Object.entries( votes ).filter( 
    ( [ , vote ] ) => vote.username == user?.username
  ).some( ( [ , vote ] ) => vote.up )
  const ownsDownVote = Object.entries( votes ).filter( 
    ( [ , vote ] ) => vote.username == user?.username
  ).some( ( [ , vote ] ) => vote.up )
  console.log(`In Submit Reply`)
  const [replyText, setReplyText] = React.useState<string>('')
  const [replyResource, setReplyResource] = React.useState<any>(null)
  const [replyOpen, setReplyOpen] = React.useState<boolean>(false)

  function handleReset() { setReplyText(''); }
  return <React.Fragment key={datetime+name}>
    <CommentDiv>
      <CommentText>{text}</CommentText>
      <CommentDetails>
        <CommenterName>{name}</CommenterName>
        <CommentDash>-</CommentDash>
        <CommentDate>{timeSince(datetime)}</CommentDate>
        <CommentOptions>
          {signedIn ? <CommentOption><ReplyIcon onClick={ () => {console.log(`clicked`); setReplyOpen(true)}}/></CommentOption> : <></>}
          {ownsComment ? <CommentOption><TrashIcon/></CommentOption> : <></>}
          <CommentOption>{ ownsUpVote ? <SelectedUp/> : <Up/>}</CommentOption>
          <CommentOption>{vote}</CommentOption>
          <CommentOption><Down/></CommentOption>
        </CommentOptions>
      </CommentDetails>
    </CommentDiv>
    <></>
    {replyOpen ? <>
      <CommentInput 
        placeholder="New comment..." 
        value={replyText}
        onChange={ ( event ) => setReplyText( event.target.value ) }
      />
      { replyText ? 
        <SubmitReplyErrorBoundary 
          onReset={handleReset}
          resetKeys={[replyText]}
          text={replyText}
        >
          <React.Suspense fallback={<SubmitReplyFallback />}>
            <Button
              onClick={ () => { setReplyResource( createReplyResource( 
                replyText, 
                comment.replyChain.concat( [ comment.dateAdded ] ), 
                title, 
                slug, 
                user 
              ) ) } }
            >Reply</Button>
          </React.Suspense>
        </SubmitReplyErrorBoundary> : 
        <Button selectable={false}>Submit</Button> 
      } </>
     : <></> }
  </React.Fragment>
}

export default SubmitReply