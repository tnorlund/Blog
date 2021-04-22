/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { translate } from '../../utils'

const darkMode = false

const fill = darkMode ? `#e5e5e5` :  `#201e1f`

const min_x = 0
const max_x = 1
const height = 125
const width = 200

const P0 = { x: 20, y: 66 }
const P1 = { x: 180, y: 33 }

const radius = 2
const lineWidth = 1
const letterDiff = 10

const timeLine = { x: width / 2, y: 100 }
const timeLineLength = 100
const timeLineWidth = 1
const timeLineRangeHeight = 5
const timeRadius = 2
const timeLinePadding = 15
const _0 = { x: timeLine.x - ( timeLineLength / 2 ) - timeLinePadding, y: timeLine.y }
const _1 = { x: timeLine.x + ( timeLineLength / 2 ) + timeLinePadding, y: timeLine.y }


export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ {
    height: `${height}pt`, paddingTop: `1em`, paddingBottom: `1em`
  } } >
    <Spring 
      config={{ duration: 1500 }}
      to={ { x: inView ?  max_x : min_x } } 
    >
      { ( props ) => (
        <svg 
          width="100%" height="100%" viewBox={`0 0 ${ width } ${ height }`} 
          preserveAspectRatio="XmaxYMax"
        >
          <g id="TimeLine">
            <line
              strokeWidth={timeLineWidth}
              stroke={fill}
              x1={ timeLine.x - timeLineLength / 2}
              y1={ timeLine.y}
              x2={ timeLine.x + timeLineLength / 2}
              y2={ timeLine.y}
            />
            <line
              strokeWidth={timeLineWidth}
              stroke={fill}
              x1={ timeLine.x - timeLineLength / 2}
              y1={ timeLine.y - timeLineRangeHeight / 2}
              x2={ timeLine.x - timeLineLength / 2}
              y2={ timeLine.y + timeLineRangeHeight / 2}
            />
            <line
              strokeWidth={timeLineWidth}
              stroke={fill}
              x1={ timeLine.x + timeLineLength / 2}
              y1={ timeLine.y - timeLineRangeHeight / 2}
              x2={ timeLine.x + timeLineLength / 2}
              y2={ timeLine.y + timeLineRangeHeight / 2}
            />
            <a.circle
              cx={ props.x.to( [ min_x, max_x], [ timeLine.x - timeLineLength / 2, timeLine.x + timeLineLength / 2] ) }
              cy={timeLine.y}
              r={timeRadius}
              fill={fill}
            />
            <g
              style={ { transform: `translate3d(${_0.x / width * 100}%,${_0.y / height * 100}%,0)` } }
              id="0"
              fill={fill}
            >
              <path  d="M2.89,3.88A3,3,0,0,1,.11,5.72,2.9,2.9,0,0,1-2.5,4.13,8.14,8.14,0,0,1-3.22.28a8.68,8.68,0,0,1,.58-3.61A2.92,2.92,0,0,1,.14-5.22,3,3,0,0,1,2.85-3.44,8.79,8.79,0,0,1,3.47.28,8.61,8.61,0,0,1,2.89,3.88ZM2,3.39A20.27,20.27,0,0,0,2.16.1,19.43,19.43,0,0,0,2-3C1.69-4.58.64-4.87.11-4.87s-1.58.15-1.89,2A22.66,22.66,0,0,0-1.9.1a22.25,22.25,0,0,0,.17,3.35C-1.44,5-.5,5.38.11,5.38S1.74,4.89,2,3.39Z" />
            </g>
            <g
              style={ { transform: `translate3d(${_1.x / width * 100}%,${_1.y / height * 100}%,0)` } }
              id="1"
              fill={fill}
            >
              <path  d="M.26,4.13c0,.57,0,.75,1.48.75h.52v.5c-.56,0-1.95,0-2.58,0s-2,0-2.58,0v-.5h.5c1.44,0,1.49-.19,1.49-.75V-4.12A4.71,4.71,0,0,1-3-3.7v-.5a3.92,3.92,0,0,0,2.89-1c.36,0,.36,0,.36.41Z" />
            </g>
            <a.g
              style={ { transform: props.x
                .to( [ min_x, max_x ], [ 0, 1 ] )
                .to( x => `translate3d(${
                  ( ( timeLine.x - timeLineLength / 2 ) + ( x * timeLineLength ) ) / width * 100
                }%,${ ( timeLine.y + timeLinePadding ) / height * 100 }%, 0)` )
              } }
              id="t"
              fill={fill}
            >
              <path d="M-.74,3.2A2.8,2.8,0,0,0-.83,4c0,.53.15.73.5.73.53,0,1.37-.39,2.06-2,.08-.17.09-.22.23-.22s.21,0,.21.16S1.26,5.05-.37,5.05A1.4,1.4,0,0,1-1.83,3.6c0-.3.06-.57,1.21-5.08H-2c-.31,0-.45,0-.45-.19S-2.3-2-2-2h1.5L.12-4.51a.7.7,0,0,1,.64-.57.43.43,0,0,1,.47.43c0,.09-.08.42-.66,2.67H2c.3,0,.46,0,.46.17,0,.33-.16.33-.49.33H.45Z" />
            </a.g>
          </g>
          <a.g id="P1"
            style={ { transform: translate( P1, height, width, letterDiff ) } }
            fill={fill}
          >
            <path className="cls-1" d="M-4.87,3.45h1.72V4.2c-.61,0-2.16,0-2.84,0s-2.25,0-2.85,0V3.45h1.72V-6H-8.84V-6.7h6.63C.43-6.7,2-5.36,2-3.61s-1.85,3-4.07,3H-4.87ZM-.43-3.61C-.43-4.75-.43-6-2.81-6H-5v4.72h2.14C-.43-1.25-.43-2.48-.43-3.61Z" />
            <path className="cls-1" d="M6.78,5.69c0,.36,0,.5,1.11.5h.42v.4l-2,0-2,0v-.4h.43c1.11,0,1.11-.14,1.11-.5V0A3.68,3.68,0,0,1,4.27.31V-.1A3,3,0,0,0,6.44-.8c.31,0,.34,0,.34.31Z" />
          </a.g>


          <g id="P0"
            style={ { transform: translate( P0, height, width, letterDiff ) } }
            fill={fill}
          >
            <path className="cls-1" d="M-4.83,3.4h1.72v.75c-.61-.05-2.16-.05-2.84-.05s-2.25,0-2.85.05V3.4h1.72V-6H-8.8v-.74h6.63c2.64,0,4.22,1.35,4.22,3.1S.2-.65-2-.65H-4.83ZM-.39-3.66C-.39-4.8-.39-6-2.77-6H-4.92V-1.3h2.14C-.39-1.3-.39-2.54-.39-3.66Z" />
            <path className="cls-1" d="M6.24,6.76c-2.58,0-2.58-3-2.58-3.77s0-3.84,2.58-3.84A2.28,2.28,0,0,1,8.18.1,4.91,4.91,0,0,1,8.84,3C8.84,3.79,8.84,6.76,6.24,6.76ZM7.68,5.19a12.64,12.64,0,0,0,.14-2.36A9,9,0,0,0,7.63.46a1.43,1.43,0,0,0-1.39-1A1.42,1.42,0,0,0,4.85.57a9.28,9.28,0,0,0-.17,2.26,11.38,11.38,0,0,0,.16,2.41,1.44,1.44,0,0,0,2.84,0Z" />
          </g>
          <circle id={`P0`} fill={fill} cx={P0.x} cy={P0.y} r={radius} />
          <circle id={`P1`} fill={fill} cx={P1.x} cy={P1.y} r={radius} />
          <a.circle id="B" fill={fill} r={radius}
            cx={props.x.interpolate( { range:[ min_x, max_x], output:[ P0.x, P1.x] } )}
            cy={props.x.interpolate( { range:[ min_x, max_x], output:[ P0.y, P1.y] } )}
            
          />
          <line
            style={{ opacity:0.1 }}
            stroke={fill}
            strokeWidth={lineWidth}
            x1={P0.x}
            y1={P0.y}
            x2={P1.x}
            y2={P1.y}
          />
          {/* 163.36769104003906 */}
          <a.line
            style={ { opacity:props.x.to( [min_x, max_x], [0, 1] ) } }
            stroke={fill}
            strokeWidth={lineWidth}
            x1={P0.x}
            y1={P0.y}
            x2={P1.x}
            y2={P1.y}
          />
        </svg>
      ) }
    </Spring>
  </div>
}