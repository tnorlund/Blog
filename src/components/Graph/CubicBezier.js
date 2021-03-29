/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1
const height = 150
const width = 200

const P0 = { x: 20, y: 100 }
const P1 = { x: 30, y: 20 }
const P2 = { x: 150, y: 50 }
const P3 = { x: 180, y: 100 }

const d = `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`

const radius = 2
const lineWidth = 1
const letterDiff = 10

const timeLine = { x: width / 2, y: 125 }
const timeLineLength = 100
const timeLineWidth = 1
const timeLineRangeHeight = 5
const timeRadius = 2
const timeLinePadding = 15
const _0 = { x: timeLine.x - ( timeLineLength / 2 ) - timeLinePadding, y: timeLine.y }
const _1 = { x: timeLine.x + ( timeLineLength / 2 ) + timeLinePadding, y: timeLine.y }


const translate = ( point ) => `translate3d(${
  point.x <= 0.5 * width ? point.x - letterDiff : point.x + letterDiff
}px, ${
  point.y <= 0.5 * height ? point.y - letterDiff : point.y + letterDiff
}px, 0)`

const linearInterpolate = ( x0, x1, t ) => ( 1.0 - t ) * x0 + t * x1


const QuadraticBezier = () => {
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ {
    height: `${height}pt`,
    paddingTop: `1em`,
    paddingBottom: `1em`
  } }>
    <Spring native config={{ duration: 1500 }} to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${ width } ${ height }`}
          preserveAspectRatio="XMaxYMax"
        >
          <g id="TimeLine">
            <line
              strokeWidth={timeLineWidth}
              stroke={`var(--color-text)`}
              x1={ timeLine.x - timeLineLength / 2}
              y1={ timeLine.y}
              x2={ timeLine.x + timeLineLength / 2}
              y2={ timeLine.y}
            />
            <line
              strokeWidth={timeLineWidth}
              stroke={`var(--color-text)`}
              x1={ timeLine.x - timeLineLength / 2}
              y1={ timeLine.y - timeLineRangeHeight / 2}
              x2={ timeLine.x - timeLineLength / 2}
              y2={ timeLine.y + timeLineRangeHeight / 2}
            />
            <line
              strokeWidth={timeLineWidth}
              stroke={`var(--color-text)`}
              x1={ timeLine.x + timeLineLength / 2}
              y1={ timeLine.y - timeLineRangeHeight / 2}
              x2={ timeLine.x + timeLineLength / 2}
              y2={ timeLine.y + timeLineRangeHeight / 2}
            />
            <animated.circle
              cx={ props.x.interpolate( { range:[ min_x, max_x], output: [ timeLine.x - timeLineLength / 2, timeLine.x + timeLineLength / 2] } )}
              cy={timeLine.y}
              r={timeRadius}
              fill={`var(--color-text)`}
            />
            <g
              style={ { transform: `translate3d(${_0.x / width * 100}%,${_0.y / height * 100}%,0)` } }
              id="0"
              fill={`var(--color-text)`}
            >
              <path  d="M2.89,3.88A3,3,0,0,1,.11,5.72,2.9,2.9,0,0,1-2.5,4.13,8.14,8.14,0,0,1-3.22.28a8.68,8.68,0,0,1,.58-3.61A2.92,2.92,0,0,1,.14-5.22,3,3,0,0,1,2.85-3.44,8.79,8.79,0,0,1,3.47.28,8.61,8.61,0,0,1,2.89,3.88ZM2,3.39A20.27,20.27,0,0,0,2.16.1,19.43,19.43,0,0,0,2-3C1.69-4.58.64-4.87.11-4.87s-1.58.15-1.89,2A22.66,22.66,0,0,0-1.9.1a22.25,22.25,0,0,0,.17,3.35C-1.44,5-.5,5.38.11,5.38S1.74,4.89,2,3.39Z" />
            </g>
            <g
              style={ { transform: `translate3d(${_1.x / width * 100}%,${_1.y / height * 100}%,0)` } }
              id="1"
              fill={`var(--color-text)`}
            >
              <path  d="M.26,4.13c0,.57,0,.75,1.48.75h.52v.5c-.56,0-1.95,0-2.58,0s-2,0-2.58,0v-.5h.5c1.44,0,1.49-.19,1.49-.75V-4.12A4.71,4.71,0,0,1-3-3.7v-.5a3.92,3.92,0,0,0,2.89-1c.36,0,.36,0,.36.41Z" />
            </g>
            <animated.g
              style={ { transform: props.x
                .interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } )
                .interpolate( x => `translate3d(${
                  ( ( timeLine.x - timeLineLength / 2 ) + ( x * timeLineLength ) ) / width * 100
                }%,${ ( timeLine.y + timeLinePadding ) / height * 100 }%, 0)` )
              } }
              id="t"
              fill={`var(--color-text)`}
            >
              <path d="M-.74,3.2A2.8,2.8,0,0,0-.83,4c0,.53.15.73.5.73.53,0,1.37-.39,2.06-2,.08-.17.09-.22.23-.22s.21,0,.21.16S1.26,5.05-.37,5.05A1.4,1.4,0,0,1-1.83,3.6c0-.3.06-.57,1.21-5.08H-2c-.31,0-.45,0-.45-.19S-2.3-2-2-2h1.5L.12-4.51a.7.7,0,0,1,.64-.57.43.43,0,0,1,.47.43c0,.09-.08.42-.66,2.67H2c.3,0,.46,0,.46.17,0,.33-.16.33-.49.33H.45Z" />
            </animated.g>
          </g>

          <g id="P2"
            style={ { transform: translate( P2 ) } }
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

          <g id="P3"
            style={ { transform: translate( P3 ) } }
            fill={`var(--color-text)`}>
            <path className="cls-1" d="M-4.83,3.4h1.72v.75c-.61-.05-2.16-.05-2.84-.05s-2.25,0-2.85.05V3.4h1.72V-6H-8.8v-.74h6.63c2.64,0,4.22,1.35,4.22,3.1S.2-.65-2-.65H-4.83ZM-.39-3.66C-.39-4.8-.39-6-2.77-6H-4.92V-1.3h2.14C-.39-1.3-.39-2.54-.39-3.66Z" />
            <path className="cls-1" d="M5.52,2.82c-.18,0-.28,0-.28-.16s.08-.14.11-.14l.36,0A1.49,1.49,0,0,0,7,2,2.2,2.2,0,0,0,7.38.68,1.12,1.12,0,0,0,6.18-.54,2.09,2.09,0,0,0,4.62.07a.57.57,0,0,1,.56.59.54.54,0,0,1-.56.57A.55.55,0,0,1,4,.63C4-.26,5-.85,6.21-.85S8.46-.2,8.46.68A2.14,2.14,0,0,1,6.87,2.62a2.19,2.19,0,0,1,1.94,2A2.4,2.4,0,0,1,6.2,6.76C4.85,6.76,3.7,6.08,3.7,5a.59.59,0,0,1,.61-.66.63.63,0,1,1,0,1.25,2.43,2.43,0,0,0,1.91.77c.64,0,1.44-.41,1.44-1.78,0-1.21-.63-1.8-1.49-1.8Z" />
          </g>

          <animated.circle
            id="B"
            fill={`var(--color-text)`}
            cx={
              props.x
                .interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } )
                .interpolate( t => ( 1 - t )**3 * P0.x + 3 * ( 1 - t )**2 * t * P1.x + 3 * ( 1 - t ) * t**2 * P2.x + t**3 * P3.x )
            }
            cy={
              props.x
                .interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } )
                .interpolate( t => ( 1 - t )**3 * P0.y + 3 * ( 1 - t )**2 * t * P1.y + 3 * ( 1 - t ) * t**2 * P2.y + t**3 * P3.y )
            }

            r={radius}
          />


          {/* <circle
            id={`P2`}
            fill={`var(--color-text)`}
            cx={P2.x}
            cy={P2.y}
            r={radius}
          /> */}
          <animated.line
            style={{ opacity:0.5 }}
            stroke={`var(--color-b)`}
            strokeWidth={lineWidth}
            x1={props.x.interpolate( { range: [ min_x, max_x ], output: [ P0.x, P1.x ] } )}
            y1={props.x.interpolate( { range: [ min_x, max_x ], output: [ P0.y, P1.y ] } )}
            x2={props.x.interpolate( { range: [ min_x, max_x ], output: [ P1.x, P2.x ] } )}
            y2={props.x.interpolate( { range: [ min_x, max_x ], output: [ P1.y, P2.y ] } )}
          />
          <animated.line
            style={{ opacity:0.5 }}
            stroke={`var(--color-b)`}
            strokeWidth={lineWidth}
            x1={props.x.interpolate( { range: [ min_x, max_x ], output: [ P1.x, P2.x ] } )}
            y1={props.x.interpolate( { range: [ min_x, max_x ], output: [ P1.y, P2.y ] } )}
            x2={props.x.interpolate( { range: [ min_x, max_x ], output: [ P2.x, P3.x ] } )}
            y2={props.x.interpolate( { range: [ min_x, max_x ], output: [ P2.y, P3.y ] } )}
          />

          <animated.line
            stroke={`var(--color-c)`}
            strokeWidth={lineWidth}
            x1={props.x.interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } ).interpolate( t => linearInterpolate( linearInterpolate( P0.x, P1.x, t ), linearInterpolate( P1.x, P2.x, t ), t ) ) }
            y1={props.x.interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } ).interpolate( t => linearInterpolate( linearInterpolate( P0.y, P1.y, t ), linearInterpolate( P1.y, P2.y, t ), t ) ) }
            x2={props.x.interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } ).interpolate( t => linearInterpolate( linearInterpolate( P1.x, P2.x, t ), linearInterpolate( P2.x, P3.x, t ), t ) ) }
            y2={props.x.interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } ).interpolate( t => linearInterpolate( linearInterpolate( P1.y, P2.y, t ), linearInterpolate( P2.y, P3.y, t ), t ) ) }
          />
          <animated.circle
            cx={props.x.interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } ).interpolate( t => linearInterpolate( linearInterpolate( P0.x, P1.x, t ), linearInterpolate( P1.x, P2.x, t ), t ) )}
            cy={props.x.interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } ).interpolate( t => linearInterpolate( linearInterpolate( P0.y, P1.y, t ), linearInterpolate( P1.y, P2.y, t ), t ) )}
            r={radius}
            fill={`var(--color-c)`}
          />
          <animated.circle
            cx={props.x.interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } ).interpolate( t => linearInterpolate( linearInterpolate( P1.x, P2.x, t ), linearInterpolate( P2.x, P3.x, t ), t ) ) }
            cy={props.x.interpolate( { range: [ min_x, max_x ], output: [ 0, 1 ] } ).interpolate( t => linearInterpolate( linearInterpolate( P1.y, P2.y, t ), linearInterpolate( P2.y, P3.y, t ), t ) ) }
            r={radius}
            fill={`var(--color-c)`}
          />


          <line
            style={{ opacity: 0.1 }}
            strokeWidth={lineWidth}
            stroke={`var(--color-text)`}
            x1={P0.x} y1={P0.y}
            x2={P1.x} y2={P1.y}
          />
          <line
            style={{ opacity: 0.1 }}
            strokeWidth={lineWidth}
            stroke={`var(--color-text)`}
            x1={P1.x} y1={P1.y}
            x2={P2.x} y2={P2.y}
          />
          <path
            style={{ opacity:0.1 }}
            stroke={`var(--color-text)`}
            strokeWidth={lineWidth}
            fill={`none`}
            d={d}
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
            } }
            stroke={`var(--color-text)`}
            strokeWidth={lineWidth}
            fill={`none`}
            d={d}
          />
          <circle
            id={`P3`}
            fill={`var(--color-text)`}
            cx={P3.x}
            cy={P3.y}
            r={radius}
          />
          <circle
            id={`P0`}
            fill={`var(--color-text)`}
            cx={P0.x}
            cy={P0.y}
            r={radius}
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default QuadraticBezier