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
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="YMax">
          <defs>
            <linearGradient id="api-apigateway-gradient" x1="19.82" y1="80.18" x2="62.25" y2="37.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#523b97"/>
              <stop offset="1" stopColor="#836aaf"/>
            </linearGradient>
            <linearGradient id="api-route53-gradient" x1="119.82" y1="80.18" x2="162.25" y2="37.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#523b97"/>
              <stop offset="1" stopColor="#836aaf"/>
            </linearGradient>
            <clipPath id="api-route53-clip-path">
              <polygon className="cls-1" points="157.05 47.26 157.05 45.93 157.05 43.99 150.34 43.99 150.34 49.15 152.42 49.15 152.42 51.84 150.34 51.84 150.34 57.08 159.15 57.08 159.15 47.26 157.05 47.26"/>
            </clipPath>
            <linearGradient id="api-lambda-gradient1" x1="19.82" y1="180.18" x2="62.25" y2="137.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="api-lambda-gradient2" x1="119.82" y1="180.18" x2="162.25" y2="137.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
          </defs>
          <g
            id="API Gateway"
          >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `25% 25%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#api-apigateway-gradient)`}
              className="cls-2" x="20" y="20" width="60" height="60"
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
              <polygon className="cls-3" points="29.67 35.45 29.67 66.35 40.95 70.23 40.95 29.87 29.67 35.45"/>
              <polygon className="cls-3" points="70.3 35.45 70.3 66.35 59.02 70.23 59.02 29.87 70.3 35.45"/>
              <line className="cls-3" x1="56.82" y1="39.76" x2="59.02" y2="39.76"/>
              <line className="cls-3" x1="53.07" y1="39.76" x2="55.28" y2="39.76"/>
              <line className="cls-3" x1="49.32" y1="39.76" x2="51.51" y2="39.76"/>
              <line className="cls-3" x1="45.58" y1="39.76" x2="47.75" y2="39.76"/>
              <line className="cls-3" x1="40.95" y1="39.76" x2="44.01" y2="39.76"/>
              <line className="cls-3" x1="56.84" y1="61.01" x2="59.04" y2="61.01"/>
              <line className="cls-3" x1="53.08" y1="61.01" x2="55.3" y2="61.01"/>
              <line className="cls-3" x1="49.34" y1="61.01" x2="51.53" y2="61.01"/>
              <line className="cls-3" x1="45.6" y1="61.01" x2="47.77" y2="61.01"/>
              <line className="cls-3" x1="40.96" y1="61.01" x2="44.03" y2="61.01"/>
              <polyline className="cls-3" points="46.11 46.96 43.42 49.89 46.19 53.04"/>
              <polyline className="cls-3" points="53.98 46.96 56.66 49.89 53.89 53.04"/>
              <line className="cls-3" x1="51.91" y1="45.11" x2="48.09" y2="54.89"/>
            </animated.g>
          </g>
          <g
            id="Route 53"
          >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `75% 25%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#api-route53-gradient)`} x="120" y="20" width="60" height="60"
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
              strokeMiterlimit={10}
            >
              <path className="cls-5" d="M150,36s5.38,4.11,12.84.29L164,37.6a10.57,10.57,0,0,0-2,6,14.79,14.79,0,0,0,2.34,8.68c2.36,3.59,2,6.42-1.63,8.17-1.89.89-7.8,1.21-12.71,4.62-4.91-3.41-10.82-3.73-12.71-4.62-3.68-1.75-4-4.58-1.63-8.17A14.79,14.79,0,0,0,138,43.61a10.57,10.57,0,0,0-2-6l1.13-1.36C144.62,40.06,150,36,150,36Z"/>
              <path className="cls-5" d="M150,29.88s-5.94,7.59-13.57.4l-6,7.23c2.53,3,3.1,4.49,3.28,6.38.28,2.79-1.54,5.34-3.36,9.11-1.58,3.28-.31,8.54,4.31,10.87,5.82,2.95,7.71,1.13,15.35,6.25,7.64-5.12,9.53-3.3,15.35-6.25,4.62-2.33,5.89-7.59,4.31-10.87-1.82-3.77-3.64-6.32-3.36-9.11.18-1.89.75-3.38,3.28-6.38l-6-7.23C155.94,37.47,150,29.88,150,29.88Z"/>
              <path className="cls-5" d="M148.47,45.93h-4.66l-.2,4.07s4.83-.55,4.71,2.18c-.2,4.31-5.62,2.33-5.62,2.33"/>
              <g className="cls-6"
                clipPath={`url(#api-route53-clip-path)`}
              >
                <path className="cls-5" d="M151.12,45.93h5.65l-4.26,4.39s4-.55,4.07,2.25c.1,3.72-5.46,1.94-5.46,1.94"/>
              </g>
            </animated.g>
          </g>
          <g
            id="Lambda 1"
          >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `25% 75%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#api-lambda-gradient1)`}
              className="cls-7" x="20" y="120" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="30.52 170.33 41.46 170.33 47.59 157.41 42.03 146.27 30.52 170.33"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                className="cls-3" points="37.22 129.67 37.22 138.54 43.91 138.54 59.2 170.33 69.48 170.33 69.48 161.28 65.33 161.28 50.42 129.67 37.22 129.67"
              />
            </animated.g>
          </g>
          <g
            id="Lambda 2"
          >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `75% 75%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#api-lambda-gradient2)`} x="120" y="120" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="130.44 170.4 141.38 170.4 147.52 157.47 141.95 146.34 130.44 170.4"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="137.14 129.73 137.14 138.6 143.84 138.6 159.12 170.4 169.41 170.4 169.41 161.34 165.25 161.34 150.35 129.73 137.14 129.73"
              />
            </animated.g>
          </g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={`var(--color-text)`}
            id="ellipses"
          >
            <circle className="cls-10" cx="93" cy="150" r="1"/>
            <circle className="cls-10" cx="100" cy="150" r="1"/>
            <circle className="cls-10" cx="107" cy="150" r="1"/>
          </animated.g>
          <g
            id="Arrows"
          >
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              id="Arrows1"
            >
              <line
                strokeWidth={1.75}
                stroke={`var(--color-text)`}
                className="cls-11" x1="120" y1="50" x2="86.28" y2="50"
              />
              <polygon
                fill={`var(--color-text)`}
                className="cls-12" points="87.56 45.64 80 50 87.56 54.36 87.56 45.64"
              />
            </animated.g>
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              id="Arrows2"
            >
              <polyline
                strokeWidth={1.75}
                stroke={`var(--color-text)`}
                fill={`none`}
                className="cls-11" points="50 80 50 97.52 50 102.48 50 113.72"
              />
              <polygon
                fill={`var(--color-text)`}
                className="cls-12" points="45.64 112.44 50 120 54.36 112.44 45.64 112.44"
              />
              <polyline
                strokeWidth={1.75}
                fill={`none`}
                stroke={`var(--color-text)`}
                className="cls-11" points="150 113.72 150 97.52 50 97.52"
              />
              <polygon
                fill={`var(--color-text)`}
                className="cls-12" points="154.36 112.44 150 120 145.64 112.44 154.36 112.44"
              />
            </animated.g>
          </g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default Identity