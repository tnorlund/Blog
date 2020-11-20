import { useLocalStorage, useMediaQuery } from 'hooks'
import { useEffect, useCallback } from 'react'
import {
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
  MODE_COLORS,
} from 'utils/constants'

const setBodyColors = mode => {
  for ( const [name, colorByMode] of Object.entries( MODE_COLORS ) ) {
    document.body.style.setProperty( `--color-${name}`, colorByMode[mode] )
  }
}

export const useDarkMode = () => {
  console.log( `COLOR_MODE_KEY`, COLOR_MODE_KEY )
  const [colorMode, setLSColorMode] = useLocalStorage( COLOR_MODE_KEY )

  // If the user prefers to use dark mode from a media query
  const prefersDarkFromMQ = useMediaQuery(
    `(prefers-color-scheme: dark)`,
    useCallback(
      prefersDark => setBodyColors( prefersDark ? `dark` : `light` ), []
    )
  )

  // The useDarkMode initialization is in useEffect to exclude it from server-
  // side rendering. This will run on the client after React hydration. The
  // colors are set in gatsby-ssr, before the React component tree mounts.
  useEffect( () => {
    const initialColorMode = document.body.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    )
    setLSColorMode( initialColorMode )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  function setColorMode( newValue ) {
    setLSColorMode( newValue )

    // `osPref` is a valid value for persistance, but this value is not a color
    // mode. This value must be reassigned.
    if ( newValue === `osPref` ) {
      newValue = prefersDarkFromMQ ? `dark` : `light`
    }

    setBodyColors( newValue )
  }

  return [colorMode, setColorMode]
}