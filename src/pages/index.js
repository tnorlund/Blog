import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { PageBody } from 'components/styles'
import { Icons, SocialsDiv, ProfilePic } from '../templates/styles'
import List from 'components/List'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { FireHose } from 'utils/auth'

function Social( { metadata } ) {
  const { github, linkedin, twitter } = metadata.siteMetadata.social
  const social = [
    {
      title: `twitter`, icon: `TwitterIcon`,
      url:`https://twitter.com/${twitter}`
    },
    {
      title: `linkedin`, icon: `LinkedInIcon`,
      url: `https://www.linkedin.com/in/${linkedin}`
    },
    {
      title: `github`, icon: `GithubIcon`, url: `https://github.com/${github}`
    },
  ]
  const socials = social.map( ( { url, title, icon } ) => {
    const Icon = Icons[icon]
    return(
      <div key={title}>
        <a href={url} aria-label={title}>
          <Icon/>
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
  const user = useSessionStorage( AUTH_KEY )[0]
  useEffect( () => {
    FireHose( `Tyler Norlund`, `/`, user )
  }, [ user ] )
  return(
    <PageBody>
      <ProfilePic fixed={picture.img.fixed} />
      <Social metadata={metadata} />
      <MDXRenderer>{landing.body}</MDXRenderer>
      <h1>Projects</h1>
      <List type={`project`} />
      <h1>Blog</h1>
      <List type={`blog`} />
    </PageBody>
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