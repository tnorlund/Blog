require( `dotenv` ).config()

/** The metadata used in the headers */
const siteMetadata = {
  title: `Tyler Norlund`,
  description: `Tyler's blog where he talks about himself.`,
  keywords: [`React`, `Gatsby`],
  site: `https://www.tylernorlund.com`,
  author: {
    name: `Tyler Norlund`,
  },
  lang: `en`,
  siteUrl: `https://www.tylernorlund.com`,
  social: {
    twitter: `tylernorlund`,
    linkedin: `tyler-norlund`,
    github: `tnorlund`,
  },
}

const remark_math = require( `remark-math` )
const remark_html_katex = require( `remark-html-katex` )

module.exports = {
  siteMetadata,
  // flags: {
  //   DEV_SSR: true,
  //   FAST_DEV: true
  // },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-vscode`,
          `gatsby-remark-code-titles`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              wrapperStyle: `border-radius: 0.5em; overflow: hidden;`,
            },
          },
        ],
        remarkPlugins: [
          remark_math,
          remark_html_katex
        ],
        extensions: [`.md`, `.mdx`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/`,
      },
      __key: `pages`,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tyler's Blog`,
        short_name: `MyBlog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `content/favicon.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-offline`,
  ],
}
