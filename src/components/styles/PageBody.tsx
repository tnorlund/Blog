import styled from 'styled-components'

interface GridColumnProps {
  cols?: number;
}

export const PageBody = styled.main`
  position: relative;
  /* margin: calc(3em + 3vh) 0; */
  margin: calc(1.5em + 1.5vh) 0;
  display: grid;
  /* grid-gap: 0 4vw; */
  grid-gap: 0 2vw;
  grid-template-columns: 1fr 1fr minmax(8em, 40em) 1fr 1fr;
  grid-auto-rows: max-content;
  grid-auto-flow: dense;
  > * {
    grid-column: ${(props: GridColumnProps) => { console.log({ props } ); return props.cols || 3}};
  }
  /* Center image captions. */
  .gatsby-resp-image-wrapper + em,
  .gatsby-resp-image-wrapper{
    margin-top: 1em;
  }
  img + em,
  .js-plotly-plot + p > em,
  div.table + p > em {
    margin-top: 0.3em;
    display: block;
    text-align: center;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.95em;
  }
  /* Center SVG's, not necessary for .gatsby-resp-image-wrapper */
  img {
    display: block;
    margin: auto;
  }
`
