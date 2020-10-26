import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Icon } from 'components/styles'

export default function MdxIcon( { file } ) {
  const result = useStaticQuery(
    graphql`query { file (
      absolutePath: { regex: "/ERD_Blog.svg/" }
    ) { publicURL } }`
  )
  return (
    <Icon src={result.file.publicURL} width={`100%`}/>
  )
}