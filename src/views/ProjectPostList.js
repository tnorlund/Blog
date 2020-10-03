import React from 'react'
import { Link } from 'gatsby'
import { PostDiv, PostTitle, PostDate, Description } from './styles'

export default function ProjectPostList( { data } ) {
  return (
    <>
      {data.map(
        (
          { node: { frontmatter: { title, slug, description, date } } }
        ) => (
          <PostDiv key={title}>
            <PostTitle><Link to={slug}>{title}</Link></PostTitle>
            <PostDate>{date}</PostDate>
            <Description>{description}</Description>
          </PostDiv>
        ) )}
    </>
  )
}
