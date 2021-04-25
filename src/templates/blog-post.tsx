import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
import { PageBody } from '../components/styles'
import Toc from '../components/Toc'
import Comments from '../components/Comments'
import PrevNext from '../components/PrevNext'
import { Date, Title } from './styles'
import { useSessionStorage, useEventListener } from '../hooks'
import { PRIVACY_KEY, VISITOR_KEY } from '../utils/constants'
import { handleScroll, IncrementBuffer } from '../utils/analytics'
import { v4 as uuidv4 } from 'uuid'
import { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'

const MainTitle = styled.div`
  border-bottom: 4px solid var(--color-text);
  margin-bottom: 1em;
`

/** Add Kinesis Firehose to the Amplify Analytics object. */
Analytics.addPluggable( new AWSKinesisFirehoseProvider() )

interface frontmatter {
  title: string;
  date?: string;
  slug: string;
  showToc: boolean;
}

interface PostProps {
  data: {
    post: {
      frontmatter: frontmatter
      body: string;
    };
    next?: {
      frontmatter?: frontmatter;
    };
    prev?: {
      frontmatter?: frontmatter;
    };
  }
}

const Post: React.FC<PostProps> = ( { data } ) => {
  const { post, next, prev } = data
  const { title, date, slug, showToc } = post.frontmatter
  const body = post.body
  /** A buffer used to store scroll events */
  let scroll_buffer = {}
  /** The key of the buffer of where to store the scroll data. */
  let buffer_index = 0
  buffer_index = IncrementBuffer( scroll_buffer, buffer_index )
  /** 
   * The object used to determine whether the visitor has agreed to the privacy
   * policy.
   */
  const privacy = useSessionStorage( PRIVACY_KEY )[0]
  /** The unique ID of the visitor in session storage. */
  const [ visitorKey, setVisitorKey ] = useSessionStorage( VISITOR_KEY )
  if ( !visitorKey ) setVisitorKey( uuidv4() )
  /** Send analytics data every time the user scrolls. */
  useEventListener(
    `scroll`,
    async () => buffer_index = handleScroll(
      privacy, scroll_buffer, buffer_index, visitorKey, title, slug
    )
  )
  return (
    <PageBody>
      {showToc && <Toc/>}
      <MainTitle><h1>{title}</h1></MainTitle>
      <Date>{date}</Date>
      <Mdx>{body}</Mdx>
      <PrevNext prev={prev?.frontmatter} next={next?.frontmatter} />
      <Comments slug={ slug } title={ title } />
    </PageBody>
  )
}

export const query = graphql`
  query BlogPostBySlug(
    $slug: String!, $prevSlug: String!, $nextSlug: String!
  ) {
    post: mdx( slug: { eq: $slug } ) {
      id, body,
      frontmatter {
        title, date(formatString: "MMMM D, YYYY"), description, slug, showToc
      }
    }
    next: mdx( slug: { eq: $nextSlug } ) {
      id, body,
      frontmatter {
        title, date(formatString: "MMMM DD, YYYY"), description, slug
      }
    }
    prev: mdx( slug: { eq: $prevSlug } ) {
      id, body,
      frontmatter {
        title, date(formatString: "MMMM DD, YYYY"), description, slug
      }
    }
  }
`

export default Post