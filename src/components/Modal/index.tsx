import React, { FC, useRef } from 'react'
import { useEventListener } from '../../hooks'
import { Close, ModalBehind, ModalDiv } from './styles'

/**
 * @typedef keyEvent
 * @param {string} [key] The key pressed in the event of a key press.
 */
interface keyEvent {
  key?: string
}

const handleArrowKeys = ( 
  setModal: React.Dispatch<React.SetStateAction<boolean>> 
) => (
  event: keyEvent
) => {
  if ( event?.key === `Escape` ) setModal( false )
}

/**
 * @typedef ModalProps
 * @param {boolean} open Whether the modal view is open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setModal The React 
 *   dispatch used to open and close the modal view
 * @param {boolean} showClose Whether to show the "X" to close the modal view.
 * @param {JSX.Element} contents The React components shown inside of the modal
 *   view.
 */
interface ModalProps {
  open: boolean,
  setModal: React.Dispatch<React.SetStateAction<boolean>>,
  showClose?: boolean,
  contents: JSX.Element
}

/**
 * A modal view that holds the given contents.
 * @param {ModalProps} props The properties used for the modal view.
 */
export default function Modal( {
  open, setModal, showClose = true, contents
}: ModalProps ) {
  useEventListener( `keydown`, handleArrowKeys( setModal ) )
  // Get the reference to the Auth modal view.
  const ref = useRef<HTMLElement>()
  if ( open )
    return(
      <ModalBehind open={open} onClick={ () => setModal( false ) }>
        <ModalDiv
          onClick={ event => event.stopPropagation() }
        >
          { showClose && <Close onClick={ () => setModal( false ) } /> }
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