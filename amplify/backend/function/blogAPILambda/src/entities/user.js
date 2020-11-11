class User {
  /**
   * A user object.
   * @param {Map} details The details of the user.
   */
  constructor(
    { name, email, userNumber = `0`, dateJoined = new Date(), numberTOS }
  ) {
    if ( !name )
      throw Error( `Must give the user's name` )
    this.name = name
    if ( !email )
      throw Error( `Must give the user's email` )
    this.email = email
    this.userNumber = userNumber
    this.dateJoined = dateJoined
    this.numberTOS = parseInt( numberTOS )
  }

  /**
   * @returns {Map} The primary key and sort key.
   */
  key() {
    return {
      'PK': { 'S': `USER#${ ( `00000`+this.userNumber ).slice( -6 ) }` },
      'SK': { 'S': `#USER` }
    }
  }

  /**
   * @returns {Map} The DynamoDB syntax of a User.
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
 * @param {Map} item The item returned from DynamoDB
 */
const userFromItem = ( item ) => {
  return new User( {
    name: item.Name,
    email: item.Email,
    dateJoined: item.DateJoined,
    numberTOS: item.NumberTOS
  } )
}

module.exports = { User, userFromItem }