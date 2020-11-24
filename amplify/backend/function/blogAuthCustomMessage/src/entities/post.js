class Post {
  /**
   * A project object.
   * @param {Object} details The details of the project.
   */
  constructor( { slug, title, numberComments = `0` } ) {
    if ( !slug ) throw Error( `Must give slug` )
    this.slug = slug
    if ( !title ) throw Error( `Must give title` )
    this.title = title
    this.numberComments = parseInt( numberComments )
  }

  /**
   * @returns {Object} The partition key.
   */
  pk() { return { 'PK': { 'S': `#POST` } } }

  /**
   * @returns {Object} The primary key.
   */
  key() {
    return {
      'PK': { 'S': `#POST` },
      'SK': { 'S': `POST#${ this.slug }` }
    }
  }

  /**
   * @returns {Object} The global secondary index partition key.
   */
  gsi1pk() { return { 'S': `POST#${ this.slug }` } }

  /**
   * @returns {Object} The global secondary index primary key.
   */
  gsi1() {
    return {
      'GSI1PK': { 'S': `POST#${ this.slug }` },
      'GSI1SK': { 'S': `#POST` }
    }
  }

  /**
   * @returns {Object} The DynamoDB syntax of a Project.
   */
  toItem() {
    return {
      ...this.key(),
      ...this.gsi1(),
      'Type': { 'S': `post` },
      'Slug': { 'S': this.slug },
      'Title': { 'S': this.title },
      'NumberComments': { 'N': this.numberComments.toString() }
    }
  }
}

/**
 * Turns the post from a DynamoDB item into the class.
 * @param   {Object} item The item returned from DynamoDB.
 * @returns {Object}      The post as a class.
 */
const postFromItem = ( item ) => {
  return new Post ( {
    slug: item.Slug.S,
    title: item.Title.S,
    numberComments: item.NumberComments.N
  } )
}

module.exports = { Post, postFromItem }