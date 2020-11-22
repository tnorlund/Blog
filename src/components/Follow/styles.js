import styled from 'styled-components'
import { FollowTheSigns } from 'styled-icons/material'

export const FollowButton = styled.div`
  background: var(--color-accentBackground);
  color: var(--color-text);
  font-weight: bold;
  justify-self: right;
  padding: 0.5em;
  border-radius: 0.25em;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
`

export const FollowingButton = styled.div`
  background: var(--color-orange);
  color: var(--color-background);
  font-weight: bold;
  justify-self: right;
  padding: 0.5em;
  border-radius: 0.25em;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
`

export const Icon = styled( FollowTheSigns ).attrs( props => ( {
  size: props.size || `2.5em`
} ) )`
  color: var(--color-text);
  margin-right: 1em;
`

export const FollowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.68em;
`

export const TextDiv = styled.div`
  display: flex;
  /* vertical-align: middle; */
`

export const FollowNumber = styled.div`
  padding-top: 0.17em;
  font-size: 2em;
  font-weight: bold;
  /* height: 100%; */
`