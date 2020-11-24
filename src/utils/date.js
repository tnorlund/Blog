/**
 * Converts an ISO formatted date into a Date object.
 * @param {String} dateString An ISO formatted date.
 * @returns A Date object.
 */
export const parseDate = ( dateString ) => {
  const parsed = dateString.split( /\D+/ )
  return( new Date( Date.UTC(
    parsed[0], --parsed[1], parsed[2], parsed[3], parsed[4], parsed[5],
    parsed[6]
  ) ) )
}

/**
 * Calculates the number of years between dates.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @returns {Number}   The number of years between the two dates.
 */
export const yearsBetween = ( date1, date2 ) => {
  return Math.abs(
    new Date( Math.abs( date1 - date2 ) ).getUTCFullYear() - 1970
  )
}

/**
 * Calculates the number of months between dates.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @returns {Number}   The number of months between the two dates.
 */
export const monthsBetween = ( date1, date2 ) => {
  let months = ( date2.getFullYear() - date1.getFullYear() ) * 12
  months -= date1.getMonth()
  months += date2.getMonth()
  return months <= 0 ? 0 : months
}

/**
 * Calculates the number of days between dates.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @returns {Number}   The number of days between the two dates.
 */
export const daysBetween = ( date1, date2 ) => {
  return Math.round( Math.abs( date1 - date2 ) / ( 1000 * 60 * 60 * 24 ) )
}

/**
 * Calculates the number of hours between dates.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @returns {Number}   The number of hours between the two dates.
 */
export const hoursBetween = ( date1, date2 ) => {
  return Math.floor( ( Math.abs( date1 - date2 ) / 1000 ) / 60 / 60 )
}

/**
 * Calculates the number of minutes between dates.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @returns {Number}   The number of minutes between the two dates.
 */
export const minutesBetween = ( date1, date2 ) => {
  return Math.floor( ( Math.abs( date1 - date2 ) / 1000 ) / 60 )
}

/**
 * Calculates the number of seconds between dates.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @returns {Number}   The number of seconds between the two dates.
 */
export const secondsBetween = ( date1, date2 ) => {
  return Math.floor( Math.abs( date1 - date2 ) / 1000 )
}

/**
 * Formats a string that shows the time since then.
 * @param {String} date An ISO formatted date.
 * @returns {String}    The formatted time since now.
 */
export const timeSince = ( date ) => {
  if ( !date ) return( `` )
  if ( secondsBetween( parseDate( date ), new Date() ) < 60 )
    return `${
      secondsBetween( parseDate( date ), new Date() )
    } sec ago`
  if (
    minutesBetween( parseDate( date ), new Date() ) < 60 &&
    minutesBetween( parseDate( date ), new Date() ) > 0
  ) return `${
    minutesBetween( parseDate( date ), new Date() )
  } min ago`
  if (
    hoursBetween( parseDate( date ), new Date() ) < 60 &&
    hoursBetween( parseDate( date ), new Date() ) > 0
  ) return `${
    hoursBetween( parseDate( date ), new Date() )
  } hr ago`
  if (
    daysBetween( parseDate( date ), new Date() ) < 31 &&
    daysBetween( parseDate( date ), new Date() ) > 0
  ) {
    if ( daysBetween( parseDate( date ), new Date() ) > 1 )
      return `${
        daysBetween( parseDate( date ), new Date() )
      } days ago`
    else return `${
      daysBetween( parseDate( date ), new Date() )
    } day ago`
  }
  if (
    monthsBetween( parseDate( date ), new Date() ) < 31 &&
    monthsBetween( parseDate( date ), new Date() ) > 0
  ) {
    if ( monthsBetween( parseDate( date ), new Date() ) > 1 )
      return `${
        monthsBetween( parseDate( date ), new Date() )
      } months ago`
    else return `${
      monthsBetween( parseDate( date ), new Date() )
    } month ago`
  }
  // else {
  //   if ( yearsBetween( parseDate( date ),  new Date() ) > 1 )
  //     dateString = `${
  //       yearsBetween( parseDate( date ),  new Date() )
  //     } years ago`
  //   else dateString = `${
  //     yearsBetween( parseDate( date ),  new Date() )
  //   } year ago`
  // }
}
