import React from "react"
import styled from 'styled-components'
import { PageBody } from 'components/styles'
import PostList from 'views/PostList'

const MainTitle = styled.h1`
  border-bottom: 4px solid var(--color-b);
`

const Description = styled.text`
  margin-bottom:0.3em;
`

export default function Projects() {
  return (
    <PageBody>
      <MainTitle>Posts</MainTitle>
      <Description>
        These are blog posts that I&apos;d like to share.
      </Description>
      <PostList />
    </PageBody>
  )
}