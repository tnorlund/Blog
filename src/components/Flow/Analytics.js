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
  8: { length: 1 },
  9: { length: 1 },
  10: { length: 1 },
  11: { length: 1 },
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const Analytics = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `400pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 400" preserveAspectRatio="YMax">
          <defs>
            <linearGradient id="analytics-lambda-gradient3" x1="19.82" y1="380.18" x2="62.25" y2="337.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="analytics-lambda-gradient2" x1="119.82" y1="280.18" x2="162.25" y2="237.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="analytics-s3-gradient" x1="19.82" y1="280.18" x2="62.25" y2="237.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1f6835"/>
              <stop offset="1" stopColor="#6bad44"/>
            </linearGradient>
            <linearGradient id="analytics-firehose_gradient" x1="19.82" y1="80.18" x2="62.25" y2="37.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#523b97"/>
              <stop offset="1" stopColor="#836aaf"/>
            </linearGradient>
            <linearGradient id="analytics-lambda-gradient1" x1="19.82" y1="180.18" x2="62.25" y2="137.75" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="analytics-dynamo-gradient" x1="119.82" y1="180.74" x2="162.25" y2="138.31" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3b3f99"/>
              <stop offset="1" stopColor="#5c76ba"/>
            </linearGradient>
          </defs>
          <g id="Firehose">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `25% 12.5%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#analytics-firehose_gradient)`} x="20" y="20" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              id="Firehose-icon"
            >
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`}
                d="M60.78,52.35a24.87,24.87,0,0,1,8.78,1.5"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`}
                d="M60.78,50a40.08,40.08,0,0,1,8.78,1.5"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`}
                d="M60.78,47.65a24.87,24.87,0,0,0,8.78-1.5"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`}
                d="M60.78,50a40.08,40.08,0,0,0,8.78-1.5"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`}
                points="58.35 46.98 58.35 53.02 49.56 55.24 49.43 44.76 58.35 46.98"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`} d="M45.83,55.25c-2-.12-14.51.73-14.5,9.34v4.13"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`} d="M45.83,53c-7.12,0-12.53,1.78-14.24,3"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`} d="M45.83,50s-13.18.75-15.07,1.5"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`} d="M45.83,44.75c-2,.12-14.51-.73-14.5-9.34V31.28"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`} d="M45.83,47c-7.12,0-12.53-1.78-14.24-3"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`} d="M45.83,50s-13.18-.75-15.07-1.5"
              />
              <rect
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.5}
                strokeLinejoin={`round`} x="45.83" y="43.31" width="3.6" height="13.5"
              />
            </animated.g>
          </g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            id="Arrow1"
          >
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              className="cls-1" x1="50" y1="80" x2="50" y2="113.72"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-2" points="45.64 112.44 50 120 54.36 112.44 45.64 112.44"
            />
          </animated.g>
          <g id="Lambda1">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `25% 37.5%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#analytics-lambda-gradient1)`}
              className="cls-12"
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
                className="cls-4"
                points="30.44 170.4 41.38 170.4 47.52 157.47 41.95 146.34 30.44 170.4"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                className="cls-5"
                points="37.14 129.73 37.14 138.6 43.84 138.6 59.12 170.4 69.41 170.4 69.41 161.34 65.25 161.34 50.35 129.73 37.14 129.73"
              />
            </animated.g>
          </g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={`var(--color-text)`}
            id="Arrow2"
          >
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              className="cls-1" x1="50" y1="180" x2="50" y2="213.72"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-2" points="45.64 212.44 50 220 54.36 212.44 45.64 212.44"
            />
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              className="cls-1" x1="80" y1="150.4" x2="113.72" y2="150.4"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-2" points="112.44 154.76 120 150.4 112.44 146.04 112.44 154.76"
            />
          </animated.g>
          <g id="Dynamo">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `75% 37.5%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#analytics-dynamo-gradient)`}
              className="cls-13" x="120" y="120.56" width="60" height="60"
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
                points="153.08 134.91 147.75 145.32 153.7 145.32 148.49 161.69 167.06 142.38 161.24 142.38 164.34 134.91 153.08 134.91"
              />
              <g
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeMiterlimit={10}
              >
                <path className="cls-8" d="M148.53,152.27c-.74,0-1.49.07-2.27.07-7.53,0-13.64-2.34-13.64-5.23a3.36,3.36,0,0,1,1.82-2.6"/>
                <path className="cls-8" d="M159.89,153.94c-.15,1.24-1.44,2.38-3.49,3.24"/>
                <path className="cls-8" d="M159.91,153.69a2.29,2.29,0,0,1,0,.25"/>
                <path className="cls-8" d="M146.61,158.91h-.35c-7.53,0-13.64-2.34-13.64-5.22"/>
                <path className="cls-8" d="M138.74,155a15.41,15.41,0,0,1-3.79-1.44"/>
                <line className="cls-8" x1="132.62" y1="147.11" x2="132.62" y2="153.69"/>
                <path className="cls-8" d="M146.87,140.54h-.61c-7.53,0-13.64-2.34-13.64-5.22s6.11-5.23,13.64-5.23a27.11,27.11,0,0,1,10.09,1.71"/>
                <path className="cls-8" d="M144.64,147.08c-6.77-.31-12-2.52-12-5.19"/>
                <path className="cls-8" d="M138.74,143.22a15.41,15.41,0,0,1-3.79-1.44"/>
                <line className="cls-8" x1="132.62" y1="135.32" x2="132.62" y2="141.89"/>
                <path className="cls-8" d="M158.08,156.3a3.37,3.37,0,0,1,1.83,2.61c0,2.89-6.11,5.23-13.65,5.23s-13.64-2.34-13.64-5.23a3.37,3.37,0,0,1,1.83-2.61"/>
                <path className="cls-8" d="M159.91,165.49c0,2.88-6.11,5.22-13.65,5.22s-13.64-2.34-13.64-5.22"/>
                <path className="cls-8" d="M138.74,166.82a15.41,15.41,0,0,1-3.79-1.44"/>
                <line className="cls-8" x1="132.62" y1="158.91" x2="132.62" y2="165.49"/>
                <line className="cls-8" x1="159.91" y1="158.91" x2="159.91" y2="165.49"/>
              </g>
            </animated.g>
          </g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[11].start, steps[11].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={`var(--color-text)`}
            id="Arrow3"
          >
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              className="cls-1" x1="40" y1="280" x2="40" y2="313.72"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-2" points="35.64 312.44 40 320 44.36 312.44 35.64 312.44"
            />
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              className="cls-1" x1="140" y1="180.56" x2="140" y2="213.72"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-2" points="135.64 212.44 140 220 144.36 212.44 135.64 212.44"
            />
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              className="cls-1" x1="60" y1="320" x2="60" y2="286.28"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-2" points="64.36 287.56 60 280 55.64 287.56 64.36 287.56"
            />
            <line
              strokeWidth={1.75}
              stroke={`var(--color-text)`}
              className="cls-1" x1="160" y1="220" x2="160" y2="186.84"
            />
            <polygon
              fill={`var(--color-text)`}
              className="cls-2" points="164.36 188.12 160 180.56 155.64 188.12 164.36 188.12"
            />
          </animated.g>
          <g id="S3">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `25% 62.5%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#analytics-s3-gradient)`}
              className="cls-7" x="20" y="220" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <ellipse
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeMiterlimit={10}
                className="cls-8" cx="48.85" cy="235.41" rx="18.55" ry="5.54"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                className="cls-5"
                d="M30.3,235.41l4.67,32a32.85,32.85,0,0,0,13.88,2.71,32.87,32.87,0,0,0,13.89-2.71l4.66-32"
              />
              <circle
                fill={`var(--color-background)`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                className="cls-9" cx="48.87" cy="246" r="1.16"
              />
              <path
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                className="cls-5"
                d="M48.87,246c5.91,4,30.24,12.15,16.57,2.92"
              />
            </animated.g>
          </g>
          <g id="Lambda2">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `75% 62.5%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[9].start, steps[9].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#analytics-lambda-gradient2)`}
              className="cls-6" x="120" y="220" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[10].start, steps[10].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="130.44 270.4 141.38 270.4 147.52 257.47 141.95 246.34 130.44 270.4"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="137.14 229.73 137.14 238.6 143.84 238.6 159.12 270.4 169.41 270.4 169.41 261.34 165.25 261.34 150.35 229.73 137.14 229.73"
              />
            </animated.g>
          </g>
          <g id="Lambda3">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `25% 87.5%`,
                transform: props.x
                  .interpolate( { range: [min_x, steps[9].start, steps[9].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${x}, ${x})` )
              } }
              fill={`url(#analytics-lambda-gradient3)`}
              className="cls-3" x="20" y="320" width="60" height="60"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[10].start, steps[10].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="30.44 370.4 41.38 370.4 47.52 357.47 41.95 346.34 30.44 370.4"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeWidth={1.75}
                strokeLinejoin={`round`}
                points="37.14 329.73 37.14 338.6 43.84 338.6 59.12 370.4 69.41 370.4 69.41 361.34 65.25 361.34 50.35 329.73 37.14 329.73"/>
            </animated.g>
          </g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default Analytics