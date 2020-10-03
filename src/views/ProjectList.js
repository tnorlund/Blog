import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from 'styled-components'

const IconDiv = styled.div`
  width: 100px;
  margin-right: 10px;
`
const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`
const Icon = styled.img`
  margin: 0px;
  height: 100px;
  filter: invert(84%) sepia(26%) saturate(295%) hue-rotate(157deg) 
    brightness(99%) contrast(96%);
`
const Title = styled.h1`
  margin: 0;
`

const ProjectDiv = styled.div`
  flex: 0 auto;
  background: var(--color-b);
  a {
    color: var(--color-lightLink);
    display: flex;
    flex-direction: row;
  }
  &:hover ${Icon} {
    filter: var(--color-filter);
  }
  &:hover ${Title} {
    color: var(--color-a);
  }
  
  flex-wrap: nowrap;
  border-radius: 25px;
  margin-bottom: 25px;
  vertical-align: middle;
`

export default function ProjectList() {
  const { allMdx } = useStaticQuery(graphql`
  {
    allMdx( 
      filter: { frontmatter: { slug: { regex: "^/projects/[a-z]+$/" } } }
    ) {
      projects: nodes {
        id
        frontmatter { slug, title, icon, { publicURL } }
      }
    }
  }`)
  const { projects } = allMdx

return(
<>
{projects.map(
  ( { frontmatter: { title, slug, icon } }, index ) => (
    <ProjectDiv>
      <Link to={slug}>
      <IconDiv>
        <Icon 
          src={icon.publicURL} 
          alt={title}
        />
      </IconDiv>
        <TitleDiv>
          <Title>{title}</Title>
        </TitleDiv>
      </Link>
    </ProjectDiv>
  ) ) }
</>
)
}