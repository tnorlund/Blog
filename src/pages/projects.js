import React from "react"
import styled from 'styled-components'
import { PageBody } from 'components/styles'
import ProjectList from 'views/ProjectList'

const MainTitle = styled.h1`
  border-bottom: 4px solid var(--color-b);
`

const Description = styled.div`
  margin-bottom:25px;
`

export default function Projects() {
  return (
    <PageBody>
      <MainTitle>Projects</MainTitle>
      <Description>
        In my free time, I like to work on things that help me develop skills
        and learn. Here are a few projects I&apos;ve done with my free time.
      </Description>
      <ProjectList />
    </PageBody>
  )
}