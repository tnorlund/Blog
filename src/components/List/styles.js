import styled from 'styled-components'

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

export const IconDiv = styled.div`
  background: var(--color-b);
  border-radius: 25px;
  width: 100px;
  margin-right: 0.2em;
`

export const Icon = styled.img`
  margin: 0px;
  filter: invert(84%) sepia(26%) saturate(295%) hue-rotate(157deg) 
    brightness(99%) contrast(96%);
`

export const ProjectDiv = styled.div`
  flex: 0 auto;
  a {
    color: var(--color-lightLink);
    display: flex;
    flex-direction: row;
  }
  &:hover ${Icon} {
    filter: var(--color-filter);
    /* background: red */
  }
  &:hover ${Title} {
    color: var(--color-a);
  }
  flex-wrap: nowrap;
  margin-bottom: 25px;
  vertical-align: middle;
`

export const Title = styled.h1`
  margin: 0;
`

export const DescriptionDiv = styled.div`
  flex: grid;
  margin-left: 1em;
  ${Description} {
    color: var(--color-text);
  }
`

