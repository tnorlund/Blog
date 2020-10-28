import React from 'react'
import { Box, Icon } from './styles'

export default function User( { setModal } ) {
  return (
    <Box>
      <Icon onClick={
        () => setModal( true )
      }/>
    </Box>
  )
}