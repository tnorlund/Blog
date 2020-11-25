import React from 'react'
import { Link } from 'gatsby'

import { PreviousNext, Left, Right } from './styles'

export default function PrevNext( { prev, next } ) {
  return(
    <PreviousNext>
      {
        ( prev && <Left><Link to={prev.slug}>← {prev.title}</Link></Left> ) || <div></div>}
      {next && <Link to={next.slug}>{next.title} →</Link>}
    </PreviousNext>
  )
}