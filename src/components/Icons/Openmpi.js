/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const grey = `#b3b4b8`
const blue = `#0892d1`
const darkBlue = `#004363`
const background = `var(--color-background)`
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 2 },
  2: { length: 4 },
  3: { length: 1 },
  4: { length: 1 },
  5: { length: 1 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const Openmpi = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          <defs>
            {/* Gradient */}
            <linearGradient
              id="linear-gradient"
              x1="41.8" y1="26.98" x2="41.8" y2="73.28"
              gradientTransform="translate(47.62 -14.9) rotate(45)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor={darkBlue}/>
              <stop offset="1" stopColor={blue}/>
            </linearGradient>
          </defs>

          {/* Square */}
          <animated.g
            style={ {
              position: `absolute`,
              transformOrigin: `20.8985% 50.03832%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            id="Layer_6" data-name="Layer 6"
          >
            <rect
              fill={`url(#linear-gradient)`}
              transform="translate(-23.14 44.21) rotate(-45)"
              className="cls-8"
              x="24.26" y="32.5" width="35.08" height="35.08" rx="4"
            />
          </animated.g>
          {/* Border */}
          <animated.g
            style={ {
              position: `absolute`,
              transformOrigin: `16.178% 50.0032%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } } id="Border">
            <rect
              transform="translate(-23.14 44.21) rotate(-45)"
              fill={`none`}
              stroke={grey}
              strokeMiterlimit={10}
              strokeWidth={3}
              className="cls-7"
              x="20.42" y="28.66" width="42.76" height="42.76" rx="4"
            />
          </animated.g>
          {/* Text */}
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x ),
            } }
            id="Text"
          >
            <path fill={grey} className="cls-5" d="M85.12,58.32c-5.07,0-8.38-3-8.38-8a8.23,8.23,0,0,1,8.62-8.59,9.26,9.26,0,0,1,5.37,1.53,7.49,7.49,0,0,1,3,6.44C93.76,55,90,58.32,85.12,58.32Zm4.51-4.18a10.77,10.77,0,0,0,.62-3.84,10.83,10.83,0,0,0-1-5.06,4.45,4.45,0,0,0-4.13-2.57c-2.91,0-4.83,2.66-4.83,7.1,0,4.64,1.85,7.64,5.14,7.64A4.45,4.45,0,0,0,89.63,54.14Z"/>
            <path fill={grey} className="cls-5" d="M101.65,44.65c4.2,0,6.27,1.15,6.27,3.57,0,2.62-2.4,4.18-6.46,4.34v-.77c2.4-.26,3.34-1.35,3.34-3.28s-1.44-3.09-3.68-3.09a6.3,6.3,0,0,0-1.17.14v9.68c0,1.47.12,1.67.29,1.85s.38.28,1.77.34V58H95.12v-.53c1.11-.1,1.3-.14,1.49-.4s.22-.44.22-1.69V47.17a3,3,0,0,0-.22-1.57c-.14-.2-.36-.34-1.49-.42v-.53Z"/>
            <path fill={grey} className="cls-5" d="M119.24,44.65a12.49,12.49,0,0,1,.29,3.27l-.86.1a3.79,3.79,0,0,0-1.11-2.16,5.05,5.05,0,0,0-2.64-.44H113V50.6h1.9a5.24,5.24,0,0,0,2-.2c.19-.14.34-.6.43-1.37H118v4h-.63a2.31,2.31,0,0,0-.48-1.31,4.14,4.14,0,0,0-1.82-.22H113v5.38a11.92,11.92,0,0,0,2.4.3,6,6,0,0,0,2.74-.5,2.8,2.8,0,0,0,1.32-1.61l.31-.95.87.14a12,12,0,0,1-.8,3.69H108.18v-.53a7.9,7.9,0,0,0,1.06-.14c.55-.12.64-.36.64-1.67V46.75c0-.78-.09-1.11-.26-1.25a3.15,3.15,0,0,0-1.44-.32v-.53Z"/>
            <path fill={grey} className="cls-5" d="M134.41,54.21v-5.7a10.35,10.35,0,0,0-.17-2.44,1,1,0,0,0-.4-.63,4,4,0,0,0-1.59-.26v-.53h5.38v.53c-.7.06-1.11.08-1.37.34s-.41.51-.41,2.28V58a8.72,8.72,0,0,1-1.25.16l-10.68-9.57v5.62c0,2,.17,2.56.39,2.82s.48.34,1.77.44V58h-5.37v-.53c1.08-.1,1.15-.16,1.37-.34s.4-.74.4-2.15V44.65a9.18,9.18,0,0,1,1.18-.14Z"/>
            <path fill={blue} className="cls-6" d="M155.46,54l6-11.85a3.84,3.84,0,0,1,1.2-.15l.72,13.11c.07,1.51.34,1.85.65,2a5.81,5.81,0,0,0,1.22.26V58h-6.77v-.63c1.23-.16,1.52-.26,1.71-.4s.36-.48.31-1.64l-.31-8.2h-.05l-5,10.63a4.3,4.3,0,0,1-.91.24l-5.42-10.87h0l-.29,8.28c0,.91,0,1.22.17,1.41s.65.39,1.85.55V58h-5.24v-.63c1-.16,1.18-.26,1.37-.48a2.71,2.71,0,0,0,.41-1.6l.82-13.13A5.12,5.12,0,0,1,149,42Z"/>
            <path fill={blue} className="cls-6" d="M173.36,42.12c4.2,0,6.27,1.37,6.27,4.25,0,3.12-2.4,5-6.46,5.16v-.92c2.4-.31,3.34-1.6,3.34-3.91A3.4,3.4,0,0,0,172.84,43a5.17,5.17,0,0,0-1.18.17V54.72c0,1.75.12,2,.29,2.21s.38.33,1.77.4V58h-6.88v-.63c1.1-.12,1.29-.16,1.48-.48s.22-.52.22-2V45.12a4.18,4.18,0,0,0-.22-1.87c-.14-.24-.36-.41-1.48-.51v-.62Z"/>
            <path fill={blue} className="cls-6" d="M187.45,42.12v.62c-.31,0-.77.1-1,.15-.67.14-.74.74-.74,2v9.91c0,1.54,0,1.69.21,2s.65.41,1.49.5V58h-6.53v-.63c.36,0,.72-.09.94-.14a.79.79,0,0,0,.65-.57,6.46,6.46,0,0,0,.12-1.4v-10c0-1.56-.1-1.82-.24-2.06s-.63-.39-1.47-.46v-.62Z"/>
          </animated.g>
          {/* Lines */}
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            name="top"
            fill={background}
            className="cls-5"
            d="M11.28,48.59,29.61,47l9.17-.79,4.59-.4a10.66,10.66,0,0,0,2.07-.27.9.9,0,0,0,.47-.46,8.45,8.45,0,0,0,.46-.95l0,0L52.06,27.6l.94.32-5.31,16.7v.05a11,11,0,0,1-.52,1.13,2.69,2.69,0,0,1-.45.62,2,2,0,0,1-.71.47,10.58,10.58,0,0,1-2.46.45L39,47.87l-9.14,1.07L11.53,51.07Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            name="middle"
            fill={background}
            className="cls-5"
            d="M12.23,52.84l28.56-3,3.58-.37,1.78-.18.45,0,.26-.06a1.34,1.34,0,0,0,.44-.27,7.12,7.12,0,0,0,1.14-2.89l1-3.47,3.85-13.85,1,.26-3.39,14L50,46.43c-.15.58-.26,1.16-.45,1.8a4.5,4.5,0,0,1-1,1.91,3,3,0,0,1-1,.7,3.22,3.22,0,0,1-.61.16l-.44.06-1.79.24-3.56.47-28.5,3.8Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            name="bottom"
            fill={background}
            className="cls-5"
            d="M15.91,58.33c11.1-1.69,22.22-3.26,33.32-4.9l-.08,0A1.75,1.75,0,0,0,50.62,52c.26-.87.41-2,.62-3l1.16-6.3q1.16-6.3,2.37-12.59l1,.17q-.88,6.35-1.83,12.67L53,49.27a31.6,31.6,0,0,1-.56,3.27,4.21,4.21,0,0,1-.94,1.81,3.84,3.84,0,0,1-1.86,1h-.08c-11,2-22.09,4-33.16,5.88Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Openmpi