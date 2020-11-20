import { useState } from 'react'

/**
 * Handles the query parameters.
 * @param {String} key The key in the URL.
 * @param {String} value The value in the URL.
 * @param {Object} options The options of the key-value pair.
 */
const handleParam = ( key, value, options = {} ) => {
  // Server-side rendering does not have a window object. Don't query on SSR.
  if ( typeof window !== `undefined` ) {
    // historyMethod: push or replace
    // (https://developer.mozilla.org/docs/Web/API/History)
    const { historyMethod = `replace`, nullDeletes = true } = options
    const params = new URLSearchParams( location.search )

    if ( value === undefined ) value = params.get( key )
    else if ( value === null && nullDeletes ) params.delete( key )
    else params.set( key, value )

    let target = window.location.pathname + `?` + params.toString()
    target = target.replace( /\/?\?$/, `` ) // remove empty search string

    history[historyMethod + `State`]( { path: value }, ``, target )
    return value
  }
}

/**
 * Adds a URL query parameter that can be handled as a React Hook.
 * @param {String} key The key in the URL.
 * @param {String} value The value in the URL.
 * @param {Object} options The options of the key-value pair.
 * @returns {Array.<{param:String, setter:Function}>} The value and the
 *   function used to update said value.
 */
export const useQueryParam = ( key, value, options ) => {
  const [param, setParam] = useState( handleParam( key, value, options ) )
  const setter = ( newValue, override ) =>
    setParam( handleParam( key, newValue, { ...options, ...override } ) )
  return [param, setter]
}
