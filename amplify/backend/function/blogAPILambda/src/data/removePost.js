// TODO
// [ ] Get all comments from post
// [ ] Delete each comment
// [ ]   - Decrement the number of comments per user
// [ ] Delete each vote
// [ ]   - Decrement the number of votes per user

const AWS = require( `aws-sdk` )
const dynamoDB = new AWS.DynamoDB()
const {
  projectFromItem, projectFollowFromItem, Post
} = require( `../entities` )

