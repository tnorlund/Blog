import { PageComponents, Providers } from 'components/Global'
import Auth from '@aws-amplify/auth'
import { setUser } from './src/utils/auth'
import React from 'react'

export const wrapRootElement = ( { element } ) => {
  return <Providers>{element}</Providers>
}

export const wrapPageElement = ( { element, props } ) => {
  return <PageComponents {...props}>{element}</PageComponents>
}

// https://gatsbyjs.org/docs/add-offline-support-with-a-service-worker
export const onServiceWorkerUpdateReady = () => window.location.reload()

export const onRouteUpdate = ( state, page, pages ) => {
  Auth.currentAuthenticatedUser()
    .then( user => {
      const userInfo = {
        ...user.attributes,
        username: user.username
      }
      setUser( userInfo )
    } )
    .catch( err => {
      window.localStorage.setItem( `gatsbyUser`, null )
    } )
}
