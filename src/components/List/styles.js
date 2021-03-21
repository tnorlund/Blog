import { mediaQueries } from 'utils/mediaQueries'

import styled from 'styled-components'

export const PostDiv = styled.div`
  border-bottom: 2px solid var(--color-b);
  margin-bottom: 1em;
`

export const PostTitle = styled.h2`
  color: var(--color-text);
  margin-bottom: 0;
  &:hover {
    color: var(--color-a);
  }
`

export const PostDate = styled.h4`
  margin-top: 0;
  margin-bottom: 0.1em;
`

export const Description = styled.div`
  margin-bottom: 0.3em;
`

export const IconDiv = styled.div`
  position: relative;
  display: block;
  width: 20vw;
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
  // eslint-disable-next-line max-len
  filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(84deg)
    brightness(104%) contrast(101%);
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