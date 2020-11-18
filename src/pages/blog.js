import React from "react"
import List from 'components/List'
import { PageBody } from 'components/styles'
import { Title, Description } from '../templates/styles'

export default function Blog() {
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