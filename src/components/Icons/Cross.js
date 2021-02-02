/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const size = 50
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 },
  2: { length: 1.5 },
  3: { length: 1.5 }
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

const Cross = () => {
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
            fill={`var(--color-red)`}
            className="cls-1"
            cx={`${scale( 50 )}`} cy={`${scale( 50 )}`}
            r={`${scale( 41.34 )}`}
          />
          <animated.line
            strokeDashoffset={
              props.x
                .interpolate( { range: [max_x, steps[2].start, steps[2].stop, min_x], output: [0, 0, 1, 1] } )
                .interpolate( x => strokeLength - ( x * strokeLength ) )
            }
            strokeDasharray={strokeLength}
            strokeLinecap={`round`}
            strokeMiterlimit={10}
            strokeWidth={8}
            fill={`none`}
            stroke={`var(--color-background)`}
            className="cls-2" x1="29.73" y1="29.73" x2="70.27" y2="70.27"
          />
          <animated.line
            strokeDashoffset={
              props.x
                .interpolate( { range: [max_x, steps[3].start, steps[3].stop, min_x], output: [0, 0, 1, 1] } )
                .interpolate( x => strokeLength - ( x * strokeLength ) )
            }
            strokeDasharray={strokeLength}
            strokeLinecap={`round`}
            strokeMiterlimit={10}
            strokeWidth={8}
            fill={`none`}
            stroke={`var(--color-background)`}
            className="cls-2" x1="70.27" y1="29.73" x2="29.73" y2="70.27"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Cross