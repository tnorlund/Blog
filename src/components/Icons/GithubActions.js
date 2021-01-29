/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const blue = `#4c80c1`
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 2 },
  2: { length: 2 },
  3: { length: 2 },
  4: { length: 2 },
  5: { length: 2 },
  6: { length: 2 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const GithubActions = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring native to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          {/** Step 1
             * Expand first circle
             */}
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `13.5873% 33.6141%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="circle"
            className="Step1"
            fill={blue}
            d="M27.18,24.6a9,9,0,1,1-9,9,9,9,0,0,1,9-9m0-1.56A10.58,10.58,0,1,0,37.76,33.61,10.58,10.58,0,0,0,27.18,23Z"
          />
          {/** Step 2
           * Draw the first two Actions's circles and the Play button.
          */}
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `14.0086% 33.7537%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="play"
            className="Step1"
            fill={blue}
            d="M25.09,30.37,31,33.75l-5.86,3.39V30.37m0-1.56a1.56,1.56,0,0,0-1.56,1.56v6.77a1.57,1.57,0,0,0,.78,1.35,1.55,1.55,0,0,0,1.56,0l5.86-3.38a1.57,1.57,0,0,0,0-2.71L25.87,29a1.55,1.55,0,0,0-.78-.21Z"
          />
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `20.81625% 69.51%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="bottomCircle"
            className="Step2"
            fill={blue}
            d="M41.64,63.62a5.89,5.89,0,1,1-5.9,5.89,5.9,5.9,0,0,1,5.9-5.89m0-1.56a7.45,7.45,0,1,0,7.45,7.45,7.45,7.45,0,0,0-7.45-7.45Z"
          />
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `20.81625% 51.8067%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="topCircle"
            className="Step2"
            fill={blue}
            d="M41.64,45.91a5.9,5.9,0,1,1-5.9,5.9,5.91,5.91,0,0,1,5.9-5.9m0-1.56a7.46,7.46,0,1,0,7.45,7.46,7.46,7.46,0,0,0-7.45-7.46Z"
          />
          {/** Step 3
             * Draw the line from the Play circle and the first two actions.
             * Draw the Top Check mark and the left dot
             */}
          <animated.path
            strokeDashoffset={
              props.x
                .interpolate( { range: [max_x, steps[3].start, steps[3].stop, min_x], output: [100, 100, 50, 50] } )
                .interpolate( x => x )
            }
            strokeDasharray={`100`}
            name="topLine"
            fill={`none`}
            stroke={blue}
            strokeWidth={`1.5625`}
            className="Step3"
            d="M27.18,44.19s0,7.62,7,7.62"
          />
          <animated.path
            strokeDashoffset={
              props.x
                .interpolate( { range: [max_x, steps[3].start, steps[3].stop, min_x], output: [100, 100, 50, 50] } )
                .interpolate( x => x )
            }
            strokeDasharray={`100`}
            name="bottomLine"
            fill={`none`}
            stroke={blue}
            strokeWidth={`1.5625`}
            className="Step3"
            d="M34.18,69.51c-7,0-7-6.42-7-6.42V44.19"
          />
          <animated.polyline
            strokeDashoffset={
              props.x
                .interpolate( { range: [max_x, steps[3].start, steps[3].stop, min_x], output: [100, 100, 50, 50] } )
                .interpolate( x => x )
            }
            strokeDasharray={`100`}
            name="checkMark"
            fill={`none`}
            stroke={blue}
            strokeWidth={`1.5625`}
            strokeLinecap={`round`}
            className="Step3"
            points="43.96 50.03 40.84 53.15 39.32 51.65"
          />
          <animated.circle
            style={ {
              position: `absolute`,
              transformOrigin: `19.8057% 69.5021%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            className="Step3"
            fill={blue}
            cx="39.62" cy="69.5" r="1.25"
          />
          {/** Step 4
             * Draw the top right circle and the right dot.
             */}
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `30.76085% 51.8067%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="topCircle"
            className="Step5"
            fill={blue}
            d="M61.53,45.91a5.9,5.9,0,1,1-5.9,5.9,5.91,5.91,0,0,1,5.9-5.9m0-1.56A7.46,7.46,0,1,0,69,51.81a7.46,7.46,0,0,0-7.45-7.46Z"
          />
          <animated.circle
            style={ {
              position: `absolute`,
              transformOrigin: `21.69275% 69.5021%`,
              transform: props.x
                .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            className="Step5"
            fill={blue}
            cx="43.39" cy="69.51" r="1.25"
          />
          {/** Step 5
             * Draw the right check and the line connecting it's circle to the previous circle.
             */}
          <animated.line
            strokeDashoffset={
              props.x
                .interpolate( { range: [max_x, steps[5].start, steps[5].stop, min_x], output: [100, 100, 50, 50] } )
                .interpolate( x => x )
            }
            strokeDasharray={`100`}
            name="actionLine"
            fill={`none`}
            stroke={blue}
            strokeWidth={`1.5625`}
            className="Step5"
            x2="49.09" y2="51.81" x1="54.07" y1="51.81"
          />
          <animated.polyline
            strokeDashoffset={
              props.x
                .interpolate( {
                  range: [max_x, steps[5].start, steps[5].stop, min_x],
                  output: [100, 100, 50, 50]
                } )
                .interpolate( x => x )
            }
            strokeDasharray={`100`}
            name="checkMark"
            fill={`none`}
            stroke={blue}
            strokeWidth={`1.5625`}
            strokeLinecap={`round`}
            className="Step6"
            points="63.84 50.19 60.72 53.3 59.2 51.81"
          />

          {/** Step 6
             *
             * Fade in the circle and line butt.
             */}
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 0.5, 0.5] } )
                .interpolate( x => x )
            } }
            name="bottomRight-Circle"
            fill={blue}
            className="bottomCircle"
            d="M61.53,62a7.46,7.46,0,0,0-7.42,6.68h0l-2.66,0a.78.78,0,0,0,0,1.56h2.69A7.46,7.46,0,1,0,61.53,62Zm0,13.35a5.9,5.9,0,1,1,5.89-5.9A5.91,5.91,0,0,1,61.53,75.39Z"
          />
          {/* GitHub */}
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="G"
            fill={`var(--color-text)`}
            className="letters"
            d="M83.08,47a4.78,4.78,0,0,1-2.4-.6c-1.82-1.06-2.74-3.36-2.74-6.84,0-3,.86-5.14,2.56-6.3,2.65-1.82,6.24-.46,6.39-.4l-.72,1.86s-2.78-1-4.55.19c-1.12.77-1.68,2.33-1.68,4.65,0,1.86.3,4.27,1.74,5.11,1.17.68,2.88.19,3.85-.24V41.06H84.29v-2h3.24v6.53l-.51.29A8.85,8.85,0,0,1,83.08,47Z"
          />
          <animated.polygon
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="i-top"
            fill={`var(--color-text)`}
            className="letters"
            points="96.36 45 96.36 35.6 91.6 35.6 91.6 37.59 94.36 37.59 94.36 45 90.73 45 90.73 47 94.36 47 96.36 47 100.22 47 100.22 45 96.36 45"
          />
          <animated.rect
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="i-bottom"
            fill={`var(--color-text)`}
            className="letters" x="94.36" y="31.56" width="2" height="2.77"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="t"
            fill={`var(--color-text)`}
            className="letters"
            d="M109.84,37.59v-2h-3.26V33.33h-2V35.6h-2.24v2h2.24v6.25A3,3,0,0,0,107.65,47h2.19V45h-2.19a1,1,0,0,1-1.07-1.16V37.59Z"
          />
          <animated.polygon
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="H"
            fill={`var(--color-text)`}
            className="letters"
            points="120.92 32.03 120.92 37.67 115.63 37.67 115.63 32.03 113.64 32.03 113.64 47 115.63 47 115.63 39.67 120.92 39.67 120.92 47 122.92 47 122.92 32.03 120.92 32.03"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="u"
            fill={`var(--color-text)`}
            className="letters"
            d="M132.48,36.59v8a11.46,11.46,0,0,1-2.85.82,2.2,2.2,0,0,1-1.38-.19c-.21-.14-.27-.44-.28-1h0V36.59h-2v7.64h0a3.87,3.87,0,0,0,.31,1.35,1.6,1.6,0,0,0,.43.66,1.71,1.71,0,0,0,.63.5,3.84,3.84,0,0,0,2.55.2,12.15,12.15,0,0,0,2.58-.95v1h2V36.59Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="b"
            fill={`var(--color-text)`}
            className="letters"
            d="M146.24,38.54a4.22,4.22,0,0,0-3.36-1.66,3.91,3.91,0,0,0-3.07,1.82V32h-2V47h2V45.25a3.87,3.87,0,0,0,3.07,1.81,4.18,4.18,0,0,0,3.36-1.65,5.67,5.67,0,0,0,0-6.87Zm-1.51,5.74a2.45,2.45,0,0,1-1.85,1.16,2.66,2.66,0,0,1-2.11-1,3.9,3.9,0,0,1,0-5,2.66,2.66,0,0,1,2.11-1,2.45,2.45,0,0,1,1.85,1.16,4.3,4.3,0,0,1,0,4.61Z"
          />
          {/* Actions */}
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="A"
            fill={`var(--color-text)`}
            className="letters"
            d="M80,68.2l1.19-3.64h4.77l1.29,3.64h2.11l-5-14.06-1.89,0-4.59,14Zm3.48-10.63,1.77,5H81.8Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="c"
            fill={`var(--color-text)`}
            className="letters"
            d="M98.79,65.75a5.85,5.85,0,0,1-2.59.45c-2.57,0-2.85-2.5-2.85-3.58,0,0,.08-3.59,2.85-3.59a4.91,4.91,0,0,1,2.59.42V57.32A10.23,10.23,0,0,0,96.2,57c-3.53,0-4.84,3.42-4.84,5.58,0,2.57,1.27,5.58,4.84,5.58a9.16,9.16,0,0,0,2.59-.33Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="t"
            fill={`var(--color-text)`}
            className="letters"
            d="M110.73,59V57h-3.26V54.77h-2V57h-2.24v2h2.24v6.25a3,3,0,0,0,3.06,3.16h2.2v-2h-2.2a1,1,0,0,1-1.06-1.16V59Z"
          />
          <animated.polygon
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="i-bottom"
            fill={`var(--color-text)`}
            className="letters"
            points="120.94 66.44 120.94 57.04 116.09 57.04 116.09 59.03 118.94 59.03 118.94 66.44 115.31 66.44 115.31 68.44 118.94 68.44 120.94 68.44 124.8 68.44 124.8 66.44 120.94 66.44"
          />
          <animated.rect
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="i-top"
            fill={`var(--color-text)`}
            className="letters"
            x="118.94" y="53" width="2" height="2.77"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="o"
            fill={`var(--color-text)`}
            className="letters"
            d="M131,58.81c1.14,0,2.42,1.57,2.42,3.82s-1.28,3.81-2.42,3.81-2.42-1.57-2.42-3.81,1.27-3.82,2.42-3.82m0-2c-2.44,0-4.42,2.6-4.42,5.82s2,5.81,4.42,5.81,4.42-2.6,4.42-5.81-2-5.82-4.42-5.82Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="n"
            fill={`var(--color-text)`}
            className="letters"
            d="M146.83,59.77a3.58,3.58,0,0,0-1.38-2.09,3.18,3.18,0,0,0-2.52-.37,6.71,6.71,0,0,0-2.13,1V57h-2v11.4h2V60a7.88,7.88,0,0,1,2.46-.86c1-.06,1.25.22,1.6,1.19a12.47,12.47,0,0,1,.25,3.41v4.7h2v-4.7A15.45,15.45,0,0,0,146.83,59.77Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [min_x, max_x],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="s"
            fill={`var(--color-text)`}
            className="letters"
            d="M154.76,61.62c-.33,0-1.95-.09-1.95-1.5a1.25,1.25,0,0,1,.2-.7,1.91,1.91,0,0,1,1.69-.61h0a10,10,0,0,1,2.66.52l.93.34V57.55l-.26-.1a11.75,11.75,0,0,0-3.33-.64h0a3.73,3.73,0,0,0-3.36,1.51,3.28,3.28,0,0,0-.53,1.8c0,2.56,2.36,3.5,3.94,3.5.2,0,1.95,0,1.95,1.5a1.29,1.29,0,0,1-.18.8c-.23.33-.84.51-1.72.51h0a9.29,9.29,0,0,1-2.65-.53l-.94-.33v2.12l.26.09a11.42,11.42,0,0,0,3.33.65h0a3.86,3.86,0,0,0,3.33-1.33,3.23,3.23,0,0,0,.55-2C158.69,62.55,156.34,61.62,154.76,61.62Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default GithubActions