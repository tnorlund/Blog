const macros = require(`./src/utils/katex`)

// require(`dotenv`).config()

const gatsbyRemarkPlugins = [
  `gatsby-remark-smartypants`,
  `gatsby-remark-embed-video`,
  `gatsby-remark-responsive-iframe`,
  `gatsby-remark-copy-linked-files`,
  `gatsby-remark-code-titles`,
  `gatsby-remark-sub-sup`,
  `gatsby-remark-autolink-headers`,
  {
    resolve: `gatsby-remark-vscode`,
    options: { 
      extensions: [`mdx`, `vscode-styled-components`] 
    },
  },
  {
    resolve: `gatsby-remark-katex`,
    options: { macros, throwOnError: false },
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
  author: {
    name: `Tyler Norlund`,
  },
  description: `A personal blog where I talk about myself.`,
  siteUrl: `https://tylernorlund.com/`,
  social: {
    twitter: `tylernorlund`,
    linkedin: `tyler-norlund`,
    github: `tnorlund`
  }
}

const plugins = [
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins,
      plugins: [
        `gatsby-remark-images`, 
        `gatsby-remark-autolink-headers`],
      extensions: [`.mdx`, `.md`],
    },
  }, 
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `content/`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
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
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: `/svg/`
      }
    }
  },
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-offline`,
  `gatsby-plugin-lodash`,
  `gatsby-plugin-react-helmet`,
  `gatsby-transformer-yaml`
];

module.exports = { siteMetadata, plugins }