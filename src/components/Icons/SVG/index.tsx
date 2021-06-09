/* eslint-disable max-len */
import React from 'react'
import { Spring, animated as a } from 'react-spring'
import { useInView } from 'react-hook-inview'

const fill = `var(--color-text)`
const min_x = 0
const max_x = 1

export default () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt` } } >
    <Spring to={ { x: inView ?  max_x : min_x } } >
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="XmaxYMax">
          <a.g id="W3C"
            style={ { opacity: props.x.to( [min_x, max_x], [0, 1] ) } }
          >
            <path fill={`#eca922`} d="M35.26,46.88a4.36,4.36,0,1,0,0,6.17H68a4.36,4.36,0,1,0,0-6.17H35.26Z" />
            <path fill={fill} d="M71.12,58h0a8.06,8.06,0,0,1-4.37-1.28H36.53A8.06,8.06,0,1,1,32.17,41.9h0a8,8,0,0,1,4.37,1.28H66.75a8.08,8.08,0,0,1,10.07,1.08A8.07,8.07,0,0,1,71.12,58ZM70.18,50l.47.47a.66.66,0,0,0,.47.2h0a.67.67,0,0,0,.47-.2.66.66,0,0,0,0-.94.66.66,0,0,0-.47-.19.64.64,0,0,0-.47.19Zm-38-.66a.65.65,0,0,0-.66.66.64.64,0,0,0,.19.47.67.67,0,0,0,.47.2h0a.66.66,0,0,0,.47-.2l.47-.47-.47-.47A.64.64,0,0,0,32.17,49.3Z" />
            <path fill={`#eca922`} d="M42.24,36.19a4.37,4.37,0,1,0-4.37,4.37h0L61.05,63.73a4.37,4.37,0,1,0,4.36-4.36Z" />
            <path fill={fill} d="M65.41,71.8a8.09,8.09,0,0,1-7.88-6.35L36.16,44.08a8.07,8.07,0,0,1,1.72-15.95h0a8.07,8.07,0,0,1,7.88,6.35L67.13,55.85A8.07,8.07,0,0,1,65.41,71.8Zm-.66-8.73v.66a.67.67,0,1,0,.66-.66ZM37.88,35.53a.67.67,0,0,0-.67.66.65.65,0,0,0,.2.47.63.63,0,0,0,.47.2h.66v-.67a.67.67,0,0,0-.66-.66Z" />
            <path fill={`#eca922`} d="M54.73,33.58a4.37,4.37,0,1,0-6.17,0h0V66.35a4.36,4.36,0,1,0,6.17,0h0Z" />
            <path fill={fill} d="M51.65,77.5h0a8.07,8.07,0,0,1-6.78-12.43V34.85a8.07,8.07,0,0,1,6.79-12.43h0a8,8,0,0,1,5.7,2.37,8.07,8.07,0,0,1,1.08,10.06V65.07A8.06,8.06,0,0,1,51.65,77.5Zm0-9-.46.47a.67.67,0,0,0,.46,1.14A.66.66,0,0,0,52.11,69Zm0-38.66a.64.64,0,0,0-.47.19.62.62,0,0,0-.2.47.64.64,0,0,0,.19.47l.48.47.46-.47a.66.66,0,0,0,0-.94A.63.63,0,0,0,51.65,29.83Z" />
            <path fill={`#eca922`} d="M65.41,40.56a4.37,4.37,0,1,0-4.36-4.37h0L37.88,59.37a4.37,4.37,0,1,0,4.36,4.36Z" />
            <path fill={fill} d="M37.88,71.8a8.07,8.07,0,0,1-1.72-15.95L57.53,34.48a8.07,8.07,0,0,1,7.88-6.35h0a8.07,8.07,0,0,1,1.71,16L45.76,65.45A8.09,8.09,0,0,1,37.88,71.8Zm0-8.73a.67.67,0,1,0,.66.66v-.66ZM64.75,36.86h.66a.67.67,0,0,0,.48-.2.69.69,0,0,0,.19-.47.67.67,0,0,0-.67-.66h0a.66.66,0,0,0-.47.19.69.69,0,0,0-.19.47Z" />
            <path fill={`#eca922`} d="M35.26,46.88a4.36,4.36,0,1,0,0,6.17H68a4.36,4.36,0,1,0,0-6.17H35.26Z" />
            <path fill={`#eca922`} d="M42.24,36.19a4.37,4.37,0,1,0-4.37,4.37h0L61.05,63.73a4.37,4.37,0,1,0,4.36-4.36Z" />
            <path fill={`#eca922`} d="M54.73,33.58a4.37,4.37,0,1,0-6.17,0h0V66.35a4.36,4.36,0,1,0,6.17,0h0Z" />
            <path fill={`#eca922`} d="M65.41,40.56a4.37,4.37,0,1,0-4.36-4.37h0L37.88,59.37a4.37,4.37,0,1,0,4.36,4.36Z" />
            <path fill={`#005b9d`} d="M84.2,50.14a16.06,16.06,0,1,1,27.42-11.35h-9.41a6.66,6.66,0,1,0-11.36,4.7h0c1.2,1.21,2.2,1.56,4.7,1.95h0c4.44.46,8.45,1.8,11.36,4.71h0A16.07,16.07,0,1,1,79.49,61.51H88.9a6.65,6.65,0,1,0,11.36-4.7h0a8.52,8.52,0,0,0-4.71-2h0c-4.3-.66-8.45-1.8-11.36-4.7Z" />
            <path fill={`#005b9d`} d="M143.75,22.72,132.39,77.58H123L111.62,22.72H121l6.66,32.13,6.65-32.13Z" />
            <path fill={`#005b9d`} d="M159.82,45.44h16.07V61.51h0a16.07,16.07,0,0,1-32.13,0h0V38.79h0a16.07,16.07,0,1,1,32.14,0h-9.41a6.66,6.66,0,0,0-13.31,0h0V61.51h0a6.66,6.66,0,0,0,13.31,0V54.85h-6.66Z" />
          </a.g>
        </svg>
      ) }
    </Spring>
  </div>
}