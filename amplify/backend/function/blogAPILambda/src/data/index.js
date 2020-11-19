const { createBlog } = require( `./createBlog` )
const { resetBlog } = require( `./resetBlog` )
const { addUserToBlog } = require( `./addUserToBlog` )
const { getBlog } = require( `./getBlog` )
const { getUser } = require( `./getUser` )
const { getUserDetails } = require( `./getUserDetails` )
const { addTOSToUser } = require( `./addTOStoUser` )
const { addProjectToBlog } = require( `./addProjectToBlog` )
const { addFollowToProject } = require( `./addFollowToProject` )

module.exports = {
  addUserToBlog,
  createBlog,
  getBlog,
  getUser,
  resetBlog,
  getUserDetails,
  addTOSToUser,
  addProjectToBlog,
  addFollowToProject
}