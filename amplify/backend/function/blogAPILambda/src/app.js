/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not
use this file except in compliance with the License. A copy of the License is
located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing permissions and
limitations under the License.
*/



const AWS = require( `aws-sdk` )
// eslint-disable-next-line max-len
let awsServerlessExpressMiddleware = require( `aws-serverless-express/middleware` )
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(
  { apiVersion: `2016-04-18` }
)
let bodyParser = require( `body-parser` )
let express = require( `express` )
const {
  addTOSToUser, addUserToBlog, getBlog, getUser, getUserDetails, resetBlog,
  addProjectToBlog, addFollowToProject, removeFollowFromProject, getProject
} = require( `./data` )
const { User, TOS, Project } = require( `./entities` )
const USERPOOLID = `us-west-2_LSxeRvZrG`
const ADMINGROUP = `Admin`

/**
 * Checks to see whether the user is a part of the Admin UserGroup.
 * @param {String} username The email of the user.
 */
const isAdmin = async ( username ) => {
  try {
    const { Users } = await cognitoIdentityServiceProvider.listUsersInGroup(
      { GroupName: ADMINGROUP, UserPoolId: USERPOOLID }
    ).promise()
    // If there are no users in the ADMIN group, then return false.
    if ( Users === undefined || Users.length == 0 ) return false
    // Iterate over the users found in the ADMIN group and check to see if the
    // username given is found in the ADMIN group.
    const found = Users.map( user => {
      if ( username == user.Username ) return true
    } )
    if ( !found ) return false
    else return true
  } catch ( error ) {
    // eslint-disable-next-line no-console
    console.log( `error`, error )
  }
}

/**
 * Parses the username from the request.
 * @param {Map} request The request sent by the callee.
 */
const getUserName = ( request ) => {
  if ( request.apiGateway )
    return request.apiGateway.event.requestContext.identity
      .cognitoAuthenticationProvider.split( `:` )[2]
}


AWS.config.update( { region: process.env.TABLE_REGION } )

const dynamodb = new AWS.DynamoDB.DocumentClient()

let tableName = `blogDB`
if( process.env.ENV && process.env.ENV !== `NONE` ) {
  tableName = tableName + `-` + process.env.ENV
}

// TODO: update in case is required to use that definition
const userIdPresent = true
const partitionKeyName = `PK`
const partitionKeyType = `S`
const sortKeyName = `SK`
const sortKeyType = `S`
const hasSortKey = sortKeyName !== ``
const path = `/blog`
const UNAUTH = `UNAUTH`
const hashKeyPath = `/:` + partitionKeyName
const sortKeyPath = hasSortKey ? `/:` + sortKeyName : ``
// declare a new express app
let app = express()
app.use( bodyParser.json() )
app.use( awsServerlessExpressMiddleware.eventContext() )

