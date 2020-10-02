import React from "react"
import { Link } from "gatsby"
import { PostDiv, PostTitle, PostDate, Description } from './styles'

export function ProjectPostList({data}) {
  return(
    <>
    {data.map(
      (
        { node: { frontmatter: { title, slug, description, date } } }, index
      ) => (
      <PostDiv>
        <PostTitle><Link to={slug}>{title}</Link></PostTitle>
        <PostDate>{date}</PostDate>
        <Description>{description}</Description>
      </PostDiv>
    ))}
    </>
  )
}