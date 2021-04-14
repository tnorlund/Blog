import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'

import { PageBody } from 'components/styles'
import { Title } from '../templates/styles'
import Toc from 'components/Toc'
import { useSessionStorage, useEventListener } from 'hooks'
import { PRIVACY_KEY, VISITOR_KEY } from 'utils/constants'
import { handleScroll, IncrementBuffer } from 'utils/analytics'
import { v4 as uuidv4 } from 'uuid'
import { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'

/** Add Kinesis Firehose to the Amplify Analytics object. */
Analytics.addPluggable( new AWSKinesisFirehoseProvider() )

export default function Website() {
  const result = useStaticQuery( graphql`
    { mdx ( frontmatter: { slug: { eq: "/website" } } ) { body } }
  ` )
  /** A buffer used to store scroll events */
  let scroll_buffer = {}
  /** The key of the buffer of where to store the scroll data. */
  let buffer_index = 0
  buffer_index = IncrementBuffer( scroll_buffer, buffer_index )
  /**
   * The object used to determine whether the visitor has agreed to the
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
      privacy, scroll_buffer, buffer_index, visitorKey, `Website`, `/website`
    )
  )
  return(
    <PageBody>
      <Toc />
      <Title>Website</Title>
      <Mdx>{result.mdx.body}</Mdx>
    </PageBody>
  )
}