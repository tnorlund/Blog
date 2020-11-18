class User {
  /**
   * A user object.
   * @param {Object} details The details of the user.
   */
  constructor(
    { name, email, userNumber = `0`, dateJoined = new Date(), numberTOS = `0` }
  ) {
    if ( !name )
      throw Error( `Must give the user's name` )
    this.name = name
    if ( !email )
      throw Error( `Must give the user's email` )
    this.email = email
    this.userNumber = parseInt( userNumber )
    this.dateJoined = dateJoined
    this.numberTOS = parseInt( numberTOS )
  }

  /**
   * @returns {Object}
   */
  pk() {
    return { 'S': `USER#${ ( `00000` + this.userNumber ).slice( -6 ) }` }
  }

  /**
   * @returns {Object} The primary key and sort key.
   */
  key() {
    return {
      'PK': { 'S': `USER#${ ( `00000` + this.userNumber ).slice( -6 ) }` },
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
      'NumberTOS': { 'N': this.numberTOS.toString() }
    }
  }
}

/**
 * Turns the user from a DynamoDB item into the class.
 * @param {Object} item The item returned from DynamoDB
 */
const userFromItem = ( item ) => {
  return new User( {
    name: item.Name.S,
    email: item.Email.S,
    userNumber: item.PK.S.split( `#` )[1],
    dateJoined: item.DateJoined.S,
    numberTOS: item.NumberTOS.N
  } )
}

module.exports = { User, userFromItem }