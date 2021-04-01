import { PageComponents, Providers } from 'components/Global'
import React from 'react'
import "katex/dist/katex.min.css"

export const wrapRootElement = ( { element } ) => {
  return <Providers>{element}</Providers>
}

export const wrapPageElement = ( { element, props } ) => {
  return <PageComponents {...props}>{element}</PageComponents>
}

// https://gatsbyjs.org/docs/add-offline-support-with-a-service-worker
export const onServiceWorkerUpdateReady = () => window.location.reload()

