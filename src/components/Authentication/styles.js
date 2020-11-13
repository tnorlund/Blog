import styled, { css } from 'styled-components'
import { Close as Cross } from 'styled-icons/material'

export const ModalBehind = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  visibility: ${props => ( props.open ? `visible` : `hidden` )};
  opacity: ${props => ( props.open ? `1` : `0` )};
  transition: 0.5s;
  z-index: 4;
`

export const ModalDiv = styled.div`
  display: grid;
  align-items: center;
  box-sizing: border-box;
  align-self: center;
  justify-self: center;
  background: var(--color-background);
  height: max-content;
  max-height: 80vh;
  width: 80vw;
  position: relative;
  overflow: scroll;
  border-radius: 0.5em;
  transition: 0.3s;
  box-shadow: 0 0 3em black;
  margin: calc(0.5em + 2vw);
`

const controlsCss = css`
  position: absolute;
  cursor: pointer;
  z-index: 1;
  padding: 0.1em;
  transition: 0.3s;
  width: 1.6em;
  :hover {
    transform: scale(1.07);
  }
`

export const Close = styled( Cross )`
  ${controlsCss};
  border-radius: 0.4em;
  top: 0.5em;
  right: 0.5em;
`

export const Title = styled.hgroup`
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 0.3em;
  margin: 0.5em;
`
export const BodyDiv = styled.div`
  margin-left: 1em;
  margin-right: 1em;
`


export const TextInput = styled.input`
  width: 95%;
  margin: 0.5em;
`

export const TextDiv = styled.div`
  padding-bottom: 0.5em;
  margin-left: 1em;
`

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

export const Error = styled.div`
  margin: 1em;
  color: var(--color-red);
`