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
  Analytics: loadable(
    () => import( `components/Flow/Analytics` ),
    { fallback: <div height={{ height:`400pt` }}/> }
  ),
  API: loadable(
    () => import( `components/Flow/API` ),
    { fallback: <div height={{ height:`199.21pt` }}/> }
  ),
  Aws: loadable(
    () => import( `components/Icons/Aws` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  CICD: loadable(
    () => import( `components/Icons/CICD` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  CloudWatch: loadable(
    () => import( `components/Icons/CloudWatch` ),
    { fallback: <div height={{ height:`100pt` }}/> }
  ),
  Consul: loadable(
    () => import( `components/Icons/Consul` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  ContentDelivery: loadable(
    () => import( `components/Flow/ContentDelivery` ),
    { fallback: <div height={{ height:`275pt` }}/> }
  ),
  Cypress: loadable(
    () => import( `components/Icons/Cypress` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Docker: loadable(
    () => import( `components/Icons/Docker` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Eslint: loadable(
    () => import( `components/Icons/Eslint` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Gatsby: loadable(
    () => import( `components/Icons/Gatsby` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  GatsbyCloud: loadable(
    () => import( `components/Icons/GatsbyCloud` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Github: loadable(
    () => import( `components/Icons/Github` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  GithubActions: loadable(
    () => import( `components/Icons/GithubActions` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Graphql: loadable(
    () => import( `components/Icons/GraphQL` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Homebrew: loadable(
    () => import( `components/Icons/Homebrew` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Identity: loadable(
    () => import( `components/Flow/Identity` ),
    { fallback: <div height={{ height:`128pt` }}/> }
  ),
  Jest: loadable(
    () => import( `components/Icons/Jest` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Opencv: loadable(
    () => import( `components/Icons/Opencv` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Openmpi: loadable(
    () => import( `components/Icons/Openmpi` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Pytest: loadable(
    () => import( `components/Icons/Pytest` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Pylint: loadable(
    () => import( `components/Icons/Pylint` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  ReactIcon: loadable(
    () => import( `components/Icons/React` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Terraform: loadable(
    () => import( `components/Icons/Terraform` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Typescript: loadable(
    () => import( `components/Icons/Typescript` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Vscode: loadable(
    () => import( `components/Icons/Vscode` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Webpack: loadable(
    () => import( `components/Icons/Webpack` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Babel: loadable(
    () => import( `components/Icons/Babel` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Bezier: loadable(
    () => import( `components/Graph/bezier` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  CubicBezier: loadable(
    () => import( `components/Graph/CubicBezier` ),
    { fallback: <div height={{ height:`150pt` }}/> }
  ),
  QuadraticBezier: loadable(
    () => import( `components/Graph/QuadraticBezier` ),
    { fallback: <div height={{ height:`150pt` }}/> }
  ),
  LinearBezier: loadable(
    () => import( `components/Graph/LinearBezier` ),
    { fallback: <div height={{ height:`125pt` }}/> }
  ),
  Ellipse: loadable(
    () => import( `components/Graph/Ellipse` ),
    { fallback: <div height={{ height:`150pt` }}/> }
  ),
  EllipseConjugate: loadable(
    () => import( `components/Graph/EllipseConjugate` ),
    { fallback: <div height={{ height:`150pt` }}/> }
  ),
  EllipseParallelogram: loadable(
    () => import( `components/Graph/EllipseParallelogram` ),
    { fallback: <div height={{ height:`150pt` }}/> }
  ),
  W3C: loadable(
    () => import( `components/Icons/w3c` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  SVG: loadable(
    () => import( `components/Icons/svg` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Internet: loadable(
    () => import( `components/Icons/Internet` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  Rust: loadable(
    () => import( `components/Icons/Rust` ),
    { fallback: <div height={{ height:`200pt` }}/> }
  ),
  WASM: loadable(
    () => import( `components/Icons/wasm` ),
    { fallback: <div height={{ height:`200pt` }}/> }
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
