import styled from 'styled-components'
import { FollowTheSigns } from 'styled-icons/material'
import { Warning, CircleWithCross } from 'styled-icons/entypo'

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

export const AdminWarning = styled( Warning ).attrs( props => ( {
  size: props.size || `2.5em`
} ) )`
  color: var(--color-red);
  margin-right: 1em;
`

export const Follower = styled( FollowTheSigns ).attrs( props => ( {
  size: props.size || `1.5em`
} ) )`
  color: var(--color-text);
  margin-right: 0.5em;
`

export const Remove = styled( CircleWithCross ).attrs( props => ( {
  size: props.size || `1.5em`
} ) )`
  color: var(--color-red);
  margin-right: 0.5em;
  cursor: pointer;
`

export const WarningDiv = styled.div`
  color: var(--color-red);
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  height: 2.68em;
  padding-top: 1em;
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

export const FollowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  /* font-size: 1.5em; */
  /* height: 2.68em; */
`

export const TextDiv = styled.div`
  display: flex;
  /* vertical-align: middle; */
`

export const FollowDetails = styled.div`
  display: flex;
  font-size: 2em;
  font-weight: bold;
  vertical-align: middle;
`

export const FollowNumber = styled.div`
  padding: 0.25em;
  padding-left: 0em;
`

export const Title = styled.hgroup`
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 0.3em;
  margin: 0.5em;
`

export const User = styled.div`
  display: flex;
  margin-left: 1.5em;
  margin-right: 1.5em;
  justify-content: space-between;
  padding: 0.25em;
  vertical-align: middle;
`
export const Name = styled.div`
  font-weight: bold;
  width: 10em;
  vertical-align: middle;
`

export const DateDiv = styled.div`
  justify-self: left;
  /* margin-left: auto; */
  flex-grow: 1;
`