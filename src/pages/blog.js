import React, { useEffect } from "react"
import List from 'components/List'
import { PageBody } from 'components/styles'
import { Title, Description } from '../templates/styles'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { FireHose } from 'utils/auth'

export default function Blog() {
  const user = useSessionStorage( AUTH_KEY )[0]
  useEffect( () => {
    FireHose( `Blog`, `/blog`, user )
  }, [ user ] )
  return(
    <PageBody>
      <Title>Posts</Title>
      <Description>
        These are blog posts that I&apos;d like to share.
      </Description>
      <List type={`blog`} />
    </PageBody>
  )
}