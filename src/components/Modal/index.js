import React, { useRef } from 'react'
import { Close, ModalBehind, ModalDiv } from './styles'

/**
 * 
 * @param {*} param0 
 */
export default function Modal( {
  open, closeModal, showClose = true, contents
} ) {
  // Get the reference to the Auth modal view.
  const ref = useRef()
  if ( open )
    return(
      <ModalBehind open={open} onClick={ () => closeModal() }>
        <ModalDiv>
          { showClose && <Close onClick={ () => closeModal() } /> }
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