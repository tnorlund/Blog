import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import Toc from 'components/Toc'
import { PageBody } from 'components/styles'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { FireHose } from 'utils/auth'

import Opencv from 'components/Icons/Opencv'
import Terraform from 'components/Icons/Terraform'
import Docker from 'components/Icons/Docker'
import Aws from 'components/Icons/Aws'
import Openmpi from 'components/Icons/Openmpi'
import Tensorflow from 'components/Icons/Tensorflow'
import React_icon from 'components/Icons/React'
import Pandas from 'components/Icons/Pandas'
import Spark from 'components/Icons/Spark'
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

const JobTitle = styled.h2`
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

export default function Resume() {
  const { contentYaml } = useStaticQuery( graphql`
    {
      contentYaml {
        positions {
          title, company, start(formatString: "MMM YYYY"),
          end(formatString: "MMM YYYY"), duties
        }
      }
    }
  ` )
  const { positions } = contentYaml
  const user = useSessionStorage( AUTH_KEY )[0]
  useEffect( () => {
    FireHose( `Resume`, `/resume`, user )
  }, [ user ] )
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
      <JobTitle>What I Store</JobTitle>
      <div style={{ marginBottom: `1em` }}>
        I use visitor&apos;s data to get a better understanding of what content
        gets visitor&apos;s attention. With the visitor&apos;s permission I
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
      <JobTitle>What You&apos;re Sharing</JobTitle>
      <ShareDiv>
        <IconDiv><Check/></IconDiv>
        <Details>Browser</Details>
      </ShareDiv>
      <ShareDiv>
        <IconDiv><Question/></IconDiv>
        <Details>IP Address</Details>
      </ShareDiv>
      <ShareDiv>
        <IconDiv><Cross/></IconDiv>
        <Details>Window Size</Details>
      </ShareDiv>
      <ShareDiv>
        <IconDiv><Question/></IconDiv>
        <Details>Scroll Position</Details>
      </ShareDiv>
      <ShareButton>Stop Sharing</ShareButton>
      <DeleteButton>Delete My Data</DeleteButton>
    </PageBody>
  )
}