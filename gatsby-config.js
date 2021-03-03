/* eslint-disable max-len */
// TODO
// Fix broken latex
// const macros = require( `./src/utils/katex` )
const sitemapOptions = require( `./src/utils/sitemap` )
// Uncomment this require to work on the backend locally.
// There is an error when this line is not commented out in production
require( `dotenv` ).config()

const gatsbyRemarkPlugins = [
  `gatsby-remark-smartypants`,
  `gatsby-remark-embed-video`,
  `gatsby-remark-responsive-iframe`,
  `gatsby-remark-copy-linked-files`,
  `gatsby-remark-code-titles`,
  `gatsby-remark-sub-sup`,
  `gatsby-remark-autolink-headers`,
  // require( `remark-burger` ),
  {
    resolve: `gatsby-remark-vscode`,
  },
  {
    // TODO
    // Fix broken latex
    resolve: `gatsby-remark-katex`,
    // options: { macros, throwOnError: false },
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 1200,
      linkImagesToOriginal: false,
      wrapperStyle: `border-radius: 0.5em; overflow: hidden;`,
    },
  },
  {
    resolve: `gatsby-remark-emojis`,
    options: { active: true, size: 24 },
  },
]

const siteMetadata = {
  title: `Tyler Norlund`,
  description: `Tyler's blog where he talks about himself.`,
  keywords: [ `React`, `Gatsby` ],
  site: `https://www.tylernorlund.com`,
  author: {
    name: `Tyler Norlund`,
  },
  lang: `en`,
  siteUrl: `https://www.tylernorlund.com`,
  social: {
    twitter: `tylernorlund`,
    linkedin: `tyler-norlund`,
    github: `tnorlund`
  }
}

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins,
        remarkPlugins: [ require( `remark-burger` ) ],
        plugins: [ `gatsby-remark-images`, `gatsby-remark-autolink-headers` ],
        extensions: [`.mdx`, `.md`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // https://github.com/gatsbyjs/gatsby/issues/21776#issuecomment-604924320
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: sitemapOptions,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tyler's Blog`,
        short_name: `TylersBlog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `content/favicon.svg`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-react-helmet`,
  ],
  // https://github.com/gatsbyjs/gatsby/discussions/28331
  // flags: {
  //   PRESERVE_FILE_DOWNLOAD_CACHE: true,
  //   PRESERVE_WEBPACK_CACHE: true,
  //   // DEV_SSR: true,
  //   FAST_DEV: true
  // },
}
