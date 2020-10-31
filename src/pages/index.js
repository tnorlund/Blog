import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'
import { PageBody } from 'components/styles'
import ProjectList from 'views/ProjectList'
import PostList from 'views/PostList'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { LinkedinSquare, Twitter } from 'styled-icons/boxicons-logos'
import { Github } from 'styled-icons/simple-icons'
import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure( config )

const Icons = {
  LinkedinSquare,
  Twitter,
  Github
}

const SocialsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 1.666rem;
`

const ProfilePic = styled( Img )`
  border-radius: 50%;
  justify-self: center;
  margin-bottom: 1.666rem;
  background:var(--color-b);
`

function Social( { metadata } ) {
  const social = [
    {
      title: `twitter`,
      icon: `Twitter`,
      url:`https://twitter.com/` + metadata.siteMetadata.social.twitter
    },
    {
      title: `linkedin`,
      icon: `LinkedinSquare`,
      url:`https://www.linkedin.com/in/`
        + metadata.siteMetadata.social.linkedin
    },
    {
      title: `github`,
      icon: `Github`,
      url:`https://github.com/` + metadata.siteMetadata.social.github
    },
  ]
  const socials = social.map( ( { url, title, icon } ) => {
    const Icon = Icons[icon]
    return(
      <div key={title}>
        <a href={url} aria-label={title}>
          <Icon size="75px" />
        </a>
      </div>
    )
  } )
  return (
    <SocialsDiv>{socials}</SocialsDiv>
  )
}

const Landing = ( { data } ) => {
  const { landing, picture, metadata } = data
  return (
    <>
      <PageBody>
        <ProfilePic fixed={picture.img.fixed} />
        <Social metadata={metadata} />
        <MDXRenderer>{landing.body}</MDXRenderer>
        <h1>Projects</h1>
        <ProjectList />
        <h1>Blog</h1>
        <PostList />
      </PageBody>
    </>
  )
}

export default Landing

// Here, the landing page and its assets are queried. The landing page also
// shows the 5 most recent blog posts.
export const query = graphql`
  {
    landing: mdx( frontmatter: { slug: {eq: "/"} } ) {
      frontmatter { title, slug }, body, id
    }
    picture: file( name: {eq: "Portrait"} ) {
      img: childImageSharp {
        fixed(width: 300) { ...GatsbyImageSharpFixed_withWebp }
      }
    }
    metadata: site { siteMetadata { social { github, linkedin, twitter } } }
  }
`