import React from 'react'
import { Link } from 'gatsby'

import { PreviousNext } from './styles'

export default function PrevNext( { prev, next, label, slugPrefix = `` } ) {
  console.log( { prev } )
  return(
    <PreviousNext>
    {(prev && <Link to={prev.slug}>← {prev.title}</Link>) || <div></div>}
    {next && <Link to={next.slug}>{next.title} →</Link>}
    </PreviousNext>
  )
}