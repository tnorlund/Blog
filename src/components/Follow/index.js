import React from 'react'
import { FollowDiv } from './styles'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'

const handleFollow = async ( user, slug ) => {
  console.log( `user`, user )
}

export default function Follow( { slug } ) {
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
  return(
    <>{user && <FollowDiv onClick={
      () => handleFollow( user, slug )
    } >Follow</FollowDiv>}</>
  )
}