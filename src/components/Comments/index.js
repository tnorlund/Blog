import React, { useState, useEffect } from 'react'
import { useSessionStorage } from 'hooks'
import { AUTH_KEY } from 'utils/constants'
import { getPost, addPost, addComment } from './utils'
import {
  Title,
  WarningDiv, WarningButton, WarningIcon,
  SelectedButton, UnselectedButton,
  TextInput
} from './styles'

const handleTextInput = ( id, setter ) => {
  setter(
    document.getElementById( id ).innerHTML
      .replace( /<div>/g, `\n` )
      .replace( /<\/div>/g, `` )
      .replace( /<br>/g, `` )
  )
}

export default function Comments( { slug, title } ) {
  // Get the current user data
  const [ user, setUser ] = useSessionStorage( AUTH_KEY )
  // Set the number of comments in the post
  const [ commentNumber, setCommentNumber ] = useState( 0 )
  // Sets the warning whether to add a project or not.
  const [ warning, setWarning ] = useState( false )
  // Sets an error if one occurs.
  const [ error, setError ] = useState()
  // Sets whether to show the modal view of the post's details.
  const [ postDetails, setPostDetails ] = useState( {
    open: false, content: undefined
  } )
  // Sets an the comment text.
  const [ comment, setComment ] = useState( `` )
  // Before anything is rendered to the screen, get the post's comments.
  useEffect( () => {
    getPost( slug, title ).then( ( { post, error } ) => {
      // If the project does not exist and the user is an administrator
      // give them the opportunity to add the post to the database.
      if ( error == `Project does not exist` && user.isAdmin )
        setWarning( true )
      setCommentNumber( post.numberComments )
    } ).catch( ( error ) => setError( error ) )
  } )
  return(
    <>
      {// If the post is not found in the database, give the option to add it
      //  to the database.
        warning && <WarningDiv>
          <div><WarningIcon/>Post not in database</div>
          <div><WarningButton onClick={
            () => addPost( slug, title, setWarning, setError )
          }>Add Post</WarningButton></div>
        </WarningDiv> }
      { !warning
      && <><Title>Comments</Title>
        <TextInput
          id={`NewComment`}
          contentEditable={ `true` }
          placeholder={`Comment`}
          onKeyDown={ () => {
            handleTextInput( `NewComment`, setComment )
          } }
        />
        <div css={`
          margin: 0.5em;
          margin-top: 0;
        `}>
          {comment==`` && <UnselectedButton css={`
            margin-left: auto;
          `}>Submit</UnselectedButton>}
          {comment && <SelectedButton
            onClick={ () => {
              handleTextInput( `NewComment`, setComment )
              addComment(
                user.name, user.email, user.userNumber, slug, title,
                comment, setWarning, setError
              )
            } }
            css={`
            margin-left: auto;
          `}>Submit</SelectedButton>}
        </div>
      </> }
      {// If the user is an administrator, give the option to remove the post
      //  from the database.
        user && user.isAdmin && !warning
      && <WarningDiv>
        <div><UnselectedButton>Post Details</UnselectedButton></div>
        <div><WarningButton>Remove Post</WarningButton></div>
      </WarningDiv> }
    </>
  )
}