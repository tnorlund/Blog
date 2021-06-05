/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const fill = `var(--color-text)`
const red = `#ee3449`
const blue = `#4883c4`
const green = `#91ca68`

const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [3, 2, 1] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.path
            style={ {
              position: `absolute`,
              transformOrigin: `13.4065% 64.0859%`,
              transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x}) rotate(-${ 180 - ( x * 180 ) }deg)` )
            } }
            fill={green} d="M26.82,78.25a14.21,14.21,0,1,1,7.1-26.5l-4.27,7.38a5.57,5.57,0,0,0-2.83-.77,5.69,5.69,0,1,0,5.68,5.69H41A14.22,14.22,0,0,1,26.82,78.25Z"
          />
          <a.path
            style={ {
              position: `absolute`,
              transformOrigin: `21.5715% 36.0002%`,
              transform: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x}) rotate(${180 - ( x * 180 ) }deg)` )
            } }
            fill={red} d="M36,48.25a14.22,14.22,0,1,1,14.2,0L46,40.87A5.68,5.68,0,0,0,46,31a5.69,5.69,0,0,0-5.69,9.85Z"
          />
          <a.path
            style={ {
              position: `absolute`,
              transformOrigin: `29.82135% 64.0859%`,
              transform: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x}) rotate(-${ 180 - ( x * 180 ) }deg)` )
            } }
            fill={blue} d="M59.62,78.25a14.19,14.19,0,0,1-7.07-26.5l4.25,7.38a5.58,5.58,0,0,0-2.08,2.07,5.69,5.69,0,1,0,7.77-2.08l4.26-7.38a14.21,14.21,0,0,1-7.13,26.51Z"
          />
          <a.g
            fill={fill}
            style={ { opacity: props.x.to( [min_x, max_x], [0, 1] ) } }
          >
            <path className="cls-4" d="M78.58,46.79c0-7.74,1.23-11.73,9.63-11.73s9.63,4,9.63,11.73-1.26,11.64-9.63,11.64S78.58,54.53,78.58,46.79Zm15.6-1.2c0-5.7-.93-8-6-8s-6,2.25-6,8V48c0,5.67.93,7.92,6,7.92s6-2.25,6-7.92Z"/>
            <path className="cls-4" d="M100.93,64.94V42.2H104v2.19c1.2-1.86,2.91-2.49,5.37-2.49,5.7,0,5.7,4.11,5.7,8.67s0,7.86-5.49,7.86A6.23,6.23,0,0,1,104.2,56v8.94Zm3.27-13c0,2.76.6,4.32,3.84,4.32,3.66,0,3.78-1.92,3.78-5.91s-.09-6.15-3.78-6.15c-2.49,0-3.54,1-3.84,3.42Z"/>
            <path className="cls-4" d="M121.12,50.72c0,3.75.45,5.49,4,5.49,2.52,0,4-.78,4-3.21h3c-.15,3.51-1.44,5.43-7.08,5.43-6.84,0-7.32-3.51-7.32-8.46,0-4.68.48-8.07,7.32-8.07s7.26,3.21,7.26,8v.84Zm8-1.68c0-3.27-.57-4.89-4-4.89s-4,1.71-4,4.89Z"/>
            <path className="cls-4" d="M146.26,58.16V46.61c0-1.32-.3-2.46-3.3-2.46-3.27,0-3.9,1.35-4.23,2.43V58.16h-3.3v-16h3.3v2.13c1-1.32,2.91-2.43,5.79-2.43,4.14,0,5,1.56,5,4.05V58.16Z"/>
            <path className="cls-4" d="M170.53,50c0,5-1.2,8.4-8.91,8.4-8.34,0-9.27-3.93-9.27-11.67s.93-11.7,9.27-11.7c7.71,0,8.91,3.27,8.91,7.89h-3.36c-.06-3.66-1.17-5.31-5.55-5.31-5,0-5.61,2.28-5.61,9.12,0,6.39.6,9.12,5.61,9.12,4.38,0,5.49-1.89,5.55-5.85Z"/>
            <path className="cls-4" d="M178.78,58.16l-7.53-22.77h3.69l4.59,14.25c.81,2.52,1.44,4.65,1.89,6.18.42-1.53,1.08-3.66,1.92-6.21l4.74-14.22h3.66l-7.8,22.77Z"/>
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}