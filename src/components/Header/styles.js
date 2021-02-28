import { Link } from 'gatsby'
import styled from 'styled-components'
import { mediaQueries } from 'utils/mediaQueries'
import { User3 } from 'styled-icons/remix-fill'


export const HeaderDiv = styled.header`
  background: var(--color-b);
  position: sticky;
  top: 0;
  display: grid;
  grid-gap: calc(1em + 1vw);
  z-index: 4;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  color: white;
  font-size: 1.2em;
  grid-template-areas: 'nav title IconDiv';
  grid-template-columns: auto 1fr auto;
  border-bottom: 1px solid var(--color-a);
  ${mediaQueries.minTablet} {
    grid-template-areas: 'title nav IconDiv';
  }
`

export const IconDiv = styled.div`
  display: grid;
  grid-template-areas: 'nav title';
  grid-gap: 1em;
  width: 4em;
`

// Needed as a selector in Notification below.
export const Div = styled.div`
  svg {
    vertical-align: -0.1em;
    height: 1em
  }
`


export const UserTitle = styled.hgroup`
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 0.3em;
  margin: 0.3em;
`

export const Logo = styled( Link )`
  grid-area: title;
  font-size: 2.4em;
  background-color: var(--color-b);
  color: inherit;
  justify-self: center;
`

export const Icon = styled( User3 ).attrs( props => ( {
  size: props.size || `1.6em`
} ) )`
  color: white;
  cursor: pointer;
  :hover {
    color: var(--color-a)
  };
`