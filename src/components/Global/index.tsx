import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Scroll from '../Scroll'
import SyntaxHighlight from '../../utils/syntaxHighlight'
import Header from '../Header'
import Footer from '../Footer'
import Seo from '../seo'
import { DocsGrid } from '../styles'
import { GlobalStyle } from './styles'
import loadable from '@loadable/component'

const components = {
  DocsGrid,
  Analytics: loadable(
    () => import( `../MyIcons/Analytics` ),
    { fallback: <div style={{ height:`400pt` }}/> }
  ),
  API: loadable(
    () => import( `../MyIcons/API` ),
    { fallback: <div style={{ height:`199.21pt` }}/> }
  ),
  Aws: loadable(
    () => import( `../Icons/AWS` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  CICD: loadable(
    () => import( `../MyIcons/CICD` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  CloudWatch: loadable(
    () => import( `../Icons/CloudWatch` ),
    { fallback: <div style={{ height:`100pt` }}/> }
  ),
  Consul: loadable(
    () => import( `../Icons/Consul` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  ContentDelivery: loadable(
    () => import( `../MyIcons/ContentDelivery` ),
    { fallback: <div style={{ height:`275pt` }}/> }
  ),
  Cypress: loadable(
    () => import( `../Icons/Cypress` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Docker: loadable(
    () => import( `../Icons/Docker` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Eslint: loadable(
    () => import( `../Icons/Eslint` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Gatsby: loadable(
    () => import( `../Icons/Gatsby` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  GatsbyCloud: loadable(
    () => import( `../Icons/GatsbyCloud` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Github: loadable(
    () => import( `../Icons/Github` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  GithubActions: loadable(
    () => import( `../Icons/GithubActions` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Graphql: loadable(
    () => import( `../Icons/Graphql` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Homebrew: loadable(
    () => import( `../Icons/Homebrew` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Identity: loadable(
    () => import( `../MyIcons/Identity` ),
    { fallback: <div style={{ height:`128pt` }}/> }
  ),
  Jest: loadable(
    () => import( `../Icons/Jest` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Opencv: loadable(
    () => import( `../Icons/Opencv` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Openmpi: loadable(
    () => import( `../Icons/Openmpi` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Pytest: loadable(
    () => import( `../Icons/Pytest` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Pylint: loadable(
    () => import( `../Icons/Pylint` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  ReactIcon: loadable(
    () => import( `../Icons/React` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Terraform: loadable(
    () => import( `../Icons/Terraform` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Typescript: loadable(
    () => import( `../Icons/Typescript` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Vscode: loadable(
    () => import( `../Icons/Vscode` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Webpack: loadable(
    () => import( `../Icons/Webpack` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Babel: loadable(
    () => import( `../Icons/Babel` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  ModernWeb: loadable(
    () => import( `../Icons/ModernWeb` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  WASM: loadable(
    () => import( `../Icons/WASM` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Rust: loadable(
    () => import( `../Icons/Rust` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  W3C: loadable(
    () => import( `../Icons/W3C` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  SVG: loadable(
    () => import( `../Icons/SVG` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  Ellipse: loadable(
    () => import( `../MyIcons/Ellipse` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  EllipseConjugate: loadable(
    () => import( `../MyIcons/EllipseConjugate` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  EllipseParallelogram: loadable(
    () => import( `../MyIcons/EllipseParallelogram` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  LinearBezier: loadable(
    () => import( `../MyIcons/LinearBezier` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
  QuadraticBezier: loadable(
    () => import( `../MyIcons/QuadraticBezier` ),
    { fallback: <div style={{ height:`200pt` }}/> }
  ),
}

/**
 * @typedef ProvidersProps
 * @param {JSX.Element} children
 */
 interface ProvidersProps {
  children: JSX.Element
}
export const Providers = ( { children }: ProvidersProps ) => (
  <MDXProvider components={components}>
    {children}
    <Scroll showBelow={1500} css="position: fixed; right: 1em; bottom: 1em;" />
  </MDXProvider>
)

/**
 * @typedef PageComponentsProps
 * @param {JSX.Element} children
 * @param {any} rest
 */
 interface PageComponentsProps {
  children: JSX.Element,
  rest: any
}
export function PageComponents( { children, ...rest }: PageComponentsProps ) {
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
