class Blog {
  /**
   * A blog object.
   * @param {Map} details The detail of the blog.
   */
  constructor( { numberUsers = 0, numberPosts = 0 } ) {
    if ( parseInt( numberUsers ) < 0 )
      throw new Error( `Blog needs a positive number of Users` )
    this.numberUsers = parseInt( numberUsers )
    if ( parseInt( numberPosts ) < 0 )
      throw new Error( `Blog needs a positive number of Posts` )
    this.numberPosts = parseInt( numberPosts )
  }
  /**
   * @returns {Map} The primary key and sort key.
   */
  key() {
    return {
      'PK': { 'S': `#BLOG` },
      'SK': { 'S': `#BLOG` }
    }
  }
  /**
   * @returns {Map} The DynamoDB syntax of a blog.
   */
  toItem() {
    return {
      ...this.key(),
      'Type': { 'S': `blog` },
      'NumberUsers': { 'N': this.numberUsers.toString() },
      'NumberPosts': { 'N': this.numberPosts.toString() }
    }
  }
}

/**
 * Turns the blog from a DynamoDB item into the class.
 * @param {Map} item The item returned by DynamoDB.
 */
const blogFromItem = ( item ) => {
  return new Blog( {
    numberUsers: item.NumberUsers.N,
    numberPosts: item.NumberPosts.N
  } )
}

module.exports = {
  Blog,
  blogFromItem
}