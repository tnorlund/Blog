/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const lightYellow = `#f9d094`
const class1Fill = `#fff`
const grey = `#231f20`
const class2Fill = `#fbb041`
const class2Stroke = `#fbb041`
const class3Stroke = `#ffdb96`
const class4Fill = `#d2d3d4`
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 3 },
  2: { length: 1 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const Homebrew = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          <animated.g
            name="mug"
            style={ {
              position: `absolute`,
              transformOrigin: `16.5575% 50%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, steps[2].start, steps[2].stop, max_x], output: [1, 1, 0, 0, -1, 0] } )
                .interpolate( x => {
                  if ( x < 0 )
                    return `rotate(${ -x * 15 }deg)`
                  return `translate3d(-${ x * 100 }%, 0, 0)`
                } )
            } }
          >
            <path
              name="glass"
              stroke={grey}
              fill={class1Fill}
              strokeLinejoin={`round`}
              className="cls-1"
              d="M48.41,48.73H44.77a4.28,4.28,0,0,0-.81.08h0V44.18H17V77.67A33.53,33.53,0,0,0,30,80.23a33.11,33.11,0,0,0,14-2.69v-6a4.28,4.28,0,0,0,.81.08h3.64a4,4,0,0,0,4-4V52.73A4,4,0,0,0,48.41,48.73Zm.82,18.38a1,1,0,0,1-1,1H45a1,1,0,0,1-1-1V53.29a1,1,0,0,1,1-1h3.27a1,1,0,0,1,1,1Z"/>
            <path
              name="beer"
              stroke={class2Stroke}
              fill={class2Fill}
              strokeLinejoin={`round`}
              className="cls-2"
              d="M40.77,69.44v4.25A24.62,24.62,0,0,1,30.08,76a25.6,25.6,0,0,1-9.87-2V44.18H40.77V69.44Z"
            />
            <line
              strokeMiterlimit={10}
              strokeWidth={2.25}
              stroke={class3Stroke}
              fill={`none`}
              strokeLinecap={`round`}
              className="cls-3"
              x1="22.83" y1="50.54" x2="22.83" y2="72.49"
            />
            <path
              fill={class4Fill}
              stroke={grey}
              strokeLinejoin={`round`}
              strokeLinecap={`round`}
              className="cls-4"
              d="M33.52,23.82c-.1.06-2,1.54-1.92,5.75l.35,0a8,8,0,0,1,4.72-1.38,5.54,5.54,0,0,1,3.14,1.13l.13.09c3.85,2.57,4.23,8.27,4.26,9.38v.24l-.18.16a21.86,21.86,0,0,1-12.22,5.11q-.86.06-1.68.06a22.17,22.17,0,0,1-13.65-4.88l-.19-.15v-.25c0-.27.16-6.56,4.2-9.34,2.25-1.54,5.24-1.66,8.87-.35l.58,0c0-4.73,2.47-6.88,2.59-7l1,1.32"
            />
            <path
              name="foam"
              stroke={grey}
              fill={class1Fill}
              strokeLinejoin={`round`}
              className="cls-1"
              d="M47.6,42.27a3.46,3.46,0,0,0-3.46-3.46,3.51,3.51,0,0,0-2.23.82,4.34,4.34,0,0,0-8.56,1,5.32,5.32,0,0,0,.06.56,4.2,4.2,0,0,0-7.77-.76,4.2,4.2,0,0,0,.06-.62,4.3,4.3,0,0,0-8.53-.73,3.46,3.46,0,0,0-1.08,6.7h0a48.13,48.13,0,0,0,13.87,2.34c1,0,2,0,2.94-.11a3.61,3.61,0,0,0,2.39,2.34v.93a2,2,0,1,0,4,0V49.12A3.57,3.57,0,0,0,40.05,47a46.79,46.79,0,0,0,5.42-1.48h0A3.46,3.46,0,0,0,47.6,42.27Z"
            />
            <path
              fill={class4Fill}
              stroke={grey}
              strokeLinejoin={`round`}
              strokeLinecap={`round`}
              className="cls-4"
              d="M29.36,29.42A9.45,9.45,0,0,0,27.49,23a9.3,9.3,0,0,0-4.66-3.2,6.91,6.91,0,0,0-.13,3C23.52,27.37,29,29.29,29.36,29.42Z"
            />
          </animated.g>
          <animated.g
            name="Letters"
            fill={lightYellow}
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x ),
            } }
          >
            <path className="cls-5" d="M70.92,58.73V52.19H65v6.54H60V41.82h5v6.42h6V41.82h5V58.73Z"/>
            <path className="cls-5" d="M77.64,52.13c0-4.32,2.7-6.9,6.91-6.9s6.9,2.56,6.9,6.9-2.61,6.93-6.9,6.93S77.64,56.57,77.64,52.13Zm8.93,0c0-2.18-.78-3.46-2-3.46s-2,1.28-2,3.46.76,3.47,2,3.47S86.57,54.38,86.57,52.14Z"/>
            <path className="cls-5" d="M93,45.56h4.69v2.65h.09a3.86,3.86,0,0,1,3.77-2.91,3.37,3.37,0,0,1,3.66,2.88h.1a4,4,0,0,1,4-2.88,4.22,4.22,0,0,1,4.34,4.52v8.91h-4.81V51.07c0-1.27-.55-1.91-1.64-1.91s-1.62.72-1.62,1.91v7.66H101V51.07c0-1.26-.57-1.91-1.63-1.91s-1.63.73-1.63,1.91v7.66H93Z"/>
            <path className="cls-5" d="M128.46,54.48c-.41,2.82-2.89,4.58-6.47,4.58-4.3,0-6.87-2.57-6.87-6.85s2.59-7,6.72-7,6.68,2.6,6.68,6.63v1.3h-8.76v.31a2.2,2.2,0,0,0,2.3,2.28,2.12,2.12,0,0,0,2.11-1.27Zm-8.63-3.93H124a2,2,0,0,0-2.1-2A2.08,2.08,0,0,0,119.83,50.55Z"/>
            <path className="cls-5" d="M135,56.46h-.1v2.27h-4.8V40.94h4.8v7h.1a4,4,0,0,1,3.92-2.56c3.33,0,5.18,2.43,5.18,6.77s-1.84,6.78-5.12,6.78A4,4,0,0,1,135,56.46Zm-.12-4.3c0,1.88.83,3,2.16,3s2.14-1.18,2.14-3.06-.84-3-2.14-3S134.89,50.28,134.88,52.16Z"/>
            <path className="cls-5" d="M145.62,45.56h4.69v2.58h.1c.49-1.87,1.51-2.77,3.08-2.77a3.18,3.18,0,0,1,1.13.19v4a3.77,3.77,0,0,0-1.41-.27,2.48,2.48,0,0,0-2.78,2.79v6.61h-4.81Z"/>
            <path className="cls-5" d="M168.55,54.48c-.41,2.82-2.89,4.58-6.47,4.58-4.3,0-6.87-2.57-6.87-6.85s2.59-7,6.72-7,6.68,2.6,6.68,6.63v1.3h-8.76v.31a2.2,2.2,0,0,0,2.3,2.28,2.13,2.13,0,0,0,2.11-1.27Zm-8.63-3.93h4.2a2,2,0,0,0-2.1-2A2.08,2.08,0,0,0,159.92,50.55Z"/>
            <path className="cls-5" d="M186.68,58.73h-5.22l-1.86-8.54h-.1l-1.84,8.54h-5.12l-3.35-13.17h4.86l1.43,8.95h.1l1.77-8.95h4.58l1.8,8.95h.1l1.43-8.95H190Z"/>
          </animated.g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default Homebrew