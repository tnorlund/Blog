const { createBlog } = require( `./createBlog` )
const { resetBlog } = require( `./resetBlog` )
const { addUserToBlog } = require( `./addUserToBlog` )
const { getBlog } = require( `./getBlog` )
const { getUser } = require( `./getUser` )
const { getUserDetails } = require( `./getUserDetails` )
const { addTOSToUser } = require( `./addTOStoUser` )

module.exports = {
  addUserToBlog,
  createBlog,
  getBlog,
  getUser,
  resetBlog,
  getUserDetails,
  addTOSToUser
}