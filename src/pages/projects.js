import React from "react"
import { PageBody } from 'components/styles'
import List from 'components/List'
import { Title, Description } from '../templates/styles'

export default function Projects() {
  return (
    <PageBody>
      <Title>Projects</Title>
      <Description>
        In my free time, I like to work on things that help me develop skills
        and learn. Here are a few projects I&apos;ve done with my free time.
      </Description>
      <List type={`project`}/>
    </PageBody>
  )
}