/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const blue = `#219bd7`
const green = `#c8d32c`
const orange = `#d87b28`
const red = `#c22d26`
const grey = `#696a6c`
const min_x = 0
const max_x = 1
const lengths = [1, 1.92, 40.36, 1.92, 33.22, 1.92, 22.36, 1.92, 14.31]
const steps = setSteps( min_x, max_x, lengths )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          {/* Gray bar */}
          <a.path
            style={ { opacity: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [0, 0, lengths[0], lengths[0]] ) } }
            fill={grey}
            d="M61.42,32.84H21.22a2.15,2.15,0,1,1,0-4.29h40.2a2.15,2.15,0,1,1,0,4.29Z"
          />
          {/* Blue Bar */}
          <a.rect
            style={ {
              height: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, lengths[1], lengths[1]] )
            } }
            fill={blue}
            x="21.18" y="25.42" width="8.17" height="1.92"
          />
          <a.rect
            style={ {
              height: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, lengths[2], lengths[2]] )
            } }
            fill={blue}
            x="21.18" y="34.22" width="8.17" height="40.36"
          />
          {/* Green Bar */}
          <a.rect
            style={ {
              height: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [0, 0, lengths[3], lengths[3]] )
            } }
            fill={green}
            x="31.88" y="25.42" width="8.17" height="1.92"
          />
          <a.rect
            style={ {
              height: props.x.to( [min_x, steps[4].start, steps[4].stop, max_x], [0, 0, lengths[4], lengths[4]] )
            } }
            fill={green}
            x="31.88" y="34.22" width="8.17" height="33.22"
          />
          {/* Orange Bar */}
          <a.rect
            style={ {
              height: props.x.to( [min_x, steps[5].start, steps[5].stop, max_x], [0, 0, lengths[5], lengths[5]] )
            } }
            fill={orange}
            x="42.59" y="25.42" width="8.17" height="1.92"
          />
          <a.rect
            style={ {
              height: props.x.to( [min_x, steps[6].start, steps[6].stop, max_x], [0, 0, lengths[6], lengths[6]] )
            } }
            fill={orange}
            x="42.59" y="34.22" width="8.17" height="22.36"
          />
          {/* Red Bar */}
          <a.rect
            style={ {
              height: props.x.to( [min_x, steps[7].start, steps[7].stop, max_x], [0, 0, lengths[7], lengths[7]] )
            } }
            fill={red}
            x="53.29" y="25.42" width="8.17" height="1.92"
          />
          <a.rect
            style={ {
              height: props.x.to( [min_x, steps[8].start, steps[8].stop, max_x], [0, 0, lengths[8], lengths[8]] )
            } }
            fill={red}
            x="53.29" y="34.22" width="8.17" height="14.31"
          />
          {/* Letters */}
          <a.g
            style={ { opacity: props.x.to( [min_x, max_x], [ 0, 1 ]) } }
          >
            <path fill={grey} d="M84.26,61a9,9,0,0,1-3.69-.74A7,7,0,0,1,77.77,58h-.22a27.73,27.73,0,0,1,.22,3.43v8.5H74.64V40h2.55l.43,2.83h.15a7.28,7.28,0,0,1,2.81-2.45,8.61,8.61,0,0,1,3.68-.75,7.63,7.63,0,0,1,6.34,2.8c1.49,1.88,2.23,4.5,2.23,7.88s-.75,6-2.27,7.91A7.63,7.63,0,0,1,84.26,61Zm-.45-18.76c-2.12,0-3.64.59-4.59,1.76s-1.42,3-1.45,5.58v.69c0,2.91.49,5,1.45,6.23a5.53,5.53,0,0,0,4.66,1.88,4.85,4.85,0,0,0,4.2-2.17,10.28,10.28,0,0,0,1.51-6,9.89,9.89,0,0,0-1.51-5.93A5,5,0,0,0,83.81,42.24Z" />
            <path fill={grey} d="M95,40h3.36l4.52,11.78a45.83,45.83,0,0,1,1.85,5.83h.15c.16-.64.51-1.74,1-3.29S108.15,48,111.05,40h3.35l-8.88,23.53a11.87,11.87,0,0,1-3.08,4.95,6.59,6.59,0,0,1-4.33,1.46,12.77,12.77,0,0,1-2.82-.32V67.07a10.89,10.89,0,0,0,2.31.23c2.15,0,3.69-1.21,4.6-3.62l1.15-2.94Z" />
            <path fill={blue} d="M124.43,58.42a10.38,10.38,0,0,0,1.6-.12,11.4,11.4,0,0,0,1.23-.26v2.39a5.58,5.58,0,0,1-1.5.41A10.85,10.85,0,0,1,124,61q-6,0-6-6.31V42.39h-3v-1.5l3-1.3,1.32-4.42h1.81V40h6v2.43h-6V54.55a4.2,4.2,0,0,0,.89,2.87A3.1,3.1,0,0,0,124.43,58.42Z"/>
            <path fill={blue} d="M140.11,61a9.51,9.51,0,0,1-7.23-2.79q-2.64-2.79-2.64-7.75a12,12,0,0,1,2.46-7.93,8.16,8.16,0,0,1,6.6-2.94,7.81,7.81,0,0,1,6.15,2.55,9.78,9.78,0,0,1,2.26,6.74v2H133.48a8.15,8.15,0,0,0,1.84,5.52,6.34,6.34,0,0,0,4.91,1.89,16.61,16.61,0,0,0,6.59-1.4v2.79a16.54,16.54,0,0,1-3.13,1A17.53,17.53,0,0,1,140.11,61Zm-.84-18.79a5.1,5.1,0,0,0-4,1.62,7.46,7.46,0,0,0-1.75,4.48h10.81A6.87,6.87,0,0,0,143,43.78,4.65,4.65,0,0,0,139.27,42.21Z"/>
            <path fill={blue} d="M166.37,55a5.17,5.17,0,0,1-2.15,4.45,10.11,10.11,0,0,1-6,1.56,13.11,13.11,0,0,1-6.41-1.3V56.8A15.84,15.84,0,0,0,155,58a13.31,13.31,0,0,0,3.29.44,7.49,7.49,0,0,0,3.77-.78,2.69,2.69,0,0,0,.27-4.45,16.27,16.27,0,0,0-4.08-2,22,22,0,0,1-4.1-1.88,5.67,5.67,0,0,1-1.81-1.81,4.72,4.72,0,0,1-.59-2.44,4.62,4.62,0,0,1,2.05-4,9.54,9.54,0,0,1,5.64-1.46,16.56,16.56,0,0,1,6.52,1.35l-1.11,2.55a14.88,14.88,0,0,0-5.64-1.28,6.52,6.52,0,0,0-3.35.69,2.17,2.17,0,0,0-1.14,1.93,2.36,2.36,0,0,0,.43,1.41,4.12,4.12,0,0,0,1.37,1.11,30.38,30.38,0,0,0,3.62,1.53,13.52,13.52,0,0,1,5,2.69A4.78,4.78,0,0,1,166.37,55Z" />
            <path fill={blue} d="M178.14,58.42a10.48,10.48,0,0,0,1.6-.12A11.68,11.68,0,0,0,181,58v2.39a5.39,5.39,0,0,1-1.49.41,11,11,0,0,1-1.79.16q-6,0-6-6.31V42.39h-3v-1.5l3-1.3L173,35.17h1.81V40h6v2.43h-6V54.55a4.15,4.15,0,0,0,.89,2.87A3.1,3.1,0,0,0,178.14,58.42Z" />
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}