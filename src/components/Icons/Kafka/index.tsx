/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const fill = `var(--color-text)`
const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1, 1, 1] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.circle 
            style={{
              position: `absolute`,
              transformOrigin: `31.11275% 38.387%`,
              transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})`)
            }}
            fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`4.5px`} cx="62.23" cy="38.39" r="6.08" 
          />
          <a.circle 
            style={{
              position: `absolute`,
              transformOrigin: `31.11565% 61.6269%`,
              transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})`)
            }}
            fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`4.5px`} cx="62.23" cy="61.63" r="6.08" 
          />
          <a.circle 
            style={{
              position: `absolute`,
              transformOrigin: `21.21175% 73.2477%`,
              transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})`)
            }}
            fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`4.5px`} cx="42.42" cy="73.25" r="6.08" 
          />
          <a.circle 
            style={{
              position: `absolute`,
              transformOrigin: `21.21785% 26.7493%`,
              transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})`)
            }}
            fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`4.5px`} cx="42.44" cy="26.75" r="6.08" 
          />
          <a.circle 
            style={{
              position: `absolute`,
              transformOrigin: `21.21175% 50.0079%`,
              transform: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})`)
            }}
            fill={`none`} stroke={fill} strokeMiterlimit={10} strokeWidth={`4.75px`} cx="42.42" cy="50.01" r="8" 
          />
          <a.line 
            // 8.689998626708984
            strokeDashoffset={ props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [8.689998626708984, 8.689998626708984, 0, 0] ) }
            strokeDasharray={`8.689998626708984`} 
            fill={`none`} 
            stroke={fill} 
            strokeMiterlimit={10} 
            strokeWidth={`3.5px`} 
            x1="42.44" y1="32.82" x2="42.44" y2="41.51" 
          />
          <a.line
            // 8.65999984741211
            strokeDashoffset={ props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [8.65999984741211, 8.65999984741211, 8.65999984741211*2, 8.65999984741211*2] ) }
            strokeDasharray={`8.65999984741211`}
            fill={`none`} 
            stroke={fill} 
            strokeMiterlimit={10} 
            strokeWidth={`3.5px`}
            x1="42.42" y1="58.51" x2="42.42" y2="67.17" 
          />
          <a.line 
            // 8.396003723144531
            strokeDashoffset={ props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [8.396003723144531, 8.396003723144531, 8.396003723144531*2, 8.396003723144531*2] ) }
            strokeDasharray={`8.396003723144531`}
            fill={`none`} 
            stroke={fill} 
            strokeMiterlimit={10} 
            strokeWidth={`3.5px`} 
            x1="49.75" y1="54.31" x2="57.02" y2="58.51" 
          />
          <a.line
            // 8.387348175048828 
            strokeDashoffset={ props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [8.387348175048828, 8.387348175048828 , 0, 0] ) }
            strokeDasharray={`8.387348175048828 `}
            fill={`none`} 
            stroke={fill} 
            strokeMiterlimit={10} 
            strokeWidth={`3.5px`}
            x1="56.36" y1="41.83" x2="49.1" y2="46.03" 
          />
          <a.g
            style={{opacity: props.x.to([min_x, max_x], [0,1])}}
          >
            <polyline fill={fill} points="82.44 37.76 86.69 37.76 86.69 50.96 92.81 44.06 97.92 44.06 90.53 52.05 97.93 62.16 93.06 62.16 86.68 53.12 86.68 62.16 82.43 62.16 82.43 37.74" />
            <path fill={fill} d="M113.63,44v2.65a6.6,6.6,0,0,0-6-3.2c-5,0-9,3.89-9,9.6,0,5.11,3.34,9.63,9,9.63a6.6,6.6,0,0,0,6-3.16v2.6h4.25V44ZM113,55.8a5,5,0,0,1-4.74,2.9,5.4,5.4,0,0,1-5.42-5.52h0v0a5.4,5.4,0,0,1,5.38-5.64,5.22,5.22,0,0,1,5,3.19,5.92,5.92,0,0,1,.49,2.55A6.49,6.49,0,0,1,113,55.8Z" />
            <path fill={fill} d="M122.7,47.38h-2.19V44.05h2.19V43c0-5.39,4-5.71,7.07-5.75v3.33c-1.07,0-2.82,0-2.82,2.55V44h2.82v3.34H127V62.16H122.7V47.38" />
            <polyline fill={fill} points="132.67 37.74 136.92 37.74 136.92 50.94 143.05 44.05 148.16 44.05 140.76 52.04 148.17 62.16 143.31 62.16 136.92 53.12 136.92 62.16 132.67 62.16 132.67 37.74" />
            <path fill={fill} d="M163.86,44v2.65a6.59,6.59,0,0,0-6-3.2c-5,0-9,3.89-9,9.6,0,5.11,3.34,9.63,9,9.63a6.6,6.6,0,0,0,6-3.16v2.6h4.25V44Zm-.62,11.76a5.07,5.07,0,0,1-4.74,2.9,5.4,5.4,0,0,1-5.42-5.52h0v0a5.41,5.41,0,0,1,5.38-5.64,5.2,5.2,0,0,1,5,3.19,5.77,5.77,0,0,1,.49,2.55A6.33,6.33,0,0,1,163.24,55.8Z" />
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}