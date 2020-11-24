import React from 'react'
import { useSessionStorage } from 'hooks'
import Modal from 'components/Modal'
import { AUTH_KEY } from 'utils/constants'

import NoUser from './noUser'


export default function Authentication( { open, setModal } ) {
  // User stored in session storage
  const [ user, setUserSession ] = useSessionStorage( AUTH_KEY )
  return<>
    {
      <Modal
        { ...{ open, setModal } }
        contents={ NoUser( user, setUserSession ) }
      />}
    {/* {user &&
      <Modal
        { ...{ open, setModal } }
        contents={ User( user, setUserSession ) }
      />} */}
  </>
}