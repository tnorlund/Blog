import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { FooterDiv, PoweredBy, Icons } from './styles'

export default function Footer() {
  const { contentYaml } = useStaticQuery( graphql`
    { contentYaml { copyright, poweredBy { title, url, logo } } }
  ` )
  const { poweredBy, copyright } = contentYaml
  return (
    <FooterDiv>
      <span>
        © {new Date().getFullYear()} - {copyright}
      </span>
      <PoweredBy>
        Powered by
        {poweredBy.map( ( { url, title, logo } ) => {
          const Icon = Icons[logo]
          return (
            <a key={title} href={url} aria-label={title}>
              <Icon size="1.4em" />
            </a>
          )
        } )}
      </PoweredBy>
    </FooterDiv>
  )
}