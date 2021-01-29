import { mediaQueries } from 'utils/mediaQueries'

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
  margin-bottom: 0.3em;
  /* margin-left: 10vw; */
`

export const IconDiv = styled.div`
  position: relative;
  display: block;
  /* background: red; */
  
  width: 20vw;
  /* height: 20vw; */
  /* padding: 0.5vw; */
  /* margin-right: 4vw; */
  ${mediaQueries.minTablet} {
    width: 10vw;
    /* height: 10vw; */
  }
`

export const SquareDiv = styled.div`
  background: var(--color-b);
  display: block;
  /* position: absolute; */
  border-radius: 3vw;
  width: 20vw;
  height: 20vw;
  ${mediaQueries.minTablet} {
    border-radius: 1.5vw;
    width: 10vw;
    height: 10vw;
  }
`

export const SquareContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export const Icon = styled.img`
  margin: 0px;
  filter: invert(84%) sepia(26%) saturate(295%) hue-rotate(157deg) 
    brightness(99%) contrast(96%);
`

export const ProjectDiv = styled.div`
  flex: 0 auto;
  a {
    color: var(--color-text);
    display: flex;
    flex-direction: row;
  }
  &:hover ${Icon} {
    filter: var(--color-filter);
  }
  /* &:hover ${Title} {
    color: var(--color-a);
  } */
  flex-wrap: nowrap;
  padding-bottom: 3vw;
  margin-bottom: 3vw;
  vertical-align: middle;
  ${mediaQueries.minTablet} {
    padding-bottom: 1vw;
    margin-bottom: 1vw;
  }
`

export const Title = styled.h1`
  margin: 0;
`

export const DescriptionDiv = styled.div`
  flex: grid;
  margin-left: 4vw;
  ${Description} {
    color: var(--color-text);
  }
  ${mediaQueries.minTablet} {
    margin-left: 3vw;
  }
`

export {

}