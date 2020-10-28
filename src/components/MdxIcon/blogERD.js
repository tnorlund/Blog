import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Icon } from 'components/styles'

export default function MdxIcon( { file } ) {
  const query = `query { file (
    absolutePath: { regex: "/ERD_Blog.svg/" }
  ) { publicURL } }`
  const result = useStaticQuery(
    graphql( query )
  )
  return (
    <Icon />
  )
}