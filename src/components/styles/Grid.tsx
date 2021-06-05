import styled from 'styled-components'

interface GridProps {
  minWidth: number,
  maxWidth: number,
  gap: string,
  height: number | string,
  align: string,
  children: {
    length: number,
  },
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(props: GridProps) => props.minWidth || `5em`}, 1fr)
  );
  grid-gap: ${(props: GridProps) => props.gap || `calc(1em + 1vw)`};
  text-align: ${(props: GridProps) => props.align};
  max-width: ${(props: GridProps) => props.children.length === 1 && props.maxWidth};
  grid-auto-rows: ${(props: GridProps) => props.height};
`

export const DocsGrid = styled( Grid ).attrs(
  { minWidth: `8em`, align: `center` }
)`
  p > a > span {
    border: 1px solid var(--color-shadow);
    margin: 0;
    /* box-shadow: none; */
  }
`
