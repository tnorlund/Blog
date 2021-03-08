/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 }, // Chrome
  2: { length: 1 }, // Route53
  3: { length: 1 },
  4: { length: 1 }, // Arrow 1
  5: { length: 1 }, // API Gateway
  6: { length: 1 },
  7: { length: 1 }, // Arrow 2
  8: { length: 1 }, // Lambda 1
  9: { length: 1 },
  10: { length: 1 },
  11: { length: 1 },
  12: { length: 1 },
  13: { length: 1 },
  14: { length: 1 }, // Arrow 3
  15: { length: 1 }, // DynamoDB
  16: { length: 1 },
  17: { length: 1 },
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
  return <div ref={ref} style={ { padding:`1em`, height: `128pt`, } }>
    <Spring config={{ duration: 1500 }} native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 128" preserveAspectRatio="XMaxYMax">
          <defs>
            <clipPath id="Identity-Chrome-clipPath1">
              <circle className="cls-1" cx="24.9" cy="25" r="25"/>
            </clipPath>
            <linearGradient id="Identity-Chrome-linear-gradient1" x1="12.96" y1="102.96" x2="27.87" y2="111.67" gradientTransform="matrix(1, 0, 0, -1, -7, 122)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#a52a22" stopOpacity="0.6"/>
              <stop offset="0.66" stopColor="#a52a22" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="Identity-Chrome-linear-gradient2" x1="36.12" y1="77.53" x2="19.54" y2="87.25" gradientTransform="matrix(1, 0, 0, -1, -7, 122)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#0d562b" stopOpacity="0.4"/>
              <stop offset="0.33" stopColor="#0d562b" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="Identity-Chrome-clipPath2">
              <polygon className="cls-1" points="-0.1 50 23.7 50 34.74 38.95 34.74 30.68 15.05 30.68 -0.1 4.68 -0.1 50"/>
            </clipPath>
            <linearGradient id="Identity-Chrome-linear-gradient3" x1="39.24" y1="110.12" x2="43.41" y2="91.85" gradientTransform="matrix(1, 0, 0, -1, -7, 122)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#e86324" stopOpacity="0.3"/>
              <stop offset="0.66" stopColor="#e86324" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="Identity-Chrome-clipPath3">
              <polygon className="cls-1" points="24.9 13.64 34.74 30.68 23.7 50 49.9 50 49.9 13.64 24.9 13.64"/>
            </clipPath>
            <radialGradient id="Identity-Chrome-radial-gradient1" cx="606.82" cy="108.38" r="23.89" gradientTransform="matrix(1, 0, 0, -1, -583, 122)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3e2823" stopOpacity="0.2"/>
              <stop offset="1" stopColor="#3e2823" stopOpacity="0"/>
            </radialGradient>
            <clipPath id="Identity-Chrome-clipPath4">
              <polygon points="3.87 0 3.87 11.46 15.06 30.68 24.9 13.64 49.9 13.64 49.9 0 3.87 0"/>
            </clipPath>
            <radialGradient id="Identity-Chrome-radial-gradient2" cx="586.85" cy="110.49" r="22.17" >
              <stop offset="0" stopColor="#3e2823" stopOpacity="0.2"/>
              <stop offset="1" stopColor="#3e2823" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="Identity-Chrome-radial-gradient3" cx="607.84" cy="96.96" r="24.96" gradientTransform="matrix(1, 0, 0, -1, -583, 122)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#273339" stopOpacity="0.2"/>
              <stop offset="1" stopColor="#273339" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="Identity-Workmail-linear-gradient" x1="149.85" y1="50.15" x2="185.21" y2="14.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#bd2026"/>
              <stop offset="1" stopColor="#f05254"/>
            </linearGradient>
            <linearGradient id="Identity-SES-linear-gradient" x1="149.85" y1="124.9" x2="185.21" y2="89.54" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3b3f99"/>
              <stop offset="1" stopColor="#5c76ba"/>
            </linearGradient>
            <linearGradient id="Identity-Cognito-linear-gradient" x1="74.85" y1="50.15" x2="110.21" y2="14.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#bd2026"/>
              <stop offset="1" stopColor="#f05254"/>
            </linearGradient>
            <linearGradient id="Identity-Lambda-linear-gradient1" x1="78.23" y1="121.4" x2="113.58" y2="86.04" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="Identity-Lambda-linear-gradient2" x1="74.73" y1="124.9" x2="110.08" y2="89.54" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="Identity-Lambda-linear-gradient3" x1="71.48" y1="128.15" x2="106.83" y2="92.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
          </defs>
          <animated.g id="Chrome"
            style={ {
              position: `absolute`,
              transformOrigin: `12.4483% 19.55984375%`,
              transform: props.x
                .interpolate( { range: [min_x,  steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${ x }, ${ x }) rotate(-${ 90 - ( x * 90 ) }deg` )
            } }
          >
            <g clipPath={`url(#Identity-Chrome-clipPath1)`} >
              <path fill={`#c33`} d="M3.87,0V30.68H15.06l9.84-17h25V0Z" />
              <path fill={`url(#Identity-Chrome-linear-gradient1)`} d="M3.87,0V30.68H15.06l9.84-17h25V0Z" />
              <path fill={`#3e2823`} style={{ opacity:0.15 }} d="M15.32,30.57,4,11.16l-.16.29L15.08,30.71Z" />
              <path fill={`#0f9d58`} d="M-.1,50H23.69L34.74,39V30.68H15.05L-.1,4.68Z" />
              <path fill={`url(#Identity-Chrome-linear-gradient2)`} d="M-.1,50H23.69L34.74,39V30.68H15.05L-.1,4.68Z" />
              <path fill={`#273339`} style={{ opacity:0.15 }} d="M34.5,31.05l-.24-.14L23.35,50h.33L34.5,31.06Z" />
              <path fill={`#ffce41`} d="M24.9,13.64l9.84,17L23.69,50H49.9V13.64Z" />
              <path fill={`url(#Identity-Chrome-linear-gradient3)`} d="M24.9,13.64l9.84,17L23.69,50H49.9V13.64Z" />
              <g clipPath={`url(#Identity-Chrome-clipPath2)`} >
                <path fill={`#ffce41`} d="M24.9,13.64l9.84,17L23.69,50H49.9V13.64Z" />
                <path fill={`url(#Identity-Chrome-linear-gradient3)`} d="M24.9,13.64l9.84,17L23.69,50H49.9V13.64Z" />
              </g>
              <g clipPath={`url(#Identity-Chrome-clipPath3)`} >
                <path fill={`#dc4637`} d="M3.87,0V30.68H15.06l9.84-17h25V0Z" />
                <path fill={`url(#Identity-Chrome-linear-gradient1)`} d="M3.87,0V30.68H15.06l9.84-17h25V0Z" />
              </g>
            </g>
            <g clipPath={`url(#Identity-Chrome-clipPath1)`} >
              <path fill={`url(#Identity-Chrome-radial-gradient1)`} d="M24.9,13.64v5.95l22.27-5.95Z" />
            </g>
            <g clipPath={`url(#Identity-Chrome-clipPath1)`} >
              <g clipPath={`url(#Identity-Chrome-clipPath4)`} >
                <path fill={`#0f9d58`} d="M-.1,50H23.69L34.74,39V30.68H15.05L-.1,4.68Z" />
                <path fill={`url(#Identity-Chrome-linear-gradient2)`} d="M-.1,50H23.69L34.74,39V30.68H15.05L-.1,4.68Z" />
              </g>
            </g>
            <g clipPath={`url(#Identity-Chrome-clipPath1)`} >
              <path fill={`url(#Identity-Chrome-radial-gradient2)`} d="M3.87,11.49,20.13,27.75l-5.07,2.93Z" />
            </g>
            <g clipPath={`url(#Identity-Chrome-clipPath1)`} >
              <path fill={`url(#Identity-Chrome-radial-gradient3)`} d="M23.71,50l6-22.21,5.07,2.92Z" />
            </g>
            <g clipPath={`url(#Identity-Chrome-clipPath1)`} >
              <circle fill={`#f2f2f2`} cx="24.9" cy="25" r="11.36" />
              <circle fill={`#557ebf`} cx="24.9" cy="25" r="9.09" />
              <path fill={`#3e2823`} style={{ opacity:0.2 }} d="M24.9,13.35A11.37,11.37,0,0,0,13.53,24.72V25A11.36,11.36,0,0,1,24.9,13.64h25v-.29Z" />
              <path fill={`#fff`} style={{ opacity:0.1 }} d="M34.73,30.68a11.35,11.35,0,0,1-19.66,0h0L-.1,4.68V5L15.07,31a11.35,11.35,0,0,0,19.66,0h0v-.29h0Z" />
              <path fill={`#3e2823`} style={{ opacity:0.1, isolation:`isolate` }} d="M25.18,13.64H25a11.36,11.36,0,0,1,0,22.72h.14a11.36,11.36,0,0,0,0-22.72Z" />
              <path fill={`#fff`} style={{ opacity:0.2 }} d="M34.84,31.05a11.23,11.23,0,0,0,1-9.1,11.16,11.16,0,0,1-1.1,8.71v0L23.69,50H24Z" />
              <path fill={`#fff`} style={{ opacity:0.2 }} d="M24.9.28a25,25,0,0,1,25,24.86V25a25,25,0,0,0-50,0v.14A25,25,0,0,1,24.9.28Z" />
              <path fill={`#3e2823`} style={{ opacity:0.15 }} d="M24.9,49.72a25,25,0,0,0,25-24.86V25a25,25,0,0,1-50,0v-.14a25,25,0,0,0,25,24.86Z" />
            </g>
          </animated.g>
          <g id="Workmail">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `87.5% 20.703125%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[15].start, steps[15].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#Identity-Workmail-linear-gradient)`} className="cls-3" x="150" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[16].start, steps[16].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              fill={`none`} stroke={`var(--color-background)`} strokeLinejoin={`round`} strokeWidth={1.5}
            >
              <rect x="158.1" y="8.06" width="33.67" height="33.67"/>
              <polyline points="158.1 8.06 174.93 24.89 191.76 8.06"/>
            </animated.g>
          </g>
          <g id="SES">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `87.5% 79.1015625%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[12].start, steps[12].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#Identity-SES-linear-gradient)`} className="cls-5" x="150" y="74.75" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[13].start, steps[13].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              fill={`none`} stroke={`var(--color-background)`} strokeLinejoin={`round`} strokeWidth={1.5}
            >
              <rect className="cls-6" x="166.31" y="91.04" width="17.38" height="11.2"/>
              <polyline className="cls-6" points="183.68 91.04 175 98.6 166.31 91.04"/>
              <line className="cls-6" x1="166.31" y1="102.24" x2="172.57" y2="96.49"/>
              <line className="cls-6" x1="183.68" y1="102.24" x2="177.42" y2="96.49"/>
              <circle className="cls-6" cx="166.19" cy="112.89" r="2.43"/>
              <circle className="cls-6" cx="175" cy="114.2" r="2.43"/>
              <circle className="cls-6" cx="183.68" cy="112.89" r="2.43"/>
              <polyline className="cls-6" points="166.19 110.46 166.25 107.3 183.75 107.3 183.68 110.46"/>
              <line className="cls-6" x1="175" y1="102.24" x2="175" y2="111.77"/>
              <path className="cls-6" d="M161.3,109.63a16.89,16.89,0,1,1,27.41,0"/>
            </animated.g>
          </g>
          <g id="Cognito">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `50% 20.703125%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#Identity-Cognito-linear-gradient)`} className="cls-7" x="75" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              fill={`none`} stroke={`var(--color-background)`} strokeLinejoin={`round`} strokeWidth={1.5}
            >
              <path className="cls-6" d="M101.72,31.55H85.27a2,2,0,0,1-2-2v-18a2,2,0,0,1,2-2h27.4a2,2,0,0,1,2,2V26.74"/>
              <line className="cls-6" x1="85.65" y1="21.7" x2="93.55" y2="21.7"/>
              <line className="cls-6" x1="85.65" y1="25.4" x2="90.45" y2="25.4"/>
              <line className="cls-6" x1="91.9" y1="25.4" x2="94.15" y2="25.4"/>
              <polyline className="cls-6" points="103.83 28 97.41 28 97.41 13.09 111.76 13.09 111.76 23.63"/>
              <line className="cls-6" x1="83.23" y1="16.69" x2="97.4" y2="16.69"/>
              <line className="cls-6" x1="111.76" y1="16.69" x2="114.71" y2="16.69"/>
              <circle className="cls-6" cx="104.58" cy="18.49" r="3.18"/>
              <path className="cls-6" d="M106.13,21.27a6.52,6.52,0,0,1,4,2.9"/>
              <path className="cls-6" d="M98.06,27.6a6.51,6.51,0,0,1,5-6.33"/>
              <circle className="cls-6" cx="110.37" cy="34.1" r="6.56"/>
              <polyline className="cls-6" points="113.71 31.78 109.16 36.45 106.94 34.1"/>
            </animated.g>
          </g>
          <g id="Lambda">
            <g style={{ opacity: 0.25 }}>
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `51.6875% 76.3671875%`,
                  transform: props.x
                    .interpolate( { range: [min_x,  steps[9].start, steps[9].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#Identity-Lambda-linear-gradient1)`} className="cls-9" x="78.38" y="71.25" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .interpolate( { range: [min_x, steps[10].start, steps[10].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => x ),
                } }
                fill={`none`} stroke={`var(--color-background)`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <polygon className="cls-10" points="87.08 113.25 96.19 113.25 101.31 102.48 96.67 93.2 87.08 113.25"/>
                <polygon className="cls-6" points="92.66 79.36 92.66 86.75 98.24 86.75 110.98 113.25 119.55 113.25 119.55 105.7 116.09 105.7 103.67 79.36 92.66 79.36"/>
              </animated.g>
            </g>
            <g style={{ opacity: 0.5 }}>
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `49.9375% 79.1015625%`,
                  transform: props.x
                    .interpolate( { range: [min_x,  steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#Identity-Lambda-linear-gradient2)`} className="cls-12" x="74.88" y="74.75" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .interpolate( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => x ),
                } }
                fill={`none`} stroke={`var(--color-background)`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <polygon className="cls-10" points="83.58 116.75 92.69 116.75 97.81 105.98 93.17 96.7 83.58 116.75"/>
                <polygon className="cls-6" points="89.16 82.86 89.16 90.25 94.74 90.25 107.48 116.75 116.05 116.75 116.05 109.2 112.59 109.2 100.17 82.86 89.16 82.86"/>
              </animated.g>
            </g>
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `48.3125% 81.640625%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#Identity-Lambda-linear-gradient3)`} className="cls-13" x="71.63" y="78" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
              fill={`none`} stroke={`var(--color-background)`} strokeLinejoin={`round`} strokeWidth={1.5}
            >
              <polygon className="cls-10" points="80.33 120 89.44 120 94.56 109.23 89.92 99.95 80.33 120"/>
              <polygon className="cls-6" points="85.91 86.11 85.91 93.5 91.49 93.5 104.23 120 112.8 120 112.8 112.45 109.34 112.45 96.92 86.11 85.91 86.11"/>
            </animated.g>
          </g>
          <animated.g id="Arrow1"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} x1="50" y1="22.54" x2="69.62" y2="22.54"/>
            <polygon fill={`var(--color-text)`} points="68.52 26.28 75 22.54 68.52 18.8 68.52 26.28"/>
          </animated.g>
          <animated.g id="Arrow2"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[11].start, steps[11].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} x1="75" y1="30.54" x2="55.38" y2="30.54"/>
            <polygon fill={`var(--color-text)`} points="56.48 26.8 50 30.54 56.48 34.28 56.48 26.8"/>
            <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} x1="100" y1="50" x2="100" y2="65.83"/>
            <polygon fill={`var(--color-text)`} points="96.26 64.74 100 71.21 103.74 64.74 96.26 64.74"/>
          </animated.g>


          <animated.g id="Arrow3"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[14].start, steps[14].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} x1="128.5" y1="99.75" x2="144.62" y2="99.75"/>
            <polygon fill={`var(--color-text)`} points="143.52 103.49 150 99.75 143.52 96.01 143.52 103.49"/>
          </animated.g>

          <animated.g id="Arrow4"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[17].start, steps[17].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} x1="174.93" y1="74.75" x2="174.93" y2="55.38"/>
            <polygon fill={`var(--color-text)`} points="178.67 56.48 174.93 50 171.19 56.48 178.67 56.48"/>
          </animated.g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default Identity