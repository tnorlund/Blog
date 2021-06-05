import styled from 'styled-components'
import {
  Warning, ArrowUp, ArrowDown
} from 'styled-icons/entypo'
import { mediaQueries } from '../../utils/mediaQueries'
import { ReplyFill, TrashFill } from 'styled-icons/bootstrap'
import { ArrowAltCircleUp, ArrowAltCircleDown } from 'styled-icons/fa-solid'

interface ButtonProps {
  warning?: boolean
}
export const Button = styled.div`
  cursor: pointer;
  border-radius: 1em;
  padding: 0.5em;
  margin: 0.5em 0;
  text-align: center;
  font-weight: bold;
  color: var(--color-buttontext);
  background-color: ${( props: ButtonProps ) => ( props.warning ? `var(--color-red)` : `var(--color-blue)` )};
  :hover {
    color: var(--color-a);
  }
`
export const CommentOption = styled.div`
  font-weight: bold;
  padding: 0.1em;
  margin: 0.1em;
  justify-content: center;
  align-content: center;
`
export const CommentOptions = styled.div`
  display: grid;
  grid-column-start: -1;
  grid-auto-flow: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 0.5em;
  grid-template-columns: repeat(auto);
`
export const CommentDash = styled.div`
  margin: 0 0.25em;
`
export const CommentDate = styled.div`
  
`
export const CommenterName = styled.div`
  font-weight: bold;
`
export const CommentText = styled.div`
  border-bottom: 1px solid var(--color-text);
  /* border-bottom: 1px solid rgba(var(--color-text), 0.8); */
`
export const CommentDetails = styled.div`
  display: grid;
  grid-template-areas: 'name, dash, date, options';
  grid-template-columns: auto auto auto 1fr;
  align-items: center;
  /* height: 100%; */
`
export const CommentDiv = styled.div`
  margin: 0.25em 0;
`


export const Title = styled.h1`
  /* margin-top: 0; */
  /* margin-left: 0.5em; */
  /* font-weight: bold; */
`

export const CommentInput = styled.input`
  border: 1px solid var(--color-text);
  background: var(--color-accentBackground);
  border-radius: 2em;
  padding: 0.5em;
  margin: 0.5em 0;
  width: calc( 100% - 1.1em );
  :hover {
    border: 1px solid var(--color-a);
  }
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

export const ReplyIcon = styled( ReplyFill ).attrs( props => ( {
  size: props.size || `1.5em`
} ) )`
cursor: pointer;
color: var(--color-text);
:hover {
  color: var(--color-a);
}
`

export const TrashIcon = styled( TrashFill ).attrs( props => ( {
  size: props.size || `1.2em`
} ) )`
cursor: pointer;
color: var(--color-text);
:hover {
  color: var(--color-red);
}
`

export const WarningIcon = styled( Warning ).attrs( props => ( {
  size: props.size || `2.5em`
} ) )`
  color: var(--color-red);
  margin-right: 1em;
`

export const Up = styled( ArrowAltCircleUp ).attrs( props => ( {
  size: props.size || `1.25em`
} ) )`
  cursor: pointer;
  :hover {
    color: var(--color-a);
  }
`

export const SelectedUp = styled( ArrowAltCircleUp ).attrs( props => ( {
  size: props.size || `1.25em`
} ) )`
  cursor: pointer;
  color: var(--color-blue);
  :hover {
    color: var(--color-a);
  }
`

export const Down = styled( ArrowAltCircleDown ).attrs( props => ( {
  size: props.size || `1.25em`
} ) )`
  cursor: pointer;
  :hover {
    color: var(--color-a);
  }
`

export const SelectedDown = styled( ArrowDown ).attrs( props => ( {
  size: props.size || `1.25em`
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

// export const CommentText = styled.div`
//   background: var(--color-accentBackground);
//   border-radius: 0.25em;
//   padding: 0.5em;
// `




// export const CommentOptions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   height: 2em;
//   margin-top: 0.25em;
//   align-items: center;
// `

// export const CommentOption = styled.div`
//   padding-left: 0.5em;
//   padding-right: 0.5em;
//   cursor: pointer;
//   :hover {
//     color: var(--color-a)
//   }
// `