import styled from 'styled-components'
import { FollowTheSigns } from 'styled-icons/material'
import {
  Warning, CircleWithCross, CircleWithMinus, CircleWithPlus
} from 'styled-icons/entypo'

export const FollowButton = styled.div`
  background: var(--color-accentBackground);
  color: var(--color-text);
  font-weight: bold;
  justify-self: right;
  padding: 0.5em;
  border-radius: 0.25em;
  cursor: pointer;
`

export const FollowingButton = styled.div`
  background: var(--color-orange);
  color: var(--color-background);
  font-weight: bold;
  justify-self: right;
  padding: 0.5em;
  border-radius: 0.25em;
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

export const More = styled( CircleWithPlus ).attrs( props => ( {
  size: props.size || `2.5em`
} ) )`
  color: var(--color-text);
  cursor: pointer;
`

export const Less = styled( CircleWithMinus ).attrs( props => ( {
  size: props.size || `2.5em`
} ) )`
  color: var(--color-text);
  cursor: pointer;
`

export const Controls = styled.div`
  display:flex;
  justify-content: center;
`

export const ControlsNumber = styled.div`
  display: flex;
  font-size: 2em;
  font-weight: bold;
  vertical-align: middle;
  padding: 0.2em;
`

export const WarningDiv = styled.div`
  color: var(--color-red);
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  height: 2.75em;
  padding-top: 1em;
`

export const WarningDescription = styled.div`
  padding: 0.5em;
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
  padding: 0.4em;
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

export const EmailButton = styled.div`
  margin-left: 1.5em;
  margin-right: 1.5em;
  background: var(--color-accentBackground);
  color: var(--color-text);
  font-weight: bold;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-radius: 0.25em;
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
  cursor: pointer;
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