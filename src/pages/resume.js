import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import Toc from 'components/Toc'
import { PageBody } from 'components/styles'

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

function Skills( { skills } ) {
  const SkillDiv = styled.div`
    border: solid 2px var(--color-b);
    border-radius: 0.3em;
    padding-right: 0.6em;
    padding-left: 0.6em;
    font-weight: bold;
    margin: 0.6em;
  `
  const SkillsDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  `
  const skillList = skills.map( ( skill ) =>
    <SkillDiv key={skill}>{skill}</SkillDiv>
  )
  return <SkillsDiv>{skillList}</SkillsDiv>
}

export default function Resume() {
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

  const Description = styled.text`
    margin-bottom: 0.3em;
  `

  const { contentYaml } = useStaticQuery( graphql`
    {
      contentYaml {
        positions {
          title, company, start(formatString: "MMM YYYY"),
          end(formatString: "MMM YYYY"), duties
        },
        skills
      }
    }
  ` )
  const { positions, skills } = contentYaml
  return(
    <PageBody>
      <Toc />
      <MainTitle>Education</MainTitle>
      <Description>
        I did both my undergraduate and graduate school with University of
        the Pacific. This school was great, and I had the opportunity to
        learn a lot and develop life-long relationships. Pacific offered
        me the opportunity to work while going to school for college
        credit. I leveraged this in order to maximize my work experience.
      </Description>
      <JobDiv>
        <JobTitle>Data Science</JobTitle>
        <JobLocation>Master&apos;s Degree</JobLocation>
        <JobDate>Aug 2018 - May 2020</JobDate>
      </JobDiv>
      <JobDiv>
        <JobTitle>Computer Engineering</JobTitle>
        <JobLocation>Bachelor&apos;s Degree</JobLocation>
        <JobDate>Aug 2013 - May 2018</JobDate>
      </JobDiv>
      <MainTitle>What I&apos;ve Done</MainTitle>
      <Description>
        I&apos;ve been working with both hardware and software at a few
        companies. I&apos;m currently trying to find a position related to
        computer vision and/or data science.
      </Description>
      {positions.map( ( { title, company, start, end, duties } ) => (
        <>
          <JobDiv>
            <JobTitle>{title}</JobTitle>
            <JobLocation>{company}</JobLocation>
            <JobDate>{start} - {end}</JobDate>
          </JobDiv>
          <Duties duties={duties} />
        </>
      ) ) }
      <MainTitle>My Skills</MainTitle>
      <Description>
        Through school or work, I&apos;ve always tried to learn as many skills
        as possible. Here are the skills I&apos;ve picked up thus far.
      </Description>
      <Skills skills={skills} />
    </PageBody>
  )
}