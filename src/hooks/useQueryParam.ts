import { useState } from 'react'

/**
 * Handles the query parameters.
 * @param {String} key The key in the URL.
 * @param {String} value The value in the URL.
 * @param {Object} options The options of the key-value pair.
 */
const handleParam = ( 
  key: string, value: string | null | undefined, options: object = {} 
) => {
  // Server-side rendering does not have a window object. Don't query on SSR.
  if ( typeof window !== `undefined` ) {
    // historyMethod: push or replace
    // (https://developer.mozilla.org/docs/Web/API/History)
    const { historyMethod = `replace`, nullDeletes = true } = options as any
    const params = new URLSearchParams( location.search )

    if ( value === undefined ) value = params.get( key )
    else if ( value === null && nullDeletes ) params.delete( key )
    else params.set( key, value as any )

    let target = window.location.pathname + `?` + params.toString()
    target = target.replace( /\/?\?$/, `` ); // remove empty search string

    (history as any)[(historyMethod as string) + `State`]( { path: value }, ``, target )
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
export const useQueryParam = ( 
  key: string, value: string, options: object 
) => {
  const [param, setParam] = useState( handleParam( key, value, options ) )
  const setter = ( newValue: any, override: any ) =>
    setParam( handleParam( key, newValue, { ...options, ...override } ) )
  return [param, setter]
}
