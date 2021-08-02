/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const fill = `var(--color-text)`
const green = `#36a852`
const orange = `#f9bc15`
const red = `#ea4535`
const blue = `#557ebf`
const gray = `var(--color-googleText)`
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
          <a.g
            style={{
              position: `absolute`,
              transformOrigin: `50% 37.9835%`,
              transform: props.x.to( [min_x, max_x], [0, 1] ).to( x => `scale(${x}, ${x})`)
            }}
          >
            <a.path fill={red} d="M104.87,31.56l1.14,0,3.11-3.11.15-1.32a14,14,0,0,0-22.76,6.79,1.65,1.65,0,0,1,1.06-.06l6.22-1s.32-.53.48-.49a7.75,7.75,0,0,1,10.6-.8Z" />
            <a.path fill={blue} d="M113.5,34a14,14,0,0,0-4.22-6.8l-4.4,4.4a7.75,7.75,0,0,1,2.9,6v.78a3.88,3.88,0,0,1,0,7.76H100l-.77.78v4.66l.77.77h7.77A10.08,10.08,0,0,0,113.49,34Z" />
            <a.path fill={green} d="M92.23,52.35H100V46.13H92.23a3.64,3.64,0,0,1-1.59-.34l-1.12.34-3.11,3.11-.27,1a10,10,0,0,0,6.09,2.06Z" />
            <a.path fill={orange} d="M92.23,32.16a10.09,10.09,0,0,0-6.09,18.13l4.5-4.5a3.88,3.88,0,1,1,5.13-5.13l4.5-4.5a10.08,10.08,0,0,0-8-4Z" />
          </a.g>
          <a.path 
            style={{opacity: props.x.to([min_x, max_x], [0,1])}}
            fill={gray} d="M52,71.92a7.54,7.54,0,0,1-5.47-2.25,7.5,7.5,0,0,1,0-10.81A7.55,7.55,0,0,1,52,56.6a7.4,7.4,0,0,1,5.25,2.11l-1.48,1.48a5.51,5.51,0,0,0-7.67.13,5.68,5.68,0,0,0,0,7.88,5.57,5.57,0,0,0,7.77.1A4.42,4.42,0,0,0,57,65.66H52V63.57h7a7.08,7.08,0,0,1,.1,1.3,6.62,6.62,0,0,1-1.82,4.9A7.07,7.07,0,0,1,52,71.92Zm16.37-1.4a5.1,5.1,0,0,1-7,0,5,5,0,0,1,0-7,4.8,4.8,0,0,1,3.51-1.4,4.86,4.86,0,0,1,3.51,1.4,5,5,0,0,1,0,7ZM62.9,69.14a2.68,2.68,0,0,0,3.92,0,3.23,3.23,0,0,0,0-4.29,2.73,2.73,0,0,0-3.94,0,3.2,3.2,0,0,0,0,4.29Zm16.27,1.38a5.11,5.11,0,0,1-7,0,5,5,0,0,1,0-7,5.11,5.11,0,0,1,7,0,5,5,0,0,1,0,7Zm-5.48-1.38a2.7,2.7,0,0,0,3.93,0,3.23,3.23,0,0,0,0-4.29,2.64,2.64,0,0,0-2-.84,2.61,2.61,0,0,0-2,.84A2.94,2.94,0,0,0,72.87,67a3,3,0,0,0,.82,2.14Zm12.58,7.22a4.33,4.33,0,0,1-2.77-.88,5,5,0,0,1-1.6-2l1.89-.78a3,3,0,0,0,.93,1.23,2.37,2.37,0,0,0,1.55.53,2.5,2.5,0,0,0,1.93-.75,3,3,0,0,0,.7-2.15v-.7h-.07a3.15,3.15,0,0,1-2.6,1.12,4.48,4.48,0,0,1-3.3-1.44A4.72,4.72,0,0,1,81.51,67a4.82,4.82,0,0,1,1.42-3.51,4.49,4.49,0,0,1,3.3-1.44,3.42,3.42,0,0,1,1.52.32,3,3,0,0,1,1.08.78h.07v-.8H91v8.86a5.14,5.14,0,0,1-1.32,3.86,4.65,4.65,0,0,1-3.37,1.28ZM86.42,70a2.43,2.43,0,0,0,1.88-.85A3.09,3.09,0,0,0,89.05,67a3.15,3.15,0,0,0-.75-2.15A2.41,2.41,0,0,0,86.42,64a2.56,2.56,0,0,0-1.94.86A3,3,0,0,0,83.67,67a3,3,0,0,0,.81,2.12,2.55,2.55,0,0,0,1.94.85Zm8.2-12.87v14.5H92.45V57.12Zm5.94,14.8a4.67,4.67,0,0,1-3.49-1.42,5.19,5.19,0,0,1,0-7.06,4.46,4.46,0,0,1,3.3-1.39,4.17,4.17,0,0,1,2.93,1.17,6,6,0,0,1,.8,1,6.3,6.3,0,0,1,.49,1l.22.56-6.59,2.73a2.5,2.5,0,0,0,2.39,1.5A2.82,2.82,0,0,0,103,68.62l1.68,1.12a5.51,5.51,0,0,1-1.59,1.51,4.49,4.49,0,0,1-2.52.67Zm-2.75-5.08,4.4-1.83a1.5,1.5,0,0,0-.7-.76,2.24,2.24,0,0,0-1.14-.28,2.57,2.57,0,0,0-1.78.78,2.62,2.62,0,0,0-.79,2.09Zm18.33,5.08a6.83,6.83,0,0,1-7-7,6.83,6.83,0,0,1,7-7,6.19,6.19,0,0,1,4.92,2.19l-1.2,1.16a4.51,4.51,0,0,0-3.72-1.7,5.1,5.1,0,0,0-5.2,5.34,5.18,5.18,0,0,0,1.5,3.87,5.08,5.08,0,0,0,3.7,1.48,5.24,5.24,0,0,0,4.1-1.94l1.2,1.19a6.56,6.56,0,0,1-2.3,1.75,7.08,7.08,0,0,1-3,.64Zm8.56-.3H123V58.25h1.72Zm2.8-8.06a4.82,4.82,0,0,1,6.77,0,5.26,5.26,0,0,1,0,7,4.79,4.79,0,0,1-6.77,0,5.26,5.26,0,0,1,0-7Zm1.28,5.89a2.9,2.9,0,0,0,4.2,0,3.68,3.68,0,0,0,0-4.8,2.88,2.88,0,0,0-4.2,0,3.24,3.24,0,0,0-.89,2.4A3.29,3.29,0,0,0,128.78,69.45Zm16.32,2.17h-1.64V70.35h-.08a3,3,0,0,1-1.19,1.1,3.44,3.44,0,0,1-1.7.46,3.22,3.22,0,0,1-2.61-1,4.22,4.22,0,0,1-.88-2.81v-5.6h1.72v5.32c0,1.71.75,2.56,2.26,2.56a2.05,2.05,0,0,0,1.73-.86,3.15,3.15,0,0,0,.68-2v-5h1.72v9.16Zm5.83.3a4,4,0,0,1-3.06-1.4,5.33,5.33,0,0,1,0-6.95,4.11,4.11,0,0,1,4.94-1,3.09,3.09,0,0,1,1.24,1.12h.08l-.08-1.27V58.24h1.72V71.62h-1.64V70.35h-.08a3.11,3.11,0,0,1-1.24,1.13,4,4,0,0,1-1.88.44Zm.28-1.57a2.72,2.72,0,0,0,2.07-.9,3.81,3.81,0,0,0,0-4.8,2.83,2.83,0,0,0-4.13,0,3.81,3.81,0,0,0,0,4.8,2.72,2.72,0,0,0,2.06.91Z" 
          />
        </svg>
      ) }
    </Spring>
  </div>
}