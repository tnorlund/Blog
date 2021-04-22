/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'



const darkMode = false
const purple = darkMode ? `#e5e5e5` :`#1e1853`
const pink = `#e50888`
const yellow = `#ffcb05`

const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1, 1, 1, 1] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.rect
            style={ { transform: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [120, 120, 0, 0] ).to( x => `translate3d(0,${x}%, 0)` ) } }
            fill={purple} x="11.89" y="36.38" width="5.98" height="40.4"
          />
          <a.rect
            style={ { transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [120, 120, 0, 0] ).to( x => `translate3d(0,-${x}%, 0)` ) } }
            fill={purple} x="39.81" y="23.22" width="5.98" height="40.4"
          />
          <a.rect
            style={ { transform: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [120, 120, 0, 0] ).to( x => `translate3d(0,${x}%, 0)` ) } }
            fill={purple} x="21.31" y="51.31" width="5.98" height="12.23"
          />
          <a.rect
            style={ { transform: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [120, 120, 0, 0] ).to( x => `translate3d(0,-${x}%, 0)` ) } }
            fill={purple} x="21.31" y="26.41" width="5.98" height="12.26"
          />
          <a.rect
            style={ { transform: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [120, 120, 0, 0] ).to( x => `translate3d(0,-${x}%, 0)` ) } }
            fill={purple} className="cls-1" x="30.56" y="36.38" width="5.98" height="12.26"
          />
          <a.rect
            style={ { transform: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [120, 120, 0, 0] ).to( x => `translate3d(0,${x}%, 0)` ) } }
            fill={purple} className="cls-1" x="30.56" y="61.28" width="5.98" height="12.26"
          />
          <a.rect
            style={ {
              position: `absolute`,
              transformOrigin: `16.7754% 54.9655%`,
              transform: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={pink} className="cls-2" x="30.56" y="51.98" width="5.98" height="5.98"
          />
          <a.rect
            style={ {
              position: `absolute`,
              transformOrigin: `12.15085% 44.9924%`,
              transform: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={yellow} className="cls-3" x="21.31" y="42" width="5.98" height="5.98"
          />
          <a.g
            style={ { opacity: props.x.to( [min_x, max_x], [0, 1] ) } }
            fill={purple}
            id="Text"
          >
            <path className="cls-1" d="M79.88,50.82c0,5.53-3.83,9.5-9.07,9.5a7.91,7.91,0,0,1-6-2.33h-.08v9.34H60.54V41.66H64l.12,2.61h.07a7.73,7.73,0,0,1,6.6-3C76.05,41.27,79.88,45.29,79.88,50.82Zm-4.67,0c0-3.47-1.82-5.85-5.06-5.85s-5.58,2.38-5.58,5.85a5.46,5.46,0,0,0,5.58,5.8C73.39,56.62,75.21,54.21,75.21,50.82Z"/>
            <path className="cls-1" d="M98.43,59.93l-.12-2.61h-.08a7.76,7.76,0,0,1-6.6,3c-5.23,0-9.06-4-9.06-9.5s3.83-9.55,9.06-9.55a7.71,7.71,0,0,1,6.57,3h.07l.16-2.61h3.44V59.93Zm-.59-9.11c0-3.47-2.26-5.85-5.54-5.85s-5.1,2.38-5.1,5.85,1.82,5.8,5.1,5.8A5.43,5.43,0,0,0,97.84,50.82Z"/>
            <path className="cls-1" d="M124,49.22V59.93h-4.14V49.69c0-3-1.61-4.72-4.26-4.72-2.93,0-4.69,2-4.69,5.38v9.58h-4.14V41.66h3.48l.15,2.81h.08c1.17-2.07,3.28-3.2,6.17-3.2C121.2,41.27,124,44.23,124,49.22Z"/>
            <path className="cls-1" d="M143.23,59.93l-.11-2.61H143a7.78,7.78,0,0,1-6.6,3c-5.24,0-9.07-4-9.07-9.5s3.83-9.55,9.07-9.55a8,8,0,0,1,6,2.3h.08V32.67h4.14V59.93Zm-.58-9.11c0-3.47-2.27-5.85-5.55-5.85s-4.86,2.38-4.86,5.85,1.58,5.8,4.86,5.8A5.44,5.44,0,0,0,142.65,50.82Z"/>
            <path className="cls-1" d="M166.32,59.93l-.12-2.61h-.08a7.77,7.77,0,0,1-6.6,3c-5.23,0-9.06-4-9.06-9.5s3.83-9.55,9.06-9.55a7.69,7.69,0,0,1,6.56,3h.08l.16-2.61h3.43V59.93Zm-.59-9.11c0-3.47-2.26-5.85-5.55-5.85s-5,2.38-5,5.85,1.67,5.8,5,5.8A5.43,5.43,0,0,0,165.73,50.82Z"/>
            <path className="cls-1" d="M186.94,42.6v4.24h-.19a7.54,7.54,0,0,0-5.55-1.94c-2,0-3.4.89-3.4,2.18,0,1.05.82,1.52,3.52,1.67,4.88.28,6.79,2.07,6.79,5.77s-2.77,5.8-7.34,5.8c-3.05,0-5.43-.62-7-1.79V54.21H174a8.64,8.64,0,0,0,6.57,2.49c2.14,0,3.47-.86,3.47-2.18s-.82-1.75-3.79-2c-4.76-.39-6.52-1.87-6.52-5.33s2.93-5.93,7.34-5.93A11.3,11.3,0,0,1,186.94,42.6Z"/>
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}