import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
import { PageBody } from '../components/styles'
import Toc from 'components/Toc'
import Comments from 'components/Comments'
import PrevNext from '../components/PrevNext'
import { Date, Title } from './styles'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { FireHose } from 'utils/auth'

export default function Post( { data } ) {
  const { post, next, prev } = data
  const { title, date, slug, showToc } = post.frontmatter
  const body = post.body
  const user = useSessionStorage( AUTH_KEY )[0]
  useEffect( () => {
    FireHose( title, slug, user )
  }, [slug, title, user] )
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
    post: mdx( frontmatter: { slug: {eq: $slug} } ) {
      id, body,
      frontmatter {
        title, date(formatString: "MMMM D, YYYY"), description, slug, showToc
      }
    }
    next: mdx( frontmatter: { slug: {eq: $nextSlug} } ) {
      id, body,
      frontmatter {
        title, date(formatString: "MMMM DD, YYYY"), description, slug
      }
    }
    prev: mdx( frontmatter: { slug: {eq: $prevSlug} } ) {
      id, body,
      frontmatter {
        title, date(formatString: "MMMM DD, YYYY"), description, slug
      }
    }
  }
`