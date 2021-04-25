import styled from 'styled-components'
import {
  Warning, ArrowUp, ArrowDown
} from 'styled-icons/entypo'
import { mediaQueries } from '../../utils/mediaQueries'


export const Button = styled.div`
  /* width: 100%; */
  border-radius: 0.25em;
  padding: 0.5em;
  text-align: center;
  font-weight: bold;
  background-color: var(--color-red);
`

export const Title = styled.h1`
  /* margin-top: 0; */
  /* margin-left: 0.5em; */
  /* font-weight: bold; */
`

export const UserName = styled.div`
  margin-top: 0;
  margin-left: 0.5em;
  font-weight: bold;
  cursor: pointer;
  :hover {
    color: var(--color-a)
  }
`

export const ModalView = styled.div`
  display: block;
  ${mediaQueries.minTablet} {
    display: flex;
  }
`

export const ModalUserName = styled.hgroup`
  font-size: 2em;
  font-weight: bold;
  width: max-content;
  padding: 0.5em;
  padding-bottom: 0.2em;
  ${mediaQueries.minTablet} {
    padding: 0.5em;
  }
`

export const SubmitDiv = styled.div`
  margin: 0.5em;
  margin-top: 0;
`

export const ModalDescription = styled.div`
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-bottom: 1em;
`

export const VoteDiv = styled.div`
  padding-top: 0.3em; 
  display: flex;
`

export const WarningDiv = styled.div`
  color: var(--color-red);
  display: grid;
  grid-template-areas: 'icon, message';
  grid-template-columns: auto 1fr;
  font-weight: bold;
  padding: 1em;
`

export const WarningText = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const VoteNumber = styled.div`
  width: 1.5em;
  padding-top: 0.1em;
  text-align: center;
`

export const WarningIcon = styled( Warning ).attrs( props => ( {
  size: props.size || `2.5em`
} ) )`
  color: var(--color-red);
  margin-right: 1em;
`

export const Up = styled( ArrowUp ).attrs( props => ( {
  size: props.size || `2em`
} ) )`
  margin-right: 0.25em;
  margin-left: 0.25em;
  cursor: pointer;
`

export const SelectedUp = styled( ArrowUp ).attrs( props => ( {
  size: props.size || `2em`
} ) )`
  margin-right: 0.25em;
  margin-left: 0.25em;
  cursor: pointer;
  color: var(--color-green)
`

export const Down = styled( ArrowDown ).attrs( props => ( {
  size: props.size || `2em`
} ) )`
  margin-right: 0.25em;
  margin-left: 0.25em;
  cursor: pointer;
`

export const SelectedDown = styled( ArrowDown ).attrs( props => ( {
  size: props.size || `2em`
} ) )`
  margin-right: 0.25em;
  margin-left: 0.25em;
  cursor: pointer;
  color: var(--color-red)
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
export const NewTextInput = styled.input`
  background: var(--color-accentBackground);
  border-radius: 0.25em;
  margin: 1em;
  padding: 0.5em;
  margin-top: 1em;
  margin-bottom: 0;
  ${mediaQueries.minTablet} { margin-bottom: 0.5em; }
`

export const AdminButton = styled.div`
  background: var(--color-red);
  color: var(--color-background);
  text-align: center;
  padding: 0.5em;
  margin-top: 0;
  border-radius: 0.25em;
  margin: 1em;
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
  padding-bottom: 0;
`

export const CommentOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 2em;
  margin-top: 0.25em;
  align-items: center;
`

export const CommentOption = styled.div`
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
  :hover {
    color: var(--color-a)
  }
`