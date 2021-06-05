import { useEffect, useState } from 'react'
import { mediaQueries } from '../utils/mediaQueries'

interface myCallbackType { (myArgument: string): void }

export const useMediaQuery = ( query: string|number, cb: myCallbackType ) => {
  const [matches, setMatches] = useState( false )

  useEffect( () => {
    const qry = window.matchMedia( query as string )
    setMatches( qry.matches )
    const handleMatch = ( q: any) => {
      setMatches( q.matches )
      if ( cb instanceof Function ) cb( q.matches )
    }

    qry.addListener( handleMatch )
    return () => qry.removeListener( handleMatch )
  }, [query, cb] )

  return matches
}

const validKeys = Object.keys( mediaQueries ).filter(
  key => !key.includes( `Js` )
)

export const useScreenQuery = ( key: string, cb: myCallbackType ) => {
  if ( !mediaQueries[key + `Js`] )
    throw new TypeError(
      `useScreenQuery received an invalid key: ${key}.`
      + ` Should be one of ${validKeys}`
    )
  return useMediaQuery( 
    mediaQueries[key + `Js`], 
    cb 
  )
}