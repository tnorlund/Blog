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
  17: { length: 1 }, // Arrow 4
  18: { length: 1 }, // Lambda2 Arrow 5
  19: { length: 1 }, // Arrow 6
  20: { length: 1 }, // Arrow 7
  21: { length: 1 }, // Arrow 8
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const API = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { padding:`1em`, height: `199.21pt`, } }>
    <Spring config={{ duration: 1500 }} native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 207 199.21" preserveAspectRatio="XMaxYMax">
          <defs>
            <clipPath id="APIclip-path-1"><polygon points="109.37 22.71 109.37 21.61 109.37 19.99 103.78 19.99 103.78 24.29 105.52 24.29 105.52 26.53 103.78 26.53 103.78 30.9 111.12 30.9 111.12 22.71 109.37 22.71" /></clipPath>
            <clipPath id="APIclip-path-2"><circle cx="28.5" cy="25.04" r="25" /></clipPath>
            <clipPath id="APIclip-path-3"><polygon points="3.5 50.04 27.3 50.04 38.34 38.99 38.34 30.72 18.66 30.72 3.5 4.72 3.5 50.04" /></clipPath>
            <clipPath id="APIclip-path-4"><polygon points="28.5 13.67 38.34 30.72 27.3 50.04 53.5 50.04 53.5 13.67 28.5 13.67" /></clipPath>
            <clipPath id="APIclip-path-5"><polygon points="7.47 0.04 7.47 11.5 18.66 30.72 28.5 13.67 53.5 13.67 53.5 0.04 7.47 0.04" /></clipPath>
            <linearGradient id="APIlinear-gradient-1" x1="78.35" y1="50.15" x2="113.71" y2="14.79" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#523b97" /><stop offset="1" stopColor="#836aaf" /></linearGradient>
            <linearGradient id="APIlinear-gradient-2" x1="16.56" y1="175.14" x2="31.48" y2="183.85" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#a52a22" stopOpacity="0.6"/><stop offset="0.66" stopColor="#a52a22" stopOpacity="0"/></linearGradient>
            <linearGradient id="APIlinear-gradient-3" x1="39.73" y1="149.71" x2="23.15" y2="159.42" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#0d562b" stopOpacity="0.4"/><stop offset="0.33" stopColor="#0d562b" stopOpacity="0"/></linearGradient>
            <linearGradient id="APIlinear-gradient-4" x1="42.84" y1="182.3" x2="47.02" y2="164.03" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#e86324" stopOpacity="0.3"/><stop offset="0.66" stopColor="#e86324" stopOpacity="0"/></linearGradient>
            <linearGradient id="APIlinear-gradient-5" x1="153.35" y1="50.15" x2="188.71" y2="14.79" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#523b97" /><stop offset="1" stopColor="#836aaf" /></linearGradient>
            <linearGradient id="APIlinear-gradient-6" x1="156.85" y1="121.38" x2="192.21" y2="86.02" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c85428" /><stop offset="1" stopColor="#f8981d" /></linearGradient>
            <linearGradient id="APIlinear-gradient-7" x1="153.35" y1="124.88" x2="188.71" y2="89.52" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c85428" /><stop offset="1" stopColor="#f8981d" /></linearGradient>
            <linearGradient id="APIlinear-gradient-8" x1="150.1" y1="128.13" x2="185.46" y2="92.77" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c85428" /><stop offset="1" stopColor="#f8981d" /></linearGradient>
            <linearGradient id="APIlinear-gradient-9" x1="3.35" y1="124.75" x2="38.71" y2="89.4" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c85428" /><stop offset="1" stopColor="#f8981d" /></linearGradient>
            <linearGradient id="APIlinear-gradient-10" x1="78.35" y1="124.75" x2="113.71" y2="89.4" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3b3f99" /><stop offset="1" stopColor="#5c76ba" /></linearGradient>
            <linearGradient id="APIlinear-gradient-11" x1="153.35" y1="199.36" x2="188.71" y2="164.01" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#523b97" /><stop offset="1" stopColor="#836aaf" /></linearGradient>
            <linearGradient id="APIlinear-gradient-12" x1="78.35" y1="199.36" x2="113.71" y2="164.01" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1f6835" /><stop offset="1" stopColor="#6bad44" /></linearGradient>
            <radialGradient id="APIradial-gradient-1" cx="610.42" cy="180.55" r="23.89" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3e2823" stopOpacity="0.2"/><stop offset="1" stopColor="#3e2823" stopOpacity="0"/></radialGradient>
            <radialGradient id="APIradial-gradient-2" cx="590.45" cy="182.67" r="22.17" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3e2823" stopOpacity="0.2"/><stop offset="1" stopColor="#3e2823" stopOpacity="0"/></radialGradient>
            <radialGradient id="APIradial-gradient-3" cx="611.44" cy="169.14" r="24.96" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#273339" stopOpacity="0.2"/><stop offset="1" stopColor="#273339" stopOpacity="0"/></radialGradient>
          </defs>
          <animated.g id="Chrome"
            style={ {
              position: `absolute`,
              transformOrigin: `13.768115942029% 12.5670900055218%`,
              transform: props.x
                .interpolate( { range: [min_x,  steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${ x }, ${ x }) rotate(-${ 90 - ( x * 90 ) }deg` )
            } }
          >
            <g clipPath={`url(#APIclip-path-2)`}  >
              <path fill={`#c33`} d="M7.47,0V30.72H18.66l9.84-17h25V0Z" />
              <path fill={`url(#APIlinear-gradient-2)`} d="M7.47,0V30.72H18.66l9.84-17h25V0Z" />
              <path fill={`#3e2823`} style={{ opacity:0.15 }} d="M18.93,30.6,7.61,11.2l-.16.29L18.68,30.75Z" />
              <path fill={`#0f9d58`} d="M3.5,50H27.3l11-11V30.72H18.66L3.5,4.72Z" />
              <path fill={`url(#APIlinear-gradient-3)`} d="M3.5,50H27.3l11-11V30.72H18.66L3.5,4.72Z" />
              <path fill={`#273339`} style={{ opacity:0.15 }} d="M38.1,31.09,37.87,31,27,50h.32L38.11,31.1Z" />
              <g clipPath={`url(#APIclip-path-3)`}  >
                <path fill={`#ffce41`} d="M28.5,13.67l9.84,17L27.3,50H53.5V13.67Z" />
                <path fill={`url(#APIlinear-gradient-4)`} d="M28.5,13.67l9.84,17L27.3,50H53.5V13.67Z" />
              </g>
              <path fill={`#ffce41`} d="M28.5,13.67l9.84,17L27.3,50H53.5V13.67Z" />
              <path fill={`url(#APIlinear-gradient-4)`} d="M28.5,13.67l9.84,17L27.3,50H53.5V13.67Z" />
              <g clipPath={`url(#APIclip-path-4)`}  >
                <path fill={`#dc4637`} d="M7.47,0V30.72H18.66l9.84-17h25V0Z" />
                <path fill={`url(#APIlinear-gradient-2)`} d="M7.47,0V30.72H18.66l9.84-17h25V0Z" />
              </g>
            </g>
            <g clipPath={`url(#APIclip-path-2)`}  >
              <path fill={`url(#APIradial-gradient-1)`} d="M28.5,13.67v6l22.27-6Z" />
            </g>
            <g clipPath={`url(#APIclip-path-2)`}  >
              <g clipPath={`url(#APIclip-path-5)`}  >
                <path fill={`#0f9d58`} d="M3.5,50H27.3l11-11V30.72H18.66L3.5,4.72Z" />
                <path fill={`url(#APIlinear-gradient-3)`} d="M3.5,50H27.3l11-11V30.72H18.66L3.5,4.72Z" />
              </g>
            </g>
            <g clipPath={`url(#APIclip-path-2)`}  >
              <path fill={`url(#APIradial-gradient-2)`} d="M7.47,11.53,23.73,27.79l-5.07,2.93Z" />
            </g>
            <g clipPath={`url(#APIclip-path-2)`}  >
              <path fill={`url(#APIradial-gradient-3)`} d="M27.32,50l6-22.22,5.07,2.93Z" />
            </g>
            <g clipPath={`url(#APIclip-path-2)`}  >
              <circle fill={`#f2f2f2`} cx="28.5" cy="25.04" r="11.36" />
              <circle fill={`#557ebf`} cx="28.5" cy="25.04" r="9.09" />
              <path fill={`#3e2823`} style={{ opacity:0.2 }} d="M28.5,13.39A11.35,11.35,0,0,0,17.14,24.75V25A11.36,11.36,0,0,1,28.5,13.67h25v-.28Z" />
              <path fill={`#fff`} style={{ opacity:0.1 }} d="M38.33,30.72a11.35,11.35,0,0,1-19.66,0h0L3.5,4.72V5L18.67,31a11.35,11.35,0,0,0,19.66,0h0v-.28Z" />
              <path fill={`#3e2823`} style={{ opacity:0.1, isolation:`isolate` }} d="M28.78,13.67h-.14a11.36,11.36,0,0,1,0,22.71h.14a11.37,11.37,0,1,0,0-22.73Z" />
              <path fill={`#fff`} style={{ opacity:0.2 }} d="M38.44,31.09A11.24,11.24,0,0,0,40,25.42,11.44,11.44,0,0,0,39.44,22a11.32,11.32,0,0,1-1.1,8.72h0L27.3,50h.33Z" />
              <path fill={`#fff`} style={{ opacity:0.2 }} d="M28.5.32a25,25,0,0,1,25,24.86V25a25,25,0,0,0-50,0v.14A25,25,0,0,1,28.5.32Z" />
              <path fill={`#3e2823`} style={{ opacity:0.15 }} d="M28.5,49.75a25,25,0,0,0,25-24.86V25a25,25,0,0,1-50,0v-.15a25,25,0,0,0,25,24.86Z" />
            </g>
          </animated.g>

          <animated.g id="Arrow1"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="53.5" y1="21.04" x2="73.12" y2="21.04" />
            <polygon fill={`#231f20`} points="72.02 24.78 78.5 21.04 72.02 17.3 72.02 24.78" />
          </animated.g>

          <g id="Route53"  >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `50% 12.5487174338638%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#APIlinear-gradient-1)`} x="78.5" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} d="M103.5,13.29s4.48,3.42,10.7.24l.94,1.14a8.82,8.82,0,0,0-1.64,5,12.29,12.29,0,0,0,2,7.23c2,3,1.71,5.35-1.35,6.8-1.58.75-6.51,1-10.6,3.86-4.09-2.84-9-3.11-10.6-3.86-3.06-1.45-3.32-3.81-1.35-6.8a12.29,12.29,0,0,0,2-7.23,8.82,8.82,0,0,0-1.64-5l.94-1.14C99,16.71,103.5,13.29,103.5,13.29Z" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} d="M103.5,8.24s-5,6.32-11.31.33l-5,6c2.11,2.51,2.58,3.75,2.74,5.32.23,2.32-1.29,4.45-2.8,7.59-1.32,2.74-.27,7.12,3.59,9.06,4.85,2.45,6.42.94,12.79,5.2,6.37-4.26,7.94-2.75,12.79-5.2,3.86-1.94,4.91-6.32,3.59-9.06-1.51-3.14-3-5.27-2.8-7.59.16-1.57.63-2.81,2.74-5.32l-5-6C108.45,14.56,103.5,8.24,103.5,8.24Z" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} d="M102.23,21.61H98.34L98.18,25s4-.46,3.92,1.81c-.17,3.59-4.68,2-4.68,2" />
              <g clipPath={`url(#APIclip-path-1)`}  >
                <path fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} d="M104.44,21.61h4.71l-3.56,3.66s3.32-.46,3.39,1.87c.09,3.1-4.54,1.62-4.54,1.62" />
              </g>
            </animated.g>
          </g>

          <animated.g id="Arrow2"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="128.5" y1="21.04" x2="148.12" y2="21.04" />
            <polygon fill={`#231f20`} points="147.02 24.78 153.5 21.04 147.02 17.3 147.02 24.78" />
          </animated.g>

          <g id="APIGateway"  >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `86.231884057971% 12.5487174338638%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#APIlinear-gradient-5)`} x="153.5" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="161.56 12.88 161.56 38.62 170.95 41.86 170.95 8.23 161.56 12.88" />
              <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="195.41 12.88 195.41 38.62 186.01 41.86 186.01 8.23 195.41 12.88" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="184.19" y1="16.47" x2="186.01" y2="16.47" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="181.06" y1="16.47" x2="182.9" y2="16.47" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="177.94" y1="16.47" x2="179.76" y2="16.47" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="174.82" y1="16.47" x2="176.63" y2="16.47" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="170.95" y1="16.47" x2="173.51" y2="16.47" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="184.2" y1="34.17" x2="186.03" y2="34.17" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="181.07" y1="34.17" x2="182.91" y2="34.17" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="177.95" y1="34.17" x2="179.77" y2="34.17" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="174.83" y1="34.17" x2="176.64" y2="34.17" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="170.97" y1="34.17" x2="173.52" y2="34.17" />
              <polyline fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="175.26 22.46 173.01 24.91 175.33 27.54" />
              <polyline fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="181.81 22.46 184.05 24.91 181.74 27.54" />
              <line fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} x1="180.09" y1="20.93" x2="176.91" y2="29.07" />
            </animated.g>
          </g>

          <animated.g id="Arrow3"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="182.5" y1="50" x2="182.5" y2="65.83" />
            <polygon fill={`#231f20`} points="178.76 64.74 182.5 71.21 186.24 64.74 178.76 64.74" />
          </animated.g>

          <g id="LambdaRight"  >
            <g style={{ opacity:0.25 }}  >
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `87.9227053140097% 48.3058079413684%`,
                  transform: props.x
                    .interpolate( { range: [min_x,  steps[13].start, steps[13].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#APIlinear-gradient-6)`} x="157" y="71.23" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .interpolate( { range: [min_x, steps[14].start, steps[14].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => x ),
                } }
              >
                <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="165.7 113.23 174.82 113.23 179.93 102.46 175.29 93.18 165.7 113.23" />
                <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="171.28 79.34 171.28 86.73 176.86 86.73 189.6 113.23 198.17 113.23 198.17 105.68 194.71 105.68 182.29 79.34 171.28 79.34" />
              </animated.g>
            </g>
            <g style={{ opacity:0.5 }}  >
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `86.231884057971% 50.0627478540234%`,
                  transform: props.x
                    .interpolate( { range: [min_x,  steps[11].start, steps[11].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#APIlinear-gradient-7)`} x="153.5" y="74.73" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .interpolate( { range: [min_x, steps[12].start, steps[12].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => x ),
                } }
              >
                <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="162.2 116.73 171.32 116.73 176.43 105.96 171.79 96.68 162.2 116.73" />
                <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="167.78 82.84 167.78 90.23 173.36 90.23 186.1 116.73 194.67 116.73 194.67 109.18 191.21 109.18 178.79 82.84 167.78 82.84" />
              </animated.g>
            </g>
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `84.6618357487923% 51.6941920586316%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[9].start, steps[9].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#APIlinear-gradient-8)`} x="150.25" y="77.98" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[10].start, steps[10].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="158.95 119.98 168.07 119.98 173.18 109.21 168.54 99.93 158.95 119.98" />
              <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="164.53 86.09 164.53 93.48 170.11 93.48 182.85 119.98 191.42 119.98 191.42 112.43 187.96 112.43 175.54 86.09 164.53 86.09" />
            </animated.g>
          </g>

          <animated.g id="Arrow4"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[15].start, steps[15].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="128.4" y1="100.09" x2="144.87" y2="100.09" />
            <polygon fill={`#231f20`} points="143.77 103.83 150.25 100.09 143.77 96.35 143.77 103.83" />
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="174.5" y1="71.21" x2="174.5" y2="55.38" />
            <polygon fill={`#231f20`} points="178.24 56.48 174.5 50 170.76 56.48 178.24 56.48" />
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="178.5" y1="149.21" x2="178.5" y2="133.38" />
            <polygon fill={`#231f20`} points="182.24 134.48 178.5 128 174.76 134.48 182.24 134.48" />
          </animated.g>

          <g id="DynamoDB"  >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `50% 50%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[16].start, steps[16].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#APIlinear-gradient-10)`} x="78.5" y="74.61" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[17].start, steps[17].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="106.06 86.56 101.63 95.24 106.58 95.24 102.24 108.88 117.71 92.78 112.87 92.78 115.45 86.56 106.06 86.56" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M102.28,101q-.93.06-1.89.06c-6.28,0-11.37-2-11.37-4.36a2.8,2.8,0,0,1,1.51-2.17" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M111.74,102.42c-.13,1-1.2,2-2.9,2.7" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M111.75,102.21a1.48,1.48,0,0,1,0,.21" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M100.68,106.57h-.29c-6.28,0-11.37-1.95-11.37-4.36" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M94.11,103.32a12.81,12.81,0,0,1-3.15-1.2" />
              <line fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} x1="89.02" y1="96.73" x2="89.02" y2="102.21" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M100.89,91.25h-.5c-6.28,0-11.37-2-11.37-4.36s5.09-4.35,11.37-4.35a22.48,22.48,0,0,1,8.4,1.42" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M99,96.7c-5.65-.25-10-2.09-10-4.32" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M94.11,93.49A13.22,13.22,0,0,1,91,92.29" />
              <line fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} x1="89.02" y1="86.9" x2="89.02" y2="92.38" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M110.23,104.39a2.79,2.79,0,0,1,1.52,2.18c0,2.4-5.09,4.35-11.36,4.35S89,109,89,106.57a2.79,2.79,0,0,1,1.52-2.18" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M111.75,112c0,2.41-5.09,4.36-11.36,4.36S89,114.45,89,112" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M94.11,113.15A12.82,12.82,0,0,1,91,112" />
              <line fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} x1="89.02" y1="106.57" x2="89.02" y2="112.04" />
              <line fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} x1="111.75" y1="106.57" x2="111.75" y2="112.04" />
            </animated.g>
          </g>
          <g id="Athena"  >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `86.231884057971% 87.4512825661362%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[16].start, steps[16].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#APIlinear-gradient-11)`} x="153.5" y="149.21" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[17].start, steps[17].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <ellipse fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} cx="177.66" cy="167.2" rx="5.76" ry="1.72" />
              <path fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.5px`} d="M171.9,167.2l1.45,10a11.5,11.5,0,0,0,8.63,0l1.45-10" />
              <circle fill={`#fff`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.5px`} cx="177.67" cy="170.5" r="0.36" />
              <path fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.5px`} d="M177.67,170.5c1.83,1.24,9.4,3.77,5.15.9" />
              <circle fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} cx="177.17" cy="171.52" r="10.34" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} d="M164.2,165.9a14.14,14.14,0,1,1,.64,12.53" />
              <path fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} d="M185,183.54l.85.86,6.67,6.66,0,0a2.58,2.58,0,0,0,4.15-2,2.55,2.55,0,0,0-.53-1.56h0l-7.56-7.55" />
              <line fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} x1="167.3" y1="168.43" x2="161.68" y2="168.43" />
              <line fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} x1="167.86" y1="176.03" x2="161.68" y2="176.03" />
              <line fill={`none`} stroke={`#fff`} strokeWidth={`1.5px`} x1="166.83" y1="172.25" x2="160.41" y2="172.25" />
            </animated.g>
          </g>

          <animated.g id="Arrow5"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[18].start, steps[18].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="153.5" y1="29.13" x2="133.88" y2="29.13" />
            <polygon fill={`#231f20`} points="134.98 25.39 128.5 29.14 134.98 32.87 134.98 25.39" />
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="78.5" y1="104.04" x2="58.88" y2="104.04" />
            <polygon fill={`#231f20`} points="59.98 100.3 53.5 104.04 59.98 107.78 59.98 100.3" />
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="128.4" y1="174.21" x2="148.12" y2="174.21" />
            <polygon fill={`#231f20`} points="147.02 177.95 153.5 174.21 147.02 170.47 147.02 177.95" />
          </animated.g>

          <g id="LambdaLeft"  >
            <g id="LambdaLeft-2"  >
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `13.768115942029% 50%`,
                  transform: props.x
                    .interpolate( { range: [min_x,  steps[19].start, steps[19].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#APIlinear-gradient-9)`} x="3.5" y="74.61" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .interpolate( { range: [min_x, steps[20].start, steps[20].stop, max_x], output: [0, 0, 1, 1] } )
                    .interpolate( x => x ),
                } }
              >
                <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="12.2 116.6 21.32 116.6 26.43 105.83 21.79 96.55 12.2 116.6" />
                <polygon fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} points="17.78 82.72 17.78 90.11 23.36 90.11 36.1 116.6 44.67 116.6 44.67 109.06 41.21 109.06 28.79 82.72 17.78 82.72" />
              </animated.g>
            </g>
          </g>

          <g id="S3"  >
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `50% 87.4512825661362%`,
                transform: props.x
                  .interpolate( { range: [min_x,  steps[19].start, steps[19].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#APIlinear-gradient-12)`} x="78.5" y="149.21" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .interpolate( { range: [min_x, steps[20].start, steps[20].stop, max_x], output: [0, 0, 1, 1] } )
                  .interpolate( x => x ),
              } }
            >
              <ellipse fill={`none`} stroke={`#fff`} strokeWidth={`1.75px`} cx="102.55" cy="162.06" rx="15.46" ry="4.62" />
              <path fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} d="M87.09,162.06,91,188.76A27.49,27.49,0,0,0,102.55,191a27.44,27.44,0,0,0,11.57-2.25l3.88-26.7" />
              <circle fill={`#fff`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} cx="102.56" cy="170.88" r="0.97" />
              <path fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={`1.75px`} d="M102.56,170.88c4.92,3.33,25.2,10.12,13.81,2.43" />
            </animated.g>
          </g>

          <animated.g id="Arrow6"
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[21].start, steps[21].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
          >
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="78.5" y1="29.04" x2="58.88" y2="29.04" />
            <polygon fill={`#231f20`} points="59.98 25.3 53.5 29.04 59.98 32.78 59.98 25.3" />
            <line fill={`none`} stroke={`#231f20`} strokeWidth={`3px`} x1="53.5" y1="96.04" x2="73.12" y2="96.04" />
            <polygon fill={`#231f20`} points="72.02 99.78 78.5 96.04 72.02 92.3 72.02 99.78" />
          </animated.g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default API