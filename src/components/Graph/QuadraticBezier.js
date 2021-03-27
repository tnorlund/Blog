/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1

const P0 = { x: 20, y: 66 }
const P1 = { x: 60, y: 33 }
const P3 = { x: 180, y: 66 }

const P1_1 = { x: 20, y: 25 }
const P2_1 = P1_1

const d = `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P1.x} ${P1.y}, ${P3.x} ${P3.y}`

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


const QuadraticBezier = () => {
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ {
    height: `${height}pt`,

  } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${ width } ${ height }`}
          preserveAspectRatio="XMaxYMax"
        >

          <g id="P2"
            style={ { transform: translate( P3 ) } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-4.83,3.45h1.72V4.2c-.61,0-2.16,0-2.84,0s-2.25,0-2.85,0V3.45h1.72V-6H-8.8V-6.7h6.63c2.64,0,4.22,1.34,4.22,3.09S.2-.59-2-.59H-4.83ZM-.39-3.61C-.39-4.75-.39-6-2.77-6H-4.92v4.72h2.14C-.39-1.25-.39-2.48-.39-3.61Z" />
            <path className="cls-1" d="M8.38,6.59H3.79c0-.31,0-.33.11-.44L6.59,3.5a3.31,3.31,0,0,0,1-2.13A1.67,1.67,0,0,0,6-.41,1.76,1.76,0,0,0,4.31.64C4.9.64,5,1,5,1.22a.59.59,0,1,1-1.17,0A2.16,2.16,0,0,1,6.1-.8,2.33,2.33,0,0,1,8.71,1.37,3.23,3.23,0,0,1,7.12,3.78c-.67.52-1.06.83-2.22,1.86H7A6.23,6.23,0,0,0,8,5.58c.16-.11.27-.77.3-1h.37Z" />
          </g>

          <animated.g id="P1"
            style={ {
              transform: translate( P1 )
            } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-4.87,3.45h1.72V4.2c-.61,0-2.16,0-2.84,0s-2.25,0-2.85,0V3.45h1.72V-6H-8.84V-6.7h6.63C.43-6.7,2-5.36,2-3.61s-1.85,3-4.07,3H-4.87ZM-.43-3.61C-.43-4.75-.43-6-2.81-6H-5v4.72h2.14C-.43-1.25-.43-2.48-.43-3.61Z" />
            <path className="cls-1" d="M6.78,5.69c0,.36,0,.5,1.11.5h.42v.4l-2,0-2,0v-.4h.43c1.11,0,1.11-.14,1.11-.5V0A3.68,3.68,0,0,1,4.27.31V-.1A3,3,0,0,0,6.44-.8c.31,0,.34,0,.34.31Z" />
          </animated.g>


          <g id="P0"
            style={ { transform: translate( P0 ) } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-4.83,3.4h1.72v.75c-.61-.05-2.16-.05-2.84-.05s-2.25,0-2.85.05V3.4h1.72V-6H-8.8v-.74h6.63c2.64,0,4.22,1.35,4.22,3.1S.2-.65-2-.65H-4.83ZM-.39-3.66C-.39-4.8-.39-6-2.77-6H-4.92V-1.3h2.14C-.39-1.3-.39-2.54-.39-3.66Z" />
            <path className="cls-1" d="M6.24,6.76c-2.58,0-2.58-3-2.58-3.77s0-3.84,2.58-3.84A2.28,2.28,0,0,1,8.18.1,4.91,4.91,0,0,1,8.84,3C8.84,3.79,8.84,6.76,6.24,6.76ZM7.68,5.19a12.64,12.64,0,0,0,.14-2.36A9,9,0,0,0,7.63.46a1.43,1.43,0,0,0-1.39-1A1.42,1.42,0,0,0,4.85.57a9.28,9.28,0,0,0-.17,2.26,11.38,11.38,0,0,0,.16,2.41,1.44,1.44,0,0,0,2.84,0Z" />
          </g>

          <line
            stroke={`var(--color-c)`}
            strokeWidth={handleLine}
            x1={P1.x} y1={P1.y}
            x2={P3.x} y2={P3.y}
          />
          <line
            stroke={`var(--color-c)`}
            strokeWidth={handleLine}
            x1={P0.x} y1={P0.y}
            x2={P1.x} y2={P1.y}
          />

          <g
            id={`HandleA`}
            stroke={`var(--color-c)`}
            strokeWidth={`${handleLine}px`}
          >
            <line
              x1={P1.x - ( 0.5 * xSize )}
              y1={P1.y + ( 0.5 * xSize )}
              x2={P1.x + ( 0.5 * xSize )}
              y2={P1.y - ( 0.5 * xSize )}
            />
            <line
              x1={P1.x - ( 0.5 * xSize )}
              y1={P1.y - ( 0.5 * xSize )}
              x2={P1.x + ( 0.5 * xSize )}
              y2={P1.y + ( 0.5 * xSize )}
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
            d={d}
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default QuadraticBezier