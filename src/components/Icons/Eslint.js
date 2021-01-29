/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const dark = `#7b7dbc`
const light = `#514b9f`
const fill = `var(--color-text)`
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 },
  2: { length: 3 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const Eslint = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `26.7655% 50%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={dark}
            className="Step2"
            d="M41.35,42.63l11.71-6.76a1,1,0,0,1,.95,0l11.71,6.76a.94.94,0,0,1,.48.82V57a1,1,0,0,1-.48.82L54,64.56a1,1,0,0,1-.95,0L41.35,57.8a1,1,0,0,1-.48-.82V43.45a.94.94,0,0,1,.48-.82"
          />
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `26.7655% 50%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={light}
            className="Step1"
            d="M84,48.79,70,24.44a2.93,2.93,0,0,0-2.46-1.53h-28a3,3,0,0,0-2.47,1.53l-14,24.3a2.88,2.88,0,0,0,0,2.87l14,24.15a2.77,2.77,0,0,0,2.47,1.33h28A2.74,2.74,0,0,0,70,75.77L84,51.58a2.74,2.74,0,0,0,0-2.79M72.4,60.5a1,1,0,0,1-.52.87L54.05,71.65a1,1,0,0,1-1,0L35.2,61.37a1,1,0,0,1-.53-.87V39.93a1,1,0,0,1,.53-.87L53,28.77a1,1,0,0,1,1,0L71.87,39.06a1,1,0,0,1,.53.87Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [0, 1], output: [0, 1] } )
                .interpolate( x => x )
            } }
            fill={fill}
            className="Letters"
            d="M96,41H105v1.7H98v4.93h6v1.7H98V55.1h7.32v1.69H96Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [0, 1], output: [0, 1] } )
                .interpolate( x => x )
            } }
            fill={fill}
            className="Letters"
            d="M106.26,54.74l1.2-1.37a6.19,6.19,0,0,0,4.35,2c2.07,0,3.29-1,3.29-2.56S114,50.64,112.48,50l-2.27-1c-1.47-.63-3.19-1.74-3.19-4.06s2.1-4.18,5-4.18a6.52,6.52,0,0,1,4.64,2L115.56,44A5.06,5.06,0,0,0,112,42.51c-1.77,0-2.94.89-2.94,2.3s1.38,2.09,2.61,2.61l2.25,1c1.82.78,3.24,1.87,3.24,4.21s-2,4.48-5.37,4.48A7.55,7.55,0,0,1,106.26,54.74Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [0, 1], output: [0, 1] } )
                .interpolate( x => x )
            } }
            fill={fill}
            className="Letters"
            d="M119,41h2V55.1h6.87v1.69H119Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [0, 1], output: [0, 1] } )
                .interpolate( x => x )
            } }
            fill={fill}
            className="Letters"
            d="M128.94,41.45a1.37,1.37,0,0,1,2.73,0,1.37,1.37,0,0,1-2.73,0Zm.36,3.67h2V56.79h-2Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [0, 1], output: [0, 1] } )
                .interpolate( x => x )
            } }
            fill={fill}
            className="Letters"
            d="M134,45.12h1.63l.16,1.69h.07a5.54,5.54,0,0,1,3.91-2c2.46,0,3.56,1.58,3.56,4.56v7.39h-2V49.65c0-2.17-.66-3.1-2.2-3.1-1.19,0-2,.61-3.19,1.79v8.45h-2Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [0, 1], output: [0, 1] } )
                .interpolate( x => x )
            } }
            fill={fill}
            className="Letters"
            d="M146.28,53.18V46.73h-1.74V45.24l1.83-.12.24-3.27h1.64v3.27h3.16v1.61h-3.16v6.49c0,1.43.46,2.25,1.81,2.25a3.85,3.85,0,0,0,1.33-.31l.38,1.49a7.15,7.15,0,0,1-2.17.43C147.12,57.08,146.28,55.51,146.28,53.18Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Eslint