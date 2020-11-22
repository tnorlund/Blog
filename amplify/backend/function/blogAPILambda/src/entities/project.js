class Project {
  /**
   * A project object.
   * @param {Object} details The details of the project.
   */
  constructor( { slug, title, numberFollows = `0` } ) {
    if ( !slug ) throw Error( `Must give slug` )
    this.slug = slug
    if ( !title ) throw Error( `Must give title` )
    this.title = title
    this.numberFollows = parseInt( numberFollows )
  }

  /**
   * @returns {Object} The partition key.
   */
  pk() { return { 'PK': { 'S': `#PROJECT` } } }

  /**
   * @returns {Object} The primary key.
   */
  key() {
    return {
      'PK': { 'S': `#PROJECT` },
      'SK': { 'S': `PROJECT#${ this.slug }` }
    }
  }

  /**
   * @returns {Object} The global secondary index partition key.
   */
  gsi1pk() { return { 'S': `PROJECT#${ this.slug }` } }

  /**
   * @returns {Object} The global secondary index primary key.
   */
  gsi1() {
    return {
      'GSI1PK': { 'S': `PROJECT#${ this.slug }` },
      'GSI1SK': { 'S': `#PROJECT` }
    }
  }

  /**
   * @returns {Object} The DynamoDB syntax of a Project.
   */
  toItem() {
    return {
      ...this.key(),
      ...this.gsi1(),
      'Type': { 'S': `project` },
      'Slug': { 'S': this.slug },
      'Title': { 'S': this.title },
      'NumberFollows': { 'N': this.numberFollows.toString() }
    }
  }
}

/**
 * Turns the project from a DynamoDB item into the class.
 * @param   {Object} item The item returned from DynamoDB.
 * @returns {Object}      The project as a class.
 */
const projectFromItem = ( item ) => {
  return new Project ( {
    slug: item.Slug.S,
    title: item.Title.S,
    numberFollows: item.NumberFollows.N
  } )
}

module.exports = { Project, projectFromItem }