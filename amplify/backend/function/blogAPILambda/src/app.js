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
const { getBlog, resetBlog, addUserToBlog } = require( `./data` )
const { User } = require( `./entities` )
const USERPOOLID = `us-west-2_LSxeRvZrG`
const ADMINGROUP = `Admin`

/**
 * Checks to see whether the user is a part of the Admin UserGroup.
 * @param {String} username The email of the user.
 */
const isAdmin = async ( username ) => {
  try {
    const result = await cognitoIdentityServiceProvider.listUsersInGroup(
      { GroupName: ADMINGROUP, UserPoolId: USERPOOLID }
    ).promise()
    const found = result.Users.map( user => {
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

console.log( `blogLambdaAPI` )
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
 * Adds a user to the blog.
 */
app.post( `/user`, async ( request, response ) => {
  if ( !request.body.name )
    response.json( {
      statusCode: 400, error: `Must give name in body of request`
    } )
  else if ( !request.body.email )
    response.json( {
      statusCode: 400, error: `Must give email in body of request`
    } )
  else {
    const { name, email } = request.body
    const newUser = new User( { name: name, email: email } )
    const { user, error } = await addUserToBlog( tableName, newUser )
    if ( error ) response.json( { statusCode: 500, error: error } )
    else response.json( { statusCode: 200, User: user } )
  }
} )


/** ******************************
 * HTTP Get method for list objects *
 ********************************/

app.get( path + hashKeyPath, function( req, res ) {
  let condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: `EQ`
  }

  if ( userIdPresent && req.apiGateway ) {
    condition[partitionKeyName][`AttributeValueList`] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ]
  } else {
    try {
      condition[partitionKeyName][`AttributeValueList`] = [ convertUrlType( req.params[partitionKeyName], partitionKeyType ) ]
    } catch( err ) {
      res.statusCode = 500
      res.json( { error: `Wrong column type ` + err } )
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  dynamodb.query( queryParams, ( err, data ) => {
    if ( err ) {
      res.statusCode = 500
      res.json( { error: `Could not load items: ` + err } )
    } else {
      res.json( data.Items )
    }
  } )
} )

/** ***************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get( path + `/object` + hashKeyPath + sortKeyPath, function( req, res ) {
  let params = {}
  if ( userIdPresent && req.apiGateway ) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
  } else {
    params[partitionKeyName] = req.params[partitionKeyName]
    try {
      params[partitionKeyName] = convertUrlType( req.params[partitionKeyName], partitionKeyType )
    } catch( err ) {
      res.statusCode = 500
      res.json( { error: `Wrong column type ` + err } )
    }
  }
  if ( hasSortKey ) {
    try {
      params[sortKeyName] = convertUrlType( req.params[sortKeyName], sortKeyType )
    } catch( err ) {
      res.statusCode = 500
      res.json( { error: `Wrong column type ` + err } )
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get( getItemParams,( err, data ) => {
    if( err ) {
      res.statusCode = 500
      res.json( { error: `Could not load items: ` + err.message } )
    } else {
      if ( data.Item ) {
        res.json( data.Item )
      } else {
        res.json( data )
      }
    }
  } )
} )


/** **********************************
* HTTP put method for insert object *
*************************************/

app.put( path, function( req, res ) {

  if ( userIdPresent ) {
    req.body[`userId`] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put( putItemParams, ( err, data ) => {
    if( err ) {
      res.statusCode = 500
      res.json( { error: err, url: req.url, body: req.body } )
    } else{
      res.json( { success: `put call succeed!`, url: req.url, data: data } )
    }
  } )
} )

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

app.delete( path + `/object` + hashKeyPath + sortKeyPath, function( req, res ) {
  let params = {}
  if ( userIdPresent && req.apiGateway ) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
  } else {
    params[partitionKeyName] = req.params[partitionKeyName]
    try {
      params[partitionKeyName] = convertUrlType( req.params[partitionKeyName], partitionKeyType )
    } catch( err ) {
      res.statusCode = 500
      res.json( { error: `Wrong column type ` + err } )
    }
  }
  if ( hasSortKey ) {
    try {
      params[sortKeyName] = convertUrlType( req.params[sortKeyName], sortKeyType )
    } catch( err ) {
      res.statusCode = 500
      res.json( { error: `Wrong column type ` + err } )
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete( removeItemParams, ( err, data )=> {
    if( err ) {
      res.statusCode = 500
      res.json( { error: err, url: req.url } )
    } else {
      res.json( { url: req.url, data: data } )
    }
  } )
} )
app.listen( 3000, function() {
  console.log( `App started` )
} )

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
