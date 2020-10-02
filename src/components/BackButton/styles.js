import React from 'react'
import styled from 'styled-components'
import { ChevronLeft } from "styled-icons/boxicons-regular"

export const ButtonDiv = styled.div`
  display: grid;
`

export const IconDiv = styled.div`
  background: red;
`


export const TextDiv = styled.div`
  background: green;
  /* display: flex; */
  /* flex-grow: 2; */
`

export const Text = styled.h1`
  margin-bottom: 0px;
`

export const Icons = {
  ChevronLeft: props => <ChevronLeft css="size: 1.4em;" {...props} />,
}