/* eslint-disable max-len */
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'
import { useInView } from 'react-hook-inview'

const blue = `#0095d8`
const min_x = 0
const max_x = 1
const steps = {
  1: { length: 3 },
  2: { length: 1 },
  3: { length: 1 },
  4: { length: 1 },
  5: { length: 1 },
  6: { length: 1 },
  7: { length: 1 },
  8: { length: 1 },
  9: { length: 1 },
  10: { length: 1 }
}
const sum = Object.keys( steps ).reduce( ( sum, key ) => sum + parseFloat( steps[key].length || 0 ), 0 )
let start = min_x
Object.keys( steps ).forEach( ( key ) => {
  steps[ key ][`start`] = start
  steps[ key ][`stop`] = start + ( steps[ key ].length / sum )
  start = start + ( steps[ key ].length / sum )
} )

const Docker = () => {
  // Only show when in view
  const [ref, inView] = useInView( { threshold: 1, } )
  return <div ref={ref} style={ { height: `200pt`, } }>
    <Spring native to={{ x: inView ?  max_x : min_x }}>
      { ( props ) => (
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="YMax">
          {/* Whale */}
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, steps[1].start, steps[1].stop, max_x], output: [0, 0, 1, 1] } )
                .interpolate( x => x )
            } }
            name="whale"
            className="Step1"
            fill={blue}
            d="M12.17,47.45a3.09,3.09,0,0,1,3-1.32c13.36,0,26.72,0,40.08,0a12.38,12.38,0,0,0,4.5-.83c.39-.15.5-.26.27-.71-2-3.83-1.08-7.36,1.17-10.75.24-.37.45-.23.72-.07a9.6,9.6,0,0,1,4.83,6.35c.12.51.27.58.76.52a10.78,10.78,0,0,1,5.82.52c2.41,1,2.31,1.11,1.05,3.15-1.78,2.9-4.6,4.08-7.91,4.13a1.21,1.21,0,0,0-1.3.9,35.42,35.42,0,0,1-6.54,10.86,28.06,28.06,0,0,1-13.68,8.25,40.06,40.06,0,0,1-19.64.41C19.54,67.57,15.91,64,13.92,58.54a29,29,0,0,1-1.58-6.94c0-.17.06-.4-.17-.51v-.58a1.12,1.12,0,0,0,0-.88V49.2a3.65,3.65,0,0,0,0-1.61Z"
          />
          {/*
            Boxes
            There are 9 boxes. They are ordered top-to-bottom left-to-right.
          */}
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[10].start, steps[10].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box10"
            className="Step10"
            fill={blue}
            d="M47.08,24.88a2.46,2.46,0,0,1,.16.76c0,1.46,0,2.91,0,4.36,0,.55-.2.81-.76.8h-5c-.54,0-.8-.21-.8-.78,0-1.47,0-2.95,0-4.43a1,1,0,0,1,.29-.71Z"
          />
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[7].start, steps[7].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box7"
            className="Step7"
            fill={blue}
            d="M28.43,37.87c-.83,0-1.65,0-2.48,0-.51,0-.78-.17-.77-.71,0-1.5,0-3,0-4.51,0-.49.22-.69.7-.69,1.73,0,3.45,0,5.18,0,.49,0,.69.21.69.7,0,1.5,0,3,0,4.51,0,.49-.21.7-.7.69Z"
          />
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[8].start, steps[8].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box8"
            className="Step8"
            fill={blue}
            d="M36.29,32c.85,0,1.7,0,2.55,0,.5,0,.7.21.69.7,0,1.5,0,3,0,4.5,0,.54-.25.71-.77.71-1.67,0-3.35,0-5,0-.57,0-.79-.23-.79-.78q0-2.18,0-4.35c0-.54.21-.8.78-.78C34.59,32,35.44,32,36.29,32Z"
          />
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[9].start, steps[9].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box9"
            className="Step9"
            fill={blue}
            d="M43.89,37.87H41.34a.57.57,0,0,1-.67-.65V32.64c0-.5.25-.67.73-.67q2.55,0,5.1,0c.53,0,.75.2.74.73,0,1.47,0,2.95,0,4.43,0,.58-.26.76-.8.75C45.59,37.85,44.74,37.87,43.89,37.87Z"
          />
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[2].start, steps[2].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box2"
            className="Step2"
            fill={blue}
            d="M20.79,45c-.82,0-1.65,0-2.48,0-.55,0-.79-.18-.79-.76,0-1.47,0-2.95,0-4.43,0-.52.21-.76.74-.75h5.1c.53,0,.74.26.74.76,0,1.48,0,3,0,4.44,0,.5-.22.75-.75.74C22.49,45,21.64,45,20.79,45Z"
          />
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[3].start, steps[3].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box3"
            className="Step3"
            fill={blue}
            d="M28.42,45c-.83,0-1.65,0-2.48,0-.51,0-.77-.19-.76-.72,0-1.51,0-3,0-4.51a.62.62,0,0,1,.71-.71h5.18c.49,0,.68.24.68.73,0,1.5,0,3,0,4.51,0,.49-.21.7-.7.7Z"
          />
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[4].start, steps[4].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box4"
            className="Step4"
            fill={blue}
            d="M36.27,45c-.85,0-1.7,0-2.55,0-.54,0-.76-.23-.76-.74q0-2.25,0-4.5c0-.49.26-.7.73-.7H38.8c.52,0,.74.22.74.74q0,2.22,0,4.44c0,.57-.23.78-.79.76C37.92,45,37.1,45,36.27,45Z"
          />
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[5].start, steps[5].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box5"
            className="box"
            fill={blue}
            d="M44,45c-.83,0-1.65,0-2.48,0-.54,0-.81-.18-.81-.75q0-2.22,0-4.44c0-.53.24-.75.75-.75h5.11c.53,0,.73.25.72.76q0,2.22,0,4.44c0,.52-.21.75-.74.74C45.65,45,44.8,45,44,45Z"
          />
          <animated.path
            style={ {
              transform: props.x
                .interpolate( { range: [min_x, steps[6].start, steps[6].stop, max_x], output: [100, 100, 0, 0] } )
                .interpolate( x => `translate3d(0,-${x}%, 0)` )
            } }
            name="box6"
            className="Step6"
            fill={blue}
            d="M51.73,45c-.85,0-1.7,0-2.55,0-.53,0-.75-.22-.75-.74,0-1.48,0-3,0-4.43,0-.51.2-.77.73-.77h5.1c.53,0,.75.23.74.75,0,1.48,0,3,0,4.43,0,.58-.24.78-.79.76C53.38,45,52.56,45,51.73,45Z"
          />


          {/* Letters */}
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            className="docker_letter"
            name="D"
            fill={blue}
            d="M96.48,44.59c0-1.62,0-3.25,0-4.88a1.75,1.75,0,1,0-3.49.16c0,2.62,0,5.24,0,8l-.58-.41a9.4,9.4,0,0,0-13.22,2.86,9.32,9.32,0,1,0,17.28,5.24C96.55,51.92,96.47,48.26,96.48,44.59ZM87.2,61A5.8,5.8,0,1,1,93,55.15,5.85,5.85,0,0,1,87.2,61Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="O"
            className="docker_letter"
            fill={blue}
            d="M107.59,45.89a9.29,9.29,0,1,0,9.33,9.31A9.32,9.32,0,0,0,107.59,45.89Zm0,15.09a5.8,5.8,0,1,1,5.83-5.77A5.86,5.86,0,0,1,107.58,61Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            className="docker_letter"
            name="C"
            fill={blue}
            d="M128.26,64.46a9.35,9.35,0,0,1-9.57-8.39,9.24,9.24,0,0,1,7.55-10,9,9,0,0,1,7.54,1.85,1.78,1.78,0,1,1-2.15,2.78,5.82,5.82,0,0,0-9.35,3.2,5.81,5.81,0,0,0,9.09,6l.29-.22a1.76,1.76,0,1,1,2.14,2.78A8.82,8.82,0,0,1,128.26,64.46Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            className="docker_letter"
            name="K"
            fill={blue}
            d="M152.07,49l0,0a1.86,1.86,0,0,0,.56-.85,1.34,1.34,0,0,0,0-.2,1.27,1.27,0,0,0,0-.28v-.11a1.72,1.72,0,0,0-.08-.38,2.56,2.56,0,0,0-.11-.24l0-.07a.18.18,0,0,0,0-.07,1.88,1.88,0,0,0-.12-.18A1.65,1.65,0,0,0,151,45.9h-.11a1.6,1.6,0,0,0-.42.07h0a3.69,3.69,0,0,0-.42.17l-9.93,6.43V39.92A1.75,1.75,0,0,0,138.38,38a1.72,1.72,0,0,0-1.78,1.94q0,11.28,0,22.56a1.77,1.77,0,1,0,3.5,0c0-1.36,0-5.81,0-5.81l2.12-1.12s5,5.66,7.37,8.26a1.74,1.74,0,1,0,2.67-2.24c-.14-.17-.29-.33-.44-.49-2.1-2.36-6.68-7.45-6.68-7.45l6.61-4.38A3.81,3.81,0,0,0,152.07,49Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            className="docker_letter"
            name="E"
            fill={blue}
            d="M171.2,51.88a9.34,9.34,0,1,0-2.57,10.29,1.82,1.82,0,0,0,.29-2.6,1.75,1.75,0,0,0-2.54-.09l-.22.2a5.9,5.9,0,0,1-9-2c-.23-.51-.28-.74.44-.73,2,0,4.09,0,6.13,0h6.21A1.7,1.7,0,0,0,171.79,55,8.78,8.78,0,0,0,171.2,51.88Zm-3.26,1.58H157.45c-.4,0-.58,0-.4-.51a5.88,5.88,0,0,1,10.92.31A.66.66,0,0,1,167.94,53.46Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            className="docker_letter"
            name="R"
            fill={blue}
            d="M177.18,47.89a10.43,10.43,0,0,1,3.3-1.65,10.6,10.6,0,0,1,5.13,0,3.6,3.6,0,0,1,1.2.5,1.73,1.73,0,0,1-1.49,3.11,6.33,6.33,0,0,0-3.94-.21,5.64,5.64,0,0,0-4.18,5.12c-.1,2.64,0,5.29-.07,7.93a1.67,1.67,0,0,1-1.28,1.73,1.73,1.73,0,0,1-2.19-1.75c0-5,0-10,0-14.92a1.71,1.71,0,0,1,1.68-1.82C176.35,45.87,177,46.56,177.18,47.89Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="docker_registered_R"
            className="docker_letter"
            fill={blue}
            d="M181.71,63.3a.49.49,0,0,0,.24-.44.53.53,0,0,0-.51-.51H181a.2.2,0,0,0-.2.2v1.21a.2.2,0,1,0,.4,0V63.4h.13l.2.44a.21.21,0,0,0,.18.12l.09,0a.2.2,0,0,0,.09-.27Zm-.52-.55h.24a.13.13,0,0,1,.12.12.12.12,0,0,1-.11.13h-.25Z"
          />
          <animated.path
            style={ {
              opacity: props.x
                .interpolate( { range: [min_x, max_x], output: [0, 1] } )
                .interpolate( x => x )
            } }
            name="docker_registered_circle"
            className="docker_letter"
            fill={blue}
            d="M181.31,62.23a.93.93,0,1,1-.93.93.92.92,0,0,1,.93-.93m0-.4a1.33,1.33,0,1,0,1.32,1.33,1.32,1.32,0,0,0-1.32-1.33Z"
          />
        </svg>
      ) }
    </Spring>
  </div>
}

export default Docker