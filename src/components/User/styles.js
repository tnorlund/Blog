import styled from 'styled-components'
import { User3 } from 'styled-icons/remix-fill'

export const Box = styled.div`
  cursor: pointer;
  display: grid;
  > * {
    grid-area: 1/1;
  }
`

// Needed as a selector in Notification below.
export const Div = styled.div`
  svg {
    vertical-align: -0.1em;
    height: 1em
  }
`

export const Icon = styled( User3 ).attrs( props => ( {
  size: props.size || `1.6em`
} ) )`

`

// export const Icons = {
//   User: props => <User3 css="transform: scale(1.05)" {...props} />
// }