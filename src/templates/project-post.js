import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import Follow from 'components/Follow'
import { PageBody, Icon } from 'components/styles'
import {
  PostDiv, PostTitle, PostDate, Description
} from 'components/List/styles'
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
// import ProjectPostList from 'views/ProjectPostList'
import { Title } from './styles'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { FireHose } from 'utils/auth'

export default function Project( { data } ) {
  // Destructure the response from the original query.
  const { project, posts } = data
  const { title, slug } = project.frontmatter
  const body = project.body
  const icon = project.frontmatter.icon.publicURL
  const user = useSessionStorage( AUTH_KEY )[0]
  useEffect( () => {
    FireHose( title, slug, user )
  }, [slug, title, user] )
  return(
    <PageBody>
      <Title>{title}</Title><Follow slug={slug} title={title}/>
      <Icon src={icon} alt={title} height={`150px`} />
      <Mdx>{body}</Mdx>
      {posts.edges.map(
        ( { node: { frontmatter: { title, slug, description, date } } } ) =>
          <PostDiv key={title}>
            <PostTitle>
              <Link to={slug} rel={title}>{title}</Link>
            </PostTitle>
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