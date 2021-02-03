import React from 'react'
import styled from 'styled-components'
import Toc from 'components/Toc'
import { PageBody } from 'components/styles'
import { useSessionStorage } from 'hooks'
import { PRIVACY_KEY } from 'utils/constants'

import Check from 'components/Icons/Check'
import Question from 'components/Icons/Question'
import Cross from 'components/Icons/Cross'

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

const SubTitle = styled.h2`
  margin-top: 1em;
  margin-bottom: 0.3em;
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

const DeleteButton = styled.div`
  display: flex;
  background: var(--color-red);
  color: var(--color-background);
  font-weight: bold;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  margin: 1em;
  border-radius: 0.25em;
  cursor: pointer;
`

const MainTitle = styled.h1`
  border-bottom: 4px solid var(--color-b);
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

export default function Resume() {
  const [ privacy, setPrivacy ] = useSessionStorage( PRIVACY_KEY )

  return(
    <PageBody>
      <Toc />
      <MainTitle>Privacy Policy</MainTitle>
      <div style={{ marginBottom: `1em` }}>
      “I believe people are smart and some people want to share more data than
      other people do. Ask them. Ask them every time. Make them tell you to
      stop asking them if they get tired of your asking them. Let them know
      precisely what you’re going to do with their data.”<br/>
        <div style={{ marginLeft: `1em` }}>
          <b>Steve Jobs</b>
        </div>
        <div style={{ marginLeft: `1em` }}>
          All Things Digital Conference, 2010
        </div>
      </div>
      <div style={{ marginBottom: `1em` }}>
        In my opinion, privacy is the most valuable asset we willing give away.
        The largest companies today make most of their money by selling our
        data. I made this website for fun, and I will <b>not</b> sell your data.
      </div>
      <SubTitle>What I Store</SubTitle>
      <div style={{ marginBottom: `1em` }}>
        I use visitor&apos;s data to get a better understanding of what content
        gets visitor&apos;s attention. With the visitor&apos;s permission, I
        store their:
        <ul style={{ paddingLeft: `1.5em` }}>
          <li>Browser</li>
          <li>IP Address</li>
          <li>Window Size</li>
          <li>Scroll Position</li>
        </ul>
        This data is processed and aggregated to store each visitor&apos;s
        <ul style={{ paddingLeft: `1.5em` }}>
          <li>Location</li>
          <ul style={{ paddingLeft: `1.5em` }}>
            <li>Country</li>
            <li>City</li>
            <li>Zip-code</li>
            <li>Timezone</li>
          </ul>
          <li>Internet Service Provider</li>
          <ul style={{ paddingLeft: `1.5em` }}>
            <li>The provider&apos;s name</li>
            <li>
              Whether the visitor is using a VPN (Virtual Private Network)
            </li>
          </ul>
          <li>Device Information</li>
          <ul style={{ paddingLeft: `1.5em` }}>
            <li>Whether the visitor is on a phone or computer</li>
            <li>Operating System</li>
          </ul>
          <li>Browser Information</li>
          <ul style={{ paddingLeft: `1.5em` }}>
            <li>Window size</li>
            <li>Scroll position</li>
          </ul>
          <li>Page Visit Frequency</li>
        </ul>
        All of this information is uniquely identifiable by each visitor. This
        means that I need each visitor&apos;s permission to store their data.
        Each visitors&apos;s data is deleted after 30 days.
      </div>
      <SubTitle>What You&apos;re Sharing</SubTitle>
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
      {
        ( privacy &&
          (
            privacy.browser || privacy.ip || privacy.windowSize ||
            privacy.scrollPosition
          )
        ) && <ShareButton
          onClick={ () => setPrivacy( {
            ...privacy, browser:false, ip: false, windowSize: false,
            scrollPosition: false
          } ) }
        >Stop Sharing</ShareButton>
      }
      {
        !privacy || (
          !privacy.browser && !privacy.ip && !privacy.windowSize &&
          !privacy.scrollPosition
        ) && <ShareButton
          onClick={ () => setPrivacy( {
            ...privacy, browser:true, ip: true, windowSize: true,
            scrollPosition: true
          } ) }
        >Start Sharing</ShareButton>
      }

      <DeleteButton>Delete My Data</DeleteButton>
    </PageBody>
  )
}