import styled, { css } from 'styled-components'
import { BookContent } from 'styled-icons/boxicons-regular'
import { Close as Cross } from 'styled-icons/material'
import { mediaQueries } from '../../utils/mediaQueries'

interface TOCProps {
  open: boolean
}

export const TocDiv = styled.aside`
  background: var(--color-background);
  padding: 0.7em 1.2em;
  margin: 1em 0;
  border-radius: 0.5em;
  box-shadow: 0 0 0.5em 1px var(--color-shadow);
  height: max-content;
  max-height: 80vh;
  z-index: 3;
  line-height: 2.2em;
  right: 1em;
  max-width: 20em;
  overscroll-behavior: none;
  grid-row: span 10;
  nav {
    max-height: 78vh;
    overflow-y: scroll;
  }
  ${mediaQueries.maxLaptop} {
    position: fixed;
    bottom: 1em;
    left: 1em;
    ${( props:TOCProps ) => !props.open && `height: 0;`};
    visibility: ${( props:TOCProps ) => ( props.open ? `visible` : `hidden` )};
    opacity: ${( props:TOCProps ) => ( props.open ? 1 : 0 )};
    transition: 0.3s;
  }
  ${mediaQueries.minLaptop} {
    font-size: 0.85em;
    grid-column: 4 / -1;
    position: sticky;
    top: 7em;
  }
`

export const Title = styled.h2`
  margin: 0;
  padding-bottom: 0.5em;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-template-columns: auto auto 1fr;
  color: var(--color-gray);
`

interface TOCLinkProps {
  active: boolean,
  depth: number
}

export const TocLink = styled.a`
  cursor: pointer;
  color: ${(props: TOCLinkProps) => ( props.active ? `var(--color-a)` : `var(--color-gray)` )};
  font-weight: ${(props: TOCLinkProps) => props.active && `bold`};
  display: block;
  margin-left: ${(props: TOCLinkProps) => props.depth + `em`};
`

export const TocIcon = styled( BookContent )`
  width: 1em;
  margin-right: 0.2em;
`

interface TOCToggleOpenerProps {
  open: boolean,
}

const openerCss = css`
  position: fixed;
  bottom: 2em;
  left: 0;
  padding: 0.5em 0.6em 0.5em 0.3em;
  background: var(--color-background);
  border: 2px solid var(--color-text);
  border-left: none;
  border-radius: 0 50% 50% 0;
  transform: translate( ${ 
    ( props: TOCToggleOpenerProps ) => ( props.open ? `-100%` : 0 ) 
  } );
`

interface TOCToggleProps {
  opener: boolean,
  size: number,
}


export const TocToggle = styled( Cross ).attrs(
    ( props: TOCToggleProps ) => ( {
    as: props.opener && BookContent,
    size: props.size || `1.6em`,
  } ) 
)`
  z-index: 2;
  transition: 0.3s;
  justify-self: end;
  :hover {
    transform: scale(1.1);
  }
  ${mediaQueries.minLaptop} {
    display: none;
  }
  ${props => props.opener && openerCss};
`
