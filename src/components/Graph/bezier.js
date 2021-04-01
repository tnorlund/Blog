/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1

const P0 = { x: 20, y: 50 }
const P1 = { x: 90, y: 25 }
const P2 = { x: 110, y: 75 }
const P3 = { x: 180, y: 50 }

const P1_1 = { x: 30, y: 25 }
const P2_1 = { x: 170, y: 75 }
// const P2_1 = P1_1

const d0 = `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`
const d1 = `M ${P0.x} ${P0.y} C ${P1_1.x} ${P1_1.y}, ${P2_1.x} ${P2_1.y}, ${P3.x} ${P3.y}`

const radius = 2
const handleLine = 1
const xSize = 6
const letterDiff = 10
const dashLine = 1

const height = 100
const width = 200

const translate = ( point ) => `translate3d(${
  point.x <= 0.5 * width ? point.x - letterDiff : point.x + letterDiff
}px, ${
  point.y <= 0.5 * height ? point.y - letterDiff : point.y + letterDiff
}px, 0)`


const Bezier = () => {
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${ width } ${ height }`}
          preserveAspectRatio="XMaxYMax"
        >

          <g id="P3"
            style={ { transform: translate( P3 ) } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-3.16,2.42H-2v.52c-.4,0-1.48,0-1.95,0s-1.55,0-2,0V2.42h1.19V-4.06H-5.91v-.52h4.58c1.81,0,2.89.94,2.89,2.14S.29-.38-1.22-.38H-3.16ZM-.11-2.44c0-.8,0-1.62-1.64-1.62H-3.24V-.81h1.47C-.11-.81-.11-1.66-.11-2.44Z" />
            <path className="cls-1" d="M4.85,4c0,.25,0,.34.78.34h.28v.28l-1.38,0-1.36,0V4.3h.3c.77,0,.77-.09.77-.34V0A2.49,2.49,0,0,1,3.13.25V0a2.1,2.1,0,0,0,1.5-.48c.22,0,.22,0,.22.22Z" />
          </g>

          <animated.g id="P2"
            style={ {
              transform: props.x
                .interpolate( { range: [ min_x, max_x ], output: [ P2.x, P2_1.x ] } )
                .interpolate( x => `translate3d(${
                  x <= 0.5 * width ? ( x - letterDiff ) / width * 100 : ( x + letterDiff ) / width * 100
                }%, ${
                  P2.y <= 0.5 * height ? ( P2.y - letterDiff ) / height * 100 : ( P2.y + letterDiff ) / height * 100
                }%, 0)` )
            } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-3.32,2.34h1.18v.52c-.41,0-1.49,0-2,0s-1.54,0-2,0V2.34h1.19V-4.14H-6.07v-.52h4.58c1.82,0,2.89.94,2.89,2.14S.14-.46-1.38-.46H-3.32ZM-.27-2.52c0-.79,0-1.62-1.64-1.62H-3.39V-.89h1.47C-.27-.89-.27-1.74-.27-2.52Z" />
            <path className="cls-1" d="M3.82,1.94c-.15,0-.21,0-.21-.11a.08.08,0,0,1,.08-.09s.05,0,.23,0a1,1,0,0,0,.86-.33A1.44,1.44,0,0,0,5.1.47a.78.78,0,0,0-.85-.84A1.49,1.49,0,0,0,3.17.05a.4.4,0,0,1,.4.41.4.4,0,1,1-.79,0c0-.63.64-1,1.5-1S5.83-.14,5.83.47A1.46,1.46,0,0,1,4.74,1.8,1.51,1.51,0,0,1,6.07,3.17a1.66,1.66,0,0,1-1.8,1.49c-.92,0-1.72-.47-1.72-1.19A.41.41,0,0,1,3,3a.42.42,0,0,1,.42.42A.41.41,0,0,1,3,3.88a1.62,1.62,0,0,0,1.29.53c.44,0,1-.28,1-1.24s-.43-1.23-1-1.23Z" />
          </animated.g>

          <animated.g id="P1"
            style={ {
              transform: props.x
                .interpolate( { range: [ min_x, max_x ], output: [ P1.x, P1_1.x ] } )
                .interpolate( x => `translate3d(${
                  x <= 0.5 * width ? ( x - letterDiff ) / width * 100 : ( x + letterDiff ) / width * 100
                }%, ${
                  P1.y <= 0.5 * height ? ( P1.y - letterDiff ) / height * 100 : ( P1.y + letterDiff ) / height * 100
                }%, 0)` )
            } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-3.28,2.42h1.17v.52c-.41,0-1.49,0-2,0s-1.54,0-2,0V2.42h1.18V-4.06H-6v-.52h4.57c1.82,0,2.89.94,2.89,2.14S.17-.38-1.35-.38H-3.28Zm3-4.86c0-.8,0-1.62-1.64-1.62H-3.36V-.81h1.47C-.24-.81-.24-1.66-.24-2.44Z" />
            <path className="cls-1" d="M5.8,4.58H2.64c0-.22,0-.23.08-.3L4.57,2.46A2.38,2.38,0,0,0,5.28,1,1.14,1.14,0,0,0,4.13-.23,1.2,1.2,0,0,0,3,.47c.41,0,.46.28.46.41a.39.39,0,0,1-.41.4A.39.39,0,0,1,2.64.86,1.49,1.49,0,0,1,4.24-.51,1.6,1.6,0,0,1,6,1,2.23,2.23,0,0,1,4.94,2.64c-.47.36-.73.58-1.53,1.28H4.82a4.41,4.41,0,0,0,.75,0,1.75,1.75,0,0,0,.2-.69H6Z" />
          </animated.g>


          <g id="P0"
            style={ { transform: translate( P0 ) } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-3.32,2.34h1.17v.52c-.41,0-1.49,0-1.95,0s-1.55,0-2,0V2.34h1.18V-4.14H-6.07v-.52H-1.5c1.82,0,2.9.94,2.9,2.14S.13-.46-1.39-.46H-3.32Zm3-4.86c0-.79,0-1.62-1.64-1.62H-3.4V-.89h1.47C-.28-.89-.28-1.74-.28-2.52Z" />
            <path className="cls-1" d="M4.29,4.66c-1.76,0-1.76-2.05-1.76-2.61s0-2.64,1.76-2.64A1.59,1.59,0,0,1,5.62.06a3.4,3.4,0,0,1,.45,2C6.07,2.61,6.07,4.66,4.29,4.66Zm1-1.08A7.64,7.64,0,0,0,5.39,2,6.45,6.45,0,0,0,5.25.31a1,1,0,0,0-1-.68,1,1,0,0,0-1,.76A5.83,5.83,0,0,0,3.21,2a7.79,7.79,0,0,0,.11,1.65,1,1,0,0,0,2,0Z" />
          </g>


          <animated.line
            stroke={`var(--color-c)`}
            strokeWidth={handleLine}
            x1={ props.x.interpolate( {
              range: [ min_x, max_x ],
              output: [ P2.x, P2_1.x ]
            } ) }
            y1={ props.x.interpolate( {
              range: [ min_x, max_x ],
              output: [ P2.y, P2_1.y ]
            } ) }
            x2={P3.x} y2={P3.y}
          />
          <animated.line
            stroke={`var(--color-c)`}
            strokeWidth={handleLine}
            x1={ props.x.interpolate( {
              range: [ min_x, max_x ],
              output: [ P1.x, P1_1.x ]
            } ) }
            y1={ props.x.interpolate( {
              range: [ min_x, max_x ],
              output: [ P1.y, P1_1.y ]
            } ) }
            x2={ props.x.interpolate( {
              range: [ min_x, max_x ],
              output: [ P2.x, P2_1.x ]
            } ) }
            y2={ props.x.interpolate( {
              range: [ min_x, max_x ],
              output: [ P2.y, P2_1.y ]
            } ) }
          />
          <animated.line
            stroke={`var(--color-c)`}
            strokeWidth={handleLine}
            x1={P0.x} y1={P0.y}
            x2={ props.x.interpolate( {
              range: [ min_x, max_x ],
              output: [ P1.x, P1_1.x ]
            } ) }
            y2={ props.x.interpolate( {
              range: [ min_x, max_x ],
              output: [ P1.y, P1_1.y ]
            } ) }
          />

          <g
            id={`HandleA`}
            stroke={`var(--color-c)`}
            strokeWidth={`${handleLine}px`}
          >
            <animated.line
              x1={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P2.x - ( 0.5 * xSize ), P2_1.x - ( 0.5 * xSize ) ]
              } ) }
              y1={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P2.y + ( 0.5 * xSize ), P2_1.y + ( 0.5 * xSize ) ]
              } ) }
              x2={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P2.x + ( 0.5 * xSize ), P2_1.x + ( 0.5 * xSize ) ]
              } ) }
              y2={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P2.y - ( 0.5 * xSize ), P2_1.y - ( 0.5 * xSize ) ]
              } ) }
            />
            <animated.line
              x1={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P2.x - ( 0.5 * xSize ), P2_1.x - ( 0.5 * xSize ) ]
              } ) }
              y1={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P2.y - ( 0.5 * xSize ), P2_1.y - ( 0.5 * xSize ) ]
              } ) }
              x2={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P2.x + ( 0.5 * xSize ), P2_1.x + ( 0.5 * xSize ) ]
              } ) }
              y2={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P2.y + ( 0.5 * xSize ), P2_1.y + ( 0.5 * xSize ) ]
              } ) }
            />
          </g>
          <g
            id={`HandleA`}
            stroke={`var(--color-c)`}
            strokeWidth={`${handleLine}px`}
          >
            <animated.line
              x1={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P1.x - ( 0.5 * xSize ), P1_1.x - ( 0.5 * xSize ) ]
              } ) }
              y1={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P1.y + ( 0.5 * xSize ), P1_1.y + ( 0.5 * xSize ) ]
              } ) }
              x2={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P1.x + ( 0.5 * xSize ), P1_1.x + ( 0.5 * xSize ) ]
              } ) }
              y2={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P1.y - ( 0.5 * xSize ), P1_1.y - ( 0.5 * xSize ) ]
              } ) }
            />
            <animated.line
              x1={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P1.x - ( 0.5 * xSize ), P1_1.x - ( 0.5 * xSize ) ]
              } ) }
              y1={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P1.y - ( 0.5 * xSize ), P1_1.y - ( 0.5 * xSize ) ]
              } ) }
              x2={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P1.x + ( 0.5 * xSize ), P1_1.x + ( 0.5 * xSize ) ]
              } ) }
              y2={ props.x.interpolate( {
                range: [ min_x, max_x ],
                output: [ P1.y + ( 0.5 * xSize ), P1_1.y + ( 0.5 * xSize ) ]
              } ) }
            />
          </g>

          <circle
            id={`P0`}
            fill={`var(--color-text)`}
            cx={P0.x}
            cy={P0.y}
            r={radius}
          />
          <circle
            id={`P3`}
            fill={`var(--color-text)`}
            cx={P3.x}
            cy={P3.y}
            r={radius}
          />
          <animated.path
            stroke={`var(--color-text)`}
            strokeWidth={`1.5px`}
            fill={`none`}
            d={ props.x.interpolate( {
              range: [ min_x, max_x ], output: [ d0, d1 ]
            } ) }
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Bezier