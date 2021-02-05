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

const Gatsby = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [0, 1], output: [0, 1] } )
                .interpolate( x => x )
            } }
            fill={`var(--color-text)`}
          >
            <path className="cls-1" d="M116.83,46.55h4.83V63.82h-4.83V61.58a5.89,5.89,0,0,1-5.36,2.76c-5.35,0-8.81-4.14-8.81-9.15,0-5.19,3.46-9.16,8.47-9.16a6,6,0,0,1,5.52,2.76V46.55Zm-9,8.64A4.62,4.62,0,0,0,112.68,60a4.72,4.72,0,0,0,4.84-4.83,4.62,4.62,0,0,0-4.84-4.84A4.73,4.73,0,0,0,107.84,55.19Z"/>
            <path className="cls-1" d="M131.16,50.69V63.82h-4.83V50.69h-1.9V46.55h1.9V40.68h4.83v5.87h3.29v4.14Z"/>
            <path className="cls-1" d="M145.85,50.69a4.4,4.4,0,0,0-2.77-1.21c-1.2,0-1.9.52-1.9,1.39,0,.52.18,1,1.56,1.55l1.21.35c1.38.52,3.45,1,4.32,2.42a5,5,0,0,1,.86,2.93,5.54,5.54,0,0,1-1.9,4.32,7.64,7.64,0,0,1-5.18,1.9,8.82,8.82,0,0,1-6.74-2.94l2.59-2.93c1,1,2.42,2.07,3.8,2.07s2.42-.69,2.42-1.9a1.85,1.85,0,0,0-1.55-1.73l-1-.34a11,11,0,0,1-3.63-2.08,4.43,4.43,0,0,1-1.38-3.28,5.64,5.64,0,0,1,1.73-4A7.35,7.35,0,0,1,142.74,46a8.7,8.7,0,0,1,5.53,1.9Z"/>
            <path className="cls-1" d="M156.39,48.79A6.55,6.55,0,0,1,161.91,46c5,0,8.47,4,8.47,9.16s-3.46,9.15-8.64,9.15a6.63,6.63,0,0,1-5.53-2.76v2.24h-4.66v-29h4.84Zm-.52,6.4A4.62,4.62,0,0,0,160.7,60a4.72,4.72,0,0,0,4.84-4.83,4.84,4.84,0,1,0-9.67,0Z"/>
            <path className="cls-1" d="M178.32,61.23,170,46.55h5.7l5.36,9.84,4.83-9.84h5.53L177.63,73h-5.52Z"/>
            <path className="cls-1" d="M101.45,49.48H89.36v4.84h6.39c-1,3.28-3.45,5.53-7.94,5.53-5,0-8.64-4.15-8.64-9.16s3.45-9.32,8.46-9.32A9.35,9.35,0,0,1,94.89,45l4-2.59a13.66,13.66,0,0,0-11.23-5.7,13.9,13.9,0,0,0-13.82,14,13.82,13.82,0,1,0,27.64,0A2.72,2.72,0,0,0,101.45,49.48Z"/>
          </animated.g>
          <animated.circle
            style={ {
              position: `absolute`,
              transformOrigin: `16.178% 50.03832%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={`#663795`} className="cls-1" cx="32.36" cy="50" r="24.18"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x )
            } }
            fill={`white`}
            className="cls-2" d="M51.36,50H39.27v3.46h8.29a15.67,15.67,0,0,1-10,11.23L17.67,44.82A15.55,15.55,0,0,1,32.36,34.46,16,16,0,0,1,45.14,41l2.59-2.25a19,19,0,0,0-33.86,7.09l22.8,22.8A19.43,19.43,0,0,0,51.36,50Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x )
            } }
            fill={`white`}
            className="cls-2"
            d="M13.35,50.18A18.42,18.42,0,0,0,18.88,63.3,18.76,18.76,0,0,0,32,68.83Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Gatsby