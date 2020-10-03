import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { PreviousNext } from './styles'

const PrevNext = ( { prev, next, label, slugPrefix = `` } ) => (
  <PreviousNext>
    {prev && (
      <Link to={slugPrefix + prev.slug} rel="prev" css="margin-right: 1em;">
        <h3>← Previous {label}</h3>
      </Link>
    )}
    {next && (
      <Link to={slugPrefix + next.slug} rel="next" css="margin-left: auto;">
        <h3>Next {label} →</h3>
      </Link>
    )}
  </PreviousNext>
)


export default PrevNext

PrevNext.propTypes = {
  label: PropTypes.string.isRequired,
}
