/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1
const steps = {
  1: { length: 3 },
  2: { length: 1 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const CloudWatch = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `100pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="YMax">
          <defs>
            <linearGradient id="linear-gradient" x1="19.62" y1="80.38" x2="62.33" y2="37.67" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#b01e50"/>
              <stop offset="1" stopColor="#ef518a"/>
            </linearGradient>
          </defs>
          <animated.rect
            style={ {
              position: `absolute`,
              transformOrigin: `50% 50%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={`url(#linear-gradient)`}
            className="cls-1"
            x="19.8" y="19.8" width="60.4" height="60.4"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            strokeLinejoin={`round`}
            fill={`none`}
            stroke={`var(--color-background)`}
            strokeWidth={1.5}
            className="cls-2"
            d="M68.1,55.28a7,7,0,0,0-4.87-11.92H63.1a4.16,4.16,0,0,0,.13-1.06,4.4,4.4,0,0,0-8-2.51,10.08,10.08,0,0,0-20,2.05,9.6,9.6,0,0,0,.07,1.21,7.27,7.27,0,0,0,1.46,14.39h7.86"
          />
          <animated.circle
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            strokeMiterlimit={10}
            fill={`none`}
            stroke={`var(--color-background)`}
            strokeWidth={1.5}
            className="cls-3"
            cx="55.97" cy="55.08" r="5.97"
          />
          <animated.circle
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            strokeMiterlimit={10}
            fill={`none`}
            stroke={`var(--color-background)`}
            strokeWidth={1.5}
            className="cls-3" cx="55.97" cy="55.08" r="8.93"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            strokeMiterlimit={10}
            fill={`none`}
            stroke={`var(--color-background)`}
            strokeWidth={1.5}
            className="cls-3"
            d="M63.72,59.53l5.86,5.19a1.87,1.87,0,0,1-2.43,2.82l-5.86-5.28"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default CloudWatch