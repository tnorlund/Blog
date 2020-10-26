import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Icon } from 'components/styles'

export default function MdxIcon( { file } ) {
  console.log( { file } )
  const query = `query { file (
    absolutePath: { regex: "/ERD_Blog.svg/" }
  ) { publicURL } }`
  console.log( { query } )
  const result = useStaticQuery(
    graphql( query )
  )
  console.log( { result } )
  return (
    <Icon />
  )
}