import React from 'react'
import styled from 'styled-components'
import Toc from 'components/Toc'
import { PageBody } from 'components/styles'
import { useSessionStorage } from 'hooks'
import { PRIVACY_KEY } from 'utils/constants'
import Check from '../components/MyIcons/Check'
import Question from '../components/MyIcons/Question'
import Cross from '../components/MyIcons/Cross'

const ShareDiv = styled.div`
  display: flex;
  flex-basis: auto;
  padding-left: 0.5em;
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
  color: var(--color-buttontext);
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
  color: var(--color-buttontext);
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

/**
 * Determines whether the show the 'Stop Sharing' button.
 * @param {Object} privacy The visitor's privacy settings stored in session
 *                         storage.
 * @returns {Boolean} Whether to show 'Stop Sharing' button or not.
 */
const ShowStopShare = ( privacy ) => (
  privacy &&
  (
    privacy.browser || privacy.ip || privacy.windowSize ||
    privacy.scrollPosition
  )
)

export default function Privacy() {
  const [ privacy, setPrivacy ] = useSessionStorage( PRIVACY_KEY )

  return(
    <PageBody>
      <Toc />
      <MainTitle>Privacy Policy / DMCA</MainTitle>
      <div>
        TylerNorlund.com, (the &quot;Site&quot;, &quot;me&quot;, &quot;I&quot;,
        or &quot;mine&quot;) want you to know
        how I collect and use your information. I work hard to keep your
        information secure, and I would like to provide you with meaningful
        choices regarding your privacy.
      </div>
      <SubTitle>What I Store</SubTitle>
      <div>
        I use visitor&apos;s data to get a better understanding of what content
        gets the visitor&apos;s attention. With their permission, I store each
        visitor&apos;s:
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
        ShowStopShare( privacy ) && <ShareButton
          onClick={ () => setPrivacy( {
            ...privacy, browser:false, ip: false, windowSize: false,
            scrollPosition: false
          } ) }
        >Stop Sharing</ShareButton>
      }
      {
        !ShowStopShare( privacy ) && <ShareButton
          onClick={ () => setPrivacy( {
            ...privacy, browser:true, ip: true, windowSize: true,
            scrollPosition: true
          } ) }
        >Start Sharing</ShareButton>
      }

      <DeleteButton>Delete My Data</DeleteButton>
      <SubTitle>DMCA</SubTitle>
      <div>
        All content used on this site is considered <a
          href={`https://www.copyright.gov/title17/92chap1.html#107`}
        > &quot;Fair Use&quot;</a>. If there are any problems, contact <a href={
          `mailto:webmaster@tylernorlund.com`
        }>webmaster@tylernorlund.com</a>.
      </div>

    </PageBody>
  )
}