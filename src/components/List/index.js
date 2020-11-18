import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import {
  PostDiv, PostTitle, PostDate, Description, ProjectDiv, IconDiv, Icon, Title,
  DescriptionDiv
} from './styles'

export default function List( { type } ) {
  console.log(type)
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
        id
        frontmatter { slug, title, description, icon { publicURL } }
      }
    }
  } `)
  if ( type === `blog` )
    return(
      <>
        {blog.nodes.map( 
          ( { frontmatter: { title, slug, date, description } } ) => (
          <PostDiv key={title}>
            <PostTitle>
              <Link to={slug} rel={title}>{title}</Link>
            </PostTitle>
            <PostDate>{date}</PostDate>
            <Description>{description}</Description>
          </PostDiv>
        ) ) }
      </>
    )
  if ( type === `project` )
    return(
      <>
        {project.nodes.map( ( { frontmatter: { title, slug, icon, description } } ) => (
          <ProjectDiv key={title}>
            <Link to={slug}>
              <IconDiv>
                <Icon
                  src={icon.publicURL}
                  alt={title}
                />
              </IconDiv>
              <DescriptionDiv>
                <Title>{title}</Title>
                <Description>{description}</Description>
              </DescriptionDiv>
            </Link>
          </ProjectDiv>
        ) ) }
      </>
    )
  else return <>Error</>
}
