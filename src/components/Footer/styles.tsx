import styled from 'styled-components'
import { Link } from 'gatsby'
import { mediaQueries } from '../../utils/mediaQueries'
import { Gatsby, Terraform } from 'styled-icons/simple-icons'

export const FooterDiv = styled.footer`
  background: var(--color-b);
  padding: 5vh 5vw;
  a {
    color: var(--color-lightLink);
  }
  display: grid;
  color: white;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    'copyright'
    'poweredBy';
  grid-gap: 4vh 6vw;
  ${mediaQueries.minPhone} {
    grid-template-areas:
      'copyright'
      'poweredBy';
  }
  ${mediaQueries.minTablet} {
    grid-template-areas: 'copyright poweredBy';
  }
`

export const PoweredBy = styled.div`
  grid-area: poweredBy;
  > a {
    padding: 0 0.5em;
  }
`

// export const PageLink = styled.link`
//   :hover {
//     color: var(--color-a);
//   }
// `

export const Icons = {
  Gatsby: styled( Gatsby )`
    color: white;
    cursor: pointer;
    :hover {
      color: var(--color-a)
    };
  `,
  Terraform: styled( Terraform )`
  color: white;
  cursor: pointer;
  :hover {
    color: var(--color-a)
  };
`,
}
