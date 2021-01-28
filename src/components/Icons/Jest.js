/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const red = `#c21325`

const Jest = () => {
  const [ref, inView] = useInView( {
    threshold: 1,
  } )
  return <div
    ref={ref}
    style={ {
      height: `200pt`,
    } }
  >
    <Spring
      native
      to={{ x: inView ?  1 : 0 }}
    >
      { ( props ) => (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 100"
          preserveAspectRatio="YMax"
        >
          <animated.polygon
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [0, 0.5, 1],
                  output: [0, 1, 1]
                } )
                .interpolate( x => x )
            } }
            name="sock"
            fill={`var(--color-background)`}
            className="inside"
            points="68.63 34.62 62.21 47.75 54.4 25.02 82.75 25.02 75.16 47.77 68.63 34.62"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [0, 0.5, 1],
                  output: [0, 1, 1]
                } )
                .interpolate( x => x )
            } }
            name="sock"
            fill={red}
            className="outside"
            d="M81.09,26.21,74.94,44.65,68.63,31.93,62.4,44.65,56.06,26.21h25m3.31-2.38H52.73L53.81,27l6.34,18.44L62,50.86l2.52-5.16,4.1-8.39,4.17,8.4,2.56,5.17L77.2,45.4,83.35,27l1.05-3.13Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [0, 0.5, 1],
                  output: [0, 1, 1]
                } )
                .interpolate( x => x )
            } }
            name="boot"
            fill={`var(--color-background)`}
            className="inside"
            d="M47.65,75c-7.53-.1-9.12-5.16-9.13-9.38,0-5.89,5.1-15.93,5.32-16.35l2.2.87c-2.73,9.48,1.18,12.64,2.57,13.43a46.51,46.51,0,0,0,7-4.62c1.4-1.32,5.26-6.94,6.63-9l.35-.53H78l.36.41c.15.17,3.74,4.29,3.74,8.49,0,5.67-6.82,8-10.86,8.57-2.69.35-11.51,4-14.69,5.41C56,72.55,50.81,75,47.74,75Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [0, 0.5, 1],
                  output: [0, 1, 1]
                } )
                .interpolate( x => x )
            } }
            name="boot"
            fill={red}
            className="outside"
            d="M44.9,49.79c-3.6,12.48,3.75,15.1,3.75,15.1s5.72-3.1,7.83-5.09c1.8-1.71,6.8-9.2,6.8-9.2h14.2s3.46,3.92,3.46,7.71c0,5.06-6.75,7-9.83,7.39-3.45.44-15,5.5-15,5.5s-5.47,2.59-8.36,2.59h-.07c-2.94,0-7.94-.87-8-8.19,0-5.67,5.19-15.81,5.19-15.81m33.66-1.57H62l-.7,1.06a90,90,0,0,1-6.46,8.79,41.77,41.77,0,0,1-6.17,4.08C47.34,61.09,45,58,47.19,50.45l-4.41-1.74c-.56,1.09-5.46,10.82-5.45,16.89,0,6.63,3.77,10.48,10.31,10.57h.1c3.33,0,8.77-2.53,9.38-2.82,4.28-1.87,12-5,14.3-5.29,4.42-.56,11.9-3.26,11.9-9.75,0-4.56-3.64-8.81-4-9.28l-.71-.81Z"
          />
          {/* Dots */}
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `22.44885% 50%`,
              transform: props.x
                .interpolate( {
                  range: [0, 0.166666666666667, 0.333333333333334, 0.500000000000001, 1],
                  output: [0, 1, 1, 1, 1]
                } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="dot_left"
            fill={`var(--color-background)`}
            className="inside"
            d="M44.9,54.37a4.79,4.79,0,1,1,4.79-4.78A4.79,4.79,0,0,1,44.9,54.37Z"
          />
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `22.44885% 50%`,
              transform: props.x
                .interpolate( {
                  range: [0, 0.166666666666667, 0.333333333333334, 0.500000000000001, 1],
                  output: [0, 1, 1, 1, 1]
                } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="dot_left"
            fill={red}
            className="outside"
            d="M44.9,46a3.6,3.6,0,1,1-3.6,3.59A3.6,3.6,0,0,1,44.9,46m0-2.39a6,6,0,1,0,6,6,6,6,0,0,0-6-6Z"
          />

          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `30.3783% 50%`,
              transform: props.x
                .interpolate( {
                  range: [0, 0.166666666666667, 0.333333333333334, 0.500000000000001, 1],
                  output: [0, 0, 1, 1, 1]
                } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="dot_center"
            fill={`var(--color-background)`}
            className="outside"
            d="M60.76,54.37a4.79,4.79,0,1,1,4.79-4.78A4.79,4.79,0,0,1,60.76,54.37Z"
          />
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `38.29355% 50%`,
              transform: props.x
                .interpolate( {
                  range: [0, 0.166666666666667, 0.333333333333334, 0.500000000000001, 1],
                  output: [0, 0, 1, 1, 1]
                } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="dot_center"
            fill={red}
            className="outside"
            d="M60.76,46a3.6,3.6,0,1,1-3.6,3.59A3.6,3.6,0,0,1,60.76,46m0-2.39a6,6,0,1,0,6,6,6,6,0,0,0-6-6Z"
          />

          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `38.29355% 50%`,
              transform: props.x
                .interpolate( {
                  range: [0, 0.166666666666667, 0.333333333333334, 0.500000000000001, 1],
                  output: [0, 0, 0, 1, 1]
                } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="dot_right"
            fill={`var(--color-background)`}
            className="inside"
            d="M76.59,54.37a4.79,4.79,0,1,1,4.79-4.78A4.79,4.79,0,0,1,76.59,54.37Z"
          />
          <animated.path
            style={ {
              position: `absolute`,
              transformOrigin: `30.3783% 50%`,
              transform: props.x
                .interpolate( {
                  range: [0, 0.166666666666667, 0.333333333333334, 0.500000000000001, 1],
                  output: [0, 0, 0, 1, 1]
                } )
                .interpolate( x => `scale(${x}, ${x})` )
            } }
            name="dot_right"
            fill={red}
            className="outside"
            d="M76.59,46A3.6,3.6,0,1,1,73,49.58,3.6,3.6,0,0,1,76.59,46m0-2.39a6,6,0,1,0,6,6,6,6,0,0,0-6-6Z"
          />
          {/* Letters */}
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [0, 1],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="J"
            fill={red}
            className="letter"
            d="M97.34,63.26c-5.57,0-8.27-3.63-8.38-9.42a.41.41,0,0,1,.4-.41H93a.42.42,0,0,1,.41.41c.08,3.56,1.08,5.68,4,5.68s3.89-2.08,3.93-6.09l.08-6.53-.23-9.75a.42.42,0,0,1,.41-.41h4a.41.41,0,0,1,.4.41l-.18,9.75.07,6.57C105.91,60,103,63.26,97.34,63.26Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [0, 1],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="E"
            fill={red}
            className="letter"
            d="M127.72,56.18a.38.38,0,0,1,.37.4c-.55,3.64-3.67,6.57-8.75,6.57-6.2,0-9.5-4.12-9.5-9.94,0-6.05,3.53-10.05,9.35-10.05s9.2,3.93,9.35,10.42a.42.42,0,0,1-.41.41h-13.8c.19,4.08,1.85,6,5,6a4,4,0,0,0,4.37-3.42.48.48,0,0,1,.48-.4Zm-8.53-9.91c-2.67,0-4.23,1.64-4.71,4.71h9.24C123.57,48.5,122.12,46.27,119.19,46.27Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [0, 1],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="S"
            fill={red}
            className="letter"
            d="M140.45,63.15c-5.19,0-8.79-2.23-9-6.57a.4.4,0,0,1,.4-.4h3.53a.4.4,0,0,1,.4.4c.19,2.49,1.79,3.6,4.75,3.6,2.49,0,4-1,4-2.78,0-4.23-12.72-.48-12.72-8.35,0-3.85,3.12-5.89,8-5.89,4.67,0,8,1.93,8.31,5.86a.37.37,0,0,1-.37.41h-3.34a.45.45,0,0,1-.48-.41c-.3-1.89-1.75-3-4.2-3-2.22,0-3.63.82-3.63,2.67,0,4.12,12.72.22,12.72,8.31C148.83,60.92,145.2,63.15,140.45,63.15Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( {
                  range: [0, 1],
                  output: [0, 1]
                } )
                .interpolate( x => x )
            } }
            name="T"
            fill={red}
            className="letter"
            d="M162.63,62a.56.56,0,0,1-.41.52,9.38,9.38,0,0,1-2.92.52c-3,0-5.75-1.52-5.75-5.79l0-10.31h-2.07a.41.41,0,0,1-.41-.41V44a.41.41,0,0,1,.41-.41h2.07l-.07-4.38a.41.41,0,0,1,.41-.4h3.74a.4.4,0,0,1,.41.4l0,4.38h4.23a.41.41,0,0,1,.41.41v2.52a.41.41,0,0,1-.41.41H158l0,10.2c0,1.93.78,2.52,2.19,2.52a7.36,7.36,0,0,0,2-.26.34.34,0,0,1,.41.3Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Jest