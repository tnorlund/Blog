import React, { useRef } from 'react'
import { useEventListener } from 'hooks'
import { Close, ModalBehind, ModalDiv } from './styles'

const handleArrowKeys = setModal => event => {
  if ( event?.key === `Escape` ) setModal()
}

/**
 *
 * @param {*} param0
 */
export default function Modal( {
  open, setModal, showClose = true, contents
} ) {
  useEventListener( `keydown`, handleArrowKeys( setModal ) )
  // Get the reference to the Auth modal view.
  const ref = useRef()
  if ( open )
    return(
      <ModalBehind open={open} onClick={ () => setModal() }>
        <ModalDiv
          onClick={ event => event.stopPropagation() }
        >
          { showClose && <Close onClick={ () => setModal() } /> }
          { contents }
        </ModalDiv>
      </ModalBehind>
    )
  else {
    // When the modal is not being viewed, reset the styles
    if ( typeof document !== `undefined` )
      document.body.style.removeProperty( `overflow-y` )
    if ( ref.current ) ref.current.style.removeProperty( `z-index` )
    return null
  }
}