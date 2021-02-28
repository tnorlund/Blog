import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { PageBody } from 'components/styles'
import { Icons, SocialsDiv, ProfilePic } from '../templates/styles'
import List from 'components/List'
import { useSessionStorage, useEventListener } from 'hooks'
import { PRIVACY_KEY, VISITOR_KEY } from 'utils/constants'
import { handleScroll, IncrementBuffer } from 'utils/analytics'
import { v4 as uuidv4 } from 'uuid'
import { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'

/** Add Kinesis Firehose to the Amplify Analytics object. */
Analytics.addPluggable( new AWSKinesisFirehoseProvider() )

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
      visitorKey, `Tyler Norlund`, `/`
    )
  )
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