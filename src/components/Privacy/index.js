import React from 'react'
import { useSessionStorage } from 'hooks'
import Modal from 'components/Modal'
import { PRIVACY_KEY } from 'utils/constants'
import styled from 'styled-components'
import Check from 'components/Icons/Check'
import Question from 'components/Icons/Question'
import Cross from 'components/Icons/Cross'
import { Link } from 'gatsby'
import { Title, Description } from 'components/styles/Modal'

const ShareDiv = styled.div`
  display: flex;
  flex-basis: auto;
`

const IconDiv = styled.div`
  width: 3em;
`

const Details = styled.div`
  margin-left: 1em;
  font-weight: bold;
  display: flex;
  align-items: center;
`

const ShareButton = styled.div`
  display: flex;
  background: var(--color-b);
  color: var(--color-background);
  font-weight: bold;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  margin: 1em;
  border-radius: 0.25em;
  cursor: pointer;
`

const ShareItem = ( { name, privacyKey, privacy, setPrivacy } ) => {
  let newPrivacy = { ...privacy }
  return <ShareDiv
    onClick={ () => {
      if (
        typeof privacy == `undefined` || !( `${privacyKey}` in privacy )
      ) newPrivacy[privacyKey] = true
      else if (
        typeof privacy[privacyKey] == `boolean` && privacy[privacyKey] == true
      ) newPrivacy[privacyKey] = false
      else if (
        typeof privacy[privacyKey] == `boolean` && privacy[privacyKey] == false
      ) newPrivacy[privacyKey] = true
      setPrivacy( newPrivacy )
    } }
  >
    <IconDiv>
      {
        ( typeof privacy == `undefined` ||
        !( privacyKey in privacy ) ) && <Question/>
      }
      {
        privacy &&
        privacy[privacyKey] &&
        privacy[privacyKey] == true &&
        <Check/>
      }
      {
        privacy &&
        !privacy[privacyKey] &&
        privacy[privacyKey] == false &&
        <Cross/>
      }
    </IconDiv>
    <Details>{name}</Details>
  </ShareDiv>
}

const Contents = ( { privacy, setPrivacy, setModal } ) => {
  return <div>
    <Title>Analytics</Title>
    <Description>
      I would like to understand how people use this website.
      Please check the <Link to={`/privacy`}>privacy policy</Link> to see why.
      <ShareItem
        name={`Browser`}
        privacyKey={`browser`}
        privacy={privacy}
        setPrivacy={setPrivacy}
      />
      <ShareItem
        name={`IP Address`}
        privacyKey={`ip`}
        privacy={privacy}
        setPrivacy={setPrivacy}
      />
      <ShareItem
        name={`Window Size`}
        privacyKey={`windowSize`}
        privacy={privacy}
        setPrivacy={setPrivacy}
      />
      <ShareItem
        name={`Scroll Position`}
        privacyKey={`scrollPosition`}
        privacy={privacy}
        setPrivacy={setPrivacy}
      />
    </Description>
    <ShareButton
      onClick={ () => {
        if (
          privacy && (
            privacy.browser || privacy.ip || privacy.windowSize ||
            privacy.scrollPosition
          )
        ) {
          if (
            typeof privacy.browser == `undefined`
          ) setPrivacy( { ...privacy, browser: false, shownWindow: true } )
          if (
            typeof privacy.ip == `undefined`
          ) setPrivacy( { ...privacy, ip: false, shownWindow: true } )
          if (
            typeof privacy.windowSize == `undefined`
          ) setPrivacy( {
            ...privacy, windowSize: false, shownWindow: true
          } )
          if (
            typeof privacy.scrollPosition == `undefined`
          ) setPrivacy( {
            ...privacy, scrollPosition: false, shownWindow: true
          } )
        }
        else {
          setPrivacy( {
            ...privacy, browser:true, ip: true, windowSize: true,
            scrollPosition: true, shownWindow: true
          } )

        }
        setTimeout( () => { setModal( false ) }, 1000 )
      } }
    >Accept</ShareButton>
  </div>
}
export default function Privacy( { open, setModal } ) {
  const [ privacy, setPrivacy ] = useSessionStorage( PRIVACY_KEY )
  // User stored in session storage
  return <Modal
    { ...{ open, setModal } }
    contents={
      <Contents
        privacy={ privacy}
        setPrivacy={ setPrivacy }
        setModal={setModal}
      />
    }
  />
}