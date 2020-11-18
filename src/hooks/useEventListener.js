import { useEffect, useRef } from 'react'

export function useEventListener( eventNames, handler, element = global.globalThis ) {
  // First, create a reference that stores the handler.
  const savedHandler = useRef()
  if( !Array.isArray( eventNames ) ) eventNames = [eventNames]

  // Save the handler to ref.current on the initial call to useEventListener
  // and then update ref.current whenever the handler changes. This allows the
  // useEffect below to get the latest handler without needing to store it in
  // the hooks dependency array (causing it to re-run).
  useEffect( () => ( savedHandler.current = handler ), [handler] )

  useEffect( () => {
    if ( element === undefined ) { return }

    // When the element does not support an event listener, return.
    if ( !element.addEventListener ) return

    // Create an event listener that calls the handler function stored in the
    // reference.
    const listener = event => savedHandler.current( event )
    for ( const e of eventNames ) element.addEventListener( e, listener )
    return () => {
      for ( const e of eventNames ) element.removeEventListener( e, listener )
    }
  }, [element, eventNames] )
}