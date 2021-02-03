import styled from 'styled-components'
import { mediaQueries } from 'utils/mediaQueries'

export const Title = styled.hgroup`
  font-size: 2em;
  font-weight: bold;
  width: max-content;
  padding: 0.5em;
  padding-bottom: 0.2em;
  ${mediaQueries.minTablet} {
    padding: 0.5em;
  }
`

export const Description = styled.div`
  /* padding-top: 0; */
  padding-left: 1.5em;
  padding-right: 1.5em;
`