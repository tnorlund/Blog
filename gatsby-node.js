/* eslint-disable max-len */
const path = require( `path` )
/* The templates used to programmatically create pages. */
const postTemplate = path.resolve( `./src/templates/blog-post.js` )
const projectTemplate = path.resolve( `./src/templates/project-post.js` )


/**
 * Create the different pages given the projects.
 * @param {function} createPage The Gatsby function used to create pages.
 * @param {object}   projects   The different projects.
 * @param {function} resolve    The resolver for the original promise.
 */
const Project = ( createPage, projects, resolve ) => {
  projects.edges.forEach( ( post ) => {
    const { slug } = post.node.frontmatter
    const regex = `^/` + slug + `/[a-z-]+$/`
    createPage( {
      path: slug, component: projectTemplate, context: { slug, regex },
    } )
    resolve()
  } )
}

/**
 * Creates the different pages given certain posts.
 * @param {function} createPage The Gatsby function used to create pages.
 * @param {object}   posts      The different posts.
 * @param {function} resolve    The resolver for the original promise.
 */
const blogPost = ( createPage, posts, resolve ) => {
  posts.forEach( ( post, index, arr ) => {
    let nextSlug = ``
    let prevSlug = ``
    if (
      arr[index - 1] &&
      arr[index - 1].frontmatter &&
      arr[index - 1].frontmatter.slug
    ) nextSlug = arr[index - 1].frontmatter.slug
    if (
      arr[index - 1] &&
      arr[index - 1].node &&
      arr[index - 1].node.frontmatter &&
      arr[index - 1].node.frontmatter.slug
    ) nextSlug = arr[index - 1].node.frontmatter.slug
    if ( arr[index + 1] && arr[index + 1].frontmatter && arr[index + 1].frontmatter.slug )
      prevSlug = arr[index + 1].frontmatter.slug
    if ( arr[index + 1] && arr[index + 1].node && arr[index + 1].node.frontmatter.slug )
      prevSlug = arr[index + 1].node.frontmatter.slug
    let slug = ``
    if ( post.frontmatter ) slug = post.frontmatter.slug
    if (
      post.node &&
      post.node.frontmatter
    ) slug = post.node.frontmatter.slug
    createPage( {
      path: slug,
      component: postTemplate,
      context: { slug, nextSlug, prevSlug },
    } )
    resolve()
  } )
}

exports.createPages = async( { graphql, actions, reporter } ) => {
  const { createPage } = actions
  const { panicOnBuild } = reporter
  // eslint-disable-next-line no-undef
  return new Promise( ( resolve, reject ) => {
    resolve(
      graphql( `
        {
          posts: allMdx(
            filter: { frontmatter: { slug: { regex: "^/blog/[0-9a-z-]+$/" } } }
            sort: {fields: [frontmatter___date], order: DESC}
          ) {
            edges { node { id, frontmatter { date, title, slug } } }
          },
          projectPosts: allMdx(
            filter: { frontmatter: { slug: { regex: "^/projects/[0-9a-z-]+/[0-9a-z-]+/" } } }
            sort: { fields: [frontmatter___date], order: DESC}
          ) {
            edges { node { id, frontmatter { date, title, slug } } }
          },
          projects: allMdx(
            filter: { frontmatter: { slug: { regex: "^/projects/[0-9a-z-]+$/" } } }
          ) {
            edges { node { id, slug, frontmatter { slug } } }
          }
        }  
      ` ).then( result => {
        // When the query fails, reject the promise.
        if ( result.errors ) {
          panicOnBuild( `🚨  ERROR: Loading "createPages" query` )
          reject( result.errors )
        }
        // Destructure the results
        const { posts, projectPosts, projects } = result.data
        // Create pages for the Blog Posts
        blogPost( createPage, posts.edges, resolve )
        // Create pages for the Projects
        Project( createPage, projects, resolve )
        // Create an array of the projects in order to separate the different
        // project posts by their respective projects.
        const projectSlugs = projects.edges.map(
          project => project.node.frontmatter.slug
        )
        // Iterate over the different posts found in projects and put them into
        // the sorted Project array.
        let sortedProjectPosts = {}
        projectSlugs.map( slug => sortedProjectPosts[slug] = [] )
        projectPosts.edges.map(
          post =>
            sortedProjectPosts[
              /(\/projects\/[0-9a-z-]+)/.exec( post.node.frontmatter.slug )[0]
            ].push( post.node )
        )
        // Create pages for the posts of each Project
        // eslint-disable-next-line no-unused-vars
        for ( const [key, value] of Object.entries( sortedProjectPosts ) ) {
          blogPost( createPage, value, resolve )
        }
      } )
    )
  } )
}

// Enable absolute imports from `src`.
// See https://gatsbyjs.org/docs/add-custom-webpack-config#absolute-imports.
exports.onCreateWebpackConfig = ( { actions } ) => {
  actions.setWebpackConfig( {
    resolve: {
      modules: [path.resolve( __dirname, `src` ), `node_modules`],
    },
  } )
}