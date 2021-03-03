import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import favicon from '../../content/favicon.svg'

function capitalize( str ) {
  return str.charAt( 0 ).toUpperCase() + str.slice( 1 )
}

const titles = {
  '/': `Tyler Norlund`,
  '/resume': `Resume`,
  '/projects': `Projects`,
  '/projects/web': `Web`,
  '/projects/vhs': `VHS`,
  '/projects/slam': `SLAM`,
  '/projects/rotoscope': `Rotoscope`,
  '/blog': `Blog`
}

const SEO = ( { site, uri = ``, data, children } ) => {

  const result = useStaticQuery( graphql`
  {
    picture: file( name: {eq: "PortraitMeta"} ) {
      img: childImageSharp {
        fixed(width: 500) { ...GatsbyImageSharpFixed_withWebp }
      }
    }
  }` )
  const title = site.title
  let newTitle
  if ( uri in titles )
    newTitle = titles[uri]
  else
    newTitle = uri.split( `/` )[ uri.split( `/` ).length  - 1 ]
      .split( `-` ).map( capitalize ).join( ` ` )
  const pageUrl = ( uri.endsWith( `/` ) ) ?
    site.url + uri : site.url + uri + `/`
  const desc = data?.page?.excerpt || site.description
  return(
    <Helmet title={newTitle}>
      <meta property="og:type" content="website" />
      <html lang="en" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={result.picture.img.fixed.src} />
      {/* <meta name="robots" content="noindex,follow"></meta> */}
      <meta name="description" content={desc} />
      <link rel="canonical" href={pageUrl} />
      <link rel="icon" href={favicon} type="image/svg+xml" sizes="any" />
      {children}
    </Helmet>
  )
}

export default SEO