/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1, 1] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `100pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="XmaxYMax">
          <defs>
            <linearGradient id="CloudWatch-linear-gradient" x1="19.62" y1="80.38" x2="62.33" y2="37.67" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#b01e50"/>
              <stop offset="1" stopColor="#ef518a"/>
            </linearGradient>
          </defs>
          <a.rect
            style={ {
              position: `absolute`,
              transformOrigin: `50% 50%`,
              transform: props.x
                .to( { range: [min_x, steps[0].start, steps[0].stop, max_x], output: [0, 0, 1, 1] } )
                .to( x => `scale(${x}, ${x})` )
            } }
            fill={`url(#CloudWatch-linear-gradient)`}
            className="cls-1"
            x="19.8" y="19.8" width="60.4" height="60.4"
          />
          <a.path
            style={ {
              opacity: props.x
                .to( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .to( x => x ),
            } }
            strokeLinejoin={`round`}
            fill={`none`}
            stroke={`#fff`}
            strokeWidth={1.5}
            className="cls-2"
            d="M68.1,55.28a7,7,0,0,0-4.87-11.92H63.1a4.16,4.16,0,0,0,.13-1.06,4.4,4.4,0,0,0-8-2.51,10.08,10.08,0,0,0-20,2.05,9.6,9.6,0,0,0,.07,1.21,7.27,7.27,0,0,0,1.46,14.39h7.86"
          />
          <a.circle
            style={ {
              opacity: props.x
                .to( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .to( x => x ),
            } }
            strokeMiterlimit={10}
            fill={`none`}
            stroke={`#fff`}
            strokeWidth={1.5}
            className="cls-3"
            cx="55.97" cy="55.08" r="5.97"
          />
          <a.circle
            style={ {
              opacity: props.x
                .to( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .to( x => x ),
            } }
            strokeMiterlimit={10}
            fill={`none`}
            stroke={`#fff`}
            strokeWidth={1.5}
            className="cls-3" cx="55.97" cy="55.08" r="8.93"
          />
          <a.path
            style={ {
              opacity: props.x
                .to( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .to( x => x ),
            } }
            strokeMiterlimit={10}
            fill={`none`}
            stroke={`#fff`}
            strokeWidth={1.5}
            className="cls-3"
            d="M63.72,59.53l5.86,5.19a1.87,1.87,0,0,1-2.43,2.82l-5.86-5.28"
          />
        </svg>
      ) }
    </Spring>
  </div>
}