import { graphql, useStaticQuery } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Scroll from '../Scroll'

import React from 'react'
import SyntaxHighlight from 'utils/syntaxHighlight'
import Header from '../Header'
import Footer from '../Footer'
import Seo from '../seo'
import { DocsGrid } from '../styles'
import { GlobalStyle } from './styles'

const components = { DocsGrid }

export const Providers = ( { children } ) => (
  <MDXProvider components={components}>
    {children}
    <Scroll showBelow={1500} css="position: fixed; right: 1em; bottom: 1em;" />
  </MDXProvider>
)

export function PageComponents( { children, ...rest } ) {
  const { site } = useStaticQuery( graphql`
    { site { site: siteMetadata { title, siteUrl, description } } }
  ` )
  return(
    <>
      <GlobalStyle />
      <SyntaxHighlight />
      <Seo {...site} {...rest} />
      <Header {...site} />
      {children}
      <Footer />
    </>
  )
}