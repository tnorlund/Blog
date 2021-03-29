/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const min_x = 0
const max_x = 1

const height = 100
const width = 200

const cx = width / 2
const cy = height / 2
const a = 40
const b = 20

const originOpacity = 0.1
const originArrow = 5

const radius = 2
const lineWidth = 1
const letterDiff = 10

const timeLine = { x: width / 2, y: 125 }
const timeLineLength = 100
const timeLineWidth = 1
const timeLineRangeHeight = 5
const timeRadius = 2
const timeLinePadding = 15
const _0 = { x: timeLine.x - ( timeLineLength / 2 ) - timeLinePadding, y: timeLine.y }
const _1 = { x: timeLine.x + ( timeLineLength / 2 ) + timeLinePadding, y: timeLine.y }




const translate = ( point ) => `translate3d(${
  point.x <= 0.5 * width ? point.x - letterDiff : point.x + letterDiff
}px, ${
  point.y <= 0.5 * height ? point.y - letterDiff : point.y + letterDiff
}px, 0)`


const Ellipse = () => {
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${ width } ${ height }`}
          preserveAspectRatio="XMaxYMax"
        >
          <line id="Origin x=0"
            style={ { opacity: originOpacity } }
            stroke={`var(--color-text)`}
            x1={width / 2} y1={originArrow} x2={width / 2} y2={height}
          />
          <line id="Origin y=0"
            style={ { opacity: originOpacity } }
            stroke={`var(--color-text)`}
            x1={0} y1={ height / 2 } x2={width - originArrow } y2={ height / 2 }
          />
          <circle
            fill={`var(--color-text)`}
            cx={width / 2} cy={height / 2} r={radius}
          />

          <path
            style={ { opacity: originOpacity } }
            fill={`var(--color-text)`}
            d={`M ${width / 2} ${0} L ${ ( width / 2 ) + originArrow * Math.sqrt( 2 ) / 2 } ${ originArrow } L ${ ( width / 2 ) - originArrow * Math.sqrt( 2 ) / 2 } ${ originArrow }  Z`}
          />

          <path
            style={ { opacity: originOpacity } }
            fill={`var(--color-text)`}
            d={`M ${width} ${height / 2} L ${ width - originArrow } ${ height / 2 - originArrow * Math.sqrt( 2 ) / 2 } L ${ width - originArrow } ${ height / 2 + originArrow * Math.sqrt( 2 ) / 2 }  Z`}
          />

          <ellipse
            stroke={`var(--color-text)`}
            fill={`none`}
            strokeWidth={lineWidth}
            cx={cx} cy={cy} rx={a} ry={b}
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Ellipse