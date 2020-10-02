import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { PostDiv, PostTitle, PostDate, Description } from './styles'

export default function PostList() {
  const { allMdx } = useStaticQuery(graphql`
  {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { 
          slug: {
            regex: "^/blog/[0-9a-z-]+$/"
          } 
        }
      }
    ) {
      posts: nodes {
        id
        frontmatter {
          slug
          title
          description
          date(formatString: "MMM DD, YYYY")
        }
      }
    }
  }`)
  const { posts } = allMdx
// <Link to={slugPrefix + prev.slug} rel="prev" css="margin-right: 1em;">
  return(
    <>
    {posts.map(({ frontmatter: { title, slug, date, description } }, index) => (
      <PostDiv>
        <PostTitle><Link to={slug} rel={title}>{title}</Link></PostTitle>
        <PostDate>{date}</PostDate>
        <Description>{description}</Description>
      
      </PostDiv>
    ))}
    </>
  )
}
