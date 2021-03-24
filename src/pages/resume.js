import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import Toc from 'components/Toc'
import { PageBody } from 'components/styles'
import { useSessionStorage, useEventListener } from 'hooks'
import { PRIVACY_KEY, VISITOR_KEY } from 'utils/constants'

/** Use React Suspense and Lazy to speed up import */
const Adobe = React.lazy( () => import( 'components/Icons/Adobe' ) )

const Opencv = React.lazy( () => import( 'components/Icons/Opencv' ) )
const Terraform = React.lazy( () => import( 'components/Icons/Terraform' ) )
const Docker = React.lazy( () => import( 'components/Icons/Docker' ) )
const Aws = React.lazy( () => import( 'components/Icons/Aws' ) )
const Openmpi = React.lazy( () => import( 'components/Icons/Openmpi' ) )
const Tensorflow = React.lazy( () => import( 'components/Icons/Tensorflow' ) )
const React_icon = React.lazy( () => import( 'components/Icons/React' ) )
const Pandas = React.lazy( () => import( 'components/Icons/Pandas' ) )
const Spark = React.lazy( () => import( 'components/Icons/Spark' ) )
const Consul = React.lazy( () => import( 'components/Icons/Consul' ) )
const Graphql = React.lazy( () => import( 'components/Icons/GraphQL' ) )
const Postgresql = React.lazy( () => import( 'components/Icons/Postgresql' ) )
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
  const isSSR = typeof window === "undefined"
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
            <JobDate>{start} - { !end ? `Current` : end }</JobDate>
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
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Adobe /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Aws /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Consul /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Docker /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Graphql /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Opencv /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Openmpi /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Pandas /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Postgresql /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><React_icon /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Spark /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Tensorflow /></React.Suspense> }
      {!isSSR && <React.Suspense fallback={<div height={`200pt`}></div>}><Terraform /></React.Suspense> }
    </PageBody>
  )
}