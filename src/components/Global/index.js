import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Scroll from '../Scroll'
import SyntaxHighlight from 'utils/syntaxHighlight'
import Header from '../Header'
import Footer from '../Footer'
import Seo from '../seo'
import { DocsGrid } from '../styles'
import { GlobalStyle } from './styles'
import loadable from '@loadable/component'

const components = {
  DocsGrid,
  Analytics: loadable( () => import( `components/Flow/Analytics` ) ),
  API: loadable( () => import( `components/Flow/API` ) ),
  Aws: loadable( () => import( `components/Icons/Aws` ) ),
  CICD: loadable( () => import( `components/Icons/CICD` ) ),
  CloudWatch: loadable( () => import( `components/Icons/CloudWatch` ) ),
  Consul: loadable( () => import( `components/Icons/Consul` ) ),
  ContentDelivery: loadable(
    () => import( `components/Flow/ContentDelivery` )
  ),
  Cypress: loadable( () => import( `components/Icons/Cypress` ) ),
  Docker: loadable( () => import( `components/Icons/Docker` ) ),
  Eslint: loadable( () => import( `components/Icons/Eslint` ) ),
  Gatsby: loadable( () => import( `components/Icons/Gatsby` ) ),
  GatsbyCloud: loadable( () => import( `components/Icons/GatsbyCloud` ) ),
  Github: loadable( () => import( `components/Icons/Github` ) ),
  GithubActions: loadable( () => import( `components/Icons/GithubActions` ) ),
  Graphql: loadable( () => import( `components/Icons/GraphQL` ) ),
  Homebrew: loadable( () => import( `components/Icons/Homebrew` ) ),
  Identity: loadable( () => import( `components/Flow/Identity` ) ),
  Jest: loadable( () => import( `components/Icons/Jest` ) ),
  Opencv: loadable( () => import( `components/Icons/Opencv` ) ),
  Openmpi: loadable( () => import( `components/Icons/Openmpi` ) ),
  Pytest: loadable( () => import( `components/Icons/Pytest` ) ),
  Pylint: loadable( () => import( `components/Icons/Pylint` ) ),
  ReactIcon: loadable( () => import( `components/Icons/React` ) ),
  Terraform: loadable( () => import( `components/Icons/Terraform` ) ),
  Vscode: loadable( () => import( `components/Icons/Vscode` ) ),
  Webpack: loadable( () => import( `components/Icons/Webpack` ) ),
  Babel: loadable( () => import( `components/Icons/Babel` ) ),
  Bezier: loadable( () => import( `components/Graph/bezier` ) ),
  CubicBezier: loadable(
    () => import( `components/Graph/CubicBezier` )
  ),
  QuadraticBezier: loadable(
    () => import( `components/Graph/QuadraticBezier` )
  ),
  LinearBezier: loadable(
    () => import( `components/Graph/LinearBezier` )
  ),
  Ellipse: loadable(
    () => import( `components/Graph/Ellipse` )
  ),
  EllipseConjugate: loadable(
    () => import( `components/Graph/EllipseConjugate` )
  ),
  EllipseParallelogram: loadable(
    () => import( `components/Graph/EllipseParallelogram` )
  ),
  W3C: loadable(
    () => import( `components/Icons/w3c` )
  ),
  SVG: loadable(
    () => import( `components/Icons/svg` )
  ),
}

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
