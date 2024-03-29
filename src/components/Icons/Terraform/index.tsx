/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const fill = `var(--color-text)`
const light = `#5a5ba8`
const dark = `#45489e`

const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [1,1,1,1] )


export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.polygon
            style={ {
              transformOrigin: `9.33275% 35.4176%`,
              transform: props.x
                .to( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [1, 1, 0, 0] } )
                .to( x => `translate3d(-${x * 100}%,-${x * 58.1167190565877}%, 0)` )
            } }
            fill={light}
            className="cls-2"
            points="11.05 22.13 26.29 30.99 26.29 48.7 11.05 39.85 11.05 22.13"
          />
          <a.polygon
            style={ {
              transform: props.x
                .to( { range: [min_x, steps[0].start, steps[0].stop, max_x], output: [120, 120, 0, 0] } )
                .to( x => `translate3d(0,-${x}%, 0)` )
            } }
            fill={light}
            className="cls-2"
            points="27.89 31.97 43.13 40.83 43.13 58.54 27.89 49.68 27.89 31.97"
          />
          <a.polygon
            style={ {
              transform: props.x
                .to( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [120, 120, 0, 0] } )
                .to( x => `translate3d(0,${x}%, 0)` )
            } }
            fill={light}
            className="cls-2"
            points="27.89 51.3 43.13 60.15 43.13 77.87 27.89 69.01 27.89 51.3"
          />
          <a.polygon
            style={ {
              transformOrigin: `29.9865% 31.9697%`,
              transform: props.x
                .to( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [1, 1, 0, 0] } )
                .to( x => `translate3d(${x * 100}%,-${x * 58.1167190565877}%, 0)` )
            } }
            fill={dark}
            className="cls-3"
            points="59.98 31.97 44.74 40.83 44.74 58.54 59.98 49.68 59.98 31.97"
          />
          <a.g
            style={ { opacity: props.x.to( { range: [min_x, max_x], output: [0, 1] } ) } }
            fill={fill}
          >
            <path d="M69.87,50H64.54V46.41H79.18V50H73.91V66.33h-4Z"/>
            <path d="M78.62,59.21c0-5.21,2.2-7.88,6.48-7.88s6.38,2.2,6.38,6.62l-.29,2.72H82.58c0,1.76.85,2.55,3,2.55,1.75,0,4.12-.14,5.41-.26l.06,2.9a29.82,29.82,0,0,1-6.09.82C80.5,66.68,78.62,64.48,78.62,59.21Zm9-1.52c0-2.37-.68-3.14-2.52-3.14s-2.52.91-2.55,3.14Z"/>
            <path d="M94.29,51.68h3.9v1.56a16.51,16.51,0,0,1,4.68-1.91v4a33.42,33.42,0,0,0-4.65,1.23v9.81H94.29Z"/>
            <path d="M105.19,51.68h3.89v1.56a16.7,16.7,0,0,1,4.69-1.91v4a33.63,33.63,0,0,0-4.66,1.23v9.81h-3.92Z"/>
            <path d="M115.12,61.87c0-3.3,1.9-4.24,5.12-4.48l3.14-.23v-.91c0-1.26-.56-1.58-1.73-1.58-1.41,0-4,.15-5.51.24L116,52.18a26.94,26.94,0,0,1,6-.85c3.81,0,5.33,1.5,5.33,4.92v6.09c.06.88.17,1.23,1,1.38l-.12,3a8.76,8.76,0,0,1-2.55-.27,4.77,4.77,0,0,1-1.64-.76,11,11,0,0,1-4.3,1C116.58,66.68,115.12,65,115.12,61.87ZM123.38,63V59.88l-2.67.24c-1,.09-1.64.58-1.64,1.64s.38,1.73,1.43,1.73A12.38,12.38,0,0,0,123.38,63Z"/>
            <path d="M131.75,55h-1.58V51.68h1.58V51c0-4.22,1.08-5.56,4.28-5.56a26.48,26.48,0,0,1,3.34.38l-.06,3.19c-.56,0-1.55-.06-2.23-.06-1.11,0-1.4.59-1.4,2.08v.61h3.54V55h-3.54V66.33h-3.93Z"/>
            <path d="M140.63,59c0-4.51,1.64-7.65,6.73-7.65s6.74,3.14,6.74,7.65-1.64,7.7-6.74,7.7S140.63,63.49,140.63,59Zm9.48,0c0-2.84-.58-4.31-2.75-4.31s-2.75,1.47-2.75,4.31.58,4.36,2.75,4.36S150.11,61.82,150.11,59Z"/>
            <path d="M157,51.68h3.89v1.56a16.7,16.7,0,0,1,4.69-1.91v4a33.63,33.63,0,0,0-4.66,1.23v9.81H157Z"/>
            <path d="M167.86,51.68h3.9v.82a8.63,8.63,0,0,1,3.45-1.17,4.66,4.66,0,0,1,3.67,1.38,12.73,12.73,0,0,1,4.92-1.38c4,0,5.15,2.35,5.15,7.06v7.94H185V58.51c0-2.23-.3-3.66-2.05-3.66a10,10,0,0,0-2.73.55c.06.94.12,2.52.12,3.34v7.59h-3.92V58.8c0-2.64-.24-3.95-2.06-3.95a7.85,7.85,0,0,0-2.6.52v11h-3.93Z"/>
            <path d="M65.18,33.48h1.07v2.15h2V33.48h1.06v5.26H68.21V36.56h-2v2.18H65.18Z"/>
            <path d="M70.08,37.57c0-.88.5-1.13,1.35-1.19l.83-.06v-.24c0-.33-.15-.42-.46-.42s-1,0-1.45.06l0-.72a7.23,7.23,0,0,1,1.57-.22c1,0,1.41.39,1.41,1.3v1.61c0,.23,0,.33.25.37l0,.78a2.55,2.55,0,0,1-.67-.07,1.29,1.29,0,0,1-.43-.2,3.08,3.08,0,0,1-1.14.27C70.46,38.84,70.08,38.39,70.08,37.57Zm2.18.3V37l-.7.06c-.27,0-.44.16-.44.44s.1.45.38.45A3.46,3.46,0,0,0,72.26,37.87Z"/>
            <path d="M74.15,38.65l0-.87a12.66,12.66,0,0,0,1.35.13c.5,0,.63-.1.63-.3s-.09-.25-.8-.37-1.28-.34-1.28-1.19.68-1.26,1.5-1.26a8.43,8.43,0,0,1,1.5.19v.86c-.42-.05-1.09-.12-1.41-.12s-.55.1-.55.31.15.21.86.34c.9.17,1.22.43,1.22,1.21s-.59,1.26-1.56,1.26A9.2,9.2,0,0,1,74.15,38.65Z"/>
            <path d="M78,33.32h1v1.74a2.45,2.45,0,0,1,1-.28c1.09,0,1.36.68,1.36,1.87v2.09h-1V36.67c0-.58-.08-1-.58-1a2.68,2.68,0,0,0-.71.12v2.91H78Z"/>
            <path d="M82.24,33.32h1v1.06h-1Zm0,1.55h1v3.87h-1Z"/>
            <path d="M84.12,36.11c0-2,.45-2.73,2-2.73a8.06,8.06,0,0,1,1.54.21l0,.86a10.56,10.56,0,0,0-1.36-.12c-.81,0-1.07.29-1.07,1.78s.19,1.78,1.1,1.78a11,11,0,0,0,1.33-.11l0,.88a8.35,8.35,0,0,1-1.53.18C84.51,38.84,84.12,38,84.12,36.11Z"/>
            <path d="M88.19,36.8c0-1.19.43-2,1.78-2s1.78.83,1.78,2-.43,2-1.78,2S88.19,38,88.19,36.8Zm2.51,0c0-.75-.16-1.14-.73-1.14s-.73.39-.73,1.14S89.4,38,90,38,90.7,37.55,90.7,36.8Z"/>
            <path d="M92.51,34.87h1v.41a4.4,4.4,0,0,1,1.24-.5v1a9.62,9.62,0,0,0-1.23.33v2.59h-1Z"/>
            <path d="M95.4,34.87h1v.21a2,2,0,0,1,.88-.3c1,0,1.53.56,1.53,2,0,1.65-.58,2.06-1.76,2.06a5.78,5.78,0,0,1-.65-.06v1.59h-1Zm2.38,1.91c0-.78-.26-1.07-.67-1.07a2,2,0,0,0-.68.15v2a3.66,3.66,0,0,0,.57,0C97.62,37.94,97.78,37.6,97.78,36.78Z"/>
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}