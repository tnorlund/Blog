/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

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
          <a.g style={ { opacity: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ) } } >
            <polygon fill={`#435ba9`} points="125.13 21.5 120.55 72.79 99.97 78.5 79.44 72.8 74.87 21.5 125.13 21.5" />
            <polygon fill={`#4767b0`} points="116.63 69.53 120.54 25.7 100 25.7 100 74.14 116.63 69.53" />
            <polygon fill={`#ebebeb`} points="85.36 44.72 85.92 51.01 100 51.01 100 44.72 85.36 44.72" />
            <polygon fill={`#ebebeb`} points="100 31.99 99.98 31.99 84.22 31.99 84.8 38.28 100 38.28 100 31.99" />
            <polygon fill={`#ebebeb`} points="100 67.61 100 61.06 99.97 61.07 92.97 59.18 92.52 54.16 89.11 54.16 86.2 54.16 87.08 64.04 99.97 67.62 100 67.61" />
            <polygon fill={`#fff`} points="107.73 51.01 107 59.17 99.98 61.07 99.98 67.61 112.88 64.04 112.97 62.98 114.45 46.41 114.6 44.72 115.74 31.99 99.98 31.99 99.98 38.28 108.84 38.28 108.27 44.72 99.98 44.72 99.98 51.01 107.73 51.01" />
          </a.g>
          <a.g style={ { opacity: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, 1, 1] ) } } >
            <rect fill={`#f6df19`} x="134.71" y="25" width="50" height="50" />
            <path fill={`#010101`} d="M168.3,64.06a5.12,5.12,0,0,0,4.63,2.86c1.95,0,3.2-1,3.2-2.32,0-1.61-1.28-2.18-3.43-3.12l-1.17-.5c-3.39-1.45-5.64-3.26-5.64-7.08,0-3.53,2.68-6.21,6.88-6.21a6.94,6.94,0,0,1,6.68,3.76l-3.66,2.35a3.19,3.19,0,0,0-3-2,2,2,0,0,0-2.25,2c0,1.41.87,2,2.89,2.85l1.17.51c4,1.71,6.25,3.45,6.25,7.38,0,4.23-3.32,6.55-7.79,6.55s-7.18-2.08-8.56-4.81Zm-16.6.41c.74,1.31,1.41,2.42,3,2.42s2.51-.61,2.51-3V48h4.7V64c0,4.86-2.85,7.08-7,7.08a7.3,7.3,0,0,1-7.05-4.29Z" />
          </a.g>
          <a.g style={ { opacity: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [0, 0, 1, 1] ) } } >
            <path fill={`#e44f26`} d="M19.73,72.82,15.15,21.5H65.42L60.85,72.79,40.25,78.5" />
            <path fill={`#f1672a`} d="M40.29,74.14V25.71H60.83L56.91,69.49" />
            <path fill={`#ebebeb`} d="M24.49,32h15.8v6.29h-8.9L32,44.72h8.32V51H26.21m.28,3.16h6.32l.44,5,7,1.88v6.57L27.37,64" />
            <path fill={`#fff`} d="M56,32H40.26v6.29H55.44m-.56,6.44H40.26V51H48l-.74,8.18-7,1.88v6.54L53.14,64" />
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}