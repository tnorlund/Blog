import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx'
import { Title, ButtonDiv, BodyDiv } from './styles'
import { useSessionStorage } from 'hooks'
import { TOS_KEY } from 'utils/constants'
import { API } from 'aws-amplify'


export default function TermsOfService( { user, setLoading } ) {
  // Get the current version of the Terms of Service
  const result = useStaticQuery(
    graphql`query { mdx(
      fileAbsolutePath: { regex: "/tos/index.md/" }
    ) { body, frontmatter { version } } }`
  )
  const version = new Date( result.mdx.frontmatter.version )
  // An accept function that logs the user in
  const accept = async() => {
    console.log( `user`, { ...user } )
    try {
      const { tos, error } = await API.post(
        `blogAPI`,
        `/tos`,
        { body: {
          name: user.name.replace( ` `, `\ ` ),
          email: user.email,
          number: user.userNumber,
          version: version.toISOString()
        } }
      )
      if ( error ) console.log( `error`, error )
      setLoading( true )
      // if ( error ) return { error: error }
      // else return { user: user }
    } catch( error ) {
      // return { error: error }
      console.log( `errored`, error )
    }
  }
  return(
    <>
      <Title>Terms of Service</Title>
      <BodyDiv><Mdx>{result.mdx.body}</Mdx></BodyDiv>
      <ButtonDiv onClick={ () => accept() }>Accept</ButtonDiv>
    </>
  )
}