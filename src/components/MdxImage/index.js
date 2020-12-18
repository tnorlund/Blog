import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export default function MdxIcon( { filename } ) {
  let url = ``
  const result = useStaticQuery(
    graphql`query {
      allFile( filter: { absolutePath: { regex: "/.png$/" } }) {
        nodes{ publicURL }
      }
    }`
  )
  result.allFile.nodes.forEach( node => {
    if ( node.publicURL.endsWith( filename ) ) url = node.publicURL
  } )
  if ( !url ) throw new Error( `Cannot find '.png' ${filename}` )
  return <img src={url} width={`100%`}/>
}