/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const text = `#3c3a3e`
const orange = `#e25b26`
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 },
  2: { length: 4 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const Spark = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          <animated.g
            style={ {
              opacity: props.x.interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } ).interpolate( x => x ),
            } }
            fill={text} id="Spark"
          >
            <path className="cls-1" d="M47.75,52.35l7.37,8.18S60.44,67,51.7,74.35a9.56,9.56,0,0,1-15.4-4.82l5.61-3S44,73,49.07,69.79a3.12,3.12,0,0,0,1-4.61L43,57s-3.82-5.24,1.45-10.65A10.2,10.2,0,0,1,56,44.12s3.19,2.24,4,4.05l-5.14,3.89S53,48.3,50.22,48.9a3,3,0,0,0-1.8,1C47.51,50.89,47.32,51.52,47.75,52.35Z"/>
            <path className="cls-1" d="M120.6,52.26a7.41,7.41,0,0,0-5.39,1.93,7.23,7.23,0,0,0-2.1,4l-2.35,17.27h5.4l2.25-16.52a2.44,2.44,0,0,1,.79-1,1.37,1.37,0,0,1,.66-.32h3.65l.73-5.36Z"/>
            <path className="cls-1" d="M123.81,75.43l3.55-27.21,6.31-4.06L131.9,57.85a.07.07,0,0,0,.12,0l9.39-10.38,1,5.6-6.25,7.49a.08.08,0,0,0,0,.08l10.55,14.74h-7l-8.39-12.74a.07.07,0,0,0-.12,0l-1.61,12.71Z"/>
            <path className="cls-1" d="M72.65,51.48a14.54,14.54,0,0,0-14,12.3,12.1,12.1,0,0,0-.08,1.79L56.31,82.65H61.4l1.27-8.77,0-.07A11.05,11.05,0,0,0,69.43,76a14.54,14.54,0,0,0,14-12.3A10.54,10.54,0,0,0,72.65,51.48ZM77.88,64a7.66,7.66,0,0,1-7.64,6.71,6.19,6.19,0,0,1-6.15-7A7.67,7.67,0,0,1,71.73,57,6.21,6.21,0,0,1,77.88,64Z"/>
            <path className="cls-1" d="M99.71,51.64C93,51.44,86.57,56.75,85.37,63.5s3.26,12.38,10,12.58a13.23,13.23,0,0,0,6.24-1.39l.86-6.58a8.08,8.08,0,0,1-6.1,2.72,5.82,5.82,0,0,1-5.65-7.12A8.31,8.31,0,0,1,98.82,57a5.83,5.83,0,0,1,5.64,7.13l-1.15,9.58h0l-.21,1.72h5.14l1.52-11.59h0C110.71,57.27,106.3,51.84,99.71,51.64Z"/>
          </animated.g>
          <animated.g
            style={ {
              position: `absolute`,
              transformOrigin: `69.50555% 36.8854%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={orange} id="Star"
          >
            <path className="cls-2" d="M158.62,24.91,145.4,28.37l-5.66-9.3a3.76,3.76,0,0,0-6.91,1.3l-2.18,12.28-12.17,3.89a3.9,3.9,0,0,0-.4,7.27l8.06,3.6,6-3.9-9-3.61,11.76-3.66L137,24.4,142.71,34l11.75-3.08-8.1,9.52,5.2,9.89-8.51-2.37.94,5.71,9,2.69a3.91,3.91,0,0,0,4.62-5.55l-5.36-10.19,9.3-11A2.89,2.89,0,0,0,158.62,24.91Z"/>
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x.interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } ).interpolate( x => x ),
            } }
            fill={text} id="Apache"
          >
            <path className="cls-1" d="M69.36,40.63,70.45,47H68.88l-.15-1.32h-2L66,47H64.35l3.51-6.35Zm-1,1.6-1.08,2.22H68.6l-.24-2.21Z"/>
            <path className="cls-1" d="M76.83,40.63c1.87,0,2.5.66,2.5,1.65s-.67,2.17-2.57,2.17h-1.4L74.84,47H73.38l1.25-6.35ZM75.6,43.24h1.14c.63,0,1-.29,1-.77s-.33-.59-.83-.59H75.87Z"/>
            <path className="cls-1" d="M85.45,40.63,86.54,47H85l-.15-1.32h-2L82.12,47H80.44L84,40.63Zm-1,1.6-1.08,2.22h1.33l-.23-2.21Z"/>
            <path className="cls-1" d="M95.47,41.2l-.3,1.37a2.59,2.59,0,0,0-1.71-.75,2.27,2.27,0,0,0-2.1,2.37,1.46,1.46,0,0,0,1.41,1.6,3.5,3.5,0,0,0,1.9-.73l-.33,1.56a4.12,4.12,0,0,1-1.79.46,2.66,2.66,0,0,1-2.69-2.84,3.63,3.63,0,0,1,3.53-3.71A3.79,3.79,0,0,1,95.47,41.2Z"/>
            <path className="cls-1" d="M100.1,40.63l-.49,2.45h2.5l.49-2.45h1.51L102.8,47h-1.48l.55-2.69H99.36L98.82,47H97.35l1.28-6.35Z"/>
            <path className="cls-1" d="M111.93,40.63l-.26,1.29h-3l-.23,1.15h2.85L111,44.28h-2.85l-.28,1.4h3l-.26,1.3h-4.45l1.28-6.35Z"/>
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x.interpolate( { range: [min_x, max_x], output: [0, 1] } ).interpolate( x => x ),
            } }
            fill={text} id="TM"
          >
            <path className="cls-1" d="M150.05,72.66V73h-1v2.47h-.38V73h-.95v-.34Z"/>
            <path className="cls-1" d="M150.68,72.66h.55L152,75l.8-2.38h.54v2.81H153V73.53c0-.14,0-.28,0-.43l-.81,2.37h-.37L151,73.1v.4c0,.14,0,.25,0,.31v1.66h-.37Z"/>
          </animated.g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default Spark