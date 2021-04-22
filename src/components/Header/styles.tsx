import React from 'react'
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
  /* padding-bottom: 0.3em; */
  /* margin: 0.3em; */
`

export const Logo = styled( Link )`
  grid-area: title;
  font-size: 2.4em;
  background-color: var(--color-b);
  color: inherit;
  justify-self: center;
`
const Favicon = props => (
  <svg { ...props } viewBox="0 0 50 50" >
    <path
      // eslint-disable-next-line max-len
      d="M6.3,10l1.43-2L9.26,9,11.41,6l2.84,2L12.1,11l1.79,1.25-1.44,2L10.67,13l-4.06,5.8a1.68,1.68,0,0,0-.42,1c0,.19.35.49.94.9l.28.19.29.19L6.2,23.22l-1.39-.9c-1.39-.9-2.15-1.79-2.29-2.65a2.56,2.56,0,0,1,.58-1.86l4.73-6.76Z"
    />
    <path
      // eslint-disable-next-line max-len
      d="M24.21,20.26a4.45,4.45,0,0,1-1,3.71L18,31.36,15.1,29.3l4.68-6.67a4,4,0,0,0,.7-1.49,2,2,0,0,0-1-2A2.43,2.43,0,0,0,16.61,19a5.33,5.33,0,0,0-1.45,1.47L11,26.43l-2.87-2,7.67-11,2.78,1.95L17.46,17a5.9,5.9,0,0,1,1.9-.49,4.42,4.42,0,0,1,2.7.9A5.15,5.15,0,0,1,24.21,20.26Z"
    />
    <path
      // eslint-disable-next-line max-len
      d="M30.8,38.29a6.22,6.22,0,0,1-5.42-1.23,6.29,6.29,0,0,1-3-4.67,8.33,8.33,0,0,1,5.78-8.25,6.18,6.18,0,0,1,5.43,1.22,6.16,6.16,0,0,1,3,4.69,7.76,7.76,0,0,1-1.49,5.09A7.72,7.72,0,0,1,30.8,38.29ZM29.62,35.1A5.08,5.08,0,0,0,32.07,33a5,5,0,0,0,1.1-3,3.12,3.12,0,0,0-3.87-2.71,5,5,0,0,0-2.45,2.06,5.11,5.11,0,0,0-1.11,3,2.82,2.82,0,0,0,1.32,2.25A2.78,2.78,0,0,0,29.62,35.1Z"
    />
    <path
      // eslint-disable-next-line max-len
      d="M47.26,35.09s.12.09.24.18l-2.06,2.94L45,37.83l-.34-.25a2.92,2.92,0,0,0-3.11-.5,5.39,5.39,0,0,0-1.7,1.72l-3.68,5.25-2.89-2,7.69-11L43.7,33l-1.34,1.91a7.44,7.44,0,0,1,2.21-.69,3.82,3.82,0,0,1,2.56.8A.49.49,0,0,1,47.26,35.09Z"
    />
  </svg>
)

const Title = styled.div`
  grid-area: title; 
  justify-self: center; 
  width:2.75em;
  ${mediaQueries.minTablet} {
    width: 2em;
  }
`

export const Icons = {
  Favicon: props => <Title><Favicon
    css="fill: white; cursor: pointer; :hover { color: var(--color-a) };"
    {...props}
  /></Title>
}

export const Icon = styled( User3 ).attrs( props => ( {
  size: props.size || `1.6em`
} ) )`
  color: white;
  cursor: pointer;
  :hover {
    color: var(--color-a)
  };
`