import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import { PageBody } from 'components/styles'

const MainTitle = styled.h1`
  border-bottom: 4px solid var(--color-b);
`

const JobDiv = styled.div`
  border-bottom: 2px solid var(--color-b);
  margin-bottom: 25px;
`
const JobTitle = styled.h2`
margin-bottom: 3px;
`

const JobLocation = styled.h3`
font-weight: normal;
margin-bottom: 5px;
`

const JobDate = styled.h4`
margin-bottom: 0;
`
const SkillDiv = styled.div`
border: solid 2px var(--color-b);
border-radius: 5px;
padding-right: 5px;
padding-left: 5px;
font-weight: bold;
margin: 10px;
`

const SkillsDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
`

const Description = styled.text`
  margin-bottom:25px;
`

function Duties({duties}) {
  const dutiesList = duties.map((duty) =>
    <li>{duty}</li>
  );
  return (
  <ul>{dutiesList}</ul>
  )
}

function Skills({skills}) {
  const skillList = skills.map((skill) =>
    <SkillDiv>{skill}</SkillDiv>
  );
  return (
    <SkillsDiv>{skillList}</SkillsDiv>
  )
}

export default function Resume() {
  const { contentYaml } = useStaticQuery(graphql`
    {
      contentYaml {
        positions {
          title
          company
          start(formatString: "MMM YYYY")
          end(formatString: "MMM YYYY")
          location
          duties
        }
        skills
      }
    }
  `)
  const { positions, skills } = contentYaml;
  return (
  <>
    <PageBody>
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
        <JobLocation>Master's Degree</JobLocation>
        <JobDate>Aug 2018 - May 2020</JobDate>
      </JobDiv>
      <JobDiv>
        <JobTitle>Computer Engineering</JobTitle>
        <JobLocation>Bachelor's Degree</JobLocation>
        <JobDate>Aug 2013 - May 2018</JobDate>
      </JobDiv>
      <MainTitle>What I've Done</MainTitle>
      <Description>
        I've been working with both hardware and software at a few companies. 
        I'm currently trying to find a position related to computer vision 
        and/or data science.
      </Description>
      {positions.map(
        ({ title, company, start, end, location, duties }, index) => (
          <>
          <JobDiv>
            <JobTitle>{title}</JobTitle>
            <JobLocation>{location}</JobLocation>
            <JobDate>{start} - {end}</JobDate>
          </JobDiv>
          <Duties duties={duties} />
          </>
      ))}
      <MainTitle>My Skills</MainTitle>
      <Description>
        Through school or work, I've always tried to learn as many skills as
        possible. Here are the skills I've picked up thus far.
      </Description>
      <Skills skills={skills} />
    </PageBody>
  </>
  )
}