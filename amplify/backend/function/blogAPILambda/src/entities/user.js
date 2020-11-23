const { ZeroPadNumber } = require( `./utils` )
/**
 * User library
 */
class User {
  /**
   * A user object.
   * @param {object} options
   * @param {String} options.name The name of the user.
   * @param {Number|String} [options.userNumber=`0`] The number of the user.
   */
  constructor( {
    name, email, userNumber = `0`, dateJoined = new Date(), numberTOS = `0`,
    numberFollows = `0`, numberComments = `0`, numberVotes = `0`
  } ) {
    if ( !name ) throw Error( `Must give the user's name` )
    this.name = name
    if ( !email ) throw Error( `Must give the user's email` )
    this.email = email
    this.userNumber = parseInt( userNumber )
    this.dateJoined = dateJoined
    this.numberTOS = parseInt( numberTOS )
    this.numberFollows = parseInt( numberFollows )
    this.numberComments = parseInt( numberComments )
    this.numberVotes = parseInt( numberVotes )
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
      'SK': { 'S': `#USER` }
    }
  }

  /**
   * @returns {Object} The DynamoDB syntax of a User.
   */
  toItem() {
    return {
      ...this.key(),
      'Type': { 'S': `user` },
      'Name': { 'S': this.name },
      'Email': { 'S': this.email },
      'DateJoined': { 'S': this.dateJoined.toISOString() },
      'NumberTOS': { 'N': this.numberTOS.toString() },
      'NumberFollows': { 'N': this.numberFollows.toString() },
      'NumberComments': { 'N': this.numberComments.toString() },
      'NumberVotes': { 'N': this.numberVotes.toString() }
    }
  }
}

/**
 * Turns the user from a DynamoDB item into the class.
 * @param   {Object} item The item returned from DynamoDB.
 * @returns {Object}      The user as a class.
 */
const userFromItem = ( item ) => {
  return new User( {
    name: item.Name.S,
    email: item.Email.S,
    userNumber: item.PK.S.split( `#` )[1],
    dateJoined: item.DateJoined.S,
    numberTOS: item.NumberTOS.N,
    numberComments: item.NumberComments.N,
    numberVotes: item.NumberVotes.N
  } )
}

module.exports = { User, userFromItem }