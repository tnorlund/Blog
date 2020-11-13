import { useEventListener } from 'hooks'
import React, { useEffect, useRef } from 'react'
import { controls, ModalBehind, ModalDiv } from './styles'

const { Close, Next, Prev, FullscreenToggle } = controls

const handleArrowKeys = setModal => event => {
  if ( event?.key === `ArrowRight` ) setModal( m => m + 1 )
  else if ( event?.key === `ArrowLeft` ) setModal( m => m - 1 )
  else if ( event?.key === `Escape` ) setModal()
}

export default function Modal( { open, setModal, children, ...rest } ) {
  const ref = useRef()
  const { className } = rest
  // const [fullscreen, setFullscreen] = useState( rest.fullScreenDefault )
  useEventListener( `keydown`, handleArrowKeys( setModal ) )
  useEffect( () => {
    if ( open ) document.body.style.overflowY = `hidden`
    if ( ref.current ) ref.current.style.zIndex = 3
  }, [open] )
  if ( open )
    return (
      <ModalBehind open={open} onClick={() => setModal( false )}>
        <ModalDiv
          onClick={event => event.stopPropagation()}
          {...{ className, ref }}
        >
          <Close onClick={ () => setModal( false ) } />
          {children}
        </ModalDiv>
      </ModalBehind>
    )
  else {
    if ( typeof document !== `undefined` )
      document.body.style.removeProperty( `overflow-y` )
    if ( ref.current )
      ref.current.style.removeProperty( `z-index` )
      // ref.current.closest( `main` ).style.removeProperty( `z-index` )
    return null
  }
}
