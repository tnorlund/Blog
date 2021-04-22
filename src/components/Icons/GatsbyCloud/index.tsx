/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const darkMode = false

const fill = darkMode ? `#e5e5e5` :  `#201e1f`
const background = darkMode ? `#21262d` : `#f8eee0`
const purple = `#663795`
const blue = `#4595d1`
const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [3, 1, 1] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <defs>
            <clipPath id="gatsby-clip-path">
              <rect fill={`none`} className="cls-1" x="13.35" y="23.01" width="53.98" height="53.98"/>
            </clipPath>
            <linearGradient id="gatsby-linear-gradient" x1="58.14" y1="-171.02" x2="35.4" y2="-171.02" gradientTransform="matrix(1, 0, 0, -1, 0, -124.09)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={purple}/>
              <stop offset="1" stopColor={blue}/>
            </linearGradient>
          </defs>
          <g clipPath={`url(#gatsby-clip-path)`}>
            <a.g
              style={ { opacity: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, 1, 1] ) } }
            >
              <circle fill={`#4696d2`} className="cls-3" cx="29.8" cy="40.62" r="7.59"/>
              <circle fill={background} className="cls-4" cx="28.21" cy="51.83" r="6.79"/>
              <circle fill={background} className="cls-4" cx="45.38" cy="46.88" r="12.11"/>
              <rect fill={background} className="cls-4" x="28.21" y="51.87" width="18.46" height="6.75"/>
              <circle fill={background} className="cls-4" cx="32.83" cy="46.16" r="2.23"/>
              <path fillRule={`evenodd`} fill={`url(#gatsby-linear-gradient)`} className="cls-5" d="M54.78,40.75a11.42,11.42,0,0,0-9.52-5.11c-5.8,0-10.17,4.39-10.75,8.13a3.42,3.42,0,0,1-1,2,1.56,1.56,0,0,1-1.22.3,3.85,3.85,0,0,1-.79-.26,5.37,5.37,0,0,0-2.4-.48,6.4,6.4,0,1,0,0,12.79h7.64a17.1,17.1,0,0,0,.43,3.22H29.08a9.61,9.61,0,1,1,0-19.21,10.09,10.09,0,0,1,2.28.27,14.48,14.48,0,0,1,27.1-.94A16.64,16.64,0,0,0,54.78,40.75Z"/>
              <circle fill={`#4595d1`} className="cls-6" cx="31.93" cy="27.82" r="2.13"/>
              <circle fill={`#4595d1`} className="cls-6" cx="17.01" cy="40.62" r="2.13"/>
              <circle fill={`#4595d1`} className="cls-6" cx="21.27" cy="29.96" r="2.13"/>
            </a.g>
            <a.circle
              name={`GatsbyCircle`}
              style={ {
                position: `absolute`,
                transformOrigin: `26.8361% 57.7056%`,
                transform: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
              } }
              fill={purple} cx="53.67" cy="57.71" r="13.5"
            />
            <a.g
              style={ { opacity: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ) } }
              fill={`white`}
            >
              <path className="cls-4" d="M64.28,57.71H57.53v1.92h4.62a8.7,8.7,0,0,1-5.59,6.27L45.48,54.81A8.67,8.67,0,0,1,53.67,49a8.93,8.93,0,0,1,7.14,3.66l1.44-1.25a10.59,10.59,0,0,0-18.89,4L56.08,68.12A10.85,10.85,0,0,0,64.28,57.71Z"/>
              <path className="cls-4" d="M43.07,57.8a10.33,10.33,0,0,0,3.08,7.33,10.5,10.5,0,0,0,7.33,3.08Z"/>
            </a.g>
          </g>
          <a.g
            style={ { opacity: props.x.to( [min_x, max_x], [0, 1] ) } }
            fill={fill}
          >
            <path className="cls-8" d="M93.19,59.28a10.75,10.75,0,0,1-5.13,1.25,12.48,12.48,0,0,1-9.15-3.38,12.48,12.48,0,0,1,0-17.6A12.35,12.35,0,0,1,87.6,36.2a14,14,0,0,1,5.59,1.29v6.22a7.38,7.38,0,0,0-5.45-2.48A6.54,6.54,0,0,0,83,43a7.45,7.45,0,0,0-2.2,5.38,7,7,0,0,0,2,5.13,7.08,7.08,0,0,0,5,2,7.36,7.36,0,0,0,5.34-2.41Z"/>
            <path className="cls-8" d="M102.06,34.56V60H97V34.56Z"/>
            <path className="cls-8" d="M121.29,58a10.48,10.48,0,0,1-13.61,0,8.35,8.35,0,0,1,0-11.59,10.48,10.48,0,0,1,13.61,0,8.35,8.35,0,0,1,0,11.59Zm-9.63-8.73a4.32,4.32,0,0,0,0,5.87,3.86,3.86,0,0,0,2.86,1.12,3.81,3.81,0,0,0,2.79-1.12,4.29,4.29,0,0,0,0-5.87,4.15,4.15,0,0,0-5.65,0Z"/>
            <path className="cls-8" d="M131.8,44.44V53a3.25,3.25,0,0,0,.88,2.51,2.9,2.9,0,0,0,2.09.74,3.11,3.11,0,0,0,2.13-.74,3.4,3.4,0,0,0,.84-2.51V44.44h5v9.08a6.25,6.25,0,0,1-1.74,5c-1.78,1.75-4.4,2-6.25,2s-4.5-.27-6.28-2a5.94,5.94,0,0,1-1.71-4.68V44.44Z"/>
            <path className="cls-8" d="M163.64,60h-5V58.13a5.53,5.53,0,0,1-4.92,2.4,7,7,0,0,1-5.34-2.13,8.71,8.71,0,0,1-2.44-6.24A8.32,8.32,0,0,1,148.35,46a7.84,7.84,0,0,1,5.41-2.09,5.8,5.8,0,0,1,4.85,2.27V34.56h5ZM152.3,49.29a4,4,0,0,0-1.23,3,3.91,3.91,0,0,0,1.23,2.86,3.8,3.8,0,0,0,2.61,1.09,4.31,4.31,0,0,0,2.87-1.16,3.8,3.8,0,0,0,1.15-2.79,4,4,0,0,0-1.12-2.86A3.67,3.67,0,0,0,155,48.25,3.62,3.62,0,0,0,152.3,49.29Z"/>
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}