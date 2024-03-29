import { graphql, useStaticQuery } from 'gatsby'
import { useOnClickOutside } from '../../hooks'
import React, { useRef, useState, useEffect } from 'react'
import { NavDiv, NavLink, NavToggle } from './styles'
import { globalHistory } from '@reach/router'

interface NavNode {
  title: string, url: string
}

export default function Nav( props: any ) {
  const { nav } = useStaticQuery( graphql`
    { nav: allNavYaml { nodes { title, url } } }
  ` )
  const ref = useRef()
  const [open, setOpen] = useState<boolean>( false )
  useOnClickOutside( ref, () => open && setOpen( false ), null )
  // close mobile nav on route changes
  // it would remain open because part of wrapPageElement
  useEffect( () => globalHistory.listen( () => setOpen( false ) ), [] )
  return (
    <>
      <NavToggle opener open={open} onClick={() => setOpen( true )} />
      <NavDiv
        ref={ref} open={open} onScroll={e => e.preventDefault()} {...props}
      >
        <NavToggle open={open} onClick={() => setOpen( false )} />
        {nav.nodes.map( ( { title, url }: NavNode ) => (
          <NavLink key={url} to={url}>
            {title}
          </NavLink>
        ) )}
      </NavDiv>
    </>
  )
}
