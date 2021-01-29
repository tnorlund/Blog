import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import {
  PostDiv, PostTitle, PostDate, Description, ProjectDiv, IconDiv, Icon, Title,
  DescriptionDiv, SquareContent, SquareDiv
} from './styles'

export default function List( { type } ) {
  const { blog, project } = useStaticQuery( graphql`
  {
    blog: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { slug: { regex: "^/blog/[0-9a-z-]+$/" } } }
      limit: 5
    ) {
      nodes {
        id,
        frontmatter{
          slug, title, description, date(formatString: "MMM DD, YYYY")
        }
      }
    }
    project: allMdx( 
      filter: { frontmatter: { slug: { regex: "^/projects/[a-z]+$/" } } }
    ) {
      nodes {
        id,
        excerpt,
        frontmatter { slug, title, description, icon { publicURL } }
      }
    }
  } ` )
  if ( type === `blog` )
    return(
      <>
        {blog.nodes.map(
          ( { frontmatter: { title, slug, date, description } } ) => (
            <PostDiv key={title}>
              <Link to={slug} rel={title}>
                <PostTitle>
                  {/* <Link to={slug} rel={title}> */}
                  {title}
                  {/* </Link> */}
                </PostTitle>
              </Link>
              <PostDate>{date}</PostDate>
              <Description>{description}</Description>
            </PostDiv>
          ) ) }
      </>
    )
  if ( type === `project` )
    return(
      <>
        {project.nodes.map( ( { excerpt,
          frontmatter: { title, slug, icon }
        } ) => (
          <ProjectDiv key={title}>
            <Link to={slug}>
              <IconDiv>
                <SquareDiv><SquareContent>
                  <Icon
                    src={icon.publicURL}
                    alt={title}
                  />
                </SquareContent></SquareDiv>
              </IconDiv>
              <DescriptionDiv>
                <Title>{title}</Title>
                <Description>{excerpt}</Description>
              </DescriptionDiv>
            </Link>
          </ProjectDiv>
        ) ) }
      </>
    )
  else return <>Error</>
}
