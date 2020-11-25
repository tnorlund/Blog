import { mediaQueries } from 'utils/mediaQueries'
import styled from 'styled-components'

export const Left = styled.div`
  justify-content: left;
`

export const Right = styled.div`
  justify-content: right;
`

export const PreviousNext = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  margin-top: 3em;
  position: relative;
  width: 100%;
  grid-template-rows: auto auto;
  ${mediaQueries.minTablet} {
    grid-template-columns: auto auto;
  }
`