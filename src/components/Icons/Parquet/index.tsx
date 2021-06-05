/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const blue = `#5faade`
const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1, 1, 1, 1, 1, 1] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[0].start, steps[0].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 }%,${ x * 100 * 0.980713704005331 }%, 0)` ) } }
            fill={blue} points="29.32 64.41 33.52 68.64 57.36 44.33 53.55 42.23 29.32 64.41"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 * -1.0196655720379 }%,${ x * 100 }%, 0)` ) } }
            fill={blue} points="24.28 59.29 27.9 62.98 41.62 50.92 37.98 48.27 24.28 59.29"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 * 1.0196655720379 }%,${ x * -100 }%, 0)` ) } }
            fill={blue} points="39.07 47.38 42.71 49.95 52.24 41.53 48.77 39.62 39.07 47.38"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 * -1.0196655720379 }%,${ x * 100 }%, 0)` ) } }
            fill={blue} points="19.9 54.83 23.09 58.06 29.86 52.81 26.65 50.06 19.9 54.83"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[2].start, steps[2].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 * 0.915064095952073 }%,${ x * -100 }%, 0)` ) } }
            fill={blue} points="31.14 51.8 47.55 39 44.39 37.27 27.93 49.07 31.14 51.8"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 * -1.0196655720379 }%,${ x * 100 }%, 0)` ) } }
            fill={blue} points="16.06 50.91 18.85 53.77 38.24 40.23 35.33 38.35 16.06 50.91"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 * 0.915064095952073 }%,${ x * -100 }%, 0)` ) } }
            fill={blue} points="36.37 37.76 39.2 39.53 43.34 36.7 40.47 35.08 36.37 37.76"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[4].start, steps[4].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 * -1.0196655720379 }%,${ x * 100 }%, 0)` ) } }
            fill={blue} points="12.65 47.42 15.15 49.93 28.48 41.54 25.91 39.58 12.65 47.42"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[4].start, steps[4].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * 100 * 0.915064095952073 }%,${ x * -100 }%, 0)` ) } }
            fill={blue} points="26.98 38.95 29.62 40.79 39.42 34.59 36.86 33.15 26.98 38.95"
          />
          <a.polygon
            style={ { transform: props.x.to( [min_x, steps[5].start, steps[5].stop, max_x], [1, 1, 0, 0] ).to( x => `translate3d(${ x * -100 }%,${ x * 100 * -0.980713704005331 }%, 0)` ) } }
            fill={blue} points="9.59 44.26 11.79 46.56 35.92 32.67 33.52 31.36 9.59 44.26"
          />
          <a.g
            style={ { opacity: props.x.to( [min_x, max_x], [0, 1] ) } } fill={blue}
          >
            <path className="cls-1" d="M67.24,32.24h11c5.11,0,7.89,4.09,7.89,9s-2.82,8.89-7.89,8.89h-6v10h-5Zm10.33,5.09H73.16a.91.91,0,0,0-.91.91V44.1a.91.91,0,0,0,.91.91h4.41c2,0,3.45-1.5,3.45-3.84A3.52,3.52,0,0,0,77.57,37.33Z"/>
            <path className="cls-1" d="M98.68,58a6.54,6.54,0,0,1-5.39,2.59c-2.72,0-5.92-2.17-5.92-6.68,0-4.71,3.2-6.42,5.92-6.42a7.06,7.06,0,0,1,4.28,1.3.68.68,0,0,0,1.11-.53V47.14c0-2-1.48-3.38-3.74-3.38a6.62,6.62,0,0,0-5,2.38l-1.69-3.55a10.18,10.18,0,0,1,7.44-3.17c3.87,0,7.43,1.84,7.43,7.64v13H98.68Zm0-4.6a1.77,1.77,0,0,0-.51-1.28A4.49,4.49,0,0,0,95.08,51a3,3,0,1,0,0,6,4.28,4.28,0,0,0,3.43-1.51.94.94,0,0,0,.17-.54Z"/>
            <path className="cls-1" d="M112.11,60.08h-4.48V39.92h4.48V42a.22.22,0,0,0,.4.14,6.8,6.8,0,0,1,5-2.67v5.18a4.49,4.49,0,0,0-1.23-.17,5.45,5.45,0,0,0-4.12,2.18"/>
            <path className="cls-1" d="M132,67.76V58.19a.23.23,0,0,0-.41-.13,6,6,0,0,1-4.84,2.52c-4.34,0-7.51-3.88-7.51-10.6s3.17-10.56,7.51-10.56c2.27,0,4.09,1.71,4.85,2.57a.23.23,0,0,0,.4-.16V39.92h4.51V67.76Zm0-20.66a2,2,0,0,0-.48-1.33,4.73,4.73,0,0,0-3.36-1.63c-2.54,0-4.3,2.37-4.3,5.84s1.76,5.89,4.3,5.89a4.48,4.48,0,0,0,2.38-.79A3.3,3.3,0,0,0,132,52.33Z"/>
            <path className="cls-1" d="M152.49,58.18a.22.22,0,0,0-.39-.16,7.44,7.44,0,0,1-5.6,2.56c-3.73,0-5.5-2.42-5.5-6.34V39.92h4.48V52.15c0,2.8,1.23,3.72,3.14,3.72a4.8,4.8,0,0,0,3.87-2.3V39.92H157V60.08h-4.48Z"/>
            <path className="cls-1" d="M169.16,39.42c5.08,0,8.53,4.51,8.53,11.1v1.17H165.31a.24.24,0,0,0-.24.27,4.85,4.85,0,0,0,4.87,4.41,6.38,6.38,0,0,0,4.54-2l2,3.43a9.63,9.63,0,0,1-7,2.79c-5.19,0-9.1-4.13-9.1-10.6C160.35,44.14,164,39.42,169.16,39.42Zm-3.93,8.68h7.87a.23.23,0,0,0,.24-.25c-.19-1.88-1.34-4.22-4.18-4.22-2.66,0-3.87,2.26-4.16,4.21A.23.23,0,0,0,165.23,48.1Z"/>
            <path className="cls-1" d="M181.85,55.07V45a.46.46,0,0,0-.46-.46H179V39.92h2.36a.46.46,0,0,0,.46-.46V34.41h4.51v5.05a.47.47,0,0,0,.46.46h3v4.63h-3a.47.47,0,0,0-.46.46v8.64c0,1.26.57,2.22,1.55,2.22a2.21,2.21,0,0,0,1.55-.59l.95,4a5,5,0,0,1-3.73,1.29C183.54,60.58,181.85,58.66,181.85,55.07Z"/>
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}