import { useEventListener } from '.'

export function useOnClickOutside( ref: any, handler: any, events: any ) {
  if ( !events ) events = [`mousedown`, `touchstart`]
  const detectClickOutside = ( event: any ) =>
    ref.current && event &&
    !ref.current.contains( event.target ) && handler( event )
  useEventListener( events, detectClickOutside )
}
