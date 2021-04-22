import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import PropTypes from 'prop-types'
import favicon from '../../content/favicon.svg'
// import favicon from '../../../content/favicon.svg'

function capitalize( str: string ) {
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
  const result = useStaticQuery( graphql`{
  picture: file(name: {eq: "PortraitMeta"}) {
    img: childImageSharp {
      gatsbyImageData(width: 500, layout: FIXED)
    }
  }
}
` )

  const title = site.title
  let newTitle
  if ( uri in titles )
    newTitle = titles[uri]
  else
    newTitle = uri.split( `/` )[ uri.split( `/` ).length  - 1 ]
      .split( `-` ).map( capitalize ).join( ` ` )
  const pageUrl = ( uri.endsWith( `/` ) ) ?
    site.siteUrl + uri : site.siteUrl + uri + `/`
  const desc = data?.page?.excerpt || site.description
  const metaImageURL = `${
    site.siteUrl
  }/${result.picture.img.gatsbyImageData.images.fallback.src}`
  return(
    <Helmet title={newTitle}>
      <meta property="og:type" content="website" />
      <html lang="en" />
      <meta name="image" content={metaImageURL} />
      <meta name="description" content={desc} />
      <link rel="icon" href={favicon} type="image/svg+xml" sizes="any" />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={metaImageURL} />
      <meta property="og:image:alt" content={desc}></meta>

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={metaImageURL} />
      <meta name="twitter:image:alt" content={desc}></meta>

      {children}
    </Helmet>
  )
}

SEO.propTypes = {
  /** The site title */
  title: PropTypes.string.isRequired,
  /** The site description */
  description: PropTypes.string.isRequired,
  /** Keywords to use in meta keywords */
  keywords: PropTypes.arrayOf( PropTypes.string ),
  /** The site URL */
  url: PropTypes.string.isRequired,
  /** Image url to use for opengraph image */
  // ogImage: PropTypes.string,
  /** Favicon image urls**/
  // favicon: PropTypes.shape( {
  //   ico: PropTypes.string,
  //   sm: PropTypes.string,
  //   lg: PropTypes.string,
  // } ),
  /** Lang to use as meta lang */
  lang: PropTypes.string.isRequired,
  /** The type of meta - useful for Facebook */
  type: PropTypes.oneOf( [`website`, `article`] ).isRequired,
  /** The page name */
  page: PropTypes.string.isRequired,
  /** The path to the page */
  path: PropTypes.string.isRequired,
}

export default SEO