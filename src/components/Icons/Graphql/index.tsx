/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const pink = `#e535ab`
const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1, 2, 2, 2] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <g id="Icon">
            <g id="Rectangles">
              <a.rect
                style={ { width: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => x * 41.68 ) } }
                fill={pink} x="3.29" y="43.69" width="41.68" height="2.16" transform="translate(-26.7 43.29) rotate(-60)"
              />
              <a.rect
                style={ { width: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => x * 41.68 ) } }
                fill={pink} x="12.35" y="59.4" width="41.68" height="2.16"
              />
              <a.rect
                style={ { height: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => x * 24.08 ) } }
                fill={pink} x="23.06" y="53.66" width="2.16" height="24.08" transform="translate(-44.82 53.75) rotate(-60)"
              />
              <a.rect
                style={ { height: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, 1, 1] ).to( x => x * 24.08 ) } }
                fill={pink} x="41.17" y="22.28" width="2.16" height="24.08" transform="translate(-8.59 53.75) rotate(-60)"
              />
              <a.rect
                style={ { width: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, 1, 1] ).to( x => x * 24.08 ) } }
                fill={pink} x="12.11" y="33.23" width="24.08" height="2.16" transform="matrix(0.87, -0.5, 0.5, 0.87, -13.92, 16.67)"
              />
              <a.rect
                style={ { height: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x],  [0, 0, 1, 1]  ).to( x => x * 41.68 ) } }
                fill={pink} x="41.19" y="23.93" width="2.16" height="41.68" transform="translate(-16.72 27.13) rotate(-30)"
              />
              <a.rect
                style={ {
                  transformOrigin: `7.5422% 50%`,
                  transform: `rotate(-180deg)`,
                  height: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => x * 24.08 )
                } }
                fill={pink} x="14" y="37.96" width="2.16" height="24.08"
              />
              <a.rect
                style={ {
                  transformOrigin: `25.65815% 50%`,
                  transform: `rotate(-180deg)`,
                  height: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [0, 0, 1, 1] ).to( x => x * 24.08 )
                } }
                fill={pink} x="50.24" y="37.96" width="2.16" height="24.08"
              />
              <a.rect
                style={ { width: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, 1, 1] ).to( x => x * 20.94 ) } }
                fill={pink} x="31.78" y="64.74" width="20.94" height="1.89" transform="translate(-27.18 29.93) rotate(-30)"
              />

            </g>
            <a.g
              style={ { opacity: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [0, 0, 1, 1] ) } }
              id="Circles"
            >
              <path fill={pink} d="M55.26,62.74a4.54,4.54,0,1,1-1.67-6.21,4.55,4.55,0,0,1,1.67,6.21"/>
              <path fill={pink} d="M19,41.8a4.54,4.54,0,1,1-1.66-6.21A4.55,4.55,0,0,1,19,41.8"/>
              <path fill={pink} d="M11.14,62.74a4.54,4.54,0,1,1,6.21,1.67,4.55,4.55,0,0,1-6.21-1.67"/>
              <path fill={pink} d="M47.4,41.8a4.54,4.54,0,1,1,6.21,1.67A4.56,4.56,0,0,1,47.4,41.8"/>
              <path fill={pink} d="M33.2,75.48a4.54,4.54,0,1,1,4.54-4.54,4.54,4.54,0,0,1-4.54,4.54"/>
              <path fill={pink} d="M33.2,33.6a4.54,4.54,0,1,1,4.54-4.54A4.54,4.54,0,0,1,33.2,33.6"/>
            </a.g>
            <a.g
              style={ { opacity: props.x.to( [min_x, max_x], [0, 1] ) } }
              fill={`none`}
              stroke={pink}
              strokeLinecap={`round`}
              strokeMiterlimit={10}
              strokeWidth={1.96}
            >
              <path d="M79.93,49h5.93l0,3a6.8,6.8,0,0,1-6.8,6.79h-.43A6.8,6.8,0,0,1,71.86,52V45.69a6.8,6.8,0,0,1,6.8-6.79h.43a6.8,6.8,0,0,1,6.43,4.58" />
              <g>
                <line x1="92.07" y1="44.3" x2="92.1" y2="58.69" />
                <path fill={pink} stroke={`none`} d="M98.07,45.33a4.44,4.44,0,0,0-1.42.08,6.65,6.65,0,0,0-1.49.53,7.76,7.76,0,0,0-1.37.88A10.16,10.16,0,0,0,92.58,48l0,0a.65.65,0,0,1-1-.84,12.14,12.14,0,0,1,1.26-1.44,10.23,10.23,0,0,1,1.55-1.21,8.13,8.13,0,0,1,1.82-.83,6,6,0,0,1,2.14-.29,1,1,0,0,1-.1,2h-.16Z" />
              </g>

              <path d="M102.4,46.85s.95-2.34,4.4-2.45h.33c5.63,0,5.06,5.12,5.06,5.12v9.17" />
              <path d="M112.07,50.38s-10.75.28-10.75,4.7c0,1.58,1.07,3.81,5,3.81,6.09,0,5.72-7.55,5.72-8.48"/>

              <rect x="118.8" y="44.25" width="11.41" height="14.54" rx="5.71"/>
              <line x1="118.88" y1="44.4" x2="118.8" y2="64.35" />

              <g id="h">
                <path fill={pink} stroke={`none`} d="M135.67,50a6.35,6.35,0,0,1,3.88-5.89,7.12,7.12,0,0,1,1.83-.46c.31,0,.63,0,.9,0s.61,0,.92,0a6.41,6.41,0,0,1,3.44,1.47,6.49,6.49,0,0,1,2.05,3.17,6.73,6.73,0,0,1,.25,1.87l0,1.66.09,6.66a1,1,0,0,1-2,0v0l.08-6.66,0-1.66a5,5,0,0,0-.15-1.42,4.78,4.78,0,0,0-1.46-2.38A4.9,4.9,0,0,0,143,45.17c-.25,0-.46,0-.74-.05s-.53,0-.77,0a5.18,5.18,0,0,0-1.4.32A5,5,0,0,0,137,50a.65.65,0,0,1-.65.65.64.64,0,0,1-.65-.63Z" />
                <path d="M136.33,38.62V58.46" />
              </g>
              <g>
                <rect x="154.04" y="38.9" width="14.02" height="19.89" rx="7.01" />
                <line x="154.04" x1="168.04" y1="60.92" x2="165.82" y2="57.86" />
              </g>
              <polyline points="174.96 38.62 175.07 58.36 186.66 58.46"/>
            </a.g>
          </g>
        </svg>
      ) }
    </Spring>
  </div>
}