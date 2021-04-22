import { throttle } from 'lodash'
import React, { useState } from 'react'
import { useEventListener } from '../../hooks'
import { Arrow } from './styles'

interface ScrollRest {
  className: string,
  size: string
}

interface ScrollProps {
  direction?: string,
  by?: number,
  to?: number,
  showBelow: number,
  css: string,
  className: string,
  rest: ScrollRest,
  size: string
}

interface ScrollFunctionProps {
  mode: 'scrollTo' | 'scrollBy',
  to: number
}

export default function Scroll( { direction = `up`, by, to, ...rest }: ScrollProps ) {
  const { showBelow, className, size = `calc(0.6em + 30px)` } = rest
  console.log( { showBelow } )
  // const size = `calc(0.6em + 30px)`
  if ( ![`up`, `down`].includes( direction ) )
    throw TypeError(
      `Scroll component's direction prop must be either 'up' or 'down'`
    )
  if ( to && ( typeof to !== `number` || to <= 0 ) )
    throw TypeError( `Scroll component's to prop must be a positive number` )
  if ( by && typeof by !== `number` )
    throw TypeError( `Scroll component's by prop must be a number` )

  const [show, setShow] = useState( showBelow ? false : true )

  const scroll = ( { mode, to }: ScrollFunctionProps ) =>
    window[mode]( { top: to, behavior: `smooth` } )

  const handleScroll = throttle( () => {
    if ( !showBelow ) return
    if ( window.scrollY > showBelow ) {
      console.log( `showing scroll` )
      if ( !show ) setShow( true )
    } else {
      if ( show ) setShow( false )
    }
  }, 300 )
  useEventListener( `scroll`, handleScroll )

  const handleClick = () => {
    if ( to ) scroll( { mode: `scrollTo`, to: to * window.innerHeight } )
    else if ( by ) scroll( { mode: `scrollBy`, to: by * window.innerHeight } )
    else if ( direction === `up` ) scroll( { mode: `scrollTo`, to: 0 } )
    else scroll( { mode: `scrollTo`, to: document.body.scrollHeight } )
  }

  const arrowProps = { show, direction, 
    className, 
    size }
  return <Arrow onClick={handleClick} {...arrowProps} />
}
