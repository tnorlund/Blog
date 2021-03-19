import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
import { PageBody } from '../components/styles'
import Toc from 'components/Toc'
import Comments from 'components/Comments'
import PrevNext from '../components/PrevNext'
import { Date, Title } from './styles'
import { useSessionStorage, useEventListener } from 'hooks'
import { PRIVACY_KEY, VISITOR_KEY } from 'utils/constants'
import { handleScroll, IncrementBuffer } from 'utils/analytics'
import { v4 as uuidv4 } from 'uuid'
import { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'

/** Add Kinesis Firehose to the Amplify Analytics object. */
Analytics.addPluggable( new AWSKinesisFirehoseProvider() )

export default function Post( { data } ) {
  console.log( { data } )
  const { post, next, prev } = data
  const { title, date, slug, showToc } = post.frontmatter
  const body = post.body
  /** A buffer used to store scroll events */
  let scroll_buffer = {}
  /** The key of the buffer of where to store the scroll data. */
  let buffer_index = 0
  buffer_index = IncrementBuffer( scroll_buffer, buffer_index )
  /** The object used to determine whether the visitor has agreed to the
    * privacy policy.
    */
  const privacy = useSessionStorage( PRIVACY_KEY )[0]
  /** The unique ID of the visitor in session storage. */
  const [ visitorKey, setVisitorKey ] = useSessionStorage( VISITOR_KEY )
  if ( !visitorKey ) setVisitorKey( uuidv4() )
  /** Send analytics data every time the user scrolls. */
  useEventListener(
    `scroll`,
    async () => buffer_index = handleScroll(
      privacy, scroll_buffer, buffer_index, Analytics,
      visitorKey, title, slug
    )
  )
  return (
    <PageBody>
      {showToc && <Toc />}
      <Title>{title}</Title>
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