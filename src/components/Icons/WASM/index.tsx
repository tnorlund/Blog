/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.g style={ { opacity: props.x.to( { range: [min_x, max_x], output: [0, 1] } ) } }>
            <path fill={`#605eaa`} d="M105.72,25v.27a5.74,5.74,0,0,1-11.47,0h0V25H75V75h50V25Z" />
            <path fill={`#fff`} d="M86.61,52h3.32l2.26,12h0L95,52h3.1l2.46,12.19h0L103.13,52h3.25l-4.22,17.7H98.87L96.44,57.6h-.07L93.76,69.65H90.42Zm23.51,0h5.22l5.19,17.7h-3.42L116,65.71h-6l-.87,3.94h-3.33Zm2,4.36-1.45,6.49h4.5l-1.66-6.49Z" />
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}