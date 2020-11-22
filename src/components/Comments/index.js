import React, { useState, useEffect } from 'react'
import { Title } from './styles'

import { API } from 'aws-amplify'


/**
 * Gets a post through the API.
 * @param {String} slug  The slug of the post.
 * @param {String} title The title of the post.
 */
const getPost = async ( slug, title ) => {
  try {
    const { post, error } = await API.get(
      `blogAPI`,
      `/post?slug=${ slug }&title=${ title }`
    )
    if ( error ) return { error: error }
    else return { post: post }
  } catch( error ) {
    return { error: error }
  }
}

/**
 * Adds a post through an API call.
 * @param {String} slug  The slug of the post.
 * @param {String} title The title of the post.
 */
const addPost = async ( slug, title ) => {
  try {
    const { post, error } = await API.post(
      `blogAPI`,
      `/post`,
      { body: {
        slug: slug,
        title: title
      } }
    )
    if ( error ) return { error: error }
    else return { post: post }
  } catch( error ) {
    return { error: error }
  }

}
export default function Comments( { slug, title } ) {
  return(
    <Title>Comments</Title>
  )
}