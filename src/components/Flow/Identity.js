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

const Identity = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `300pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 300" preserveAspectRatio="YMax">
          <defs>
            <linearGradient id="identity-cognito-gradient" x1="69.82" y1="80.18" x2="112.25" y2="37.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#bd2026"/>
              <stop offset="1" stopColor="#f05254"/>
            </linearGradient>
            <linearGradient id="identity-lambda-gradient2" x1="119.82" y1="180.24" x2="162.25" y2="137.81" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="identity-lambda-gradient1" x1="19.82" y1="180.18" x2="62.25" y2="137.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="identity-ses-gradient" x1="19.82" y1="280.18" x2="62.25" y2="237.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3b3f99"/>
              <stop offset="1" stopColor="#5c76ba"/>
            </linearGradient>
          </defs>
          <g id="Cognito">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `50% 16.66666667%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#identity-cognito-gradient)`} className="cls-1" x="70" y="20" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              fill={`none`}
              stroke={`var(--color-background)`}
              strokeLinejoin={`round`}
              strokeWidth={1.5}
            >
              <path className="cls-2" d="M102.06,57.86H82.33a2.44,2.44,0,0,1-2.45-2.45V33.76a2.44,2.44,0,0,1,2.45-2.44h32.88a2.45,2.45,0,0,1,2.45,2.44V52.09"/>
              <line className="cls-2" x1="82.78" y1="46.04" x2="92.26" y2="46.04"/>
              <line className="cls-2" x1="82.78" y1="50.48" x2="88.54" y2="50.48"/>
              <line className="cls-2" x1="90.28" y1="50.48" x2="92.98" y2="50.48"/>
              <polyline className="cls-2" points="104.59 53.6 96.89 53.6 96.89 35.71 114.12 35.71 114.12 48.35"/>
              <line className="cls-2" x1="79.88" y1="40.03" x2="96.89" y2="40.03"/>
              <line className="cls-2" x1="114.12" y1="40.03" x2="117.66" y2="40.03"/>
              <circle className="cls-2" cx="105.5" cy="42.19" r="3.81"/>
              <path className="cls-2" d="M107.36,45.52a7.85,7.85,0,0,1,4.8,3.49"/>
              <path className="cls-2" d="M97.68,53.12a7.82,7.82,0,0,1,6-7.6"/>
              <circle className="cls-2" cx="112.44" cy="60.92" r="7.87"/>
              <polyline className="cls-2" points="116.45 58.13 110.99 63.74 108.33 60.91"/>
            </animated.g>
          </g>
          <g id="Lambda2">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `75% 50%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#identity-lambda-gradient2)`} className="cls-3" x="120" y="120.06" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="130.44 170.46 141.38 170.46 147.52 157.53 141.95 146.4 130.44 170.46"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeLinejoin={`round`}
                strokeWidth={1.75}
                points="137.14 129.8 137.14 138.66 143.84 138.66 159.12 170.46 169.41 170.46 169.41 161.4 165.25 161.4 150.35 129.8 137.14 129.8"
              />
            </animated.g>
          </g>
          <g id="Lambda1">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `25% 50%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#identity-lambda-gradient1)`}
              x="20" y="120" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="30.44 170.4 41.38 170.4 47.52 157.47 41.95 146.34 30.44 170.4"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="37.14 129.73 37.14 138.6 43.84 138.6 59.12 170.4 69.41 170.4 69.41 161.34 65.25 161.34 50.35 129.73 37.14 129.73"
              />
            </animated.g>
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              id="Arrow1"
            >
              <polyline
                fill={`none`}
                strokeWidth={1.75}
                stroke={`var(--color-text)`}
                points="100 80 100 100 50 100 50 113.78"
              />
              <polygon fill={`var(--color-text)`} points="45.64 112.51 50 120.06 54.36 112.51 45.64 112.51"/>
              <polyline
                fill={`none`}
                strokeWidth={1.75}
                stroke={`var(--color-text)`}
                points="150 113.72 150 100 100 100"
              />
              <polygon fill={`var(--color-text)`} points="154.36 112.44 150 120 145.64 112.44 154.36 112.44"/>
            </animated.g>
          </g>
          <g id="SES">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `25% 83.33333333%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#identity-ses-gradient)`} x="20" y="220" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              fill={`none`}
              stroke={`var(--color-background)`}
              strokeLinejoin={`round`}
              strokeWidth={1.5}
            >
              <rect className="cls-2" x="39.57" y="239.55" width="20.85" height="13.44"/>
              <polyline className="cls-2" points="60.42 239.55 49.99 248.62 39.57 239.55"/>
              <line className="cls-2" x1="39.57" y1="252.99" x2="47.09" y2="246.09"/>
              <line className="cls-2" x1="60.42" y1="252.99" x2="52.9" y2="246.09"/>
              <circle className="cls-2" cx="39.43" cy="265.77" r="2.92"/>
              <circle className="cls-2" cx="49.99" cy="267.34" r="2.92"/>
              <circle className="cls-2" cx="60.42" cy="265.77" r="2.92"/>
              <polyline className="cls-2" points="39.43 262.85 39.51 259.06 60.49 259.06 60.42 262.85"/>
              <line className="cls-2" x1="49.99" y1="252.99" x2="49.99" y2="264.42"/>
              <path className="cls-2" d="M33.56,261.86a20.27,20.27,0,1,1,32.89,0"/>
            </animated.g>
          </g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            id="Arrow2"
          >
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              x1="50" y1="180" x2="50" y2="213.72"
            />
            <polygon
              fill={`var(--color-text)`}
              points="45.64 212.44 50 220 54.36 212.44 45.64 212.44"
            />
          </animated.g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default Identity