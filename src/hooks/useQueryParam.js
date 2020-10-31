import { useState } from 'react'

const handleParam = ( key, value, options ) => {
  // Server-side rendering does not have a window object. Don't query on SSR.
  if ( typeof window !== `undefined` ) {
    // historyMethod: push or replace
    // (https://developer.mozilla.org/docs/Web/API/History)
    const historyMethod = options === undefined ?
      `replace` : options.historyMethod
    const nullDeletes = options === undefined ?
      true : options.nullDeletes
    const params = new URLSearchParams( window.location.search )

    if ( value === undefined ) value = params.get( key )
    else if ( value === null && nullDeletes ) params.delete( key )
    else params.set( key, value )

    let target = window.location.pathname + `?` + params.toString()
    target = target.replace( /\/?\?$/, `` ) // remove empty search string
    console.log(options)
    console.log({historyMethod})
    console.log({window})
    console.log({target})
    // window.history.path = value
    // window.history.path
    // [historyMethod + `State`]( { path: value }, ``, target )
    // this.window.history
    return value
  }
}

export const useQueryParam = ( key, value, options ) => {
  const [param, setParam] = useState( handleParam( key, value, options ) )
  const setter = ( newValue, override ) =>
    setParam( handleParam( key, newValue, { ...options, ...override } ) )
  return [param, setter]
}
