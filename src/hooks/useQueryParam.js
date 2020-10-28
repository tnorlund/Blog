import { useState } from 'react'

const handleParam = ( key, value, options ) => {
  if ( location !== undefined ) {
    // historyMethod: push or replace
    // (https://developer.mozilla.org/docs/Web/API/History)
    console.log(options)
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
  console.log( `first` )
  const [param, setParam] = useState( handleParam( key, value, options ) )
  console.log( `second` )
  const setter = ( newValue, override ) =>
    setParam( handleParam( key, newValue, { ...options, ...override } ) )
  console.log( `third` )
  return [param, setter]
}
