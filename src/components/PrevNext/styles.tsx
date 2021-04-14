import { mediaQueries } from '../../utils/mediaQueries'
import styled from 'styled-components'

export const Left = styled.div`
  text-align: left;
`

export const Right = styled.div`
  text-align: right;
`

export const PreviousNext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 3em;
  position: relative;
  ${mediaQueries.minTablet} {
    flex-direction: row;
  }
`