// Enable CORS for all methods
app.use( function( req, res, next ) {
  res.header( `Access-Control-Allow-Origin`, `*` )
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept`
  )
  next()
} )

// convert url string param to expected Type
const convertUrlType = ( param, type ) => {
  switch( type ) {
    case `N`:
      return Number.parseInt( param )
    default:
      return param
  }
}

/**
 * Getting the basic blog details.
 *
 * This is called to get the basics of the blog's details. This returns the
 * number of users and posts.
 */
app.get( `/blog`, async ( request, response ) => {
  const { blog, error } = await getBlog( tableName )
  if ( error ) response.json( { statusCode: 500, error: error } )
  else response.json( { statusCode: 200, url: request.url, body: blog } )
} )

/**
 * Resets the blog details.
 *
 * This is called to reset the details of the blog. It turns the recorded
 * number of users and posts to 0.
 */
app.post( `/blog`, async ( request, response ) => {
  const username = getUserName( request )
  if ( await isAdmin( username ) ) {
    const { error, blog } = await resetBlog( tableName )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else response.json( { statusCode: 205, blog: blog } )
  } else response.json(
    { statusCode: 401, error: `Must be a part of the Admin UserGroup` }
  )
} )

/**
 * Gets a specific user.
 */
app.get( `/user`, async ( request, response ) => {
  const params = request.query
  if ( !params.name )
    response.json( {
      statusCode: 400, error: `Must give name in parameters`
    } )
  else if ( !params.email )
    response.json( {
      statusCode: 400, error: `Must give email in parameters`
    } )
  else if ( !params.number )
    response.json( {
      statusCode: 400, error: `Must give number in parameters`
    } )
  else {
    const { name, email, number } = params
    const requestedUser = new User( {
      name: name, email: email, userNumber: number
    } )
    const { user, error } = await getUser( tableName, requestedUser )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else  {
      if ( 
        requestedUser.name != user.name ||
        requestedUser.email != user.email ||
        requestedUser.userNumber != user.userNumber
      ) response.json( {
        statusCode: 400, error: `Given credentials are not correct`
      } )
      else response.json( { statusCode: 200, user: user } )
    }
  }
} )

/**
 * Get a specific user's details.
 */
app.get( `/user-details`, async ( request, response ) => {
  const params = request.query
  if ( !params.name )
    response.json( {
      statusCode: 400, error: `Must give name in parameters`
    } )
  else if ( !params.email )
    response.json( {
      statusCode: 400, error: `Must give email in parameters`
    } )
  else if ( !params.number )
    response.json( {
      statusCode: 400, error: `Must give number in parameters`
    } )
  else {
    const { name, email, number } = params
    const requestedUser = new User( {
      name: name, email: email, userNumber: number
    } )
    const { user, error } = await getUserDetails( tableName, requestedUser )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else response.json( { statusCode: 200, user: user } )
  }
} )

/**
 * Adds a user to the blog.
 */
app.post( `/user`, async ( request, response ) => {
  const params = request.body
  if ( !params.name )
    response.json( {
      statusCode: 400, error: `Must give name in body of request`
    } )
  else if ( !params.email )
    response.json( {
      statusCode: 400, error: `Must give email in body of request`
    } )
  else {
    const { name, email } = request.body
    const newUser = new User( { name: name, email: email } )
    const { user, error } = await addUserToBlog( tableName, newUser )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else response.json( { statusCode: 200, user: user } )
  }
} )

/**
 * Adds a terms of service to a user.
 */
app.post( `/tos`, async ( request, response ) => {
  const params = request.body
  if ( !params.name )
    response.json( {
      statusCode: 400, error: `Must give name in body`
    } )
  else if ( !params.email )
    response.json( {
      statusCode: 400, error: `Must give email in body`
    } )
  else if ( !params.number )
    response.json( {
      statusCode: 400, error: `Must give number in body`
    } )
  else if ( !params.version )
    response.json( {
      statusCode: 400, error: `Must give version in body`
    } )
  else {
    const { name, email, number, version } = params
    const requestedUser = new User( {
      name: name, email: email, userNumber: number
    } )
    const { tos, error } = await addTOSToUser(
      tableName, requestedUser, version
    )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else response.json( { statusCode: 200, tos: tos } )
  }
} )

/**
 * Adds a terms of service to a user.
 */
app.post( `/project`, async ( request, response ) => {
  const username = getUserName( request )
  if ( await isAdmin( username ) ) {
    const params = request.body
    if ( !params.slug )
      response.json( {
        statusCode: 400, error: `Must give slug in body`
      } )
    else if ( !params.title )
      response.json( {
        statusCode: 400, error: `Must give title in body`
      } )
    else {
      const { slug, title } = params
      const requestedProject = new Project( { slug, title } )
      const { project, error } = await addProjectToBlog(
        tableName, requestedProject
      )
      if ( error ) response.json( { statusCode: 500, error: error } )
      else response.json( { statusCode: 200, project: project } )
    }
  } else response.json(
    { statusCode: 401, error: `Must be a part of the Admin UserGroup` }
  )
} )

/**
 * Gets a project from the database.
 */
app.get( `/project`, async ( request, response ) => {
  const params = request.query
  if ( typeof params.slug === undefined )
    response.json( { statusCode: 400, error: `Must give slug in query.` } )
  else if ( typeof params.title === undefined )
    response.json( { statusCode: 400, error: `Must give title in query` } )
  else {
    const { slug, title } = params
    const requestedProject = new Project( { slug, title } )
    const { project, error } = await getProject( tableName, requestedProject )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else response.json( { statusCode: 200, project: project } )
  }
} )

/**
 * Adds a follow to a project.
 */
app.post( `/project-follow`, async ( request, response ) => {
  const params = request.body
  if ( !params.slug )
    response.json( {
      statusCode: 400, error: `Must give project slug in body`
    } )
  else if ( !params.title )
    response.json( {
      statusCode: 400, error: `Must give project title in body`
    } )
  else if ( !params.name )
    response.json( {
      statusCode: 400, error: `Must give user's name in body`
    } )
  else if ( !params.email )
    response.json( {
      statusCode: 400, error: `Must give user's email in body`
    } )
  else if ( !params.userNumber )
    response.json( {
      statusCode: 400, error: `Must give user's number in body`
    } )
  else {
    const { slug, title, name, email, userNumber } = params
    const project = new Project( { slug, title } )
    const user = new User( { name, email, userNumber } )
    const { projectFollow, error } = await addFollowToProject(
      tableName, user, project
    )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else response.json( { statusCode: 200, projectFollow: projectFollow } )
  }
} )

/**
 * Removes a follow from the user and project.
 */
app.delete( `/project-follow`, async ( request, response ) => {
  const params = request.body
  if ( !params.slug )
    response.json( {
      statusCode: 400, error: `Must give project slug in body`
    } )
  else if ( !params.title )
    response.json( {
      statusCode: 400, error: `Must give project title in body`
    } )
  else if ( !params.name )
    response.json( {
      statusCode: 400, error: `Must give user's name in body`
    } )
  else if ( !params.email )
    response.json( {
      statusCode: 400, error: `Must give user's email in body`
    } )
  else if ( !params.userNumber )
    response.json( {
      statusCode: 400, error: `Must give user's number in body`
    } )
  else {
    const { slug, title, name, email, userNumber } = params
    const requestedProject = new Project( { slug, title } )
    const requestedUser = new User( { name, email, userNumber } )
    const { user, project, error } = await removeFollowFromProject(
      tableName, requestedUser, requestedProject
    )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else response.json( { statusCode: 200, user: user, project: project } )
  }
} )


