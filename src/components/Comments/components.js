import React, { useState, useEffect } from 'react'
import {
  getPost, addPost, addComment, getPostDetails, deleteComment, deletePost,
  addUpVote, addDownVote, removeVote
} from './utils'
import {
  Title,
  WarningDiv, WarningButton, WarningIcon,
  SelectedButton, UnselectedButton,
  TextInput,
  CommentText, CommentDiv, CommentOption, CommentOptions,
  Up, Down, SelectedDown, SelectedUp
} from './styles'

export const UpVote = ( {
  myUpVote, working, setWorking, currentUserName, email,
  currentUserNumber, slug, commentNumber, dateAdded, setError, setWarning,
  commentUserNumber, myDownVote
} ) =>
  <>
    {
      myUpVote && <SelectedUp onClick={ () => {
        if ( !working ) {
          setWorking( true )
          removeVote(
            currentUserName, email, currentUserNumber, slug,
            commentNumber, true, dateAdded, myUpVote.dateAdded,
            setError, setWarning
          ).then( () => setWorking( false ) )
        }
      } } />
    } {
      !myUpVote && <Up onClick={ () => {
        if ( !working ) {
          setWorking ( true )
          if ( myDownVote )
            removeVote(
              currentUserName, email, currentUserNumber, slug,
              commentNumber, false, dateAdded, myDownVote.dateAdded,
              setError, setWarning
            ).then(
              () => addUpVote(
                currentUserName, email, commentUserNumber, slug, commentNumber,
                dateAdded, setError, setWarning
              ).then( () => setWorking( false ) )
            )
          else
            addUpVote(
              currentUserName, email, commentUserNumber, slug, commentNumber,
              dateAdded, setError, setWarning
            ).then( () => setWorking( false ) )
        }
      } }/>
    }
  </>

export const DownVote = ( {
  myDownVote, working, setWorking, currentUserName, email, currentUserNumber,
  slug, commentNumber, dateAdded, setError, setWarning, commentUserNumber,
  myUpVote
} ) =>
  <>
    {
      myDownVote && <SelectedDown onClick={
        () => {
          if ( !working ) {
            setWorking( true )
            removeVote(
              currentUserName, email, currentUserNumber, slug,
              commentNumber, false, dateAdded, myDownVote.dateAdded,
              setError, setWarning
            ).then( () => setWorking( false ) )
          }
        }
      }/>
    } {
      !myDownVote && <Down onClick={
        () => {
          if ( !working ) {
            setWorking ( true )
            if ( myUpVote )
              removeVote(
                currentUserName, email, currentUserNumber, slug,
                commentNumber, true, dateAdded, myUpVote.dateAdded,
                setError, setWarning
              ).then(
                () => addDownVote(
                  currentUserName, email, commentUserNumber, slug,
                  commentNumber, dateAdded, setError, setWarning
                ).then( () => setWorking( false ) )
              )
            else
              addDownVote(
                currentUserName, email, commentUserNumber, slug,
                commentNumber, dateAdded, setError, setWarning
              ).then( () => setWorking( false ) )
          }
        }
      }/>
    }
  </>
