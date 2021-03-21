import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PageBody } from 'components/styles'
import { Icons, SocialsDiv } from '../templates/styles'
import { GatsbyImage } from "gatsby-plugin-image"
import List from 'components/List'


const Social = ( { metadata } ) => {
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

// markup
const IndexPage = () => {
  const { picture, metadata } = useStaticQuery(
    graphql`query {
      picture: file(name: {eq: "Portrait"}) {
        childImageSharp {
          gatsbyImageData( 
            width: 300 
            placeholder: BLURRED
          )
        }
      }
      metadata: site {
        siteMetadata { social { github, linkedin, twitter } }
      }
    }`
  )
  return (
    <PageBody>
      <title>Home Page</title>
      <div style={ {
        justifyContent: 'center',
        width: `100%`,
        display: `flex`,
        marginBottom: '1.666rem',
      } }>
      <GatsbyImage 
        style={ {
          borderRadius: '50%',
          justifySelf: 'center',
          margin: '0 auto',
          backgroundColor: `var(--color-b)`
        } }
        imgStyle={ {
          backgroundColor: `var(--color-b)`,
          borderRadius: '50%',
        } }
        backgroundColor={`var(--color-b)`}
        image={picture.childImageSharp.gatsbyImageData} 
        alt="My face" 
      />
      </div>
      <Social metadata={metadata} />
      <h1>Blog</h1>
      <List limit={ 5 } />
    </PageBody>
  )
}

export default IndexPage