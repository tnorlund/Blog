import React from 'react'
import { Box, Icon, Div } from './styles'

export default function User( { setModal } ) {
  return (
    // <Box>
      <Div>
        <Icon onClick={
          () => setModal( true )
        }/>
      </Div>
    // </Box>
  )
}