const {post} = require('./post')
const {search} = require('./search')
const {like} = require('./like')
const {sortByEngagement} = require('./sort-by-engagement')
const {getRetweeters} = require('./get-retweeters')

module.exports = {
  tweet: {post, search, like, sortByEngagement, getRetweeters}
}
