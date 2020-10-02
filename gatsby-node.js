const path = require(`path`)
const childProcess = require(`child_process`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { create } = require("domain")
const SVGO = require(`svgo`)
var async = require("async");

const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
const projectPostTemplate = path.resolve(`./src/templates/project-post.js`)

const query = `
  query {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { slug: { regex: "^/blog/[0-9a-z-]+$/" } } }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            slug
          }
        }
      }
    }
    projects: allMdx(
      filter: {
        frontmatter: {
          slug: {
            regex: "^/projects/[0-9a-z-]+$/"
          }
        }
      }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            slug
          }
        }
      }
    }
    projectPosts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { slug: { regex: "^/projects/[0-9a-z-]+/[0-9a-z-]+/" } } }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            slug
          }
        }
      }
    }
  }
`

const ProjectQuery = function(slug) {
  return(
    `query{
      posts: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { slug: { regex: "/` + slug + `/[a-z-]+/" } } }
      ) {
        edges {
          node {
            id
            slug
            frontmatter {
              slug
            }
          }
        }
      }
    }
    `
  )
}



exports.createPages = ({ graphql, actions, reporter }) => {
  // https://dev.to/malroun1/how-to-create-pages-dynamically-in-gatsby-19k4
  return new Promise((resolve, reject) => {
    resolve(
      graphql(query).then(result => {
        // When the query fails reject the promise
        if (result.errors) {
          reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
          reject(result.errors);
        }
        const { posts, projects, projectPosts } = result.data;
        const projectSlugs = projects.edges.map(project => project.node.frontmatter.slug);
        let sortedProjectPosts = {};
        projectSlugs.map(slug => sortedProjectPosts[slug] = []);
        projectPosts.edges.map(
          post => 
          sortedProjectPosts[
            /(\/projects\/[0-9a-z-]+)/.exec(post.node.frontmatter.slug)[0]
          ].push(post.node)
        );
        // Create pages for the Blog Posts
        posts.edges.forEach(( post, index, arr ) => {
          const nextSlug = arr[index - 1]?.node.frontmatter.slug || ``;
          const prevSlug = arr[index + 1]?.node.frontmatter.slug || ``;
          const { slug } = post.node.frontmatter;
          actions.createPage({
            path: slug,
            component: blogPostTemplate,
            context: { slug, nextSlug, prevSlug },
          });
          resolve();
        });
        // Create pages for the Projects
        projects.edges.forEach((post) => {
          const { slug } = post.node.frontmatter;
          const regex = "^/" + slug + "/[a-z-]+$/";
          actions.createPage({
            path: slug,
            component: projectPostTemplate,
            context: { slug, regex },
          });
          resolve();
        })
        // Create pages for the posts of each Project
        for (const [key, value] of Object.entries(sortedProjectPosts)) {
          value.forEach(( post, index, arr ) => {
            const nextSlug = arr[index - 1]?.frontmatter.slug || ``;
            const prevSlug = arr[index + 1]?.frontmatter.slug || ``;
            const { slug } = post.frontmatter;
            actions.createPage({
              path: slug,
              component: blogPostTemplate,
              context: { slug, nextSlug, prevSlug },
            });
            resolve();
          })
        }
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === `Mdx` &&
    node.fileAbsolutePath.includes(`content/blog`)
  ) {
    // console.log("node", node)
    // const value = createFilePath({ node, getNode })
    // console.log("value", value)
    // createNodeField({
    //   name: "slug",
    //   node,
    //   value: `/blog${value}`,
    // })
    
    node.frontmatter.slug = node.frontmatter.slug
  }

  if (
    node.internal.type === `Mdx` &&
    /projects\/[a-z-]+$/.test(node.frontmatter.slug)
  ) {
    const regex = "/" + node.frontmatter.slug + "\/[a-z-]+$/"

  }
}

// Enable absolute imports from `src`.
// See https://gatsbyjs.org/docs/add-custom-webpack-config#absolute-imports.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`],
    },
  })
}

// https://github.com/gatsbyjs/gatsby/issues/25193
exports.createResolvers = ({ createResolvers }) => {
  const svgo = new SVGO()
  const resolvers = {
    File: {
      dataURI: {
        type: `String`,
        // full resolve args: parent, args, context, info
        async resolve(parent) {
          if (parent.extension === `svg` && parent.size < 15000) {
            const svg = await fs.readFile(parent.absolutePath, `utf8`)
            const { data } = await svgo.optimize(svg)
            return svgToMiniDataURI(data)
          }
          return null
        },
      },
    },
  }
  createResolvers(resolvers)
}

// MacOS has a great notification system. Below are functions that notify the 
// user when Gatsby has finished the build and developed build.
const notify = (title, text) =>
  `osascript -e 'display notification "${text}" ` +
  `with title "${title}" sound name "default"'`

exports.onCreateDevServer = () => {
  const cmd = notify(`Done!`, `gatsby developed finished`)
  childProcess.exec(cmd)
}

exports.onPostBuild = () => {
  const cmd = notify(`Done!`, `gatsby build finished`)
  childProcess.exec(cmd)
}