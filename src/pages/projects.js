import React, { useEffect } from "react"
import { PageBody } from 'components/styles'
import List from 'components/List'
import { Title, Description } from '../templates/styles'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { FireHose } from 'utils/auth'

export default function Projects() {
  const user = useSessionStorage( AUTH_KEY )[0]
  useEffect( () => {
    FireHose( `Projects`, `/projects`, user )
  }, [ user ] )
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