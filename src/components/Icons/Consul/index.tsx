/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'
import { setSteps } from '../../utils'

const light = `#d62783`
const dark = `#961d59`
const fill = `var(--color-text)`
const min_x = 0
const max_x = 1
const steps = setSteps( min_x, max_x, [5, 2, 1, 1, 1, 1] )

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring to={ { x: inView ?  max_x : min_x } }>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          <a.path
            strokeDashoffset={
              props.x.to( [max_x, steps[0].start, steps[0].stop, min_x], [1, 1, 0, 0] ).to( x => x * 120 )
            }
            strokeDasharray={120}
            stroke={light}
            fill={`none`}
            strokeMiterlimit={10}
            strokeWidth={6}
            d="M53,68.48a23.27,23.27,0,1,1,.18-36.82"
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `19.43015% 50%`,
              transform: props.x.to( [min_x, steps[1].start, steps[1].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={dark} cx="38.86" cy="50" r="5.54"
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `24.89125% 50.1092%`,
              transform: props.x
                .to( [min_x, steps[2].start, steps[2].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={light} cx="49.78" cy="50.11" r="2.62"
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `28.4409% 45.9588%`,
              transform: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={light} cx="56.88" cy="45.96" r="2.62"
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `28.3863% 54.5873%`,
              transform: props.x.to( [min_x, steps[3].start, steps[3].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={light} cx="56.77" cy="54.59" r="2.62"
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `30.24305% 62.6151%`,
              transform: props.x.to( [min_x, steps[4].start, steps[4].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={light} cx="60.49" cy="62.62" r="2.62"
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `32.0725% 54.4282%`,
              transform: props.x.to( [min_x, steps[5].start, steps[5].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={light} className="cls-3" cx="64.15" cy="54.43" r="2.62"
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `32.0725% 45.7997%`,
              transform: props.x.to( [min_x, steps[5].start, steps[5].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={light} className="cls-3" cx="64.15" cy="45.8" r="2.62"
          />
          <a.circle
            style={ {
              position: `absolute`,
              transformOrigin: `30.24305% 37.8266%`,
              transform: props.x.to( [min_x, steps[4].start, steps[4].stop, max_x], [0, 0, 1, 1] ).to( x => `scale(${x}, ${x})` )
            } }
            fill={light} className="cls-3" cx="60.49" cy="37.83" r="2.62"
          />
          <a.g
            style={ {
              opacity: props.x.to( [min_x, max_x], [0, 1] ),
            } }
            fill={fill}
          >
            <path className="cls-4" d="M71.6,36.54h1.07v2.15h2V36.54H75.7V41.8H74.63V39.62h-2V41.8H71.6Z"/>
            <path className="cls-4" d="M76.5,40.63c0-.88.5-1.13,1.36-1.19l.82-.06v-.24c0-.33-.14-.42-.45-.42s-1.06,0-1.46.06l0-.72a7.32,7.32,0,0,1,1.57-.22c1,0,1.41.39,1.41,1.3v1.61c0,.23,0,.33.26.37l0,.78a2.58,2.58,0,0,1-.68-.07,1.39,1.39,0,0,1-.43-.2,3,3,0,0,1-1.14.27C76.89,41.9,76.5,41.45,76.5,40.63Zm2.18.3V40.1l-.7.06c-.27,0-.43.16-.43.44s.1.45.38.45A3.27,3.27,0,0,0,78.68,40.93Z"/>
            <path className="cls-4" d="M80.58,41.71l0-.87A12.91,12.91,0,0,0,82,41c.5,0,.63-.1.63-.3s-.08-.25-.8-.37-1.27-.34-1.27-1.19.68-1.26,1.49-1.26a8.43,8.43,0,0,1,1.5.19v.86c-.41,0-1.09-.12-1.41-.12s-.54.1-.54.31.14.21.86.34c.89.17,1.21.43,1.21,1.21S83,41.9,82.07,41.9A9.06,9.06,0,0,1,80.58,41.71Z"/>
            <path className="cls-4" d="M84.38,36.38h1v1.74a2.45,2.45,0,0,1,1-.28c1.08,0,1.36.68,1.36,1.87V41.8h-1V39.73c0-.58-.08-1-.58-1a2.53,2.53,0,0,0-.7.12V41.8h-1Z"/>
            <path className="cls-4" d="M88.66,36.38h1v1.06h-1Zm0,1.55h1V41.8h-1Z"/>
            <path className="cls-4" d="M90.55,39.17c0-2,.45-2.73,2-2.73a8,8,0,0,1,1.54.21l0,.86a10.26,10.26,0,0,0-1.35-.12c-.82,0-1.07.29-1.07,1.78S91.83,41,92.75,41a11,11,0,0,0,1.32-.11l0,.88a8.57,8.57,0,0,1-1.54.18C90.94,41.9,90.55,41,90.55,39.17Z"/>
            <path className="cls-4" d="M94.61,39.86c0-1.19.43-2,1.78-2s1.78.83,1.78,2-.43,2-1.78,2S94.61,41.05,94.61,39.86Zm2.51,0c0-.75-.16-1.14-.73-1.14s-.73.39-.73,1.14.16,1.15.73,1.15S97.12,40.61,97.12,39.86Z"/>
            <path className="cls-4" d="M98.94,37.93h1v.41a4.17,4.17,0,0,1,1.24-.5v1a9.39,9.39,0,0,0-1.24.33V41.8h-1Z"/>
            <path className="cls-4" d="M101.82,37.93h1v.21a2,2,0,0,1,.88-.3c1,0,1.53.56,1.53,2,0,1.65-.57,2.06-1.76,2.06a5.38,5.38,0,0,1-.64-.06v1.59h-1Zm2.39,1.91c0-.78-.27-1.07-.68-1.07a1.84,1.84,0,0,0-.67.15v2a3.43,3.43,0,0,0,.56,0C104,41,104.21,40.66,104.21,39.84Z"/>
            <path className="cls-4" d="M72.33,59.79c0-7.54,1.7-10.29,7.61-10.29a27.72,27.72,0,0,1,5.82.79l-.12,3.21a44.59,44.59,0,0,0-5.12-.44c-3.07,0-4,1.09-4,6.73,0,5.35.7,6.73,4.15,6.73a43.23,43.23,0,0,0,5-.41l.09,3.31a33.06,33.06,0,0,1-5.79.67C73.8,70.09,72.33,66.75,72.33,59.79Z"/>
            <path className="cls-4" d="M87.66,62.4c0-4.51,1.64-7.64,6.73-7.64s6.73,3.13,6.73,7.64-1.64,7.69-6.73,7.69S87.66,66.9,87.66,62.4Zm9.48,0c0-2.84-.59-4.3-2.75-4.3s-2.75,1.46-2.75,4.3.59,4.35,2.75,4.35S97.14,65.23,97.14,62.4Z"/>
            <path className="cls-4" d="M104,55.11h3.89v.82a8.41,8.41,0,0,1,3.66-1.17c4.09,0,5.15,2.57,5.15,7.05v7.93h-3.92V61.93c0-2.23-.29-3.66-2.2-3.66a7.66,7.66,0,0,0-2.66.53V69.74H104Z"/>
            <path className="cls-4" d="M119.63,69.39l.12-3.28c1.55.2,4,.47,5.12.47,1.87,0,2.37-.38,2.37-1.14s-.32-.94-3-1.38c-3.15-.52-4.82-1.28-4.82-4.5,0-3.39,2.57-4.77,5.64-4.77a34.09,34.09,0,0,1,5.68.73l-.06,3.25a52.69,52.69,0,0,0-5.32-.47c-1.7,0-2,.38-2,1.17s.55.82,3.25,1.32c3.39.61,4.59,1.61,4.59,4.56,0,3.42-2.23,4.74-5.88,4.74A35.82,35.82,0,0,1,119.63,69.39Z"/>
            <path className="cls-4" d="M133.82,62.78V55.11h3.92v7.72c0,2.64.11,3.75,2.07,3.75a8.31,8.31,0,0,0,2.78-.53V55.11h3.92V69.74h-3.89v-.82a8,8,0,0,1-4,1.17C134.69,70.09,133.82,67.4,133.82,62.78Z"/>
            <path className="cls-4" d="M150.31,49.26h3.92V69.74h-3.92Z"/>
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}
