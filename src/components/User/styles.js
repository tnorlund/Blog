import React from 'react'
import styled from 'styled-components'
import { User3 } from 'styled-icons/remix-fill'

export const Box = styled.div`
  cursor: pointer;
  display: grid;
  > * {
    grid-area: 1/1;
  }
`

export const Icon = styled( User3 ).attrs( props => ( {
  size: props.size || `1.6em`
} ) )`
  transform: scale(0.75);
`

// export const Icons = {
//   User: props => <User3 css="transform: scale(1.05)" {...props} />
// }