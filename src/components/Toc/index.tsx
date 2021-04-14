import { throttle } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from '../../hooks'
import { Title, TocDiv, TocIcon, TocLink, TocToggle } from './styles'

const accumulateOffsetTop = ( el: HTMLElement, totalOffset = 0 ) : number => {
  let current : unknown = el
  while ( current instanceof HTMLElement ) {
    totalOffset += el.offsetTop - el.scrollTop + el.clientTop
    current = current.offsetParent
  }
  return totalOffset
}

interface title {
  title: string, depth: number
}

interface heading {
  titles: title[]|[],
  nodes: [HTMLElement]|[],
  minDepth: number,
  offsets: [number]|[],
  startingOffsets: number[]|[]
}


interface TOCProps {
  headingSelector: any, 
  getTitle: any, 
  getDepth: any, 
  throttleTime: number,
  tocTitle: string
}

export default function Toc(
  { headingSelector, getTitle, getDepth, ...rest }: TOCProps
) {
  const { throttleTime = 200, tocTitle = `Contents` } = rest
  const [headings, setHeadings] = useState<heading>( {
    titles: [],
    nodes: [],
    minDepth: 0,
    offsets: [],
    startingOffsets: []
  } )
  const [open, setOpen] = useState<boolean>( false )
  const [active, setActive] = useState<number|never>()
  const ref = useRef<any>()
  useOnClickOutside( ref, () => setOpen( false ), null )
  useEffect( () => {
    // Fallback to sensible defaults for headingSelector, getTitle and getDepth
    // inside useEffect rather than specifying them as Toc default props to
    // avoid the need for useMemo and useCallback, resp.
    // Otherwise, these would change on every render and since this effect calls
    // setHeadings which triggers a re-render, it would cause an infinite loop.

    const selector = headingSelector || Array.from(
      { length: 6 }, ( _, i ) => `main > h` + ( i + 1 )
    )
    console.log( { selector } )
    const nodes = Array.from( document.querySelectorAll( selector ) ) as [HTMLElement]
    const titles = nodes.map( node => ( {
      title: getTitle ? getTitle( node ) : node.innerText,
      depth: getDepth ? getDepth( node ) : Number( node.nodeName[1] ),
    } ) )
    const minDepth = Math.min( ...titles.map( h => h.depth ) )
    const startingOffsets = nodes.map( el => accumulateOffsetTop( el ) - 100 )
    setHeadings( { titles, nodes, minDepth, offsets: [], startingOffsets } )
  }, [headingSelector, getTitle, getDepth] )

  const scrollHandler = throttle( () => {
    const { titles, nodes } = headings
    // Offsets need to be recomputed because lazily-loaded
    // content increases offsets as user scrolls down.
    const offsets = nodes.map( el => accumulateOffsetTop( el ) )
    const activeIndex = offsets.findIndex(
      offset => offset > window.scrollY + 120
    )
    setActive( activeIndex === -1 ? titles.length - 1 : activeIndex - 1 )
  }, throttleTime )
  useEventListener( `scroll`, scrollHandler )

  return (
    <>
      <TocToggle opener open={open} onClick={() => setOpen( true )} />
      <TocDiv ref={ref} open={open}>
        <Title>
          <TocIcon />
          {tocTitle}
          <TocToggle onClick={() => setOpen( false )} />
        </Title>
        <nav>
          {headings.titles.map( ( { title, depth }, index ) => (
            <TocLink
              key={title}
              active={active === index}
              depth={depth - headings.minDepth}
              onClick={event => {
                event.preventDefault()
                setOpen( false )
                window.scrollTo( 0, headings.startingOffsets[index] )
              }}
            >
              {title}
            </TocLink>
          ) )}
        </nav>
      </TocDiv>
    </>
  )
}
