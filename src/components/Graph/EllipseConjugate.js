/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 },
  2: { length: 1 },
  3: { length: 1 },
  4: { length: 1 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )
const seconds = 2

const height = 150
const width = 200

const cx = width / 2
const cy = height / 2
const a = 75
const b = 37.5

const radius = 2
const lineWidth = 1

const EllipseConjugate = () => {
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ {
    height: `${height}pt`,
    paddingTop: `1em`,
    paddingBottom: `1em`
  } }>
    <Spring native config={{ duration: 1000 * seconds }} to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${ width } ${ height }`}
          preserveAspectRatio="XMaxYMax"
        >
          <circle
            fill={`var(--color-text)`}
            cx={width / 2} cy={height / 2} r={radius}
          />
          <ellipse
            stroke={`var(--color-text)`}
            fill={`none`}
            strokeWidth={lineWidth}
            cx={cx} cy={cy} rx={a} ry={b}
          />
          <animated.circle id="C1"
            cx={
              props.x.interpolate( t => width / 2 + a * Math.cos( t * 2 *  Math.PI ) )
            }
            cy={
              props.x.interpolate( t => height / 2 + b * Math.sin( -t * 2 * Math.PI ) )
            }
            r={radius}
          />
          <animated.line id="C1"
            stroke={`var(--color-text)`}
            strokeWidth={lineWidth}
            x1={ width / 2 }
            y1={ height / 2 }
            x2={
              props.x.interpolate( t => width / 2 + a * Math.cos( t * 2 *  Math.PI ) )
            }
            y2={
              props.x.interpolate( t => height / 2 + b * Math.sin( -t * 2 * Math.PI ) )
            }
          />
          <animated.g
            style={ {
              transform: props.x.interpolate(
                t => `translate3d(${
                  ( width / 2 + ( a * 0.55 ) * Math.cos( ( 0.04 - t ) * 2 *  Math.PI ) ) / width * 100
                }%,${ ( height / 2 + ( b * 0.55 ) * Math.sin( (  0.06 - t ) * 2 * Math.PI ) ) / height * 100 }%,0)`
              )
            } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-2.33,2.15A2.08,2.08,0,0,0-.25.48c0-.1.06-.16.2-.16s.2,0,.2.16A2.61,2.61,0,0,1-2.49,2.54,3.52,3.52,0,0,1-5.9-1.07,3.57,3.57,0,0,1-2.44-4.76C-1.22-4.76,0-4.13,0-3a.7.7,0,0,1-.73.75A.7.7,0,0,1-1.47-3a.71.71,0,0,1,.73-.73,2.55,2.55,0,0,0-1.69-.6c-.84,0-2.15.68-2.15,3.27S-3.18,2.15-2.33,2.15Z" />
            <path className="cls-1" d="M4.36,3.85c0,.36,0,.5,1.11.5H5.9v.41c-.24,0-1.65,0-2,0s-1.78,0-2,0V4.35h.42c1.11,0,1.11-.14,1.11-.5V-1.84a3.58,3.58,0,0,1-1.61.32v-.41A3.08,3.08,0,0,0,4-2.63c.31,0,.34,0,.34.31Z" />
          </animated.g>


          <animated.circle id="C2"
            cx={
              props.x.interpolate( t => width / 2 + a * Math.cos( -t * 2 *  Math.PI - Math.PI / 2 ) )
            }
            cy={
              props.x.interpolate( t => height / 2 + b * Math.sin( t * 2 * Math.PI - Math.PI / 2 ) )
            }
            r={radius}
          />
          <animated.line
            stroke={`var(--color-text)`}
            strokeWidth={lineWidth}
            x1={ width / 2 }
            y1={ height / 2 }
            x2={
              props.x.interpolate( t => width / 2 + a * Math.cos( -t * 2 *  Math.PI - Math.PI / 2 ) )
            }
            y2={
              props.x.interpolate( t => height / 2 + b * Math.sin( t * 2 * Math.PI - Math.PI / 2 ) )
            }
          />
          <animated.g
            style={ {
              transform: props.x.interpolate(
                t => `translate3d(${
                  ( width / 2 + ( a * 0.5 ) * Math.cos( ( 0.04 - t ) * 2 *  Math.PI - Math.PI / 2 ) ) / width * 100
                }%,${ ( height / 2 + ( b * 0.5 ) * Math.sin( (  0.06 - t ) * 2 * Math.PI - Math.PI / 2 ) ) / height * 100 }%,0)`
              )
            } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M-2.33,2.15A2.08,2.08,0,0,0-.25.48c0-.1.06-.16.2-.16s.2,0,.2.16A2.61,2.61,0,0,1-2.49,2.54,3.52,3.52,0,0,1-5.9-1.07,3.57,3.57,0,0,1-2.44-4.76C-1.22-4.76,0-4.13,0-3a.7.7,0,0,1-.73.75A.7.7,0,0,1-1.47-3a.71.71,0,0,1,.73-.73,2.55,2.55,0,0,0-1.69-.6c-.84,0-2.15.68-2.15,3.27S-3.18,2.15-2.33,2.15Z" />
            <path className="cls-1" d="M5.75,4.76H1.15c0-.32,0-.33.11-.44L4,1.66A3.29,3.29,0,0,0,5-.46,1.67,1.67,0,0,0,3.31-2.24a1.78,1.78,0,0,0-1.64,1c.59,0,.65.39.65.58a.57.57,0,0,1-.57.6.58.58,0,0,1-.6-.63,2.16,2.16,0,0,1,2.32-2A2.32,2.32,0,0,1,6.07-.46a3.21,3.21,0,0,1-1.59,2.4c-.67.52-1.06.83-2.22,1.86H4.31A6.17,6.17,0,0,0,5.4,3.74c.16-.11.27-.76.3-1h.37Z" />
          </animated.g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default EllipseConjugate