import React from "react"
import { graphql, Link } from "gatsby"
import Follow from 'components/Follow'
import { PageBody, Icon } from 'components/styles'
import {
  PostDiv, PostTitle, PostDate, Description
} from 'components/List/styles'
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
// import ProjectPostList from 'views/ProjectPostList'
import { Title } from './styles'
import { useSessionStorage, useEventListener } from 'hooks'
import { PRIVACY_KEY, VISITOR_KEY } from 'utils/constants'
import { handleScroll, IncrementBuffer } from 'utils/analytics'
import { v4 as uuidv4 } from 'uuid'
import { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'

/** Add Kinesis Firehose to the Amplify Analytics object. */
Analytics.addPluggable( new AWSKinesisFirehoseProvider() )

export default function Project( { data } ) {
  // Destructure the response from the original query.
  const { project, posts } = data
  const { title, slug } = project.frontmatter
  const body = project.body
  const icon = project.frontmatter.icon.publicURL
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
  return(
    <PageBody>
      <Title>{title}</Title><Follow slug={slug} title={title}/>
      <Icon src={icon} alt={title} height={`150px`} />
      <Mdx>{body}</Mdx>
      {posts.edges.map(
        ( { node: { frontmatter: { title, slug, description, date } } } ) =>
          <PostDiv key={title}>
            <Link to={slug} rel={title}>
              <PostTitle>{title}</PostTitle>
            </Link>
            <PostDate>{date}</PostDate>
            <Description>{description}</Description>
          </PostDiv>
      )}
    </PageBody>
  )
}


// Query the page, previous page, and next page based on the slug given.
export const query = graphql`
  query ProjectPostBySlug( $slug: String!, $regex: String! ) {
    project: mdx( frontmatter: { slug: {eq: $slug} } ) {
      id, body,
      frontmatter {
        title, date(formatString: "MMMM DD, YYYY"), description, slug,
        icon { publicURL }
      }
    }
    posts: allMdx( 
      filter: { frontmatter: { slug: { regex: $regex } } } 
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges { node { frontmatter { 
        title, slug, date(formatString: "MMM DD, YYYY"), description 
      } } }
    }
  }
`