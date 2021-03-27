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


module.exports = {
  siteMetadata,
  flags: {
    DEV_SSR: true
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins: [
          { resolve: `gatsby-remark-code-titles` },
          {
            resolve: `gatsby-remark-vscode`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              wrapperStyle: `border-radius: 0.5em; overflow: hidden;`,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          require( `remark-math` ),
          require( `remark-html-katex` ),
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
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-catch-links`,
  ],
}
