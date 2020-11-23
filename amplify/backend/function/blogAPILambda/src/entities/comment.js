// TODO
// [ ] Add Reply functionality

const { ZeroPadNumber } = require( `./utils` )
class Comment {
  /**
   * A project object.
   * @param {Object} details The details of the project.
   */
  constructor( {
    userNumber, userCommentNumber, userName, slug, postCommentNumber, text,
    vote = `0`, numberVotes = `0`, dateAdded = new Date() }
  ) {
    if ( !userNumber ) throw Error( `Must give user's number` )
    this.userNumber = parseInt( userNumber )
    if ( !userCommentNumber )
      throw Error( `Must give the number of comments the user has made.` )
    this.userCommentNumber = parseInt( userCommentNumber )
    if ( !userName ) throw Error( `Must give the user's name.` )
    this.userName = userName
    if ( !slug ) throw Error( `Must give post's slug` )
    this.slug = slug
    if ( !postCommentNumber )
      throw Error( `Must give number of comments in the post` )
    this.postCommentNumber = parseInt( postCommentNumber )
    if ( !text ) throw Error( `Must give the text of the comment` )
    this.text = text
    if ( !vote ) throw Error( `Must give the current vote of the comment` )
    this.vote = parseInt( vote )
    if ( !numberVotes )
      throw Error( `Must give the number of votes of the comment` )
    this.numberVotes = parseInt( numberVotes )
    if ( !dateAdded )
      throw Error( `Must give the date the comment was added` )
    this.dateAdded = dateAdded
  }

  /**
   * @returns {Object} The partition key.
   */
  pk() { return { 'PK': {
    'S': `USER#${ ZeroPadNumber( this.userNumber ) }`
  } } }

  /**
   * @returns {Object} The primary key.
   */
  key() {
    return {
      'PK': {
        'S': `USER#${ ZeroPadNumber( this.userNumber ) }`
      },
      'SK': { 'S': `#COMMENT#${  ZeroPadNumber( this.userCommentNumber ) }` }
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
      'GSI1SK': {
        'S': `#COMMENT#${ ZeroPadNumber( this.postCommentNumber ) }`
      }
    }
  }

  /**
   * @returns {Object} The DynamoDB syntax of a Project.
   */
  toItem() {
    return {
      ...this.key(),
      ...this.gsi1(),
      'Type': { 'S': `comment` },
      'User': { 'S': this.userName },
      'Text': { 'S': this.text },
      'Vote': { 'N': String( this.vote ) },
      'NumberVotes': { 'N': String( this.numberVotes ) },
      'Slug': { 'S': this.slug },
      'DateAdded': { 'S': this.dateAdded.toISOString() }
    }
  }
}

/**
 * Turns the post from a DynamoDB item into the class.
 * @param   {Object} item The item returned from DynamoDB.
 * @returns {Object}      The post as a class.
 */
const commentFromItem = ( item ) => {
  return new Comment ( {
    userNumber: parseInt( item.PK.S.split( `#` )[1] ).toString(),
    userCommentNumber: parseInt( item.SK.S.split( `#` )[2] ).toString(),
    userName: item.User.S,
    slug: item.Slug.S,
    postCommentNumber: parseInt( item.GSI1SK.S.split( `#` )[2] ).toString(),
    text: item.Text.S,
    vote: parseInt( item.Vote.N ).toString(),
    numberVotes: parseInt( item.NumberVotes.N ).toString(),
    dateAdded: item.DateAdded.S
  } )
}

module.exports = { Comment, commentFromItem }