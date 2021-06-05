import React from 'react'
import { Link } from 'gatsby'

import { PreviousNext, Left, Right } from './styles'

interface frontmatter {
  title?: string;
  date?: string;
  slug: string;
  showToc: boolean;
}

interface PrevNextProps {
  prev?: frontmatter;
  next?: frontmatter;
}

const PrevNext: React.FC<PrevNextProps> = ( { prev, next } ) => {
  return(
    <PreviousNext>
      { ( prev && <Left>
        <Link to={prev.slug}>← {prev.title}</Link>
      </Left> ) || <div></div> }
      { next && <Right><Link to={next.slug}>{next.title} →</Link></Right> }
    </PreviousNext>
  )
}

export default PrevNext