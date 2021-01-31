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

/**
 *
 * @param {Object} Duties The duties.
 */
function Duties( { duties } ) {
  const dutiesList = duties.map( ( duty ) =>
    <li key={duty}>{duty}</li>
  )
  return <ul>{dutiesList}</ul>
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
  const user = useSessionStorage( AUTH_KEY )[0]
  useEffect( () => {
    FireHose( `Resume`, `/resume`, user )
  }, [ user ] )
  return(
    <PageBody>
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
      <Docker />
      <Opencv />
      <Openmpi />
      <Pandas />
      <React_icon />
      <Tensorflow />
      <Terraform />
    </PageBody>
  )
}