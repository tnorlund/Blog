import styled from 'styled-components'
import Img from 'gatsby-image'
import { LinkedinSquare, Twitter } from 'styled-icons/boxicons-logos'
import { Github } from 'styled-icons/simple-icons'

export const Title = styled.div`
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
  border-bottom: 4px solid var(--color-b);
`

export const Date = styled.hgroup`
  margin-top: 0;
  font-weight: bold;
`

export const Description = styled.div`
  margin-bottom:1em;
`

const TwitterIcon = styled( Twitter ).attrs( props => ( {
  size: props.size || `6.1em`
} ) )`
  color: var(--color-socialColor);
  margin-top: 0.5em;
  :hover {
    color: var(--color-a);
  }
`

const LinkedInIcon = styled( LinkedinSquare ).attrs( props => ( {
  size: props.size || `7em`
} ) )`
  color: var(--color-socialColor);
  :hover {
    color: var(--color-a);
  }
`

const GithubIcon = styled( Github ).attrs( props => ( {
  size: props.size || `5.5em`
} ) )`
  color: var(--color-socialColor);
  margin-top: 0.65em;
  :hover {
    color: var(--color-a);
  }
`

export const Icons = {
  LinkedInIcon,
  TwitterIcon,
  GithubIcon
}

export const SocialsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  vertical-align: center;
  margin-bottom: 1.666rem;
`

export const ProfilePic = styled( Img )`
  border-radius: 50%;
  justify-self: center;
  margin-bottom: 1.666rem;
  background:var(--color-b);
`