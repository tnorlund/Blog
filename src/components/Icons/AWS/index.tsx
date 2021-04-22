/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const fill = `var(--color-text)`
const orange = `#f8991d`
const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [3, 1] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.path
            style={ {
              opacity: props.x.to( [min_x, max_x], [0, 1] )
            } }
            fill={fill}
            d="M74.06,40.27a12.19,12.19,0,0,0,.43,3.52,21,21,0,0,0,1.27,2.85,1.69,1.69,0,0,1,.27.91,1.54,1.54,0,0,1-.75,1.18L72.79,50.4a1.93,1.93,0,0,1-1,.35,1.83,1.83,0,0,1-1.18-.55,12.66,12.66,0,0,1-1.43-1.86c-.39-.67-.79-1.42-1.22-2.33A14.64,14.64,0,0,1,56.3,51.46a10.87,10.87,0,0,1-7.91-2.84A10.16,10.16,0,0,1,45.47,41a10.16,10.16,0,0,1,3.59-8.14c2.42-2.06,5.62-3.09,9.69-3.09a30.83,30.83,0,0,1,4.19.32c1.47.2,3,.51,4.55.87V28.09c0-3-.63-5.1-1.86-6.33S62.23,20,59.19,20a17.71,17.71,0,0,0-4.27.51,32.1,32.1,0,0,0-4.27,1.34,11.5,11.5,0,0,1-1.39.52,2.33,2.33,0,0,1-.63.12c-.55,0-.83-.4-.83-1.23V19.27a2.48,2.48,0,0,1,.28-1.38,2.89,2.89,0,0,1,1.1-.83,22.76,22.76,0,0,1,5-1.78,24.07,24.07,0,0,1,6.16-.75c4.71,0,8.15,1.07,10.37,3.2S74,23.11,74,27.46V40.27ZM58,46.28a12.6,12.6,0,0,0,4.07-.71A8.72,8.72,0,0,0,65.83,43a6.34,6.34,0,0,0,1.35-2.53,14.62,14.62,0,0,0,.39-3.44V35.41a30.54,30.54,0,0,0-3.64-.67,29.36,29.36,0,0,0-3.71-.24c-2.65,0-4.59.51-5.9,1.58a5.53,5.53,0,0,0-1.93,4.55A5.09,5.09,0,0,0,58,46.28Zm31.76,4.27a2.26,2.26,0,0,1-1.51-.39,3.31,3.31,0,0,1-.83-1.54L78.13,18.05a6.92,6.92,0,0,1-.36-1.58.87.87,0,0,1,1-1H82.6a2.23,2.23,0,0,1,1.54.39,3.24,3.24,0,0,1,.79,1.54l6.65,26.18,6.16-26.18a2.77,2.77,0,0,1,.76-1.54,2.76,2.76,0,0,1,1.58-.39h3.16a2.41,2.41,0,0,1,1.58.39,2.6,2.6,0,0,1,.75,1.54l6.25,26.5,6.84-26.5a3.5,3.5,0,0,1,.79-1.54,2.68,2.68,0,0,1,1.55-.39h3.67a.87.87,0,0,1,1,1,4,4,0,0,1-.08.63,5.42,5.42,0,0,1-.27,1l-9.53,30.57A3.11,3.11,0,0,1,115,50.2a2.6,2.6,0,0,1-1.51.39H110a2.43,2.43,0,0,1-1.58-.39,2.8,2.8,0,0,1-.75-1.58l-6.13-25.51L95.49,48.58a3.09,3.09,0,0,1-.75,1.58,2.5,2.5,0,0,1-1.58.39Zm50.81,1.07a26.47,26.47,0,0,1-6.09-.71,18.36,18.36,0,0,1-4.55-1.58,2.86,2.86,0,0,1-1.22-1.11,2.78,2.78,0,0,1-.24-1.11v-2c0-.83.32-1.23.91-1.23a2.16,2.16,0,0,1,.71.12c.24.08.6.24,1,.39a21.47,21.47,0,0,0,4.35,1.39,23.51,23.51,0,0,0,4.71.47,10.65,10.65,0,0,0,5.77-1.3A4.26,4.26,0,0,0,148,41.18a3.86,3.86,0,0,0-1.07-2.77,9.93,9.93,0,0,0-4-2l-5.74-1.78a12.08,12.08,0,0,1-6.33-4,9.43,9.43,0,0,1-2-5.73,8.83,8.83,0,0,1,1.06-4.39,10.3,10.3,0,0,1,2.85-3.24,12.7,12.7,0,0,1,4.11-2.06,17.48,17.48,0,0,1,5-.67,19.64,19.64,0,0,1,2.65.16c.91.12,1.74.27,2.57.43s1.54.4,2.25.63a8.47,8.47,0,0,1,1.66.72,3.3,3.3,0,0,1,1.19,1,2.09,2.09,0,0,1,.35,1.3v1.86c0,.83-.31,1.26-.91,1.26a4,4,0,0,1-1.5-.47,18,18,0,0,0-7.59-1.54,10.25,10.25,0,0,0-5.26,1.1,3.82,3.82,0,0,0-1.86,3.52,3.74,3.74,0,0,0,1.19,2.81A11.9,11.9,0,0,0,141,29.4l5.61,1.78A12,12,0,0,1,152.71,35a8.92,8.92,0,0,1,1.82,5.54,10.1,10.1,0,0,1-1,4.59,10.72,10.72,0,0,1-2.88,3.48,12.69,12.69,0,0,1-4.39,2.21A18.94,18.94,0,0,1,140.57,51.62Z"
          />
          <a.path
            style={ {
              position: `absolute`,
              transformOrigin: `47.3849% 73.3402%`,
              transform: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={orange}
            d="M148.05,70.84c-13,9.61-31.92,14.71-48.17,14.71a87.11,87.11,0,0,1-58.8-22.42C39.85,62,41,60.52,42.42,61.39A118.58,118.58,0,0,0,101.26,77a117.41,117.41,0,0,0,44.89-9.18C148.32,66.85,150.18,69.26,148.05,70.84Z"
          />
          <a.path
            style={ {
              position: `absolute`,
              transformOrigin: `74.1541% 69.7518%`,
              transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={orange}
            d="M153.46,64.67c-1.66-2.13-11-1-15.22-.51-1.27.16-1.46-.95-.32-1.78,7.44-5.22,19.66-3.72,21.08-2s-.4,14-7.36,19.85c-1.06.91-2.09.44-1.62-.75C151.61,75.59,155.12,66.77,153.46,64.67Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}