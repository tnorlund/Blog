import React, { lazy, Suspense } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import Toc from 'components/Toc'
import { PageBody } from 'components/styles'
import { useSessionStorage, useEventListener } from 'hooks'
import { PRIVACY_KEY, VISITOR_KEY } from 'utils/constants'
// import Adobe from 'components/Icons/Adobe'
const Adobe = lazy( () => import( `components/Icons/Adobe` ) )
// import Opencv from 'components/Icons/Opencv'
const Opencv = lazy( () => import( `components/Icons/Opencv` ) )
import Terraform from 'components/Icons/Terraform'
import Docker from 'components/Icons/Docker'
import Aws from 'components/Icons/Aws'
import Openmpi from 'components/Icons/Openmpi'
import Tensorflow from 'components/Icons/Tensorflow'
import React_icon from 'components/Icons/React'
import Pandas from 'components/Icons/Pandas'
import Spark from 'components/Icons/Spark'
import Consul from 'components/Icons/Consul'
import Graphql from 'components/Icons/GraphQL'
import { v4 as uuidv4 } from 'uuid'
import { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'
import { handleScroll, IncrementBuffer } from 'utils/analytics'


/** Add Kinesis Firehose to the Amplify Analytics object. */
Analytics.addPluggable( new AWSKinesisFirehoseProvider() )


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
  /** A buffer used to store scroll events */
  let scroll_buffer = {}
  /** The key of the buffer of where to store the scroll data. */
  let buffer_index = 0
  buffer_index = IncrementBuffer( scroll_buffer, buffer_index )
  /** The object used to determine whether the visitor has agreed to the
    * privacy policy.
    */
  const privacy = useSessionStorage( PRIVACY_KEY )[0]
  /** The unique ID of the visitor in session storage. */
  const [ visitorKey, setVisitorKey ] = useSessionStorage( VISITOR_KEY )
  if ( !visitorKey ) setVisitorKey( uuidv4() )
  /** Send analytics data every time the user scrolls. */
  useEventListener(
    `scroll`,
    async () => buffer_index = handleScroll(
      privacy, scroll_buffer, buffer_index, Analytics,
      visitorKey, `Resume`, `/resume`
    )
  )
  const renderLoader = () => <div height={`200pt`}/>
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
      <Suspense
        fallback={renderLoader()} >
        <Adobe />
      </Suspense>
      <Suspense
        fallback={renderLoader()} >
        <Aws />
      </Suspense>
      {/* <Aws /> */}
      <Consul />
      <Docker />
      <Graphql />
      {/* <Opencv /> */}
      <Suspense
        fallback={renderLoader()} >
        <Opencv />
      </Suspense>
      <Openmpi />
      <Pandas />
      <React_icon />
      <Spark />
      <Tensorflow />
      <Terraform />
    </PageBody>
  )
}