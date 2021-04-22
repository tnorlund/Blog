/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'

const darkMode = false

const fill = darkMode ? `#e5e5e5` :  `#201e1f`
const min_x = 0
const max_x = 1

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.g id="W3C" style={ { opacity: props.x.to( { range: [min_x, max_x], output: [0, 1] } ) } } >
            <path fill={`#005b9d`} d="M69.51,22.73l9.82,33.38,9.82-33.38h26.62v3.32l-10,17.27a13.92,13.92,0,0,1,8,6.16A19.79,19.79,0,0,1,116.44,60a19.76,19.76,0,0,1-4,12.53,12.44,12.44,0,0,1-10.26,5.08,12.31,12.31,0,0,1-8.26-3,17.63,17.63,0,0,1-5.21-8.16l5.55-2.3A12.58,12.58,0,0,0,97.52,69a6.79,6.79,0,0,0,4.7,1.8c1.9,0,3.5-1.07,4.81-3.19A14.27,14.27,0,0,0,109,60c0-3.29-.7-5.85-2.09-7.65q-2.45-3.18-7.66-3.18h-2.7V45.89L106,29.5H94.57l-.65,1.11L80,77.57h-.68l-10.16-34L59,77.57h-.68L42.09,22.73H49.2L59,56.11l6.64-22.48-3.25-10.9h7.1Z" />
            <path fill={fill} d="M152.71,22.73a4.92,4.92,0,0,0-3.6,1.47,5.29,5.29,0,0,0-1.57,3.71,5.24,5.24,0,0,0,5.17,5.19,5.29,5.29,0,0,0,3.68-1.54,5,5,0,0,0,1.52-3.64,5.19,5.19,0,0,0-1.5-3.65,5.08,5.08,0,0,0-3.7-1.54Zm4.5,5.23a4.32,4.32,0,0,1-1.3,3.12,4.56,4.56,0,0,1-3.23,1.33,4.54,4.54,0,0,1-4.46-4.49,4.62,4.62,0,0,1,1.37-3.23,4.33,4.33,0,0,1,3.13-1.28,4.49,4.49,0,0,1,4.5,4.55Zm-4.36-3.08h-2.21v5.87h1.11v-2.5h1.09l1.2,2.5h1.23L154,28.07a1.53,1.53,0,0,0,1.34-1.58c0-1.06-.8-1.61-2.44-1.61Zm-.2.72c1,0,1.51.28,1.51,1s-.47.94-1.48.94h-.94V25.6Z" />
            <path fill={fill} d="M144,22.42l1.16,7-4.08,7.8a15,15,0,0,0-4.17-5.14c-2.18-1.55-3.61-1.88-5.84-1.42-2.87.59-6.12,4-7.54,8.24a28.31,28.31,0,0,0-1.77,9.75,22,22,0,0,0,.47,5.73,25.48,25.48,0,0,1-2.45-11.29,28.33,28.33,0,0,1,3-13.41c2-3.76,4.85-6,7.42-6.29a8.44,8.44,0,0,1,6.38,2.39A20.55,20.55,0,0,1,140,30.43l4-8Z" />
            <path fill={fill} d="M144.5,62a34.11,34.11,0,0,1-2.93,4.46A17.84,17.84,0,0,1,136,71a10.43,10.43,0,0,1-6.23,1.06,12.16,12.16,0,0,1-5.52-2.24,21.16,21.16,0,0,1-4-4c-1.16-1.62-3-4.87-3-4.87s1,3.25,1.63,4.64a31.54,31.54,0,0,0,3,5.34c1.48,2,4.33,5.38,8.68,6.15a11.08,11.08,0,0,0,8.06-1.66A21.91,21.91,0,0,0,142,72.65a25.07,25.07,0,0,0,2.54-3.34c.39-.62,1-1.86,1-1.86l-1-5.41Z" />
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}