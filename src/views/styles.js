import styled from 'styled-components'

export const UserTitle = styled.hgroup`
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 0.3em;
  margin: 0.5em;
`

export const PostDiv = styled.div`
  border-bottom: 2px solid var(--color-b);
  margin-bottom: 1em;
`
export const PostTitle = styled.h2`
  margin-bottom: 0;
`

export const PostDate = styled.h4`
  margin-top: 0;
  margin-bottom: 0.1em;
`

export const Description = styled.div`
  margin-left: 0.5em;
  margin-bottom: 0.3em;
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

export const LinkDiv = styled.div`
  margin: 1em;
  font-weight: bold;
  color: var(--color-lightLink);
`

export const ErrorDiv = styled.div`
  margin: 1em;
  color: var(--color-red);
`