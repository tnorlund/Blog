/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const size = 50
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 },
  2: { length: 3 },
  3: { length: 1 }
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

const Question = () => {
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
            fill={`var(--color-text)`}
            className="cls-1"
            cx={`${scale( 50 )}`} cy={`${scale( 50 )}`}
            r={`${scale( 41.34 )}`}
          />
          <animated.circle
            style={ {
              position: `absolute`,
              transformOrigin: `50% 71.4748%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={`var(--color-background)`}
            className="cls-2" cx="50" cy="71.47" r={`${scale( 4 )}`}
          />
          <animated.path
            strokeDashoffset={
              props.x
                .interpolate( { range: [max_x, steps[2].start, steps[2].stop, min_x], output: [0, 0, 1, 1] } )
                .interpolate( x => strokeLength - ( x * strokeLength ) )
            }
            strokeDasharray={strokeLength}
            strokeWidth={8}
            strokeLinejoin={`round`}
            strokeLinecap={`round`}
            stroke={`var(--color-background)`}
            fill={`none`}
            className="cls-3" d="M36.52,38.42s0-13.17,14.3-13.17c12.66,0,12.66,10.82,12.66,10.82,0,7.1-7.93,12-10,15a19.51,19.51,0,0,0-3.47,10"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Question