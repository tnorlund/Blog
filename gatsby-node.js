const path = require( `path` )
const postTemplate = path.resolve( `./src/templates/blog-post.js` )

/**
 * Creates the different pages given certain posts.
 * @param {function} createPage The Gatsby function used to create pages.
 * @param {object}   posts      The different posts.
 * @param {function} resolve    The resolver for the original promise.
 */
const blogPost = ( createPage, posts, resolve ) => {
  console.log( posts )
  posts.forEach( ( post, index, arr ) => {
    /** The next slug found in the array */
    const nextSlug = arr[ index - 1 ] &&
      arr[ index - 1 ].node &&
      arr[ index - 1 ].node.slug ? 
      arr[ index - 1 ].node.slug : ``
    /** The previous slug found in the array */
    const prevSlug = arr[ index + 1 ] &&
      arr[ index + 1 ].node &&
      arr[ index + 1 ].node.slug ? 
      arr[ index + 1 ].node.slug : ``
    /** The slug of this post */
    const slug = post.node && post.node.slug ? post.node.slug : undefined
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
  return new Promise( ( resolve, reject ) => {
    resolve(
      graphql( `
      {
        posts: allMdx(
          filter: { slug: { regex: "/blog/" } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              frontmatter { date, title }
              slug
            }
          }
        }
      }  
    ` ).then( result => {
      if ( result.errors ) {
        panicOnBuild( `🚨  ERROR: Loading "createPages" query` )
        reject( result.errors )
      }
      const { posts } = result.data
      blogPost( 
        createPage, 
        posts.edges, 
        // posts.edges.map( ( { frontmatter, } ) => node ),
        resolve 
      )
      } )
    )
  } )
}

// Enable absolute imports from `src`.
// See https://gatsbyjs.org/docs/add-custom-webpack-config#absolute-imports.
exports.onCreateWebpackConfig = ( { actions } ) => {
  actions.setWebpackConfig( {
    resolve: {
      modules: [ path.resolve( __dirname, `src` ), `node_modules` ],
    },
  } )
}