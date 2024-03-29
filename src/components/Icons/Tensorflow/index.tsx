/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const textOrange = `#ee6738`
const textGrey = `#a7a7a9`
const light = `#f4bc39`
const mid = `#eb8c23`
const dark = `#e25c2a`
const grey = `#a6abab`
const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [3,3,3,1] )


export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.g
            style={ { opacity: props.x.to( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 0.1, 0.1] } ), } }
            fill={grey} id="Shadows"
          >
            <path d="M59.65,26,78.29,36.55l.2,7.34-12.38-6L66,43.08l6.66,3.13L72.91,54l-6.46-2.45L66.93,64l-7.21-3.88Z"/>
            <path d="M10.75,39.23l24-13.71.52,7-7.51,4.37.39,27-6.46,3.39L20.61,41.26,11.4,46.55l-.59-7.06Z"/>
          </a.g>
          <a.g
            style={ { opacity: props.x.to( { range: [min_x, max_x], output: [0, 1] } ), } }
            name="Letters" id="Layer_7" data-name="Layer 7"
          >
            <path fill={textOrange} d="M75.17,47.78V65.17H72.11V47.78h-6v-3h15v3Z"/>
            <path fill={textOrange} d="M91.24,54.11a7.81,7.81,0,0,1,.25,2.29l-9.88,3a1.6,1.6,0,0,0,.29.95,4,4,0,0,0,.88,1.31,4.09,4.09,0,0,0,1.17.77,3.77,3.77,0,0,0,1.33.24A4.35,4.35,0,0,0,87,62.29a6.55,6.55,0,0,0,1.56-.88l1.79,1.89a7.36,7.36,0,0,1-2.28,1.49,7.15,7.15,0,0,1-3,.53,5.85,5.85,0,0,1-2.54-.53,6.22,6.22,0,0,1-2.11-1.52A7.59,7.59,0,0,1,79,60.76a9.83,9.83,0,0,1-.53-3.38,10.67,10.67,0,0,1,.5-3.47,7.3,7.3,0,0,1,1.36-2.48,5.71,5.71,0,0,1,2.12-1.52,6.79,6.79,0,0,1,2.73-.54A6.19,6.19,0,0,1,88,50a5.71,5.71,0,0,1,2,1.66A7,7,0,0,1,91.24,54.11Zm-2.86.67a3.37,3.37,0,0,0-.71-1.55,2.46,2.46,0,0,0-1.08-.83,4,4,0,0,0-1.6-.23,3.5,3.5,0,0,0-2.68,1.16,6.11,6.11,0,0,0-.7,3.47Zm14,10.24V56.35a4.94,4.94,0,0,0-.84-3.27,3,3,0,0,0-2.32-.93,2.86,2.86,0,0,0-2.32,1A4.48,4.48,0,0,0,96.05,56v9h-3V49.7h3v1.46a3.79,3.79,0,0,1,1.62-1.31,5.37,5.37,0,0,1,2.22-.48A4.9,4.9,0,0,1,104,51.1a8.06,8.06,0,0,1,1.39,5.14V65Zm15.34-4a4.49,4.49,0,0,1-.48,2.15,4.34,4.34,0,0,1-1.27,1.39,6.41,6.41,0,0,1-1.83.76,11.54,11.54,0,0,1-2.16.22,9.51,9.51,0,0,1-3.14-.57,10.38,10.38,0,0,1-2.74-1.4l1.38-2.25a8.49,8.49,0,0,0,2.23,1.12,7.25,7.25,0,0,0,2.23.38c1.86,0,2.8-.56,2.8-1.69a1.6,1.6,0,0,0-.94-1.41,23.22,23.22,0,0,0-2.62-1.16,13.6,13.6,0,0,1-2.07-1,5.34,5.34,0,0,1-1.41-1,3.31,3.31,0,0,1-.78-1.23,5.25,5.25,0,0,1-.23-1.57,4.06,4.06,0,0,1,.38-1.81,3.39,3.39,0,0,1,1.09-1.31,4.62,4.62,0,0,1,1.65-.8,8.3,8.3,0,0,1,2.11-.26,8.68,8.68,0,0,1,2.81.47,9,9,0,0,1,2.38,1.22l-1.31,2.29a8.18,8.18,0,0,0-1.9-1,7,7,0,0,0-2.08-.31,2.49,2.49,0,0,0-1.59.4,1.2,1.2,0,0,0-.5,1,1.26,1.26,0,0,0,.56,1,4.17,4.17,0,0,0,.85.56c.35.17.84.4,1.41.63.87.31,1.61.65,2.25.92a8.15,8.15,0,0,1,1.63,1,3.72,3.72,0,0,1,1,1.35,4.4,4.4,0,0,1,.33,1.83Zm14-3.54a9.74,9.74,0,0,1-.54,3.4,7.46,7.46,0,0,1-1.44,2.55,6.55,6.55,0,0,1-2.2,1.56,7,7,0,0,1-2.74.55,6.3,6.3,0,0,1-2.68-.59,5.87,5.87,0,0,1-2.13-1.62,7.11,7.11,0,0,1-1.41-2.51,9.42,9.42,0,0,1-.51-3.26,10,10,0,0,1,.52-3.35A7.61,7.61,0,0,1,120,51.67a6.13,6.13,0,0,1,2.16-1.57,6.89,6.89,0,0,1,5.42,0,7,7,0,0,1,2.17,1.6,7.57,7.57,0,0,1,1.42,2.49,9.63,9.63,0,0,1,.52,3.25Zm-3,.08a6.19,6.19,0,0,0-1-3.75,3.47,3.47,0,0,0-2.87-1.37,3.17,3.17,0,0,0-2.7,1.37,6.22,6.22,0,0,0-1,3.67,6,6,0,0,0,1.07,3.86,3.36,3.36,0,0,0,2.75,1.35,3,3,0,0,0,1.56-.42,4.55,4.55,0,0,0,1.2-1.08,6.18,6.18,0,0,0,.75-1.62A7.24,7.24,0,0,0,128.61,57.53ZM141.35,53a9.88,9.88,0,0,0-1-.39A4.39,4.39,0,0,0,139,52.5a2.65,2.65,0,0,0-2.22,1,4.66,4.66,0,0,0-.78,2.92v8.75h-3V49.86h3v1.47a4.25,4.25,0,0,1,3.49-1.78,6.1,6.1,0,0,1,1.55.17,3.2,3.2,0,0,1,1,.47Z"/>
            <path fill={textGrey} d="M146.36,47.78v5.34h5.88v3h-5.88v9.05h-3V44.77h13.15v3ZM157,65.17V45.49l3-1.57V65.17Zm18.31-7.72a9.76,9.76,0,0,1-.51,3.4,7.85,7.85,0,0,1-1.46,2.55A6.43,6.43,0,0,1,171.15,65a7.14,7.14,0,0,1-2.75.55,6.17,6.17,0,0,1-2.68-.59,5.71,5.71,0,0,1-2.13-1.62,7.64,7.64,0,0,1-1.43-2.51,10.76,10.76,0,0,1,0-6.61,7.16,7.16,0,0,1,1.46-2.51,6.11,6.11,0,0,1,2.13-1.57,6.93,6.93,0,0,1,2.73-.55,6.51,6.51,0,0,1,2.69.56,6.6,6.6,0,0,1,2.19,1.6,7.2,7.2,0,0,1,1.4,2.49,8.94,8.94,0,0,1,.51,3.25Zm-3,.08a6.33,6.33,0,0,0-1-3.75,3.49,3.49,0,0,0-2.87-1.37,3.24,3.24,0,0,0-2.72,1.37,6.29,6.29,0,0,0-1,3.67,5.9,5.9,0,0,0,1.07,3.86,3.36,3.36,0,0,0,2.76,1.35,2.86,2.86,0,0,0,1.53-.42,4.63,4.63,0,0,0,1.22-1.08,6.54,6.54,0,0,0,.76-1.62A8.57,8.57,0,0,0,172.28,57.53Zm17.84,7.64h-2.57l-2.06-7.72c-.18-.58-.31-1.17-.44-1.8s-.26-1.1-.37-1.47c-.1.49-.2,1-.32,1.48s-.31,1.24-.43,1.83l-2.05,7.68h-2.59l-4.18-15.31h3l1.83,7.44c.14.61.28,1.23.41,1.86s.24,1.13.35,1.5l.38-1.5c.13-.63.29-1.25.46-1.86l2.05-7.44h2.39l2.1,7.48c.14.59.27,1.19.43,1.82l.36,1.5c.11-.37.23-.88.36-1.51s.25-1.24.4-1.86l1.83-7.43h3Z"/>
          </a.g>
          <a.g
            style={ {
              transformOrigin: `26.154% 45.43%`,
              transform: props.x
                .to( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [1, 1, 0, 0] } )
                .to( x => `translate3d(${x * 56.6374186243985}%,${x * 100}%, 0)` )
            } }
            id="Right"
          >
            <polygon fill={light} points="42.17 39.62 57.29 48.33 62.4 45.37 47.23 36.74 42.17 39.62"/>
            <polygon fill={mid} points="57.29 48.33 57.36 54.12 62.45 51.16 62.4 45.37 57.29 48.33"/>
            <polygon fill={dark} points="57.36 54.12 42.17 45.43 42.17 39.62 57.29 48.33 57.36 54.12"/>
          </a.g>
          <a.g
            style={ {
              transformOrigin: `9.33275% 35.4176%`,
              transform: props.x
              .to( { range: [min_x, steps[0].start, steps[0].stop, max_x], output: [1, 1, 0, 0] } )
              .to( x => `translate3d(0,${x * 100}%, 0)` )
            } }
            id="Middle"
          >
            <polygon fill={light} points="42.09 45.47 47.25 42.52 42.19 39.61 37.06 42.54 42.09 45.47"/>
            <polygon fill={mid} points="42.09 45.47 42.16 74.48 47.25 71.52 47.25 42.52 42.09 45.47"/>
            <polygon fill={dark} points="37.06 71.42 42.16 74.48 42.09 45.47 37.06 42.54 37.06 71.42"/>
          </a.g>
          <a.g
            style={ {
              transformOrigin: `26.154% 45.43%`,
              transform: props.x
                .to( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [1, 1, 0, 0] } )
                .to( x => `translate3d(${x * 56.6374186243985}%,${x * 100}%, 0)` )
            } }
            id="Small"
          >
            <polygon fill={dark}className="cls-6" points="42.09 57.02 47.25 59.9 47.25 65.75 42.09 63 42.09 57.02"/>
            <polygon fill={light} points="47.25 54.1 42.12 57.03 47.25 59.9 52.28 57.05 47.25 54.1"/>
            <polygon fill={mid} points="52.28 62.86 52.28 57.05 47.25 59.9 47.25 65.75 52.28 62.86"/>
          </a.g>
          <a.g
            style={ {
              transformOrigin: `17.26435% 49.7545%`,
              transform: props.x
                .to( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [1, 1, 0, 0] } )
                .to( x => `translate3d(-${x * 56.6374186243985}%,${x * 100}%, 0)` )
            } }
            id="Left"
          >
            <polygon fill={light} points="37.11 42.51 42.16 45.43 31.96 51.21 26.87 48.32 37.11 42.51"/>
            <polygon fill={dark} points="26.87 48.32 31.96 51.21 31.96 56.99 26.87 53.98 26.87 48.32"/>
            <polygon fill={mid} points="42.16 45.43 42.19 51.28 31.96 56.99 31.96 51.21 42.16 45.43"/>
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}