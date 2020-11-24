import styled from 'styled-components'
import {
  Warning, CircleWithCross, CircleWithMinus, CircleWithPlus
} from 'styled-icons/entypo'

export const Title = styled.hgroup`
  margin-top: 0;
  font-weight: bold;
`

export const WarningDiv = styled.div`
  color: var(--color-red);
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  height: 2.68em;
  padding-top: 1em;
`

export const WarningIcon = styled( Warning ).attrs( props => ( {
  size: props.size || `2.5em`
} ) )`
  color: var(--color-red);
  margin-right: 1em;
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

export const UnselectedButton = styled.div`
  background: var(--color-accentBackground);
  color: var(--color-text);
  font-weight: bold;
  justify-self: right;
  padding: 0.5em;
  width: max-content;
  border-radius: 0.25em;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
`

export const SelectedButton = styled.div`
  background: var(--color-b);
  color: var(--color-background);
  font-weight: bold;
  justify-self: right;
  padding: 0.5em;
  border-radius: 0.25em;
  width: max-content;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
  :hover {
    color: var(--color-a)
  }
`

// https://codepen.io/flesler/pen/AEIFc
export const TextInput = styled.div`
  /* content: attr(placeholder); */
  background: var(--color-accentBackground);
  border-radius: 0.25em;
  padding: 0.5em;
  margin: 0.5em;
  display:block;
`

export const CommentText = styled.div`
  background: var(--color-accentBackground);
  border-radius: 0.25em;
  padding: 0.5em;
`

export const CommentDiv = styled.div`
  padding: 0.5em;
`

export const CommentOptions = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const CommentOption = styled.div`
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
  :hover {
    color: var(--color-a)
  }
`