/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const darkMode = false

const fill = `var(--color-text)`
const red = `var(--color-red)`

const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1,1,1,1] )

const height = 150
const width = 200

const cx = width / 2
const cy = height / 2
const a = 75
const b = 37.5

const originOpacity = 0.5
const originArrow = 5
const originPadding = 3

const x_height = 7.96
const x_width = 9
const x_x = -4.5
const x_y = -2.67

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const y_height = 10.78
const y_width = 9
const y_x = -4.5
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const y_y = -2.3

const O_height = 12.37
const O_width = 13
const O_x = -6.5
const O_y = -8.48

const a_height = 7.96
const a_width = 8
const a_x = -4
const a_y = -2.67

const b_height = 12.37
const b_width = 9
const b_x = -4.5
const b_y = -7.08

const radius = 2
const lineWidth = 1

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ {
    height: `${height}pt`, paddingTop: `1em`, paddingBottom: `1em`
  } } >
    <Spring 
      config={{ duration: 1500 }}
      to={ { x: inView ?  max_x : min_x } } 
    >
      { ( props ) => (
        <svg 
          width="100%" height="100%" viewBox={`0 0 ${ width } ${ height }`} 
          preserveAspectRatio="XmaxYMax"
        >
          {/* Draw the Origin and the basis point */}
          <animated.g
            style={ { opacity: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [1, 1, originOpacity, originOpacity] ) } }
          >
            <g id="O"
              style={ {
                transform: `translate3d(${ ( width / 2 + O_x + O_width + originPadding ) / width * 100}%,${( height / 2 - O_y - O_height - originPadding ) / height * 100}%,0)`
              } }
              fill={fill}
            >
              <path d="M-.18,3.55C-3.79,3.55-6,1.29-6-2s2.22-5.7,5.86-5.7S5.66-5.45,5.66-2C5.66,1.26,3.47,3.55-.18,3.55ZM2.51,1.38a7,7,0,0,0,.73-3.62,6.36,6.36,0,0,0-.67-3.33A3.18,3.18,0,0,0-.18-7.07,3.17,3.17,0,0,0-2.84-5.7a6.3,6.3,0,0,0-.75,3.46,7.2,7.2,0,0,0,.66,3.48A3.09,3.09,0,0,0-.18,2.88,3.1,3.1,0,0,0,2.51,1.38Z" />
            </g>
            <circle
              fill={fill}
              cx={width / 2} cy={height / 2} r={radius}
            />
          </animated.g>

          {/* Draw the basis vectors and labels */}
          <animated.g
            style={ { opacity: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 1, 1, originOpacity] ) } }
          >
            <g id="y-Axis">
              <line id="Origin x=0"
                stroke={fill}
                x1={width / 2} y1={originArrow} x2={width / 2} y2={height}
              />
              <g id="y"
                style={ {
                  transform: `translate3d(${ ( width / 2 + y_x + y_width + originPadding ) / width * 100}%,${( originArrow * 2 / Math.sqrt( 2 ) + originPadding ) / height * 100}%,0)`
                } }
                fill={fill}
              >
                <path d="M-.77,6.23c-.37.9-1,1.81-2,1.81a1.41,1.41,0,0,1-1.47-1.3.66.66,0,0,1,.68-.68.65.65,0,0,1,.67.67.65.65,0,0,1-.63.67,1.11,1.11,0,0,0,.75.28c1,0,1.47-1.09,1.82-2l.4-.93L-3-1c-.22-.54-.53-.54-1.3-.54v-.5c.49,0,1.13,0,1.55,0l1.74,0v.5c-.3,0-.89,0-.89.4a1.16,1.16,0,0,0,.09.3L0,3.38,1.59-.52a.74.74,0,0,0,.1-.38c0-.4-.25-.67-.75-.68v-.5L2.33-2c.36,0,.83,0,1.19,0v.5A1.51,1.51,0,0,0,2-.57Z" />
              </g>
              <path
                fill={fill}
                d={`M ${width / 2} ${0} L ${ ( width / 2 ) + originArrow * Math.sqrt( 2 ) / 2 } ${ originArrow } L ${ ( width / 2 ) - originArrow * Math.sqrt( 2 ) / 2 } ${ originArrow }  Z`}
              />
            </g>
            <g id="x-Axis">
              <path
                fill={fill}
                d={`M ${width} ${height / 2} L ${ width - originArrow } ${ height / 2 - originArrow * Math.sqrt( 2 ) / 2 } L ${ width - originArrow } ${ height / 2 + originArrow * Math.sqrt( 2 ) / 2 }  Z`}
              />
              <line id="Origin y=0"
                stroke={fill}
                x1={0} y1={ height / 2 } x2={width - originArrow } y2={ height / 2 }
              />
              <g id="x"
                style={ {
                  opacity: originOpacity,
                  transform: `translate3d(${( ( width - x_x - x_width - originArrow * Math.sqrt( 2 ) / 2 ) - originPadding ) / width * 100}%,${( height / 2 + x_y + x_height + originPadding ) / height * 100}%,0)`
                } }
                fill={fill}
              >
                <path d="M2.74,3.8c.36.45.64.48,1.5.48v.5c-.47,0-1.1,0-1.52,0L1,4.78v-.5c.43,0,.57-.25.57-.39a2.58,2.58,0,0,0-.33-.53L0,1.78c-1,1.14-1.43,1.66-1.43,2a.45.45,0,0,0,.45.48v.5c-.37,0-1,0-1.5,0s-.91,0-1.33,0v-.5a2.56,2.56,0,0,0,2.05-1L-.25,1.44l-1.57-2c-.74-.95-.75-1-1.88-1v-.5C-3.26-2-2.51-2-2.18-2l1.71-.05v.5c-.31,0-.56.16-.56.39s0,.13.14.3L.36.71l1-1.24a.89.89,0,0,0,.23-.56.45.45,0,0,0-.45-.49v-.5c.2,0,1.05.05,1.51.05S3.53-2,4-2.08v.5a2.4,2.4,0,0,0-1.89.83C1.68-.34,1.08.44.6,1.05Z" />
              </g>
            </g>
          </animated.g>

          {/* Draw a and b */}
          <animated.g
            style={ { opacity: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 1, 1, originOpacity] ) } }
          >
            <g id="a">
              <circle
                fill={red}
                strokeWidth={lineWidth}
                cx={width / 2 + a} cy={cy} r={radius}
              />
              <line
                strokeWidth={lineWidth}
                stroke={red}
                x1={width / 2} y1={height / 2} x2={width / 2 + a} y2={cy}
              />
              <g id="a"
                style={ {
                  transform: `translate3d(${ ( width / 2 + a + a_x + a_width + originPadding ) / width * 100}%,${( cy - a_y - a_height - originPadding ) / height * 100}%,0)`
                } }
                fill={red}
              >
                <path d="M-.62,5c-1,0-2.55-.4-2.55-1.69A2.29,2.29,0,0,1-1.58,1.21,7.36,7.36,0,0,1,1.35.63V.05A1.81,1.81,0,0,0-.34-2a2.27,2.27,0,0,0-1.72.74.72.72,0,0,1,.81.73A.71.71,0,0,1-2,.21a.71.71,0,0,1-.74-.75c0-1,1.11-1.8,2.41-1.8a3,3,0,0,1,2.17.87A2.35,2.35,0,0,1,2.44.41V3.6c0,.07.06.79.59.79.17,0,.57-.11.57-1V2.47H4v.89A1.35,1.35,0,0,1,2.69,4.88a1.34,1.34,0,0,1-1.24-1.3A2.2,2.2,0,0,1-.62,5ZM-1.95,3.25A1.37,1.37,0,0,0-.51,4.61,1.92,1.92,0,0,0,1.35,2.55V1C-1.28,1.06-1.95,2.38-1.95,3.25Z" />
              </g>
            </g>
            <g id="b">
              <circle
                fill={red}
                cx={cx} cy={height / 2 - b} r={radius}
              />
              <line
                strokeWidth={lineWidth}
                stroke={red}
                x1={width / 2} y1={height / 2} x2={cx} y2={height / 2 - b}
              />
              <g id="b"
                style={ {
                  transform: `translate3d(${ ( width / 2 - b_x - b_width - originPadding ) / width * 100}%,${( height / 2 - b - b_y - b_height - originPadding ) / height * 100}%,0)`
                } }
                fill={red}
              >
                <path d="M.73-2.24A3.48,3.48,0,0,1,4.09,1.35,3.57,3.57,0,0,1,.55,5,2.5,2.5,0,0,1-1.53,3.8c-.42.75-.56,1-.58,1H-2.5V-4.7c0-.78-.12-.89-1.23-.89v-.48l2.28-.17v5A2.82,2.82,0,0,1,.73-2.24ZM-1.19,3.65a2,2,0,0,0,1.67,1,2.22,2.22,0,0,0,1.8-1,4.22,4.22,0,0,0,.5-2.27,4.16,4.16,0,0,0-.47-2.2,2,2,0,0,0-1.67-1,2.32,2.32,0,0,0-1.87,1,.66.66,0,0,0-.18.56V3A.91.91,0,0,0-1.19,3.65Z" />
              </g>
            </g>
          </animated.g>
          {/* Draw the ellipse */}
          <animated.ellipse
            style={ { opacity: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [0, 0, 1, 1] ), } }
            stroke={fill}
            fill={`none`}
            strokeWidth={lineWidth}
            cx={cx} cy={cy} rx={a} ry={b}
          />
        </svg>
      ) }
    </Spring>
  </div>
}