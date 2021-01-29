/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const fill = `var(--color-text)`
const blue = `#3875a9`
const yellow = `#ffd041`
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 2 },
  2: { length: 2 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const Pylint = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring native to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          {/* Icon */}
          <animated.path
            style={ {
              opacity: `0.5`,
              position: `absolute`,
              transformOrigin: `19.75935% 50.2927%`,
              // rotate: `45`,
              transform: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => `scale(${x}, ${x}) rotate(${ 360 * x }deg)` )
            } }
            name="Top"
            fill={blue}
            className="Step1"
            d="M39.3,31.64a24.32,24.32,0,0,0-4.25.36c-3.77.67-4.45,2.06-4.45,4.63V40h8.9v1.13H27.26a5.56,5.56,0,0,0-5.56,4.51,16.56,16.56,0,0,0,0,9.05c.63,2.64,2.14,4.51,4.73,4.51h3.06V55.16a5.65,5.65,0,0,1,5.56-5.53h8.89a4.49,4.49,0,0,0,4.45-4.53V36.63A5,5,0,0,0,43.94,32,28,28,0,0,0,39.3,31.64Zm-4.81,2.73a1.7,1.7,0,1,1-1.67,1.7A1.69,1.69,0,0,1,34.49,34.37Z"
          />
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `19.75935% 50.2927%`,
              transform: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => `scale(${x}, ${x}) rotate(${ 360 * x }deg)` )
            } }
            name="Top"
            fill={yellow}
            className="Step1"
            d="M49.5,41.15v4a5.71,5.71,0,0,1-5.56,5.65H35.05a4.53,4.53,0,0,0-4.45,4.52v8.48c0,2.41,2.1,3.83,4.45,4.52a14.86,14.86,0,0,0,8.89,0c2.24-.65,4.45-2,4.45-4.52v-3.4H39.5V59.22H52.84c2.59,0,3.55-1.8,4.45-4.51s.89-5.47,0-9.05c-.64-2.57-1.86-4.51-4.45-4.51Zm-5,21.47a1.7,1.7,0,1,1-1.67,1.69A1.68,1.68,0,0,1,44.5,62.62Z"
          />
          {/* Letters */}
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="P"
            fill={fill}
            className="Step1"
            d="M64.77,30H75.29a18.58,18.58,0,0,1,5.74.75,9,9,0,0,1,3.56,2,6.85,6.85,0,0,1,1.81,3,12.69,12.69,0,0,1,.5,3.58,13.55,13.55,0,0,1-.52,3.79,7.56,7.56,0,0,1-1.85,3.16A9.07,9.07,0,0,1,81,48.46a17.16,17.16,0,0,1-5.67.79H68.78V61.44h-4Zm10.47,15.8A13.83,13.83,0,0,0,79,45.38a5.37,5.37,0,0,0,2.33-1.28,4.45,4.45,0,0,0,1.17-2,9.58,9.58,0,0,0,.33-2.62,8.87,8.87,0,0,0-.36-2.64A3.9,3.9,0,0,0,81.27,35a5.79,5.79,0,0,0-2.35-1.12,15.48,15.48,0,0,0-3.72-.37H68.78V45.82Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="y"
            fill={fill}
            className="Step1"
            d="M91.88,66.28a7.34,7.34,0,0,0,2.46.44A3,3,0,0,0,96.52,66,7.32,7.32,0,0,0,98,63.29L99,60.87,89.32,38.69h4.45l7.17,17.87,6.56-17.87h4.22l-10,24.91a29.42,29.42,0,0,1-1.23,2.7,9.59,9.59,0,0,1-1.36,2,4.75,4.75,0,0,1-1.78,1.26,6.76,6.76,0,0,1-2.53.42,12,12,0,0,1-1.9-.14,10.48,10.48,0,0,1-1.84-.48Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="l"
            fill={fill}
            className="Step1"
            d="M116.16,30H120V61.44h-3.83Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="i"
            fill={fill}
            className="Step1"
            d="M127.73,30h4.1v4.45h-4.1Zm.14,8.67h3.82V61.44h-3.82Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="n"
            fill={fill}
            className="Step1"
            d="M139.83,38.69h3.79v3.48A10,10,0,0,1,147.31,39a9.74,9.74,0,0,1,4.27-1c2.58,0,4.5.7,5.74,2.11s1.87,3.48,1.87,6.2V61.44h-3.82V47.05c0-2.11-.39-3.6-1.15-4.46a4.42,4.42,0,0,0-3.52-1.3,7.7,7.7,0,0,0-2.53.44,6.13,6.13,0,0,0-2.26,1.41,7.13,7.13,0,0,0-1.68,2,6,6,0,0,0-.57,2.8V61.44h-3.83Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="n"
            fill={fill}
            className="Step1"
            d="M168.92,41.73H165.4v-3h3.52v-6.2h3.83v6.2h6v3h-6V55.06a4.37,4.37,0,0,0,.74,2.68,2.65,2.65,0,0,0,2.29,1,9.41,9.41,0,0,0,1.7-.14,7.5,7.5,0,0,0,1.34-.35l.66,2.95a14.1,14.1,0,0,1-1.92.51,13.35,13.35,0,0,1-2.44.19,7.25,7.25,0,0,1-3.12-.57,4.55,4.55,0,0,1-1.89-1.63,6.3,6.3,0,0,1-1-2.5,19.55,19.55,0,0,1-.24-3.17Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Pylint