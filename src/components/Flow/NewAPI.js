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

const API = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="YMax">
          <defs>
            <linearGradient id="API-DynamoDB" x1="74.85" y1="125.18" x2="110.21" y2="89.83" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3b3f99"/>
              <stop offset="1" stopColor="#5c76ba"/>
            </linearGradient>
            <linearGradient id="API-Route53-linearGradient" x1="74.96" y1="50.15" x2="110.31" y2="14.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#523b97"/>
              <stop offset="1" stopColor="#836aaf"/>
            </linearGradient>
            <clipPath id="API-Route53-clipPath" transform="translate(0.1)">
              <polygon className="cls-1" points="105.87 22.71 105.87 21.61 105.87 19.99 100.28 19.99 100.28 24.29 102.02 24.29 102.02 26.53 100.28 26.53 100.28 30.9 107.62 30.9 107.62 22.71 105.87 22.71"/>
            </clipPath>
            <linearGradient id="API-APIGateway-linearGradient" x1="149.96" y1="50.15" x2="185.31" y2="14.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#523b97"/>
              <stop offset="1" stopColor="#836aaf"/>
            </linearGradient>
            <clipPath id="API-Chrome-clipPath1">
              <circle className="cls-1" cx="24.9" cy="25.04" r="25"/>
            </clipPath>
            <linearGradient id="API-Chrome-linearGradient1" x1="12.96" y1="103.92" x2="27.87" y2="112.64" gradientTransform="matrix(1, 0, 0, -1, -7, 123)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#a52a22" stopOpacity="0.6"/>
              <stop offset="0.66" stopColor="#a52a22" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="API-Chrome-linearGradient2" x1="36.12" y1="78.49" x2="19.54" y2="88.21" gradientTransform="matrix(1, 0, 0, -1, -7, 123)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#0d562b" stopOpacity="0.4"/>
              <stop offset="0.33" stopColor="#0d562b" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="API-Chrome-clipPath2">
              <polygon className="cls-1" points="-0.1 50.04 23.7 50.04 34.74 38.99 34.74 30.72 15.05 30.72 -0.1 4.72 -0.1 50.04"/>
            </clipPath>
            <linearGradient id="API-Chrome-linearGradient3" x1="39.24" y1="111.08" x2="43.41" y2="92.82" gradientTransform="matrix(1, 0, 0, -1, -7, 123)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#e86324" stopOpacity="0.3"/>
              <stop offset="0.66" stopColor="#e86324" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="API-Chrome-clipPath3">
              <polygon className="cls-1" points="24.9 13.67 34.74 30.72 23.7 50.04 49.9 50.04 49.9 13.67 24.9 13.67"/>
            </clipPath>
            <clipPath id="API-Chrome-clipPath4">
              <polygon className="cls-1" points="3.87 0.04 3.87 11.5 15.06 30.72 24.9 13.67 49.9 13.67 49.9 0.04 3.87 0.04"/>
            </clipPath>
            <radialGradient id="API-Chrome-radial-gradient1" cx="606.82" cy="109.34" r="23.89" gradientTransform="matrix(1, 0, 0, -1, -583, 123)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3e2823" stopOpacity="0.2"/>
              <stop offset="1" stopColor="#3e2823" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="API-Chrome-radial-gradient2" cx="586.85" cy="111.45" r="22.17">
              <stop offset="0" stopColor="#3e2823" stopOpacity="0.2"/>
              <stop offset="1" stopColor="#3e2823" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="API-Chrome-radial-gradient3" cx="607.84" cy="97.92" r="24.96" gradientTransform="matrix(1, 0, 0, -1, -583, 123)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#273339" stopOpacity="0.2"/>
              <stop offset="1" stopColor="#273339" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="API-Lambda1-linearGradient1" x1="149.85" y1="121.36" x2="185.21" y2="86.01" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="API-Lambda1-linearGradient2" x1="146.35" y1="124.86" x2="181.71" y2="89.51" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="API-Lambda1-linearGradient3" x1="143.1" y1="128.11" x2="178.46" y2="92.76" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
            <linearGradient id="API-Lambda2-linearGradient" x1="-0.25" y1="125.18" x2="35.1" y2="89.83" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428"/>
              <stop offset="1" stopColor="#f8981d"/>
            </linearGradient>
          </defs>
          <g id="DynamoDB">
            <rect
              fill={`url(#API-DynamoDB)`}
              className="cls-38" x="75" y="75.04" width="50" height="50"
            />
            <g
              fill={`none`}
              stroke={`var(--color-background)`}
              strokeLinejoin={`round`}
              strokeWidth={1.5}
            >
              <polygon className="cls-33" points="102.56 86.99 98.13 95.67 103.08 95.67 98.74 109.31 114.21 93.22 109.37 93.22 111.95 86.99 102.56 86.99"/>
              <path className="cls-39" d="M98.67,101.46" transform="translate(0.1)"/>
              <path className="cls-39" d="M86.93,95" transform="translate(0.1)"/>
              <path className="cls-39" d="M98.67,101.46q-.92.06-1.89.06c-6.28,0-11.37-2-11.37-4.36A2.79,2.79,0,0,1,86.93,95" transform="translate(0.1)"/>
              <path className="cls-39" d="M97.07,107" transform="translate(0.1)"/>
              <path className="cls-39" d="M105.23,105.55" transform="translate(0.1)"/>
              <path className="cls-39" d="M108.14,102.85c-.13,1-1.21,2-2.91,2.7" transform="translate(0.1)"/>
              <path className="cls-39" d="M108.15,102.64a1.48,1.48,0,0,1,0,.21" transform="translate(0.1)"/>
              <path className="cls-39" d="M97.07,107h-.29c-6.28,0-11.37-2-11.37-4.36" transform="translate(0.1)"/>
              <path className="cls-39" d="M90.51,103.75a12.65,12.65,0,0,1-3.15-1.2" transform="translate(0.1)"/>
              <line className="cls-39" x1="85.52" y1="97.16" x2="85.52" y2="102.64"/>
              <path className="cls-39" d="M108.15,102.64" transform="translate(0.1)"/>
              <path className="cls-39" d="M97.29,91.68h-.51c-6.28,0-11.37-2-11.37-4.36S90.5,83,96.78,83a22.54,22.54,0,0,1,8.41,1.42" transform="translate(0.1)"/>
              <path className="cls-39" d="M95.43,97.13c-5.64-.25-10-2.09-10-4.32" transform="translate(0.1)"/>
              <path className="cls-39" d="M90.51,93.92a13.05,13.05,0,0,1-3.15-1.2" transform="translate(0.1)"/>
              <line className="cls-39" x1="85.52" y1="87.33" x2="85.52" y2="92.81"/>
              <path className="cls-39" d="M106.63,104.82a2.79,2.79,0,0,1,1.52,2.18c0,2.4-5.09,4.35-11.37,4.35S85.41,109.4,85.41,107a2.8,2.8,0,0,1,1.53-2.18" transform="translate(0.1)"/>
              <path className="cls-39" d="M106.63,104.82" transform="translate(0.1)"/>
              <path className="cls-39" d="M86.94,104.82" transform="translate(0.1)"/><path className="cls-39" d="M108.15,112.47c0,2.41-5.09,4.36-11.37,4.36s-11.37-2-11.37-4.36" transform="translate(0.1)"/>
              <path className="cls-39" d="M90.51,113.58a12.66,12.66,0,0,1-3.15-1.19" transform="translate(0.1)"/>
              <line className="cls-39" x1="85.52" y1="107" x2="85.52" y2="112.47"/>
              <line className="cls-39" x1="108.25" y1="107" x2="108.25" y2="112.47"/>
            </g>
          </g>
          <g id="Route53">
            <rect
              fill={`url(#API-Route53-linearGradient)`}
              className="cls-4" x="75.1" width="50" height="50"
            />
            <g
              fill={`none`}
              stroke={`var(--color-background)`}
              strokeLinejoin={`round`}
              strokeWidth={1.5}
            >
              <path className="cls-5" d="M100,13.29s4.48,3.42,10.7.24l.94,1.14a8.82,8.82,0,0,0-1.64,5,12.29,12.29,0,0,0,2,7.23c2,3,1.71,5.35-1.35,6.8-1.58.75-6.51,1-10.6,3.86-4.09-2.84-9-3.11-10.6-3.86-3.06-1.45-3.32-3.81-1.35-6.8a12.29,12.29,0,0,0,2-7.23,8.82,8.82,0,0,0-1.64-5l.94-1.14C95.52,16.71,100,13.29,100,13.29Z" transform="translate(0.1)"/>
              <path className="cls-5" d="M100,8.24s-5,6.32-11.31.33l-5,6c2.11,2.51,2.58,3.75,2.74,5.32.23,2.32-1.29,4.45-2.8,7.59-1.32,2.74-.27,7.12,3.59,9.06,4.85,2.45,6.42.94,12.79,5.2,6.37-4.26,7.94-2.75,12.79-5.2,3.86-1.94,4.91-6.32,3.59-9.06-1.51-3.14-3-5.27-2.8-7.59.16-1.57.63-2.81,2.74-5.32l-5-6C105,14.56,100,8.24,100,8.24Z" transform="translate(0.1)"/>
              <path className="cls-5" d="M98.73,21.61H94.84L94.68,25s4-.46,3.92,1.81c-.17,3.59-4.68,2-4.68,2" transform="translate(0.1)"/>
              <g
                clipPath={`url(#API-Route53-clipPath)`}
                className="cls-6"
              >
                <path className="cls-5" d="M100.94,21.61h4.71l-3.56,3.66s3.32-.46,3.39,1.87c.09,3.1-4.54,1.62-4.54,1.62" transform="translate(0.1)"/>
              </g>
            </g>
          </g>
          <g id="APIGateway">
            <rect
              fill={`url(#API-APIGateway-linearGradient)`}
              className="cls-28" x="150.1" width="50" height="50"
            />
            <g
              fill={`none`}
              stroke={`var(--color-background)`}
              strokeLinejoin={`round`}
              strokeWidth={1.5}
            >
              <polygon className="cls-29" points="158.16 12.88 158.16 38.62 167.56 41.86 167.56 8.23 158.16 12.88"/>
              <polygon className="cls-29" points="192.02 12.88 192.02 38.62 182.62 41.86 182.62 8.23 192.02 12.88"/>
              <path className="cls-30" d="M180.69,16.47" transform="translate(0.1)"/>
              <path className="cls-30" d="M179.4,16.47" transform="translate(0.1)"/>
              <path className="cls-30" d="M177.56,16.47" transform="translate(0.1)"/>
              <path className="cls-30" d="M176.26,16.47" transform="translate(0.1)"/>
              <path className="cls-30" d="M174.44,16.47" transform="translate(0.1)"/>
              <path className="cls-30" d="M173.13,16.47" transform="translate(0.1)"/>
              <path className="cls-30" d="M171.32,16.47" transform="translate(0.1)"/>
              <path className="cls-30" d="M170,16.47" transform="translate(0.1)"/>
              <line className="cls-29" x1="180.79" y1="16.47" x2="182.62" y2="16.47"/>
              <line className="cls-29" x1="177.66" y1="16.47" x2="179.5" y2="16.47"/>
              <line className="cls-29" x1="174.54" y1="16.47" x2="176.36" y2="16.47"/>
              <line className="cls-29" x1="171.42" y1="16.47" x2="173.23" y2="16.47"/>
              <line className="cls-29" x1="167.56" y1="16.47" x2="170.11" y2="16.47"/>
              <line className="cls-29" x1="180.8" y1="34.17" x2="182.63" y2="34.17"/>
              <line className="cls-29" x1="177.67" y1="34.17" x2="179.52" y2="34.17"/>
              <line className="cls-29" x1="174.55" y1="34.17" x2="176.38" y2="34.17"/>
              <line className="cls-29" x1="171.44" y1="34.17" x2="173.24" y2="34.17"/>
              <line className="cls-29" x1="167.57" y1="34.17" x2="170.13" y2="34.17"/>
              <polyline className="cls-29" points="171.86 22.46 169.62 24.91 171.93 27.54"/>
              <polyline className="cls-29" points="178.42 22.46 180.66 24.91 178.35 27.54"/>
              <line className="cls-29" x1="176.69" y1="20.93" x2="173.51" y2="29.07"/>
            </g>
          </g>
          <g id="Chrome">
            <g className="cls-2" clipPath={`url(#API-Chrome-clipPath1)`}>
              <path fill={`#dc4637`} className="cls-3" d="M3.87,0V30.72H15.06l9.84-17h25V0Z"/>
              <path fill={`url(#API-Chrome-linearGradient1)`} className="cls-4" d="M3.87,0V30.72H15.06l9.84-17h25V0Z"/>
              <path fill={`#3e2823`} className="cls-5" d="M15.32,30.6,4,11.2l-.16.29L15.08,30.75Z"/>
              <path fill={`#0f9d58`} id="B" className="cls-6" d="M-.1,50H23.69L34.74,39V30.72H15.05L-.1,4.72Z"/>
              <path fill={`url(#API-Chrome-linearGradient2)`} className="cls-7" d="M-.1,50H23.69L34.74,39V30.72H15.05L-.1,4.72Z"/>
              <path fill={`#273339`} className="cls-8" d="M34.5,31.09,34.26,31,23.35,50h.33L34.5,31.1Z"/>
              <g className="cls-9" clipPath={`url(#API-Chrome-clipPath2)`}>
                <path fill={`#ffce41`} className="cls-10" d="M24.9,13.67l9.84,17L23.69,50H49.9V13.67Z"/>
                <path fill={`url(#API-Chrome-linearGradient3)`} className="cls-11" d="M24.9,13.67l9.84,17L23.69,50H49.9V13.67Z"/>
              </g>
              <path fill={`#ffce41`} className="cls-10" d="M24.9,13.67l9.84,17L23.69,50H49.9V13.67Z"/>
              <path fill={`url(#API-Chrome-linearGradient3)`} className="cls-11" d="M24.9,13.67l9.84,17L23.69,50H49.9V13.67Z"/>
              <g clipPath={`url(#API-Chrome-clipPath3)`} className="cls-12">
                <path fill={`#dc4637`} className="cls-3" d="M3.87,0V30.72H15.06l9.84-17h25V0Z"/>
                <path fill={`url(#API-Chrome-linearGradient1)`} className="cls-4" d="M3.87,0V30.72H15.06l9.84-17h25V0Z"/>
              </g>
            </g>
            <g clipPath={`url(#API-Chrome-clipPath1)`} className="cls-2">
              <path fill={`url(#API-Chrome-radial-gradient1)`} className="cls-13" d="M24.9,13.67v6l22.27-6Z"/>
            </g>
            <g clipPath={`url(#API-Chrome-clipPath1)`} className="cls-2">
              <g clipPath={`url(#API-Chrome-clipPath4)`} className="cls-14">
                <path fill={`#0f9d58`} id="B-2" data-name="B" className="cls-6" d="M-.1,50H23.69L34.74,39V30.72H15.05L-.1,4.72Z"/>
                <path fill={`url(#API-Chrome-linearGradient2)`} className="cls-7" d="M-.1,50H23.69L34.74,39V30.72H15.05L-.1,4.72Z"/>
              </g>
            </g>
            <g clipPath={`url(#API-Chrome-clipPath1)`} className="cls-2">
              <path fill={`url(#API-Chrome-radial-gradient2)`} className="cls-15" d="M3.87,11.53,20.13,27.79l-5.07,2.93Z"/>
            </g>
            <g clipPath={`url(#API-Chrome-clipPath1)`} className="cls-2">
              <path fill={`url(#API-Chrome-radial-gradient3)`} className="cls-16" d="M23.71,50l6-22.22,5.07,2.93Z"/>
            </g>
            <g clipPath={`url(#API-Chrome-clipPath1)`} className="cls-2">
              <circle fill={`#f2f2f2`} className="cls-17" cx="24.9" cy="25.04" r="11.36"/>
              <circle fill={`#557ebf`} className="cls-18" cx="24.9" cy="25.04" r="9.09"/>
              <path fill={`#3e2823`} style={{ opacity:0.2 }} className="cls-19" d="M24.9,13.39A11.36,11.36,0,0,0,13.53,24.75V25A11.37,11.37,0,0,1,24.9,13.67h25v-.28Z"/>
              <path fill={`#fff`} style={{ opacity:0.1 }} className="cls-20" d="M34.73,30.72a11.35,11.35,0,0,1-19.66,0h0L-.1,4.72V5L15.07,31a11.35,11.35,0,0,0,19.66,0h0v-.28h0Z"/>
              <path fill={`#3e2823`} style={{ opacity:0.1, isolation:`isolate` }} className="cls-21" d="M25.18,13.67H25a11.36,11.36,0,0,1,0,22.71h.14a11.37,11.37,0,0,0,0-22.73Z"/>
              <path fill={`#fff`} className="cls-22" d="M34.84,31.09a11.25,11.25,0,0,0,1-9.11,11.19,11.19,0,0,1-1.1,8.72h0L23.69,50H24Z"/>
              <path fill={`#fff`} className="cls-22" d="M24.9.32a25,25,0,0,1,25,24.86V25a25,25,0,0,0-50,0v.14A25,25,0,0,1,24.9.32Z"/>
              <path fill={`#3e2823`} style={{ opacity:0.15 }} className="cls-5" d="M24.9,49.75a25,25,0,0,0,25-24.86V25a25,25,0,0,1-50,0v-.15a25,25,0,0,0,25,24.86Z"/>
            </g>
          </g>
          <g id="Lambda1">
            <g style={{ opacity: 0.25 }} className="cls-1">
              <rect fill={`url(#API-Lambda1-linearGradient1)`} className="cls-2" x="150" y="71.21" width="50" height="50"/>
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeLinejoin={`round`}
                strokeWidth={1.5}
                className="cls-3"
                points="158.7 113.21 167.82 113.21 172.93 102.44 168.29 93.16 158.7 113.21"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeLinejoin={`round`}
                strokeWidth={1.5}
                className="cls-4"
                points="164.28 79.32 164.28 86.71 169.86 86.71 182.6 113.21 191.17 113.21 191.17 105.66 187.71 105.66 175.29 79.32 164.28 79.32"
              />
            </g>
            <g style={{ opacity: 0.5 }} className="cls-5">
              <rect fill={`url(#API-Lambda1-linearGradient2)`} className="cls-6" x="146.5" y="74.71" width="50" height="50"/>
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeLinejoin={`round`}
                strokeWidth={1.5}
                className="cls-3"
                points="155.2 116.71 164.32 116.71 169.43 105.94 164.79 96.66 155.2 116.71"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeLinejoin={`round`}
                strokeWidth={1.5}
                className="cls-4"
                points="160.78 82.82 160.78 90.21 166.36 90.21 179.1 116.71 187.67 116.71 187.67 109.16 184.21 109.16 171.79 82.82 160.78 82.82"
              />
            </g>
            <rect fill={`url(#API-Lambda1-linearGradient3)`} className="cls-7" x="143.25" y="77.96" width="50" height="50"/>
            <polygon
              fill={`none`}
              stroke={`var(--color-background)`}
              strokeLinejoin={`round`}
              strokeWidth={1.5}
              className="cls-3"
              points="151.95 119.96 161.07 119.96 166.18 109.19 161.54 99.91 151.95 119.96"
            />
            <polygon
              fill={`none`}
              stroke={`var(--color-background)`}
              strokeLinejoin={`round`}
              strokeWidth={1.5}
              className="cls-4"
              points="157.53 86.07 157.53 93.46 163.11 93.46 175.85 119.96 184.42 119.96 184.42 112.41 180.96 112.41 168.54 86.07 157.53 86.07"
            />
          </g>
          <g id="Lambda2">
            <g id="LambdaLeft-2" data-name="LambdaLeft">
              <rect fill={`url(#API-Lambda2-linearGradient)`} className="cls-8" x="-0.1" y="75.04" width="50" height="50"/>
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeLinejoin={`round`}
                strokeWidth={1.5}
                className="cls-3"
                points="8.6 117.03 17.72 117.03 22.83 106.26 18.19 96.98 8.6 117.03"
              />
              <polygon
                fill={`none`}
                stroke={`var(--color-background)`}
                strokeLinejoin={`round`}
                strokeWidth={1.5}
                className="cls-4"
                points="14.18 83.15 14.18 90.54 19.76 90.54 32.5 117.03 41.07 117.03 41.07 109.49 37.61 109.49 25.19 83.15 14.18 83.15"
              />
            </g>
          </g>
          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="75" y1="29.04" x2="55.38" y2="29.04"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="56.48 25.3 50 29.04 56.48 32.78 56.48 25.3"/>
          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="124.9" y1="100.09" x2="137.87" y2="100.09"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="136.77 103.83 143.25 100.09 136.77 96.35 136.77 103.83"/>
          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="50" y1="21.04" x2="69.62" y2="21.04"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="68.52 24.78 75 21.04 68.52 17.3 68.52 24.78"/>
          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="125" y1="21.04" x2="144.62" y2="21.04"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="143.52 24.78 150 21.04 143.52 17.3 143.52 24.78"/>
          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="150" y1="29.13" x2="130.38" y2="29.13"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="131.48 25.39 125 29.14 131.48 32.87 131.48 25.39"/>

          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="75" y1="104.04" x2="55.38" y2="104.04"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="56.48 100.3 50 104.04 56.48 107.78 56.48 100.3"/>
          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="50" y1="96.04" x2="69.62" y2="96.04"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="68.52 99.78 75 96.04 68.52 92.3 68.52 99.78"/>

          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="169.41" y1="71.21" x2="169.41" y2="55.38"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="173.15 56.48 169.41 50 165.67 56.48 173.15 56.48"/>
          <line fill={`none`} stroke={`var(--color-text)`} strokeMiterlimit={10} strokeWidth={`3px`} className="cls-1" x1="177.41" y1="50" x2="177.41" y2="65.83"/>
          <polygon fill={`var(--color-text)`} className="cls-2" points="173.67 64.74 177.41 71.21 181.15 64.74 173.67 64.74"/>
        </svg>
      ) }
    </Spring>
  </div>
}

export default API