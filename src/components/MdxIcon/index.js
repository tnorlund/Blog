import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Icon } from 'components/styles'

export default function MdxIcon( { filename } ) {
  let url = ``
  const result = useStaticQuery(
    graphql`query {
      allFile( filter: { absolutePath: { regex: "/.svg$/" } }) {
        nodes{ publicURL}
      }
    }`
  )
  result.allFile.nodes.forEach( node => {
    if ( node.publicURL.endsWith( filename ) ) url = node.publicURL
  } )
  if ( !url ) throw new Error( `Cannot find '.svg' ${filename}` )
  return <Icon src={url} width={`100%`}/>
}