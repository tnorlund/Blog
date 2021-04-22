/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const scale = ( number: number, width = 100 ): number => number * width / 100

const darkMode = false

const backgroundColor = darkMode ? `#21262d` : `#f8eee0`
const fill = darkMode ? `#e5e5e5` :  `#201e1f`
const strokeLength = 69.66800689697266

const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1,1,1] )


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
            fill={fill}
            className="cls-1"
            cx={`${scale( 50 )}`} cy={`${scale( 50 )}`}
            r={`${scale( 41.34 )}`}
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `50% 71.4748%`,
              transform: props.x
                .to( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .to( x => `scale(${x}, ${x})` )
            } }
            fill={backgroundColor}
            className="cls-2" cx="50" cy="71.47" r={`${scale( 4 )}`}
          />
          <a.path
            strokeDashoffset={
              props.x
                .to( { range: [max_x, steps[1].start, steps[1].stop, min_x], output: [0, 0, 1, 1] } )
                .to( x => strokeLength - ( x * strokeLength ) )
            }
            strokeDasharray={strokeLength}
            strokeWidth={8}
            strokeLinejoin={`round`}
            strokeLinecap={`round`}
            stroke={backgroundColor}
            fill={`none`}
            className="cls-3" d="M36.52,38.42s0-13.17,14.3-13.17c12.66,0,12.66,10.82,12.66,10.82,0,7.1-7.93,12-10,15a19.51,19.51,0,0,0-3.47,10"
          />
        </svg>
      ) }
    </Spring>
  </div>
}