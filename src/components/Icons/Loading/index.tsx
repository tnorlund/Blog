/* eslint-disable max-len */
import React from 'react'
import './Loading.css'

const dark = false

const textColor = dark ? `#e5e5e5` :  `#201e1f`
const backgroundColor = dark ? `#21262d` : `#f8eee0`

export default () => {
  return <div style={ { height: `100pt` } } >
    <svg width="100%" height="100%" viewBox="0 0 100 100">
    <circle 
      fill={backgroundColor} 
      stroke={textColor} strokeMiterlimit={10} cx="50" cy="50" r="43.78" />
    <circle fill={`#d94234`} cx="50" cy="50" r="5.4" />
    <line className={`loading-logo`} stroke={`#d94234`} strokeWidth={`3px`} strokeMiterlimit={10} x1="50" y1="10.91" x2="50" y2="50" />
    </svg>
  </div>
}