import React, { useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useEventListener, useSessionStorage } from 'hooks'
import Modal from 'components/Modal'
import { AUTH_KEY, TOS_KEY } from 'utils/constants'

import NoUser from './noUser'
import User from './user'


export default function Authentication( { open, setModal } ) {
  // User stored in session storage
  const [ user, setUserSession ] = useSessionStorage( AUTH_KEY )
  let contents
  if ( !user ) {
    contents = NoUser( setUserSession )
  } else {
    contents = User( user, setUserSession )
  }
  return(
    <>
      <Modal
        { ...{ open, setModal } }
        contents={ contents }
      />
    </>
  )
}