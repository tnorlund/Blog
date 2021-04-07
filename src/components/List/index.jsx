import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import {
  PostDiv, PostTitle, PostDate, Description
} from './styles'

export default function List( { limit } ) {
  const { blog: { edges } } = useStaticQuery( graphql`
  {
    blog: allMdx(
      filter: {fileAbsolutePath: {regex: "/content/blog/"}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter{
            slug, title, description, date(formatString: "MMM DD, YYYY")
          }
          slug
          fileAbsolutePath
        }
      }
    }
  } ` )
  return <>
    { limit && edges.slice( 0, limit ).map(
      ( { node } ) => {
        const { title, date, description } = node.frontmatter
        const { slug } = node
        return (
          <PostDiv key={title}>
            <Link to={slug} rel={title}>
              <PostTitle> {title} </PostTitle>
            </Link>
            <PostDate>{date}</PostDate>
            <Description>{description}</Description>
          </PostDiv>
        ) } ) }
    { !limit && edges.map(
      ( { node } ) => {
        const { title, date, description } = node.frontmatter
        const { slug } = node
        return (
          <PostDiv key={title}>
            <Link to={`${ slug.split( `/` )[1] }/`} rel={title}>
              <PostTitle> {title} </PostTitle>
            </Link>
            <PostDate>{date}</PostDate>
            <Description>{description}</Description>
          </PostDiv>
        ) } ) }
  </>
}
