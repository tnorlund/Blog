import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twitter: file(absolutePath: { regex: "/Logos_Twitter.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    linkedin: file(absolutePath: { regex: "/Logos_LinkedIn.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    github: file(absolutePath: { regex: "/Logos_GitHub.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    resume: file(absolutePath: { regex: "/Logos_Resume.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
        }
        social {
          twitter
          linkedin
          github
        }
      }
    }
  }
  `)

  console.log("data", data)
  
  const { author, social } = data.site.siteMetadata
  return (
    <div
    style={{
      display: `flex`,
      flexDirection: `column`,
      marginBottom: rhythm(1),
    }}
    >
      <div
      style={{
        display: `flex`,
        flexDirection: `row`,
      }}
      >
        <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
        />
        <p
          style={{marginBottom:10}}
        >
          Written by <strong>{author.name}</strong>.
        </p>
      </div>
    <div>
      <a href={`https://twitter.com/${social.twitter}`}>
        <Image
        fixed={data.twitter.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
        />
      </a>
      <a href={`https://linkedin.com/in/${social.linkedin}`}>
        <Image
        fixed={data.linkedin.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
        />
      </a>
      <a href={`https://github.com/${social.github}`}>
        <Image
        fixed={data.github.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
        />
      </a>
      <a href={`https://tylernorlundsblog.s3-us-west-2.amazonaws.com/Tyler+Norlund+-+Resume.pdf`}>
        <Image
        fixed={data.resume.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
        />
      </a>
    </div>
    </div>
    
    )
  }

  export default Bio