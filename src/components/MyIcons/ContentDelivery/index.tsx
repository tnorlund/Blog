/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const fill = `var(--color-text)`
const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] )


export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { padding:`1em`, height: `275pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 275" preserveAspectRatio="XmaxYMax">
         <defs>
            <clipPath id="CDN-Chrome-clip-path1">
              <circle className="cls-1" cx="100" cy="25" r="25" />
            </clipPath>
            <linearGradient
              id="CDN-Chrome-linear-gradient1"
              x1="88.06"
              y1="250.96"
              x2="102.98"
              y2="259.67"
              gradientTransform="matrix(1, 0, 0, -1, -7, 270)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#a52a22" stopOpacity="0.6" />
              <stop offset="0.66" stopColor="#a52a22" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="CDN-Chrome-linear-gradient2"
              x1="111.23"
              y1="225.53"
              x2="94.65"
              y2="235.25"
              gradientTransform="matrix(1, 0, 0, -1, -7, 270)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#0d562b" stopOpacity="0.4" />
              <stop offset="0.33" stopColor="#0d562b" stopOpacity="0" />
            </linearGradient>
            <clipPath id="CDN-Chrome-clip-path2">
              <polygon
                className="cls-1"
                points="75 50 98.8 50 109.84 38.95 109.84 30.68 90.16 30.68 75 4.68 75 50"
              />
            </clipPath>
            <linearGradient
              id="CDN-Chrome-linear-gradient3"
              x1="114.34"
              y1="258.12"
              x2="118.52"
              y2="239.85"
              gradientTransform="matrix(1, 0, 0, -1, -7, 270)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#e86324" stopOpacity="0.3" />
              <stop offset="0.66" stopColor="#e86324" stopOpacity="0" />
            </linearGradient>
            <clipPath id="CDN-Chrome-clip-path3">
              <polygon
                className="cls-1"
                points="100 13.64 109.84 30.68 98.8 50 125 50 125 13.64 100 13.64"
              />
            </clipPath>
            <radialGradient
              id="CDN-Chrome-radial-gradient1"
              cx="681.92"
              cy="256.38"
              r="23.89"
              gradientTransform="matrix(1, 0, 0, -1, -583, 270)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#3e2823" stopOpacity="0.2" />
              <stop offset="1" stopColor="#3e2823" stopOpacity="0" />
            </radialGradient>
            <clipPath id="CDN-Chrome-clip-path4">
              <polygon
                className="cls-1"
                points="78.97 0 78.97 11.46 90.16 30.68 100 13.64 125 13.64 125 0 78.97 0"
              />
            </clipPath>
            <radialGradient
              id="CDN-Chrome-radial-gradient2"
              cx="661.95"
              cy="258.49"
              r="22.17"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#3e2823" stopOpacity="0.2" />
              <stop offset="1" stopColor="#3e2823" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="CDN-Chrome-radial-gradient3"
              cx="682.94"
              cy="244.96"
              r="24.96"
              gradientTransform="matrix(1, 0, 0, -1, -583, 270)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#273339" stopOpacity="0.2" />
              <stop offset="1" stopColor="#273339" stopOpacity="0" />
            </radialGradient>
            <clipPath id="CDN-Route53-clip-path">
              <polygon className="cls-1" points="105.87 97.72 105.87 96.61 105.87 94.99 100.28 94.99 100.28 99.29 102.02 99.29 102.02 101.53 100.28 101.53 100.28 105.9 107.62 105.9 107.62 97.72 105.87 97.72" />
            </clipPath>
            <linearGradient id="CDN-Athena-linear-gradient" x1="-0.15" y1="275.15" x2="35.21" y2="239.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#523b97" />
              <stop offset="1" stopColor="#836aaf" />
            </linearGradient>
            <linearGradient id="CDN-Route53-linear-gradient" x1="74.85" y1="125.15" x2="110.21" y2="89.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#523b97" />
              <stop offset="1" stopColor="#836aaf" />
            </linearGradient>
            <linearGradient id="CDN-CloudFront-linear-gradient" x1="149.85" y1="125.15" x2="185.21" y2="89.79" gradientUnits="userSpaceOnUse" >
              <stop offset="0" stopColor="#523b97" />
              <stop offset="1" stopColor="#836aaf" />
            </linearGradient>
            <clipPath id="CDN-KinesisDataStream-clip-path">
              <path className="cls-1" d="M75,150v50h50V150Zm43,43.65h-8.67a8.67,8.67,0,1,1,0-17.34H118Z" />
            </clipPath>
            <linearGradient id="CDN-KinesisDataStream-linear-gradient" x1="74.85" y1="200.15" x2="110.21" y2="164.79" gradientUnits="userSpaceOnUse" >
              <stop offset="0" stopColor="#523b97" />
              <stop offset="1" stopColor="#836aaf" />
            </linearGradient>
            <linearGradient id="CDN-S31-linear-gradient" x1="149.85" y1="50.15" x2="185.21" y2="14.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1f6835" />
              <stop offset="1" stopColor="#6bad44" />
            </linearGradient>
            <linearGradient id="CDN-Lambda-linear-gradient" x1="-0.15" y1="200.15" x2="35.21" y2="164.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c85428" />
              <stop offset="1" stopColor="#f8981d" />
            </linearGradient>
            <linearGradient id="CDN-KinesisFireHose-linear-gradient" x1="149.85" y1="200.15" x2="185.21" y2="164.79" gradientUnits="userSpaceOnUse" >
              <stop offset="0" stopColor="#523b97" />
              <stop offset="1" stopColor="#836aaf" />
            </linearGradient>
            <clipPath id="CDN-Glue-clip-path">
              <path className="cls-1" d="M150,225v50h50V225Zm30.59,18.74H174.5v-5h6.09Z" />
            </clipPath>
            <linearGradient id="CDN-Glue-linear-gradient" x1="149.85" y1="275.15" x2="185.21" y2="239.79" gradientUnits="userSpaceOnUse" >
              <stop offset="0" stopColor="#523b97" />
              <stop offset="1" stopColor="#836aaf" />
            </linearGradient>
            <linearGradient id="CDN-DynamoDB-linear-gradient" x1="-0.15" y1="125.15" x2="35.21" y2="89.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3b3f99" />
              <stop offset="1" stopColor="#5c76ba" />
            </linearGradient>
            <linearGradient id="CDN-S32-linear-gradient" x1="74.85" y1="275.15" x2="110.21" y2="239.79" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1f6835" />
              <stop offset="1" stopColor="#6bad44" />
            </linearGradient>
          </defs>
          <animated.g id="chrome"
            style={ {
              position: `absolute`,
              transformOrigin: `50% 4.54545454545455%`,
              transform: props.x
                .to( { range: [min_x,  steps[0].start, steps[0].stop, max_x], output: [0, 0, 1, 1] } )
                .to( x => `scale(${ x }, ${ x }) rotate(-${ 90 - ( x * 90 ) }deg` )
            } }
          >
            <g clipPath={`url(#CDN-Chrome-clip-path1)`} >
              <path fill={`#dc4637`} d="M79,0V30.68H90.16l9.84-17h25V0Z" />
              <path fill={`url(#CDN-Chrome-linear-gradient1)`} d="M79,0V30.68H90.16l9.84-17h25V0Z" />
              <path fill={`#3e2823`} style={{ opacity:0.15 }} d="M90.43,30.57,79.11,11.16l-.16.29L90.18,30.71Z" />
              <path fill={`#0f9d58`} d="M75,50H98.8l11-11V30.68H90.16L75,4.68Z" />
              <path fill={`url(#CDN-Chrome-linear-gradient2)`} d="M75,50H98.8l11-11V30.68H90.16L75,4.68Z" />
              <path fill={`#273339`} style={{ opacity:0.15 }} d="M109.6,31.05l-.23-.14L98.46,50h.32l10.83-18.93Z" />
              <path fill={`#ffce41`} d="M100,13.64l9.84,17L98.8,50H125V13.64Z" />
              <path fill={`url(#CDN-Chrome-linear-gradient3)`} d="M100,13.64l9.84,17L98.8,50H125V13.64Z" />
              <g clipPath={`url(#CDN-Chrome-clip-path2)`} >
                <path fill={`#ffce41`} d="M100,13.64l9.84,17L98.8,50H125V13.64Z" />
                <path fill={`url(#CDN-Chrome-linear-gradient3)`} d="M100,13.64l9.84,17L98.8,50H125V13.64Z" />
              </g>
              <g clipPath={`url(#CDN-Chrome-clip-path3)`} >
                <path fill={`#dc4637`} d="M79,0V30.68H90.16l9.84-17h25V0Z" />
                <path fill={`url(#CDN-Chrome-linear-gradient1)`} d="M79,0V30.68H90.16l9.84-17h25V0Z" />
              </g>
            </g>
            <g clipPath={`url(#CDN-Chrome-clip-path1)`} >
              <path fill={`url(#CDN-Chrome-radial-gradient1)`} d="M100,13.64v5.95l22.27-5.95Z" />
            </g>
            <g clipPath={`url(#CDN-Chrome-clip-path1)`} >
              <g clipPath={`url(#CDN-Chrome-clip-path4)`} >
                <path fill={`#0f9d58`} d="M75,50H98.8l11-11V30.68H90.16L75,4.68Z" />
                <path fill={`url(#CDN-Chrome-linear-gradient2)`} d="M75,50H98.8l11-11V30.68H90.16L75,4.68Z" />
              </g>
            </g>
            <g clipPath={`url(#CDN-Chrome-clip-path1)`} >
              <path fill={`url(#CDN-Chrome-radial-gradient2)`} d="M79,11.49,95.23,27.75l-5.07,2.93Z" />
            </g>
            <g clipPath={`url(#CDN-Chrome-clip-path1)`} >
              <path fill={`url(#CDN-Chrome-radial-gradient3)`} d="M98.82,50l6-22.21,5.07,2.92Z" />
            </g>
            <g clipPath={`url(#CDN-Chrome-clip-path1)`} >
              <circle fill={`#f2f2f2`} cx="100" cy="25" r="11.36" />
              <circle fill={`#557ebf`} cx="100" cy="25" r="9.09" />
              <path fill={`#3e2823`} style={{ opacity:0.2 }} d="M100,13.35A11.36,11.36,0,0,0,88.64,24.72V25A11.35,11.35,0,0,1,100,13.64h25v-.29Z" />
              <path fill={`#fff`} style={{ opacity:0.1 }} d="M109.83,30.68a11.35,11.35,0,0,1-19.66,0h0L75,4.68V5L90.17,31a11.35,11.35,0,0,0,19.66,0h0v-.29Z" />
              <path fill={`#3e2823`} style={{ opacity:0.1, isolation:`isolate` }} d="M100.28,13.64h-.14a11.36,11.36,0,0,1,0,22.72h.14a11.36,11.36,0,1,0,0-22.72Z" />
              <path fill={`#fff`} style={{ opacity:0.2 }} d="M109.94,31.05a11.24,11.24,0,0,0,1.53-5.67,11.42,11.42,0,0,0-.53-3.43,11.29,11.29,0,0,1-1.1,8.71v0L98.8,50h.33Z" />
              <path fill={`#fff`} style={{ opacity:0.2 }} d="M100,.28a25,25,0,0,1,25,24.86V25a25,25,0,0,0-50,0v.14A25,25,0,0,1,100,.28Z" />
              <path fill={`#3e2823`} style={{ opacity:0.15 }} d="M100,49.72a25,25,0,0,0,25-24.86V25a25,25,0,0,1-50,0v-.14a25,25,0,0,0,25,24.86Z" />
            </g>
          </animated.g>
          <g id="Route53">
            <animated.rect
              style={ {
                position: `absolute`,
                transformOrigin: `50% 31.8181818181818%`,
                transform: props.x
                  .to( { range: [min_x,  steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => `scale(${ x }, ${ x })` )
              } }
              fill={`url(#CDN-Route53-linear-gradient)`} x="75" y="75" width="50" height="50"
            />
            <animated.g
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
              fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
            >
              <path className="cls-3" d="M100,88.29s4.48,3.43,10.7.24l.94,1.14a8.82,8.82,0,0,0-1.64,5,12.29,12.29,0,0,0,2,7.23c2,3,1.71,5.35-1.35,6.8-1.58.75-6.51,1-10.6,3.86-4.09-2.84-9-3.11-10.6-3.86-3.06-1.45-3.32-3.81-1.35-6.8a12.29,12.29,0,0,0,2-7.23,8.82,8.82,0,0,0-1.64-5l.94-1.14C95.52,91.72,100,88.29,100,88.29Z" />
              <path className="cls-3" d="M100,83.24s-5,6.32-11.31.33l-5,6c2.11,2.51,2.58,3.75,2.74,5.32.23,2.32-1.29,4.45-2.8,7.59-1.32,2.74-.27,7.12,3.59,9.06,4.85,2.45,6.42.94,12.79,5.2,6.37-4.26,7.94-2.75,12.79-5.2,3.86-1.94,4.91-6.32,3.59-9.06-1.51-3.14-3-5.27-2.8-7.59.16-1.57.63-2.81,2.74-5.32l-5-6C105,89.56,100,83.24,100,83.24Z" />
              <path className="cls-3" d="M98.73,96.61H94.84L94.68,100s4-.46,3.92,1.81c-.17,3.59-4.68,2-4.68,2" />
              <g clipPath={`url(#CDN-Route53-clip-path)`}>
                <path className="cls-3" d="M100.94,96.61h4.71l-3.56,3.66s3.32-.46,3.39,1.87c.09,3.1-4.54,1.62-4.54,1.62" />
              </g>
            </animated.g>

            <animated.g id="ArrowJ"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="104.69" y1="50" x2="104.69" y2="69.62" />
              <polygon fill={fill} points="100.95 68.52 104.69 75 108.43 68.52 100.95 68.52" />
            </animated.g>

            <g id="CloudFront">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `87.5% 31.8181818181818%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-CloudFront-linear-gradient)`} className="cls-9" x="150" y="75" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <circle className="cls-3" cx="175" cy="100" r="16.86" />
                <circle className="cls-3" cx="167.08" cy="98.57" r="2.5" />
                <circle className="cls-3" cx="176.72" cy="88.74" r="2.5" />
                <circle className="cls-3" cx="182.56" cy="107.57" r="2.5" />
                <path className="cls-3" d="M169.11,94.76a21.53,21.53,0,0,1,3.81-4.33" />
                <path className="cls-3" d="M166.93,114.81a21.8,21.8,0,0,1-1.49-7.94,21.17,21.17,0,0,1,.39-4.09" />
                <path className="cls-3" d="M180.1,86.25a20.66,20.66,0,0,1,3.31-.87" />
                <path className="cls-3" d="M179.52,91.81a22.11,22.11,0,0,1,3.81,11.61" />
                <path className="cls-3" d="M170,83.9a22.37,22.37,0,0,1,3.6,2" />
                <path className="cls-3" d="M182,111.83a22.4,22.4,0,0,1-2.12,4.31" />
                <path className="cls-3" d="M158.14,99.1a22.25,22.25,0,0,1,4.66-.79" />
                <path className="cls-3" d="M184.36,111.27a20.87,20.87,0,0,1,.85,2.15" />
                <path className="cls-3" d="M171.25,99.43a22.09,22.09,0,0,1,8.36,5.1" />
              </animated.g>
            </g>
            <animated.g id="ArrowG"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="125" y1="95.95" x2="144.62" y2="95.95" />
              <polygon fill={fill} points="143.52 99.69 150 95.95 143.52 92.21 143.52 99.69" />
            </animated.g>
            <g id="S31">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `87.5% 4.54545454545455%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-S31-linear-gradient)`} x="150" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <ellipse className="cls-6" cx="174.05" cy="12.84" rx="15.46" ry="4.62" />
                <path className="cls-12" d="M158.59,12.84l3.88,26.7a30.77,30.77,0,0,0,23.15,0l3.88-26.7" />
                <circle className="cls-17" cx="174.06" cy="21.67" r="0.97" />
                <path className="cls-12" d="M174.06,21.67C179,25,199.26,31.79,187.87,24.1" />
              </animated.g>
            </g>
            <g id="Kinesis_Data_Stream" data-name="Kinesis Data Stream">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `50% 59.0909090909091%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-KinesisDataStream-linear-gradient)`} x="75" y="150" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <circle className="cls-3" cx="109.36" cy="184.98" r="6.88" />
                <line className="cls-3" x1="105.62" y1="181.26" x2="109.36" y2="181.26" />
                <line className="cls-3" x1="107.49" y1="183.76" x2="109.36" y2="183.76" />
                <line className="cls-3" x1="103.02" y1="183.76" x2="106.26" y2="183.76" />
                <line className="cls-3" x1="103.65" y1="188.74" x2="105.62" y2="188.74" />
                <line className="cls-3" x1="112.51" y1="188.74" x2="115.07" y2="188.74" />
                <line className="cls-3" x1="112.51" y1="186.25" x2="116.24" y2="186.25" />
                <line className="cls-3" x1="102.6" y1="186.25" x2="105.59" y2="186.25" />
                <rect className="cls-4" x="111.21" y="180.59" width="3.14" height="3.14" />
                <rect className="cls-4" x="107.49" y="186.26" width="3.14" height="3.14" />
                <g clipPath={`url(#CDN-KinesisDataStream-clip-path)`}>
                  <path className="cls-3" d="M116.86,170.05c-12.43,0-19.18-1.41-23.49-5.4-1.79-1.67-2.17-5.29-2.17-7.16" />
                  <path className="cls-3" d="M116.86,172.47c-12.43,0-22.89-1.3-27.12-5.42a7.64,7.64,0,0,1-2.28-5.79" />
                  <path className="cls-3" d="M116.86,175c-12.43,0-24-1.08-29-3.78-3.31-1.77-4.14-3-4.13-5" />
                  <path className="cls-3" d="M116.86,180c-12.43,0-19.18,1.41-23.49,5.4-1.79,1.67-2.17,5.29-2.17,7.16" />
                  <path className="cls-3" d="M116.86,177.53c-12.43,0-22.89,1.3-27.12,5.42a7.64,7.64,0,0,0-2.28,5.79" />
                  <path className="cls-3" d="M116.86,175c-12.43,0-24,1.08-29,3.78-3.31,1.77-4.14,3-4.13,5" />
                </g>
              </animated.g>
            </g>
            <animated.g id="ArrowB"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[9].start, steps[9].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <polyline fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} points="175.43 125 175.43 137.16 100 137.16 100 144.62" />
              <polygon fill={fill} points="96.26 143.52 100 150 103.74 143.52 96.26 143.52" />
            </animated.g>
            <animated.g id="ArrowE"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[9].start, steps[9].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="171.43" y1="75" x2="171.43" y2="55.38" />
              <polygon fill={fill} points="175.17 56.48 171.43 50 167.69 56.48 175.17 56.48" />
            </animated.g>

            <g id="Lambda">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `12.5% 59.0909090909091%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[10].start, steps[10].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-Lambda-linear-gradient)`} className="cls-10" y="150" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[11].start, steps[11].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <polygon className="cls-11" points="8.7 192 17.82 192 22.93 181.23 18.29 171.95 8.7 192" />
                <polygon className="cls-12" points="14.28 158.11 14.28 165.5 19.86 165.5 32.6 192 41.17 192 41.17 184.45 37.71 184.45 25.29 158.11 14.28 158.11" />
              </animated.g>
            </g>

            <g id="Kinesis_Firehose" data-name="Kinesis Firehose">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `87.5% 59.0909090909091%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[10].start, steps[10].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-KinesisFireHose-linear-gradient)`} x="150" y="150" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[11].start, steps[11].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <path className="cls-4" d="M184,177a20.88,20.88,0,0,1,7.32,1.25" />
                <path className="cls-4" d="M184,175a33.65,33.65,0,0,1,7.32,1.25" />
                <path className="cls-4" d="M184,173a20.88,20.88,0,0,0,7.32-1.25" />
                <path className="cls-4" d="M184,175a33.65,33.65,0,0,0,7.32-1.25" />
                <polygon className="cls-4" points="181.96 172.48 181.96 177.52 174.63 179.36 174.52 170.64 181.96 172.48" />
                <path className="cls-4" d="M171.52,179.37c-1.68-.09-12.09.61-12.08,7.79v3.44" />
                <path className="cls-4" d="M171.52,177.52c-5.93,0-10.44,1.48-11.86,2.46" />
                <path className="cls-4" d="M171.52,175s-11,.63-12.56,1.25" />
                <path className="cls-4" d="M171.52,170.63c-1.68.09-12.09-.61-12.08-7.79V159.4" />
                <path className="cls-4" d="M171.52,172.48c-5.93,0-10.44-1.48-11.86-2.46" />
                <path className="cls-4" d="M171.52,175s-11-.63-12.56-1.25" />
                <rect className="cls-4" x="171.52" y="169.43" width="3" height="11.25" />
              </animated.g>
            </g>

            <animated.g id="ArrowC"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[12].start, steps[12].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="125" y1="175.06" x2="144.62" y2="175.06" />
              <polygon fill={fill} points="143.52 178.79 150 175.06 143.52 171.32 143.52 178.79" />
            </animated.g>

            <animated.g id="ArrowA"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[12].start, steps[12].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="75" y1="175.05" x2="55.38" y2="175.05" />
              <polygon fill={fill} points="56.48 171.31 50 175.05 56.48 178.79 56.48 171.31" />
            </animated.g>
            <animated.g id="ArrowF"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[12].start, steps[12].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="179.43" y1="50" x2="179.43" y2="69.62" />
              <polygon fill={fill} points="175.69 68.52 179.43 75 183.17 68.52 175.69 68.52" />
            </animated.g>

            <g id="Glue">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `87.5% 86.3636363636364%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[13].start, steps[13].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-Glue-linear-gradient)`} className="cls-22" x="150" y="225" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[14].start, steps[14].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <path className="cls-4" d="M165.56,243.82l7.51,11.83v1.79c0,.21.87.38,1.93.38a5.36,5.36,0,0,0,1.93-.38v-1.79l7.51-11.91" />
                <g clipPath={`url(#CDN-Glue-clip-path)`}>
                  <ellipse className="cls-4" cx="175" cy="243.74" rx="9.44" ry="1.57" />
                </g>
                <polyline className="cls-4" points="173.78 260.02 173.78 262.51 171.26 262.51 175 266.14 178.74 262.51 176.22 262.51 176.22 260.02" />
                <rect className="cls-4" x="169.97" y="237.45" width="2.55" height="2.55" />
                <rect className="cls-4" x="175" y="233.73" width="2.55" height="2.55" />
                <rect className="cls-4" x="176.27" y="240" width="2.55" height="2.55" />
              </animated.g>
            </g>

            <g id="DynamoDB">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `12.5% 31.8181818181818%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[13].start, steps[13].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-DynamoDB-linear-gradient)`} y="75" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[14].start, steps[14].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <polygon className="cls-11" points="27.56 86.95 23.13 95.63 28.08 95.63 23.74 109.27 39.21 93.18 34.37 93.18 36.95 86.95 27.56 86.95" />
                <path className="cls-6" d="M23.78,101.42q-.93.06-1.89.06c-6.28,0-11.37-2-11.37-4.35A2.78,2.78,0,0,1,12,95" />
                <path className="cls-6" d="M33.24,102.81c-.13,1-1.2,2-2.9,2.71" />
                <path className="cls-6" d="M33.25,102.6a1.48,1.48,0,0,1,0,.21" />
                <path className="cls-6" d="M22.18,107h-.29c-6.28,0-11.37-1.95-11.37-4.36" />
                <path className="cls-6" d="M15.61,103.71a12.82,12.82,0,0,1-3.15-1.19" />
                <line className="cls-6" x1="10.52" y1="97.13" x2="10.52" y2="102.6" />
                <path className="cls-6" d="M22.39,91.65h-.5c-6.28,0-11.37-2-11.37-4.36s5.09-4.35,11.37-4.35a22.69,22.69,0,0,1,8.4,1.42" />
                <path className="cls-6" d="M20.54,97.1c-5.65-.26-10-2.1-10-4.33" />
                <path className="cls-6" d="M15.61,93.88a12.81,12.81,0,0,1-3.15-1.2" />
                <line className="cls-6" x1="10.52" y1="87.29" x2="10.52" y2="92.77" />
                <path className="cls-6" d="M31.73,104.78A2.8,2.8,0,0,1,33.25,107c0,2.41-5.09,4.36-11.36,4.36S10.52,109.37,10.52,107A2.8,2.8,0,0,1,12,104.78" />
                <path className="cls-6" d="M33.25,112.44c0,2.4-5.09,4.35-11.36,4.35s-11.37-2-11.37-4.35" />
                <path className="cls-6" d="M15.61,113.55a13.22,13.22,0,0,1-3.15-1.2" />
                <line className="cls-6" x1="10.52" y1="106.96" x2="10.52" y2="112.44" />
                <line className="cls-6" x1="33.25" y1="106.96" x2="33.25" y2="112.44" />
              </animated.g>
            </g>

            <animated.g id="ArrowK"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[15].start, steps[15].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="25" y1="150" x2="25" y2="130.38" />
              <polygon fill={fill} points="28.74 131.48 25 125 21.26 131.48 28.74 131.48" />
            </animated.g>
            <animated.g id="ArrowM"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[15].start, steps[15].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="175" y1="200" x2="175" y2="219.62" />
              <polygon fill={fill} points="171.26 218.52 175 225 178.74 218.52 171.26 218.52" />
            </animated.g>
            <animated.g id="ArrowH"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[15].start, steps[15].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="150" y1="104.05" x2="130.38" y2="104.05" />
              <polygon fill={fill} points="131.48 100.31 125 104.05 131.48 107.79 131.48 100.31" />
            </animated.g>

            <g id="S32">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `50% 86.3636363636364%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[16].start, steps[16].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-S32-linear-gradient)`} x="75" y="225" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[17].start, steps[17].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <ellipse className="cls-6" cx="99.05" cy="237.84" rx="15.46" ry="4.62" />
                <path className="cls-12" d="M83.59,237.84l3.88,26.7a27.33,27.33,0,0,0,11.58,2.26,27.28,27.28,0,0,0,11.57-2.26l3.88-26.7" />
                <circle className="cls-17" cx="99.06" cy="246.67" r="0.97" />
                <path className="cls-12" d="M99.06,246.67c4.92,3.33,25.2,10.12,13.81,2.43" />
              </animated.g>
            </g>

            <animated.g id="ArrowD"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[18].start, steps[18].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="150" y1="250" x2="130.38" y2="250" />
              <polygon fill={fill} points="131.48 246.26 125 250 131.48 253.74 131.48 246.26" />
            </animated.g>
            <animated.g id="ArrowI"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[18].start, steps[18].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="96.69" y1="75" x2="96.69" y2="55.38" />
              <polygon fill={fill} points="100.43 56.48 96.69 50 92.95 56.48 100.43 56.48" />
            </animated.g>

            <g id="Athena">
              <animated.rect
                style={ {
                  position: `absolute`,
                  transformOrigin: `12.5% 86.3636363636364%`,
                  transform: props.x
                    .to( { range: [min_x,  steps[19].start, steps[19].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => `scale(${ x }, ${ x })` )
                } }
                fill={`url(#CDN-Athena-linear-gradient)`} y="225" width="50" height="50"
              />
              <animated.g
                style={ {
                  opacity: props.x
                    .to( { range: [min_x, steps[20].start, steps[20].stop, max_x], output: [0, 0, 1, 1] } )
                    .to( x => x ),
                } }
                fill={`none`} stroke={`#fff`} strokeLinejoin={`round`} strokeWidth={1.5}
              >
                <ellipse className="cls-3" cx="24.16" cy="242.99" rx="5.76" ry="1.72" />
                <path className="cls-4" d="M18.4,243l1.45,10a10.28,10.28,0,0,0,4.31.84,10.33,10.33,0,0,0,4.32-.84l1.45-10" />
                <circle className="cls-5" cx="24.17" cy="246.28" r="0.36" />
                <path className="cls-4" d="M24.17,246.28c1.83,1.24,9.4,3.78,5.15.91" />
                <circle className="cls-3" cx="23.67" cy="247.31" r="10.34" />
                <path className="cls-3" d="M10.7,241.69a14.13,14.13,0,1,1,.64,12.53" />
                <path className="cls-6" d="M31.48,259.33l.85.85L39,266.85l0,0a2.53,2.53,0,0,0,1.57.54,2.59,2.59,0,0,0,2.58-2.58,2.55,2.55,0,0,0-.53-1.56h0l-7.56-7.56" />
                <line className="cls-3" x1="13.8" y1="244.22" x2="8.18" y2="244.22" />
                <line className="cls-3" x1="14.36" y1="251.81" x2="8.18" y2="251.81" />
                <line className="cls-3" x1="13.33" y1="248.04" x2="6.91" y2="248.04" />
              </animated.g>
            </g>
            <animated.g id="ArrowL"
              style={ {
                opacity: props.x
                  .to( { range: [min_x, steps[21].start, steps[21].stop, max_x], output: [0, 0, 1, 1] } )
                  .to( x => x ),
              } }
            >
              <line fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`3px`} x1="75" y1="250" x2="55.38" y2="250" />
              <polygon fill={fill} points="56.48 246.26 50 250 56.48 253.74 56.48 246.26" />
            </animated.g>
          </g>
        </svg>
      ) }
    </Spring>
  </div>
}