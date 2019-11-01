const {getFollowers} = require('./get-followers')
const {getFollowerUrls} = require('./get-follower-urls')
const {getDetails} = require('./get-details')
const {unfollow} = require('./unfollow')

module.exports = {
  user: {getFollowers, getFollowerUrls, getDetails, unfollow}
}
