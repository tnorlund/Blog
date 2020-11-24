import styled, { css } from 'styled-components'
import { Close as Cross } from 'styled-icons/material'
import {
  Warning, CircleWithCross, CircleWithMinus, CircleWithPlus
} from 'styled-icons/entypo'

export const WarningIcon = styled( Warning ).attrs( props => ( {
  size: props.size || `2.5em`
} ) )`
  color: var(--color-red);
  margin-right: 1em;
`

export const ModalDiv = styled.div`
  padding: 1em;
  z-index: 1;
`

export const Title = styled.hgroup`
  font-size: 2em;
  font-weight: bold;

  padding: 0.5em;
  width: max-content;
`
export const BodyDiv = styled.div`
  margin: 1em;
`

export const SelectedButton = styled.div`
  background: var(--color-b);
  color: var(--color-background);
  font-weight: bold;
  text-align: center;
  padding: 0.5em;
  border-radius: 0.25em;
  margin: 1em;
  cursor: pointer;
  :hover {
    color: var(--color-a)
  }
`

export const NewTextInput = styled.input`
  background: var(--color-accentBackground);
  border-radius: 0.25em;
  margin: 1em;
  padding: 0.5em;
  margin-top: 0;`

export const OptionsDiv = styled.div`
  display: flex;
  padding-bottom: 0.5em;
  padding-right: 0.75em;
  padding-left: 0.75em;
  padding-top: 0;
  /* margin-left: 1em;
  margin-right: 1em; */
`

export const OptionDiv = styled.div`
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
  :hover { color: var(--color-a); }
`

export const WarningDiv = styled.div`
  color: var(--color-red);
  display: inline-block;
  font-weight: bold;
  justify-content: space-between;
  padding: 1.5em;
  padding-top: 0;
  padding-bottom: 0;
`

export const WarningButton = styled.div`
  background: var(--color-red);
  color: var(--color-background);
  justify-self: right;
  padding: 0.5em;
  border-radius: 0.25em;
  cursor: pointer;
  font-weight: bold;
`

// https://codepen.io/flesler/pen/AEIFc
export const TextInput = styled.div`
  :empty:before {
    content: attr(placeholder);
  }
  background: var(--color-accentBackground);
  border-radius: 0.25em;
  margin: 1em;
  padding: 0.5em;
  margin-top: 0;
  display: block;
`

// export const TextDiv = styled.div`
//   padding-bottom: 0.5em;
//   /* margin-left: 1em; */
//   width: 98%;
//   justify-self: center;
// `

export const ButtonDiv = styled.div`
  margin: 1em;
  background-color: var(--color-b);
  text-align: center;
  color: var(--color-lightLink);
  padding: 0.1em;
  border-radius: 0.2em;
  font-weight: bold;
  :hover {
    color: var(--color-a);
  }
`

export const Description = styled.div`
  padding-left: 1.5em;
  padding-right: 1.5em;
`

export const Link = styled.div`
  margin-left: 1em;
  font-weight: bold;
  color: var(--color-lightLink);
`

export const Error = styled.div`
  margin: 1em;
  color: var(--color-red);
`