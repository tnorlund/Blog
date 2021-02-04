/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const red = `var(--color-red)`
const orange = `var(--color-orange)`
const green = `var(--color-green)`
const blue = `var(--color-blue)`
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 1 },
  2: { length: 1 },
  3: { length: 1 },
  4: { length: 1 },
  5: { length: 1 },
  6: { length: 1 },
  7: { length: 1 },
  8: { length: 1 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const CICD = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={red}
            id="Operate"
          >
            <path
              d="M167.63,55.72a1.94,1.94,0,0,0,1.14.55,2.39,2.39,0,0,0,.88,0,1.07,1.07,0,0,0,.34-2,3.18,3.18,0,0,0-1-.33,2.17,2.17,0,0,0-.84,0,1,1,0,0,0-.82.86A1,1,0,0,0,167.63,55.72Z"
            />
            <path
              d="M160.1,70.76a1.89,1.89,0,0,0,.64.41,1.13,1.13,0,0,0,1.41-1.07,1.31,1.31,0,0,0-.34-.89Z"
            />
            <path
              d="M168.58,58.13l-.79,2.17a1.69,1.69,0,0,0,.75.06,1,1,0,0,0,.81-.72,1,1,0,0,0-.06-.88A1.34,1.34,0,0,0,168.58,58.13Z"
            />
            <path
              d="M164.68,63.52a.57.57,0,0,0-.53-.09.86.86,0,0,0-.44.34,1.48,1.48,0,0,0-.26.69,1,1,0,0,0,.44,1l.46.32a1.25,1.25,0,0,1,.08-.35,2.17,2.17,0,0,1,.16-.38l.19-.38a1.53,1.53,0,0,0,.19-.56A.6.6,0,0,0,164.68,63.52Z"
            />
            <path
              d="M170.18,48.1a2.66,2.66,0,0,0-1.61.46,1.83,1.83,0,0,0-.68,1.56,1.6,1.6,0,0,0,.72,1.49,3,3,0,0,0,1.69.48,2.47,2.47,0,0,0,1.64-.5,1.84,1.84,0,0,0,.63-1.44,1.87,1.87,0,0,0-.59-1.46A2.58,2.58,0,0,0,170.18,48.1Z"
            />
            <path
              d="M172.7,34.93l-11.61,5.86a20.51,20.51,0,0,1-12.3,28.81L152.59,82a33.52,33.52,0,0,0,20.11-47.1ZM162.17,71.39a2,2,0,0,1-.77.42,1.6,1.6,0,0,1-.84,0,1.8,1.8,0,0,1-.7-.36,4.45,4.45,0,0,1-.67-.64l2.26-2a1.84,1.84,0,0,0-.91-.56,1,1,0,0,0-.9.3,1.08,1.08,0,0,0-.4.85,1.14,1.14,0,0,0,.14.54l-.52.46a1.37,1.37,0,0,1-.21-.5,1.65,1.65,0,0,1-.05-.57,1.48,1.48,0,0,1,.3-.84,1.86,1.86,0,0,1,.38-.43,1.72,1.72,0,0,1,1.35-.47,2.22,2.22,0,0,1,1.47.82,2.41,2.41,0,0,1,.7,1.58A1.82,1.82,0,0,1,162.17,71.39Zm3-1.54-.88-.76-.44.5-.44-.38.44-.5-2.06-1.79a.3.3,0,0,0-.32-.09,1.26,1.26,0,0,0-.21.18l-.07.09-.08.11-.42-.37a2.53,2.53,0,0,1,.13-.22l.17-.22a.78.78,0,0,1,.63-.34,1.11,1.11,0,0,1,.61.29l2.09,1.82.37-.42.43.37-.37.43.88.77Zm1.47-3.63a2.28,2.28,0,0,1-.91.83.93.93,0,0,1-1-.12l-2-1.36a.29.29,0,0,0-.17-.06c-.05,0-.1,0-.16.12a.41.41,0,0,1-.05.09l-.06.11-.43-.29a1.58,1.58,0,0,1,.1-.24.94.94,0,0,1,.12-.2.58.58,0,0,1,.51-.29.86.86,0,0,1,.39.12,1.69,1.69,0,0,1-.06-.79,2,2,0,0,1,.33-.85,1.32,1.32,0,0,1,.83-.58,1.18,1.18,0,0,1,.94.19,1.15,1.15,0,0,1,.54.81,1.74,1.74,0,0,1-.22,1l-.51,1a.39.39,0,0,0,0,.39.74.74,0,0,0,.2.19.57.57,0,0,0,.57.08,1.36,1.36,0,0,0,.55-.51.9.9,0,0,0,.19-.81,1,1,0,0,0-.31-.42l.37-.54a1.21,1.21,0,0,1,.61,1A2,2,0,0,1,166.67,66.22Zm1.78-3.2-.64-.33a1.55,1.55,0,0,1,.27.59,1,1,0,0,1-.07.79l0,.06-.09.14-.66-.34.07-.1a.93.93,0,0,1,0-.1,1,1,0,0,0,.07-.88,1.13,1.13,0,0,0-.57-.61l-2.14-1.1.32-.63,3.72,1.91Zm1.46-3.13a1.88,1.88,0,0,1-.49.73,1.54,1.54,0,0,1-.73.41,1.7,1.7,0,0,1-.78,0,4.32,4.32,0,0,1-.89-.25l1-2.86a1.75,1.75,0,0,0-1.07-.07,1,1,0,0,0-.66.68,1.13,1.13,0,0,0,0,.94,1.22,1.22,0,0,0,.37.41l-.23.65a1.4,1.4,0,0,1-.42-.34,1.71,1.71,0,0,1-.32-.49,1.62,1.62,0,0,1-.13-.88,2.18,2.18,0,0,1,.14-.56,1.73,1.73,0,0,1,1-1,2.23,2.23,0,0,1,1.68,0,2.43,2.43,0,0,1,1.35,1.07A1.79,1.79,0,0,1,169.91,59.89Zm1.31-5.48-.55-.1a1.61,1.61,0,0,1,.35.54,1.46,1.46,0,0,1,.07.86,1.58,1.58,0,0,1-.76,1.09,2.22,2.22,0,0,1-1.63.19,2.39,2.39,0,0,1-1.78-1.07,1.64,1.64,0,0,1-.16-1.11,1.39,1.39,0,0,1,.35-.74,2,2,0,0,1,.47-.34l-2.09-.4.13-.7,5.73,1.11Zm1-2.06a3.2,3.2,0,0,1-2,.54,3.45,3.45,0,0,1-2.13-.68,2.89,2.89,0,0,1-.06-4.27,3.3,3.3,0,0,1,2.14-.64,3.41,3.41,0,0,1,2,.6,2.48,2.48,0,0,1,1,2.21A2.62,2.62,0,0,1,172.26,52.35Z"
            />
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={red}
            id="Deploy"
          >
            <path d="M142.78,16.51a33.23,33.23,0,0,0-19.91,6.55l-.33.27,6,7.42,2,2.77a20.5,20.5,0,0,1,30.49,7.27l11.61-5.86A33.36,33.36,0,0,0,142.78,16.51ZM142,24a2.1,2.1,0,0,1-1.9,1.52l-2.28.25-.62-5.71,2.28-.25a2.18,2.18,0,0,1,1.9.64,3.2,3.2,0,0,1,.78,1.87A4,4,0,0,1,142,24Zm3.76,1.19a1.6,1.6,0,0,1-.81.37,2.62,2.62,0,0,1-.57,0,1.79,1.79,0,0,1-1.28-.66,2.2,2.2,0,0,1-.42-1.62,2.39,2.39,0,0,1,.65-1.6,1.89,1.89,0,0,1,2.3-.26,1.6,1.6,0,0,1,.6.58,1.83,1.83,0,0,1,.22.76,4.55,4.55,0,0,1,0,.92l-3-.21a1.83,1.83,0,0,0,.22,1,1,1,0,0,0,.84.45,1.14,1.14,0,0,0,.89-.3,1.26,1.26,0,0,0,.3-.48l.69.05a1.42,1.42,0,0,1-.22.5A1.86,1.86,0,0,1,145.79,25.22Zm3.78.87a1.63,1.63,0,0,1-1.11.12,1.46,1.46,0,0,1-.73-.38,1.72,1.72,0,0,1-.32-.49l-.48,2.08-.69-.15,1.32-5.69.67.16-.13.54a2,2,0,0,1,.55-.33,1.5,1.5,0,0,1,.87,0,1.58,1.58,0,0,1,1.06.81,2.25,2.25,0,0,1,.13,1.63A2.38,2.38,0,0,1,149.57,26.09Zm1,.58,1.9-5.42.66.23-1.9,5.42Zm2.65,1.22a1.68,1.68,0,0,1-1-1.11,2.31,2.31,0,0,1,.23-1.63,2.48,2.48,0,0,1,1.2-1.28,1.75,1.75,0,0,1,1.56.05,1.89,1.89,0,0,1,1,1.07,2.11,2.11,0,0,1-.19,1.67,2.76,2.76,0,0,1-1.16,1.3A1.77,1.77,0,0,1,153.23,27.89Zm5.69.5-1.52,1.1a11.83,11.83,0,0,1-1.81,1.13,1,1,0,0,1-.9-.19c-.08-.06-.15-.1-.19-.14a.92.92,0,0,1-.13-.14l.36-.53.18.2.11.09a.56.56,0,0,0,.28.11.8.8,0,0,0,.21-.05l.3-.18.38-.26,1.14-4.43.66.44L157,29l2.85-2.18.65.43Z"/>
            <path d="M145.65,22.38a1,1,0,0,0-.91-.57,1.09,1.09,0,0,0-.83.29,1.33,1.33,0,0,0-.41.87l2.3.16A1.75,1.75,0,0,0,145.65,22.38Z"/>
            <path d="M140.82,21a1.54,1.54,0,0,0-1.39-.45l-1.34.15.47,4.38,1.35-.15a1.66,1.66,0,0,0,.62-.15,1.33,1.33,0,0,0,.66-.66,2.34,2.34,0,0,0,.23-.92,3.91,3.91,0,0,0,0-.6A2.91,2.91,0,0,0,140.82,21Z"/>
            <path d="M149.22,22.48a1,1,0,0,0-1.14.48,3.08,3.08,0,0,0-.36.94,2,2,0,0,0-.05.83,1,1,0,0,0,.83.86,1,1,0,0,0,.9-.21,2,2,0,0,0,.59-1.13,2.23,2.23,0,0,0,.06-.87A1,1,0,0,0,149.22,22.48Z"/>
            <path d="M155.62,25.42a1,1,0,0,0-.66-1,1,1,0,0,0-1.05.05,2.23,2.23,0,0,0-.78.94,2.08,2.08,0,0,0-.22,1.13,1,1,0,0,0,.64.8,1,1,0,0,0,1.08-.07,2.52,2.52,0,0,0,.74-.95A2.17,2.17,0,0,0,155.62,25.42Z"/>
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={orange}
            id="Plan"
          >
            <path d="M84.52,35.25a.88.88,0,0,0,.18-1,1.58,1.58,0,0,0-.47-.53l-1.19-1-1.26,1.54,1.2,1a1.44,1.44,0,0,0,.79.36A.91.91,0,0,0,84.52,35.25Z"/>
            <path d="M88,40.61a1.28,1.28,0,0,1-.34-.1,3,3,0,0,1-.36-.19l-.37-.23a2,2,0,0,0-.54-.24.63.63,0,0,0-.63.25.61.61,0,0,0-.13.51.91.91,0,0,0,.3.47,1.66,1.66,0,0,0,.67.32,1,1,0,0,0,1-.35Z"/>
            <path d="M77.36,23.24h0L72.71,29,69.4,33.52l-.07-.05L105.71,63l8.19-10.1Zm4,11.6-1.53,1.88-.6-.49,3.61-4.45,2,1.62a1.75,1.75,0,0,1,.68,1.11,1.54,1.54,0,0,1-.4,1.23,1.76,1.76,0,0,1-1.06.65A1.6,1.6,0,0,1,82.76,36Zm1.91,4.68,3.62-4.46.54.44L83.83,40ZM87.55,43l-.23-.11-.19-.14a.55.55,0,0,1-.24-.53.93.93,0,0,1,.15-.38,1.76,1.76,0,0,1-.79,0,1.8,1.8,0,0,1-.82-.4,1.34,1.34,0,0,1-.52-.87,1.19,1.19,0,0,1,.27-.92,1.14,1.14,0,0,1,.85-.47,1.79,1.79,0,0,1,1,.29l1,.6a.39.39,0,0,0,.38,0,.77.77,0,0,0,.21-.18.59.59,0,0,0,.13-.57,1.34,1.34,0,0,0-.47-.59.94.94,0,0,0-.79-.26,1.18,1.18,0,0,0-.44.28l-.51-.41a1.23,1.23,0,0,1,1.07-.53,2.15,2.15,0,0,1,1.06.47,2.29,2.29,0,0,1,.75,1,.93.93,0,0,1-.19,1l-1.52,1.87a.37.37,0,0,0-.08.17.23.23,0,0,0,.11.17l.08.06.11.07Zm5.36-.38a2.17,2.17,0,0,1-.48.86l-1.69,2.08-.56-.45,1.67-2a1.37,1.37,0,0,0,.3-.55.71.71,0,0,0-.28-.73,1.62,1.62,0,0,0-.35-.22,1.16,1.16,0,0,0-.62,0,1,1,0,0,0-.44.19,2.7,2.7,0,0,0-.44.45l-1.38,1.71-.55-.45,2.64-3.25.52.43-.38.46a1.91,1.91,0,0,1,.82,0,1.74,1.74,0,0,1,.68.34A1.23,1.23,0,0,1,92.91,42.63Z"/>
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={green}
            id="Test"
          >
            <path d="M72.42,71.41a1,1,0,0,0-1.08.1,1,1,0,0,0-.48.74,1.28,1.28,0,0,0,.2.93L73,71.91A1.92,1.92,0,0,0,72.42,71.41Z"/>
            <path d="M86.05,53,69.29,66.57a20.6,20.6,0,0,1-18.11,3L47.35,82a33.54,33.54,0,0,0,29.78-5.08L94.24,63.05ZM68.86,77l-2.07-4.61L65,73.18l-.28-.63L69,70.65l.28.63-1.76.79,2.06,4.61Zm5.39-3.42a1.67,1.67,0,0,1-.43.79,2.07,2.07,0,0,1-.44.36A1.71,1.71,0,0,1,72,75a2.24,2.24,0,0,1-1.33-1,2.37,2.37,0,0,1-.44-1.67A1.76,1.76,0,0,1,71,71a1.7,1.7,0,0,1,.83-.3,1.57,1.57,0,0,1,.82.1,1.9,1.9,0,0,1,.64.46,5.07,5.07,0,0,1,.56.74l-2.54,1.67a1.9,1.9,0,0,0,.82.7,1,1,0,0,0,.93-.16,1.13,1.13,0,0,0,.53-.78,1.28,1.28,0,0,0-.06-.55l.58-.38a1.41,1.41,0,0,1,.13.52A1.8,1.8,0,0,1,74.25,73.58Zm3-1.84a1.76,1.76,0,0,1-1.31.51,1.51,1.51,0,0,1-1-.55l.52-.42a.91.91,0,0,0,.48.3,1.11,1.11,0,0,0,.94-.33,1.32,1.32,0,0,0,.44-.57.55.55,0,0,0-.09-.6.46.46,0,0,0-.45-.16,2.4,2.4,0,0,0-.6.23l-.53.24a2.78,2.78,0,0,1-.81.28.89.89,0,0,1-.85-.32,1.2,1.2,0,0,1-.27-1,1.75,1.75,0,0,1,.67-1,1.63,1.63,0,0,1,1.42-.44,1.2,1.2,0,0,1,.68.42l-.52.42a.76.76,0,0,0-.4-.22,1.11,1.11,0,0,0-.84.32,1.09,1.09,0,0,0-.39.51.49.49,0,0,0,.58.61,1.85,1.85,0,0,0,.47-.16l.44-.21a3.71,3.71,0,0,1,1-.38.93.93,0,0,1,.85.4,1.28,1.28,0,0,1,.28,1A1.86,1.86,0,0,1,77.29,71.74Zm2.85-2.46a2,2,0,0,1-.21.19.77.77,0,0,1-.67.23,1.13,1.13,0,0,1-.55-.4L77,67.15l-.44.36-.36-.45.44-.36-.74-.9.56-.45.73.9.52-.42.36.45-.52.42,1.72,2.12c.1.11.2.16.3.13a.57.57,0,0,0,.24-.13l.09-.08a.38.38,0,0,0,.09-.09l.36.43A1.63,1.63,0,0,1,80.14,69.28Z"/>
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={green}
            id="Release"
          >
            <path  d="M130.67,33.47l-.07.05-2-2.77-6-7.41L86.05,53l8.19,10.09Z"/>
            <path fill="var(--color-background)" d="M95.43,49.41l2-1.65a2.63,2.63,0,0,1,.94-.52,1.35,1.35,0,0,1,1.47.56,1.51,1.51,0,0,1,.37.78,1.57,1.57,0,0,1-.13.79,1.22,1.22,0,0,1,.62,0,1.26,1.26,0,0,1,.6.44l.51.58a2.26,2.26,0,0,0,.35.35.46.46,0,0,0,.41.11l.09.1-.74.6a.55.55,0,0,1-.17-.11,3.06,3.06,0,0,1-.32-.32l-.64-.72A.81.81,0,0,0,100,50a1.6,1.6,0,0,0-.59.35L98.1,51.46l1.55,1.91-.6.49Zm3.62.45a1.44,1.44,0,0,0,.51-.7.89.89,0,0,0-.25-.81.87.87,0,0,0-.87-.38,1.52,1.52,0,0,0-.55.3l-1.43,1.17L97.69,51Z"/>
            <path fill="var(--color-background)" d="M102.81,45.56a1.69,1.69,0,0,1,.84,0,1.74,1.74,0,0,1,.68.39,5.79,5.79,0,0,1,.63.68l-2.36,1.92a1.81,1.81,0,0,0,.87.6,1,1,0,0,0,.92-.24,1.1,1.1,0,0,0,.44-.83,1.31,1.31,0,0,0-.1-.55l.53-.43a1.33,1.33,0,0,1,.19.51,2.3,2.3,0,0,1,0,.58,1.57,1.57,0,0,1-.35.82,2.18,2.18,0,0,1-.4.41,1.8,1.8,0,0,1-1.38.39,2.23,2.23,0,0,1-1.42-.9,2.41,2.41,0,0,1-.61-1.61,1.79,1.79,0,0,1,.71-1.39A2,2,0,0,1,102.81,45.56Zm1.24,1.12a1.74,1.74,0,0,0-.62-.44,1,1,0,0,0-1.06.21,1.08,1.08,0,0,0-.41.78,1.31,1.31,0,0,0,.3.9Z"/>
            <path fill="var(--color-background)" d="M103.24,43.07l.54-.44,3.62,4.45-.55.44Z"/>
            <path fill="var(--color-background)" d="M107.67,41.62a1.65,1.65,0,0,1,.83,0,1.74,1.74,0,0,1,.68.39,5,5,0,0,1,.63.68l-2.36,1.92a1.79,1.79,0,0,0,.88.6,1,1,0,0,0,.91-.24,1.14,1.14,0,0,0,.45-.83,1.32,1.32,0,0,0-.11-.55l.54-.43a1.52,1.52,0,0,1,.18.51,1.73,1.73,0,0,1-.32,1.4,2.64,2.64,0,0,1-.41.41,1.8,1.8,0,0,1-1.38.39,2.25,2.25,0,0,1-1.42-.9,2.46,2.46,0,0,1-.61-1.61,1.82,1.82,0,0,1,.71-1.39A2,2,0,0,1,107.67,41.62Zm1.23,1.12a1.88,1.88,0,0,0-.62-.44,1,1,0,0,0-1.06.21,1,1,0,0,0-.4.78,1.25,1.25,0,0,0,.29.9Z"/>
            <path fill="var(--color-background)" d="M111.83,40.22a.38.38,0,0,0,.12-.36.57.57,0,0,0-.13-.24.55.55,0,0,0-.53-.24,1.34,1.34,0,0,0-.67.33,1,1,0,0,0-.42.72,1.14,1.14,0,0,0,.18.49l-.51.41a1.22,1.22,0,0,1-.29-1.15,2.13,2.13,0,0,1,.68-.94,2.29,2.29,0,0,1,1.11-.54,1,1,0,0,1,.9.39L113.79,41a.33.33,0,0,0,.15.1s.11,0,.19-.06l.08-.07.08-.1.33.41-.16.2-.17.16a.61.61,0,0,1-.58.13,1,1,0,0,1-.33-.23,1.89,1.89,0,0,1-.17.77,2,2,0,0,1-.56.72,1.33,1.33,0,0,1-1,.33,1.19,1.19,0,0,1-.85-.46,1.11,1.11,0,0,1-.28-.92,1.64,1.64,0,0,1,.49-.91Zm0,2.41a.81.81,0,0,0,.52-.2,1.62,1.62,0,0,0,.45-.58,1,1,0,0,0-.14-1.09l-.35-.44a1.21,1.21,0,0,1-.17.31,2,2,0,0,1-.26.31l-.3.31a1.67,1.67,0,0,0-.34.49.62.62,0,0,0,.11.66A.59.59,0,0,0,111.88,42.63Z"/>
            <path fill="var(--color-background)" d="M114.64,39.51a1.11,1.11,0,0,0,.48.31,1.17,1.17,0,0,0,.95-.33,1.4,1.4,0,0,0,.43-.58.56.56,0,0,0-.09-.6.45.45,0,0,0-.45-.16,3.39,3.39,0,0,0-.6.23l-.53.25a2.61,2.61,0,0,1-.81.27.87.87,0,0,1-.85-.32,1.2,1.2,0,0,1-.27-1,1.75,1.75,0,0,1,.67-1A1.63,1.63,0,0,1,115,36.1a1.17,1.17,0,0,1,.68.43l-.51.42a.8.8,0,0,0-.41-.23,1.11,1.11,0,0,0-.84.33,1,1,0,0,0-.38.5.46.46,0,0,0,.09.45.48.48,0,0,0,.48.16,1.57,1.57,0,0,0,.48-.16l.44-.21a3.57,3.57,0,0,1,1-.38,1,1,0,0,1,.86.4,1.31,1.31,0,0,1,.27,1,1.82,1.82,0,0,1-.76,1.14,1.77,1.77,0,0,1-1.3.52,1.6,1.6,0,0,1-1-.55Z"/>
            <path fill="var(--color-background)" d="M117.68,33.49a1.65,1.65,0,0,1,.83,0,1.85,1.85,0,0,1,.69.39,5.79,5.79,0,0,1,.63.68l-2.37,1.92a1.79,1.79,0,0,0,.88.6,1,1,0,0,0,.91-.24,1.08,1.08,0,0,0,.45-.83,1.18,1.18,0,0,0-.11-.55l.54-.43a1.52,1.52,0,0,1,.18.51,1.93,1.93,0,0,1,0,.58A1.66,1.66,0,0,1,120,37a2.55,2.55,0,0,1-.4.41,1.8,1.8,0,0,1-1.38.39,2.23,2.23,0,0,1-1.42-.9,2.36,2.36,0,0,1-.61-1.61,1.78,1.78,0,0,1,.7-1.39A2,2,0,0,1,117.68,33.49Zm1.23,1.12a1.72,1.72,0,0,0-.61-.44,1,1,0,0,0-1.06.21,1,1,0,0,0-.41.78,1.35,1.35,0,0,0,.29.9Z"/>
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={blue}
            id="Build"
          >
            <path d="M30.75,54.5a2.29,2.29,0,0,0,0-.8l-.2-1.54-2,.26.22,1.67a1.2,1.2,0,0,0,.54,1,1,1,0,0,0,.66.11A.84.84,0,0,0,30.75,54.5Z"/>
            <path d="M31.61,54.24a.78.78,0,0,0,.82.33.73.73,0,0,0,.69-.55,2,2,0,0,0,0-.78L33,51.85l-1.76.23.18,1.41A1.94,1.94,0,0,0,31.61,54.24Z"/>
            <path d="M51.11,69.56l.07,0c-9.27-2-14.45-9.74-14.45-19.58a18.45,18.45,0,0,1,2.21-9.25l0,0,0,0L27.36,34.87A33.21,33.21,0,0,0,23.73,50,33.56,33.56,0,0,0,47.36,82l3.82-12.43ZM36,60.42l.33.64-.71.36-.33-.63Zm-7.86-6.25-.31-2.42L33.5,51l.32,2.46A1.68,1.68,0,0,1,33.41,55a1.47,1.47,0,0,1-.79.35,1.25,1.25,0,0,1-.92-.19,1.72,1.72,0,0,1-.39-.41,1.91,1.91,0,0,1-.29.7A1.39,1.39,0,0,1,30,56a1.66,1.66,0,0,1-1-.22A2,2,0,0,1,28.12,54.17Zm1.68,6.48.59-.2a1.37,1.37,0,0,1-.49-.18,1.43,1.43,0,0,1-.63-.79,1.23,1.23,0,0,1,.17-1.33,1.78,1.78,0,0,1,.75-.45l2.68-.94.24.68-2.62.92a1.12,1.12,0,0,0-.46.27.67.67,0,0,0-.13.76,1,1,0,0,0,.94.7,2.82,2.82,0,0,0,1-.18l1.94-.69.23.67L30,61.28ZM30.87,63l3.71-1.9.32.64-3.7,1.89ZM32,65l4.9-3,.36.6-4.89,3Zm3.49,4.79-.4-.49L35.5,69a1.48,1.48,0,0,1-.8-.1,1.65,1.65,0,0,1-.62-.48,1.57,1.57,0,0,1-.3-1.31,2.32,2.32,0,0,1,.89-1.38A2.68,2.68,0,0,1,36.2,65a1.67,1.67,0,0,1,1.7,1.36,1.88,1.88,0,0,1,0,.59l1.64-1.33.43.52Zm15.63-.25Z"/>
            <path d="M36.31,65.73a1.89,1.89,0,0,0-1.14.5,2,2,0,0,0-.69.93,1,1,0,0,0,.22,1,.94.94,0,0,0,.83.35A2,2,0,0,0,36.66,68a1.77,1.77,0,0,0,.71-1,1,1,0,0,0-.21-.86A1.06,1.06,0,0,0,36.31,65.73Z"/>
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={blue}
            id="Code"
          >
            <path d="M54.43,22.27a1,1,0,0,0-.84-.28,1.09,1.09,0,0,0-.8.51,1.88,1.88,0,0,0-.17,1.23A2,2,0,0,0,53,24.81a1,1,0,0,0,1,.34.94.94,0,0,0,.74-.52,2,2,0,0,0,.16-1.23A1.8,1.8,0,0,0,54.43,22.27Z"/>
            <path d="M50.4,23.12a1.05,1.05,0,0,0-1.13-.27,1,1,0,0,0-.76.73,2.43,2.43,0,0,0,.05,1.22,2.1,2.1,0,0,0,.59,1,1,1,0,0,0,1,.17,1,1,0,0,0,.76-.77,2.6,2.6,0,0,0-.08-1.2A2.21,2.21,0,0,0,50.4,23.12Z"/>
            <path d="M58.08,21.76a1,1,0,0,0-.82.32,1.34,1.34,0,0,0-.37.88l2.3.07a1.84,1.84,0,0,0-.17-.74A1,1,0,0,0,58.08,21.76Z"/>
            <path d="M77.13,23.06a33.51,33.51,0,0,0-49.79,11.8l5.8,2.94,5.79,2.94A20.51,20.51,0,0,1,69.4,33.52L72.71,29l4.63-5.81ZM47.61,26.65a2.6,2.6,0,0,1-3,1.67,3.17,3.17,0,0,1-1.9-1.81,3.21,3.21,0,0,1-.34-2.16,2.43,2.43,0,0,1,1.38-1.68,2.28,2.28,0,0,1,1.75-.23,2,2,0,0,1,1.17.87l-.67.34A1.46,1.46,0,0,0,44,23.27a1.7,1.7,0,0,0-.94,1.14,2.72,2.72,0,0,0,.36,1.86,2.69,2.69,0,0,0,1.15,1.26,1.62,1.62,0,0,0,1.51-.06A1.47,1.47,0,0,0,47,26.3a2.66,2.66,0,0,0-.1-1l.68-.34A2.57,2.57,0,0,1,47.61,26.65Zm3.93-1.15a1.76,1.76,0,0,1-1.27,1.06,1.7,1.7,0,0,1-1.47-.18A2.33,2.33,0,0,1,47.87,25a2.5,2.5,0,0,1,.05-1.76,1.76,1.76,0,0,1,1.19-1,1.85,1.85,0,0,1,1.46.14,2.09,2.09,0,0,1,1,1.36A2.72,2.72,0,0,1,51.54,25.5Zm3.63,0-.07-.58a1.54,1.54,0,0,1-.5.63,1.64,1.64,0,0,1-.74.26,1.52,1.52,0,0,1-1.27-.43,2.28,2.28,0,0,1-.7-1.49,2.7,2.7,0,0,1,.26-1.63,1.51,1.51,0,0,1,1.23-.83,1.58,1.58,0,0,1,.83.1,2,2,0,0,1,.47.36l-.27-2.1.67-.08.72,5.71Zm4.73-1.86-3-.09a1.79,1.79,0,0,0,.26,1A1,1,0,0,0,58,25a1.11,1.11,0,0,0,.88-.34,1.25,1.25,0,0,0,.27-.48l.69,0a1.38,1.38,0,0,1-.2.51,1.5,1.5,0,0,1-.35.45,1.64,1.64,0,0,1-.8.4,2.07,2.07,0,0,1-.57,0,1.72,1.72,0,0,1-1.3-.6,2.22,2.22,0,0,1-.49-1.61,2.44,2.44,0,0,1,.59-1.62,1.82,1.82,0,0,1,1.44-.59,1.85,1.85,0,0,1,.85.24,1.61,1.61,0,0,1,.62.56,1.8,1.8,0,0,1,.25.75A4.57,4.57,0,0,1,59.9,23.61Z"/>
          </animated.g>
          <animated.g
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x ),
            } }
            fill={orange}
            id="Monitor"
          >
            <path d="M135.88,74.77a1,1,0,0,0-1,.22,2.31,2.31,0,0,0-.59,1.07,2,2,0,0,0,0,1.15,1,1,0,0,0,.77.67,1,1,0,0,0,1-.26,2.57,2.57,0,0,0,.56-1.06,2.11,2.11,0,0,0,.08-1A1,1,0,0,0,135.88,74.77Z"/>
            <path d="M148.77,69.6a20.56,20.56,0,0,1-18.06-3L113.9,52.91,105.71,63l16.93,13.75.23.17a33.17,33.17,0,0,0,19.91,6.56A33.73,33.73,0,0,0,152.57,82Zm-17.6,1,.62.34-.38.7-.62-.34ZM119,68.54l2.14-2.63.37-.45.56-.67-4.33,2.72-.59-.48,1.76-4.8-.11.14c-.09.1-.22.27-.4.5s-.3.4-.39.5L115.9,66l-.58-.47,3.62-4.45.86.7L118,66.59l4.33-2.74.86.7L119.6,69Zm2.54,2.25a1.72,1.72,0,0,1-.69-1.31,2.37,2.37,0,0,1,.6-1.53,2.47,2.47,0,0,1,1.47-1,1.79,1.79,0,0,1,1.5.41,1.88,1.88,0,0,1,.72,1.28,2.12,2.12,0,0,1-.57,1.58,2.79,2.79,0,0,1-1.43,1A1.8,1.8,0,0,1,121.56,70.79Zm5.15,3.92-.57-.43,1.61-2.1a1.4,1.4,0,0,0,.28-.56.68.68,0,0,0-.3-.72,1.81,1.81,0,0,0-.36-.21,1.14,1.14,0,0,0-.61,0,1.05,1.05,0,0,0-.44.2,3.56,3.56,0,0,0-.43.47l-1.33,1.75-.56-.43,2.54-3.33.53.41-.36.47a1.94,1.94,0,0,1,.82,0,1.8,1.8,0,0,1,.69.32,1.21,1.21,0,0,1,.57,1.23,2.09,2.09,0,0,1-.45.88Zm1.71,1,2-3.66.63.34-2,3.66Zm4.27-1.92-1.09,2.5a.28.28,0,0,0,0,.33.61.61,0,0,0,.23.14l.1.05.13,0-.22.51-.25,0-.27-.1c-.3-.13-.47-.3-.51-.5a1.1,1.1,0,0,1,.1-.67L132,73.45l-.52-.23.23-.52.52.23.47-1.07.65.28-.47,1.07.61.27-.23.52Zm4.66,3a2.79,2.79,0,0,1-.92,1.48,1.8,1.8,0,0,1-1.64.23,1.68,1.68,0,0,1-1.15-.93,2.27,2.27,0,0,1-.07-1.64,2.48,2.48,0,0,1,1-1.48,1.82,1.82,0,0,1,1.55-.22,1.88,1.88,0,0,1,1.16.88A2.14,2.14,0,0,1,137.35,76.74Zm3.63-.9-.11,0-.12,0a1,1,0,0,0-.85.24,1.22,1.22,0,0,0-.37.75l-.28,2.39-.7-.08L139,75l.66.07-.08.72a1.57,1.57,0,0,1,.45-.46,1.06,1.06,0,0,1,.77-.22h.07l.16,0Z"/>
            <path d="M124,67.86a1,1,0,0,0-1-.21,2.32,2.32,0,0,0-1,.74,2.07,2.07,0,0,0-.48,1,1,1,0,0,0,.44.92,1,1,0,0,0,1.07.19,2.89,2.89,0,0,0,.94-.75,2.17,2.17,0,0,0,.45-.86A1,1,0,0,0,124,67.86Z"/>
          </animated.g>
        </svg>
      ) }
    </Spring>
  </div>
}

export default CICD