import React from "react"
import { graphql } from "gatsby"
import { PageBody } from 'components/styles'
import styled from 'styled-components'
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
import ProjectPostList from 'views/ProjectPostList'
import BackButton from 'components/BackButton'



const PostTitle = styled.h1`
  margin-bottom: 3px;
  border-bottom: 4px solid var(--color-b);
`

const Icon = styled.img`
  filter: var(--color-textfilter);
  height: 150px;
`

const ProjectPostTemplate = ( { data } ) => {
  const { project, posts } = data
  const title = project.frontmatter.title
  const body = project.body
  const iconURL = project.frontmatter.icon.publicURL
  const projectPosts = posts.edges
  return (
    <PageBody>
      <PostTitle>{title}</PostTitle>
      <Icon src={iconURL} alt={title} />
      <Mdx>{body}</Mdx>
      <ProjectPostList data={projectPosts}/>
      <BackButton slug={`/projects`} text={`Projects`} />
    </PageBody>
  )
}

export default ProjectPostTemplate

// Query the page, previous page, and next page based on the slug given.
export const query = graphql`
  query ProjectPostBySlug(
    $slug: String!, $regex: String!
  ) {
    project: mdx( frontmatter: { slug: {eq: $slug} } ) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        slug
        icon { publicURL }
      }
    }
    posts: allMdx( filter: { frontmatter: { slug: { regex: $regex } } } ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "MMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`