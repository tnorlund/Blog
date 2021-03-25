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

const Webpack = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XMaxYMax">
          <animated.g
            style={ {
              position: `absolute`,
              transformOrigin: `14.90095% 49.6388%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop,  max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
          >
            <path fill={`#fff`} d="M29.84,23l23.9,13.51v27L29.84,77,6,63.52v-27Z" />
            <path fill={`#92d4f5`} d="M49.47,62.59,30.63,73.24v-8.3l11.74-6.45Zm1.29-1.17V39.14l-6.89,4V57.44ZM10.14,62.59,29,73.24v-8.3L17.24,58.49ZM8.85,61.42V39.14l6.89,4V57.44Zm.81-23.73L29,26.76v8L16.6,41.59l-.1.06Zm40.29,0L30.63,26.76v8L43,41.59l.1,0Z" />
            <path fill={`#1f79be`} d="M29,63.05,17.4,56.68V44.07L29,50.76Zm1.65,0,11.59-6.36V44.07L30.63,50.76ZM18.18,42.61l11.63-6.39,11.62,6.39L29.81,49.32Z" />
          </animated.g>
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            fill={`var(--color-text)`} d="M77.83,58.55h5.1l5.19-17.3h-5L80.08,53.52,76.8,41.25H72.5L69.2,53.52l-3-12.27h-5l5.16,17.3h5.09l3.21-11.08ZM88.38,50c0,5.19,3.54,9,9.1,9a8.21,8.21,0,0,0,7.28-3.8l-3-2.29A5,5,0,0,1,97.55,55a4.19,4.19,0,0,1-4.5-4h12.18c0-.33,0-.66,0-1,0-5.66-3.05-9.23-8.41-9.23-4.93,0-8.47,3.9-8.47,9.13Zm4.8-1.89a3.68,3.68,0,0,1,3.74-3.51,3.54,3.54,0,0,1,3.71,3.51ZM107,58.55h4.3V56.76A6.73,6.73,0,0,0,116.41,59c5,0,8.47-3.74,8.47-9.06s-3.24-9.1-8.2-9.1a6.5,6.5,0,0,0-5.13,2.25V34.63H107V58.55Zm4.43-8.6c0-3.24,1.92-5.1,4.44-5.1s4.43,2.09,4.43,5.1-1.85,5-4.43,5c-2.78,0-4.44-2.25-4.44-5Zm15.25,14.78h4.56v-8A6.64,6.64,0,0,0,136.36,59c5,0,8.2-3.73,8.2-9.09s-3.51-9.06-8.47-9.06A6.62,6.62,0,0,0,131,43.06V41.24h-4.3V64.73Zm4.44-14.88c0-2.75,1.65-5,4.43-5,2.58,0,4.43,1.92,4.43,5s-1.78,5.09-4.43,5.09-4.43-1.85-4.43-5.09Zm14.29,3.34c0,3.64,3,5.79,6.48,5.79a5.36,5.36,0,0,0,4.2-1.56l.3,1.13h4V47.6c0-3.88-1.66-6.78-7.21-6.78a12.9,12.9,0,0,0-6.82,2L148.1,46a10.06,10.06,0,0,1,4.6-1.22c2,0,3.15,1,3.15,2.55v1.12a7,7,0,0,0-3.75-1c-4,0-6.71,2.31-6.71,5.72Zm4.56-.14c0-1.42,1.22-2.41,3-2.41s3,.89,3,2.41-1.26,2.39-3,2.39-3-1-3-2.39Zm21.54,1.89a4.78,4.78,0,0,1-4.93-5,4.75,4.75,0,0,1,4.77-5.07,5.93,5.93,0,0,1,4,1.66l1.29-3.84a8.77,8.77,0,0,0-5.46-1.85A8.92,8.92,0,0,0,162,50c0,5.26,3.84,9,9.23,9a8.75,8.75,0,0,0,5.39-1.85l-1.22-3.74a6.32,6.32,0,0,1-3.91,1.55Zm6.85,3.61h4.56V49.61l5.79,8.94h5.36l-6.55-9.47,6.09-7.84h-5.13l-5.56,7.28V34.63h-4.56Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Webpack