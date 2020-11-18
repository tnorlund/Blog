import styled from 'styled-components'
import Img from 'gatsby-image'
import { LinkedinSquare, Twitter } from 'styled-icons/boxicons-logos'
import { Github } from 'styled-icons/simple-icons'

export const Title = styled.h1`
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

export const Icons = {
  LinkedinSquare,
  Twitter,
  Github
}

export const SocialsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 1.666rem;
`

export const ProfilePic = styled( Img )`
  border-radius: 50%;
  justify-self: center;
  margin-bottom: 1.666rem;
  background:var(--color-b);
`