/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const scale = ( number: number, width = 100 ): number => number * width / 100

const darkMode = false

const backgroundColor = darkMode ? `#21262d` : `#f8eee0`
const strokeLength = 57.33221435546875
const red = `#d94234`

const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [2,1,1] )


export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="XmaxYMax">
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `50% 50%`,
              transform: props.x
                .to( { range: [min_x, steps[0].start, steps[0].stop, max_x], output: [0, 0, 1, 1] } )
                .to( x => `scale(${x}, ${x})` )
            } }
            fill={red}
            className="cls-1"
            cx={`${scale( 50 )}`} cy={`${scale( 50 )}`}
            r={`${scale( 41.34 )}`}
          />
          <a.line
            strokeDashoffset={
              props.x
                .to( { range: [max_x, steps[1].start, steps[1].stop, min_x], output: [0, 0, 1, 1] } )
                .to( x => strokeLength - ( x * strokeLength ) )
            }
            strokeDasharray={strokeLength}
            strokeLinecap={`round`}
            strokeMiterlimit={10}
            strokeWidth={8}
            fill={`none`}
            stroke={backgroundColor}
            className="cls-2" x1="29.73" y1="29.73" x2="70.27" y2="70.27"
          />
          <a.line
            strokeDashoffset={
              props.x
                .to( { range: [max_x, steps[2].start, steps[2].stop, min_x], output: [0, 0, 1, 1] } )
                .to( x => strokeLength - ( x * strokeLength ) )
            }
            strokeDasharray={strokeLength}
            strokeLinecap={`round`}
            strokeMiterlimit={10}
            strokeWidth={8}
            fill={`none`}
            stroke={backgroundColor}
            className="cls-2" x1="70.27" y1="29.73" x2="29.73" y2="70.27"
          />
        </svg>
      ) }
    </Spring>
  </div>
}