// gatsby-plugin-sitemap config
// eslint-disable-next-line max-len
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sitemap#options

module.exports = {
  output: `/sitemap.xml`,
  query: `{
    site {
      siteMetadata {
        siteUrl
      }
    }
    allSitePage {
      nodes {
        path
      }
    }
  }`,
  resolveSiteUrl: ( { site } ) => site.siteMetadata.siteUrl,
  serialize: ( { site, allSitePage } ) =>
    allSitePage.nodes.map(
      node => ( { url: site.siteMetadata.siteUrl + node.path } )
    ),
}
