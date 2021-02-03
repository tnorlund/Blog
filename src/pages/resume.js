import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import Toc from 'components/Toc'
import { PageBody } from 'components/styles'
import { useSessionStorage, useEventListener } from 'hooks'
import { AUTH_KEY, VISITOR_KEY, PRIVACY_KEY } from 'utils/constants'
import { FireHose } from 'utils/auth'

import Amplify, {
  Auth, API, Analytics, AWSKinesisFirehoseProvider
} from 'aws-amplify'

import Opencv from 'components/Icons/Opencv'
import Terraform from 'components/Icons/Terraform'
import Docker from 'components/Icons/Docker'
import Aws from 'components/Icons/Aws'
import Openmpi from 'components/Icons/Openmpi'
import Tensorflow from 'components/Icons/Tensorflow'
import React_icon from 'components/Icons/React'
import Pandas from 'components/Icons/Pandas'
import Spark from 'components/Icons/Spark'
import Consul from 'components/Icons/Consul'

/**
 *
 * @param {Object} Duties The duties.
 */
function Duties( { duties } ) {
  const dutiesList = duties.map( ( duty ) =>
    <li key={duty}>{duty}</li>
  )
  return <ul style={{ paddingLeft: `1.5em` }}>{dutiesList}</ul>
}

const JobDiv = styled.div`
border-bottom: 2px solid var(--color-b);
margin-bottom: 0.2em;
`
const JobTitle = styled.h2`
margin-top: 1em;
margin-bottom: 0.3em;
`

const JobLocation = styled.h3`
font-weight: normal;
margin-top: 0;
margin-bottom: 0.3em;
`

const JobDate = styled.h4`
margin: 0;
`

const MainTitle = styled.h1`
border-bottom: 4px solid var(--color-b);
`

// TODO
// [ ] Terraform Cognito User Pool and Identity Pool
// ---
// const analysis = async ( title, slug, visitorKey, privacy ) => {
//   try {
//     Analytics.addPluggable( new AWSKinesisFirehoseProvider() )
//     Analytics.record( {
//       id: visitorKey,
//       date: new Date().toISOString(),
//       title: `Resume`,
//       slug: `/resume`,
//       app: privacy && privacy.browser? window.navigator.userAgent : undefined,
//       Y: privacy && privacy.scroll? window.scrollY : undefined,
//       X: privacy && privacy.scroll? window.scrollX : undefined,
//       height: privacy && privacy.windowSize? window.screen.height : undefined,
//       width: privacy && privacy.windowSize ? window.screen.width : undefined,
//       streamName: process.env.GATSBY_ANALYTICS_FIREHOSE
//     }, `AWSKinesisFirehose` )
//   } catch( error ) {
//     console.log( `error`, error )
//   }
// }

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
  const visitorKey = useSessionStorage( VISITOR_KEY )[0]
  const user = useSessionStorage( AUTH_KEY )[0]
  const privacy = useSessionStorage( PRIVACY_KEY )[0]
  useEffect( () => {
    FireHose( `Resume`, `/resume`, user )
  }, [ user ] )
  // Analytics.addPluggable( new AWSKinesisFirehoseProvider() )
  // useEventListener( `scroll`, () => {
  //   analysis( `Resume`, `/resume`, visitorKey, privacy )
  // } )
  return(
    <PageBody
    >
      <Toc />
      <MainTitle>Experience</MainTitle>
      {positions.map( ( { title, company, start, end, duties } ) =>
        <div key={ title + company }>
          <JobDiv>
            <JobTitle>{title}</JobTitle>
            <JobLocation>{company}</JobLocation>
            <JobDate>{start} - {end}</JobDate>
          </JobDiv>
          <Duties duties={duties} />
        </div>
      ) }
      <MainTitle>Education </MainTitle>
      <JobDiv>
        <JobTitle>MS: Data Science</JobTitle>
        <JobLocation>University of the Pacific</JobLocation>
        <JobDate>Aug 2018 - May 2020</JobDate>
      </JobDiv>
      <JobDiv>
        <JobTitle>BS: Computer Engineering</JobTitle>
        <JobLocation>University of the Pacific</JobLocation>
        <JobDate>Aug 2013 - May 2018</JobDate>
      </JobDiv>
      <MainTitle>Skills</MainTitle>
      <Aws />
      <Consul />
      <Docker />
      <Opencv />
      <Openmpi />
      <Pandas />
      <React_icon />
      <Spark />
      <Tensorflow />
      <Terraform />
    </PageBody>
  )
}