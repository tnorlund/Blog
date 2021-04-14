import { css } from 'styled-components'

export * from './PageBody'
export * from './BorderBox'
export * from './Grid'
export * from './Icon'

export const fadeInOnHoverParent = ( parent: string ) => css`
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: 0.3s;
  ${parent}:hover &,
  ${parent}:focus-within & {
    opacity: 1;
    visibility: visible;
    pointer-events: initial;
  }
`
