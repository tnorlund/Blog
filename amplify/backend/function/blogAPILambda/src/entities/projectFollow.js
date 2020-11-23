const { ZeroPadNumber } = require( `./utils` )
class ProjectFollow {
  /**
   * A project's follow object.
   * @param {Object} details The details about the project's follow.
   */
  constructor( {
    userName, userNumber, email, userFollowNumber, projectFollowNumber, slug,
    title, dateFollowed = new Date()
  } ) {
    if ( typeof userName === undefined ) throw Error( `Must give user's name` )
    this.userName = userName
    if ( typeof userNumber === undefined )
      throw Error( `Must give the user's number` )
    this.userNumber = userNumber
    if ( typeof userFollowNumber === undefined )
      throw Error( `Must give the number of projects the user follows` )
    this.userFollowNumber = userFollowNumber
    if ( typeof email === undefined )
      throw Error( `Must give the user's email` )
    this.email = email
    if ( typeof projectFollowNumber === undefined )
      throw Error( `Must give the project's follow number` )
    /** The number of current followers of this project + 1. */
    this.projectFollowNumber = projectFollowNumber
    if ( !slug ) throw Error( `Must give the project's slug` )
    this.slug = slug
    if ( !title ) throw Error( `Must give the project's title` )
    this.title = title
    this.dateFollowed = dateFollowed
  }

  /**
   * @returns {Object} The partition key.
   */
  pk() {
    return { 'S': `USER#${ ZeroPadNumber( this.userNumber ) }` }
  }

  /**
   * @returns {Object} The primary key.
   */
  key() {
    return {
      'PK': { 'S': `USER#${ ZeroPadNumber( this.userNumber ) }` },
      'SK': { 'S': `#PROJECT#${ this.slug }` }
    }
  }

  /**
   * @returns {Object} The global secondary index partition key.
   */
  gsi1pk() {
    return { 'S': `PROJECT#${ this.slug }` }
  }

  /**
   * @returns {Object} The global secondary index primary key.
   */
  gsi1() {
    return {
      'GSI1PK': { 'S': `PROJECT#${ this.slug }` },
      'GSI1SK': {
        'S': `#PROJECT#${ ZeroPadNumber( this.projectFollowNumber ) }`
      }
    }
  }

  /**
   * @returns {Object} The DynamoDB syntax of a project's follow.
   */
  toItem() {
    return {
      ...this.key(),
      ...this.gsi1(),
      'Type': { 'S': `project follow` },
      'UserName': { 'S': this.userName },
      'Email': { 'S': this.email },
      'Title': { 'S': this.title },
      'DateFollowed': { 'S': this.dateFollowed.toISOString() }
    }
  }
}

/**
 * Turns the project's follow from a DynamoDB item into the class.
 * @param   {Object} item The item returned from DynamoDB.
 * @returns {Object}      The project's follow as a class.
 */
const projectFollowFromItem = ( item ) => {
  return new ProjectFollow( {
    userName: item.UserName.S,
    userNumber: parseInt( item.PK.S.split( `#` )[1] ).toString(),
    userFollowNumber: parseInt( item.SK.S.split( `#` )[2] ).toString(),
    projectFollowNumber: parseInt( item.GSI1SK.S.split( `#` )[2] ).toString(),
    slug: item.GSI1PK.S.split( `#` )[1],
    email: item.Email.S,
    title: item.Title.S,
    dateFollowed: item.DateFollowed.S
  } )
}

module.exports = { ProjectFollow, projectFollowFromItem }