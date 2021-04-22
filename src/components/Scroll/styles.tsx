import styled from 'styled-components'
import {
  ArrowDownCircle as Down, ArrowUpCircle as Up
} from 'styled-icons/feather'

interface ArrowProps {
  show:boolean, direction:string, 
  // className:string, 
  size:string
}

export const Arrow = styled( Down ).attrs( ( props: ArrowProps ) => ( {
  as: props.direction === `up` && Up,
} ) )`
  background: var(--color-yellow);
  color: white;
  border-radius: 50%;
  transition: 0.3s;
  position: absolute;
  bottom: 1em;
  right: calc(50vw - ${ ( props: ArrowProps ) => props.size } / 2);
  opacity: ${ ( props: ArrowProps ) => ( props.show ? 1 : 0 ) };
  visibility: ${ ( props: ArrowProps ) => ( props.show ? `visible` : `hidden` ) };
  width: ${ ( props: ArrowProps ) => props.size };
  height: ${ ( props: ArrowProps ) => props.size };
  :hover {
    transform: scale(1.15);
    background: var(--color-yellow);
  }
`
