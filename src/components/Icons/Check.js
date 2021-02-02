/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const size = 50
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 },
  2: { length: 3 }
}
const strokeLength = 80
const scale = ( number, size=100 ) => number * size / 100
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const Check = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `${size}pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 100 100`}
          preserveAspectRatio="xMidYMid meet"
        >
          <animated.circle
            style={ {
              position: `absolute`,
              transformOrigin: `50% 50%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={`var(--color-green)`}
            className="cls-1"
            cx={`${scale( 50 )}`} cy={`${scale( 50 )}`}
            r={`${scale( 41.34 )}`}
          />
          <animated.polyline
            strokeDashoffset={
              props.x
                .interpolate( { range: [max_x, steps[2].start, steps[2].stop, min_x], output: [0, 0, -1, -1] } )
                .interpolate( x => strokeLength - ( x * strokeLength ) )
            }
            strokeDasharray={strokeLength}
            strokeWidth={8}
            strokeLinejoin={`round`}
            strokeLinecap={`round`}
            stroke={`var(--color-background)`}
            fill={`none`}
            className="cls-2" points={`74.8 33.28 41.13 66.87 24.72 50.76`}
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Check