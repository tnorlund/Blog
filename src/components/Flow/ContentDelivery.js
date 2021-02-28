/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 },
  2: { length: 1 },
  3: { length: 1 },
  4: { length: 1 },
  5: { length: 1 },
  6: { length: 1 },
  7: { length: 1 },
  8: { length: 1 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const ContentDelivery = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `300pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 300" preserveAspectRatio="YMax">
          <defs>
            <linearGradient id="content-delivery-cdn-gradient" x1="69.82" y1="180.18" x2="112.25" y2="137.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#523b97"/>
              <stop offset="1" stopColor="#836aaf"/>
            </linearGradient>
            <linearGradient id="content-delivery-route-53-gradient" x1="69.82" y1="80.18" x2="112.25" y2="37.75" xlinkHref="#content-delivery-cdn-gradient"/>
            <clipPath id="content-delivery-route-53-clip-path">
              <polygon className="cls-1" points="107.05 47.26 107.05 45.93 107.05 43.99 100.34 43.99 100.34 49.15 102.42 49.15 102.42 51.84 100.34 51.84 100.34 57.08 109.15 57.08 109.15 47.26 107.05 47.26"/>
            </clipPath>
            <linearGradient id="content-delivery-s3-gradient" x1="69.82" y1="280.18" x2="112.25" y2="237.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1f6835"/>
              <stop offset="1" stopColor="#6bad44"/>
            </linearGradient>
          </defs>

          <animated.rect
            style={ {
              position: `absolute`,
              transformOrigin: `50% 50%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={`url(#content-delivery-cdn-gradient)`}
            className="cls-2" x="70" y="120" width="60" height="60"
          />
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={`none`}
            stroke={`var(--color-background)`}
            strokeWidth={1.5}
            strokeLinejoin={`round`}
          >
            <circle className="cls-3" cx="100" cy="150" r="20.24"/>
            <circle className="cls-3" cx="90.5" cy="148.28" r="2.99"/>
            <circle className="cls-3" cx="102.07" cy="136.49" r="2.99"/>
            <circle className="cls-3" cx="109.07" cy="159.08" r="2.99"/>
            <path className="cls-3" d="M92.93,143.71a26.36,26.36,0,0,1,4.57-5.2"/>
            <path className="cls-3" d="M90.32,167.77a26,26,0,0,1-1.79-9.52,26.64,26.64,0,0,1,.46-4.92"/>
            <path className="cls-3" d="M106.12,133.5a25.17,25.17,0,0,1,4-1"/>
            <path className="cls-3" d="M105.42,140.17A26.45,26.45,0,0,1,110,154.11"/>
            <path className="cls-3" d="M94,130.68a26.5,26.5,0,0,1,4.31,2.37"/>
            <path className="cls-3" d="M108.42,164.19a26.2,26.2,0,0,1-2.54,5.18"/>
            <path className="cls-3" d="M79.76,148.92a26.55,26.55,0,0,1,5.6-.95"/>
            <path className="cls-3" d="M111.24,163.52a25.27,25.27,0,0,1,1,2.59"/>
            <path className="cls-3" d="M95.5,149.31a26.6,26.6,0,0,1,10,6.13"/>
          </animated.g>

          <animated.rect
            style={ {
              position: `absolute`,
              transformOrigin: `50% 33.3333%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={`url(#content-delivery-route-53-gradient)`}
            className="cls-4" x="70" y="20" width="60" height="60"
          />
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={`none`}
            stroke={`var(--color-background)`}
            strokeWidth={1.5}
            strokeLinejoin={`round`}
          >
            <path className="cls-3" d="M100,36s5.38,4.11,12.84.29L114,37.6a10.57,10.57,0,0,0-2,6,14.79,14.79,0,0,0,2.34,8.68c2.36,3.59,2,6.42-1.63,8.17-1.89.89-7.8,1.21-12.71,4.62-4.91-3.41-10.82-3.73-12.71-4.62-3.68-1.75-4-4.58-1.63-8.17A14.79,14.79,0,0,0,88,43.61a10.57,10.57,0,0,0-2-6l1.13-1.36C94.62,40.06,100,36,100,36Z"/>
            <path className="cls-3" d="M100,29.88s-5.94,7.59-13.57.4l-6,7.23c2.53,3,3.1,4.49,3.28,6.38.28,2.79-1.54,5.34-3.36,9.11-1.58,3.28-.31,8.54,4.31,10.87C90.47,66.82,92.36,65,100,70.12c7.64-5.12,9.53-3.3,15.35-6.25,4.62-2.33,5.89-7.59,4.31-10.87-1.82-3.77-3.64-6.32-3.36-9.11.18-1.89.75-3.38,3.28-6.38l-6-7.23C105.94,37.47,100,29.88,100,29.88Z"/>
            <path className="cls-3" d="M98.47,45.93H93.81L93.61,50s4.83-.55,4.71,2.18c-.2,4.31-5.62,2.33-5.62,2.33"/>
            <g
              clipPath={`url(#content-delivery-route-53-clip-path)`}
              className="cls-5"
            >
              <path className="cls-3" d="M101.12,45.93h5.65l-4.26,4.39s4-.55,4.07,2.25c.1,3.72-5.46,1.94-5.46,1.94"/>
            </g>
          </animated.g>

          <animated.rect
            style={ {
              position: `absolute`,
              transformOrigin: `50% 66.66666%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            fill={`url(#content-delivery-s3-gradient)`}
            className="cls-6" x="70" y="220" width="60" height="60"
          />
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={`none`}
            stroke={`var(--color-background)`}
            strokeWidth={1.5}
            strokeLinejoin={`round`}
          >
            <ellipse className="cls-7" cx="98.85" cy="235.41" rx="18.55" ry="5.54"/>
            <path className="cls-8" d="M80.3,235.41l4.67,32a32.85,32.85,0,0,0,13.88,2.71,32.87,32.87,0,0,0,13.89-2.71l4.66-32"/>
            <circle className="cls-9" cx="98.87" cy="246" r="1.16"/>
            <path className="cls-8" d="M98.87,246c5.91,4,30.24,12.15,16.57,2.92"/>
          </animated.g>

          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              fill={`none`}
              className="cls-10" x1="100" y1="80" x2="100" y2="113.72"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-10" points="95.64 112.44 100 120 104.36 112.44 95.64 112.44"
            />
          </animated.g>

          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              fill={`none`}
              className="cls-11" x1="100" y1="180" x2="100" y2="213.72"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-10" points="95.64 212.44 100 220 104.36 212.44 95.64 212.44"
            />
          </animated.g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default ContentDelivery