/** ******************************
 * HTTP Get method for list objects *
 ********************************/

// app.get( path + hashKeyPath, function( req, res ) {
//   let condition = {}
//   condition[partitionKeyName] = {
//     ComparisonOperator: `EQ`
//   }

//   if ( userIdPresent && req.apiGateway ) {
//     condition[partitionKeyName][`AttributeValueList`] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ]
//   } else {
//     try {
//       condition[partitionKeyName][`AttributeValueList`] = [ convertUrlType( req.params[partitionKeyName], partitionKeyType ) ]
//     } catch( err ) {
//       res.statusCode = 500
//       res.json( { error: `Wrong column type ` + err } )
//     }
//   }

//   let queryParams = {
//     TableName: tableName,
//     KeyConditions: condition
//   }

//   dynamodb.query( queryParams, ( err, data ) => {
//     if ( err ) {
//       res.statusCode = 500
//       res.json( { error: `Could not load items: ` + err } )
//     } else {
//       res.json( data.Items )
//     }
//   } )
// } )

/** ***************************************
 * HTTP Get method for get single object *
 *****************************************/

// app.get( path + `/object` + hashKeyPath + sortKeyPath, function( req, res ) {
//   let params = {}
//   if ( userIdPresent && req.apiGateway ) {
//     params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
//   } else {
//     params[partitionKeyName] = req.params[partitionKeyName]
//     try {
//       params[partitionKeyName] = convertUrlType( req.params[partitionKeyName], partitionKeyType )
//     } catch( err ) {
//       res.statusCode = 500
//       res.json( { error: `Wrong column type ` + err } )
//     }
//   }
//   if ( hasSortKey ) {
//     try {
//       params[sortKeyName] = convertUrlType( req.params[sortKeyName], sortKeyType )
//     } catch( err ) {
//       res.statusCode = 500
//       res.json( { error: `Wrong column type ` + err } )
//     }
//   }

//   let getItemParams = {
//     TableName: tableName,
//     Key: params
//   }

//   dynamodb.get( getItemParams,( err, data ) => {
//     if( err ) {
//       res.statusCode = 500
//       res.json( { error: `Could not load items: ` + err.message } )
//     } else {
//       if ( data.Item ) {
//         res.json( data.Item )
//       } else {
//         res.json( data )
//       }
//     }
//   } )
// } )


/** **********************************
* HTTP put method for insert object *
*************************************/

// app.put( path, function( req, res ) {

//   if ( userIdPresent ) {
//     req.body[`userId`] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
//   }

//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body
//   }
//   dynamodb.put( putItemParams, ( err, data ) => {
//     if( err ) {
//       res.statusCode = 500
//       res.json( { error: err, url: req.url, body: req.body } )
//     } else{
//       res.json( { success: `put call succeed!`, url: req.url, data: data } )
//     }
//   } )
// } )

/** **********************************
* HTTP post method for insert object *
*************************************/

// app.post( path, function( req, res ) {
//   console.log( `posting` )
//   if ( userIdPresent ) {
//     req.body[`userId`] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
//   }

//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body
//   }
//   console.log(`putItemParams`, {putItemParams } )
//   dynamodb.put( putItemParams, ( err, data ) => {
//     if( err ) {
//       res.statusCode = 500
//       res.json( { error: err, url: req.url, body: req.body } )
//     } else{
//       res.json( { success: `post call succeed!`, url: req.url, data: data } )
//     }
//   } )
// } )

/** ************************************
* HTTP remove method to delete object *
***************************************/

// app.delete( path + `/object` + hashKeyPath + sortKeyPath, function( req, res ) {
//   let params = {}
//   if ( userIdPresent && req.apiGateway ) {
//     params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
//   } else {
//     params[partitionKeyName] = req.params[partitionKeyName]
//     try {
//       params[partitionKeyName] = convertUrlType( req.params[partitionKeyName], partitionKeyType )
//     } catch( err ) {
//       res.statusCode = 500
//       res.json( { error: `Wrong column type ` + err } )
//     }
//   }
//   if ( hasSortKey ) {
//     try {
//       params[sortKeyName] = convertUrlType( req.params[sortKeyName], sortKeyType )
//     } catch( err ) {
//       res.statusCode = 500
//       res.json( { error: `Wrong column type ` + err } )
//     }
//   }

//   let removeItemParams = {
//     TableName: tableName,
//     Key: params
//   }
//   dynamodb.delete( removeItemParams, ( err, data )=> {
//     if( err ) {
//       res.statusCode = 500
//       res.json( { error: err, url: req.url } )
//     } else {
//       res.json( { url: req.url, data: data } )
//     }
//   } )
// } )
app.listen( 3000, function() {
  console.log( `App started` )
} )

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
