import React from 'react'
import { Link } from 'gatsby'
import { ButtonDiv, Icons, Text } from './styles'

const BackButton = ( { slug, text } ) => (
  <ButtonDiv>
    <Text>
      <Link to={slug} rel={text}>
        <Icons.ChevronLeft size="1.4em"/>{text}
      </Link>
    </Text>
  </ButtonDiv>
)


export default BackButton
