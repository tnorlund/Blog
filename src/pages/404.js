import React, { useEffect } from "react"
import { PageBody } from 'components/styles'
import { Title, Description } from '../templates/styles'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { FireHose } from 'utils/auth'


const NotFoundPage = () => {
  const user = useSessionStorage( AUTH_KEY )[0]
  useEffect( () => {
    FireHose( `404`, `/404`, user )
  }, [ user ] )
  return <PageBody>
    <Title>Not Found</Title>
    <Description>
      This page doesn&apos;t exist.
    </Description>
  </PageBody>
}

export default NotFoundPage