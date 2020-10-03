import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
import { PageBody } from 'components/styles'
import PrevNext from 'components/PrevNext'
import BackButton from 'components/BackButton'
import styled from 'styled-components'

const PostDate = styled.h4`
// margin-bottom: 25px;
`

const PostTitle = styled.h1`
/* padding-top: 4px; */
margin-bottom: 3px;
border-bottom: 4px solid var(--color-b);
`

const BlogPostTemplate = ({ data }) => {
  const { post, next, prev } = data;
  const title = post.frontmatter.title;
  const date = post.frontmatter.date;
  const body = post.body;
  const slug = post.frontmatter.slug;
  const text = RegExp(/\/blog/).test(slug) ? "Blog" : /\/projects\/([0-9a-z-]+)/.exec(slug)[1].toUpperCase();
  const backSlug = RegExp(/\/blog/).test(slug) ? "/blog" : 
    /(\/projects\/[0-9a-z-]+)/.exec(slug)[0];

  return (
    <PageBody>
      <PostTitle>{title}</PostTitle>
      <PostDate>{date}</PostDate>
      <Mdx>{body}</Mdx>
      <PrevNext 
        prev={prev?.frontmatter} next={next?.frontmatter} label="Post"
      />
      <BackButton slug={backSlug} text={text} />
    </PageBody>
  )
}

export default BlogPostTemplate

// Query the page, previous page, and next page based on the slug given.
export const query = graphql`
  query BlogPostBySlug(
    $slug: String!, $prevSlug: String!, $nextSlug: String!
  ) {
    post: mdx( frontmatter: { slug: {eq: $slug} } ) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        slug
      }
    }
    next: mdx( frontmatter: { slug: {eq: $nextSlug} } ) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        slug
      }
    }
    prev: mdx( frontmatter: { slug: {eq: $prevSlug} } ) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        slug
      }
    }
  }
`