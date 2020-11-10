const {apps} = require('./apps')
const {accounts} = require('./accounts')
const {posts} = require('./posts')
const {twitterAutoFollow} = require('./twitter-auto-follow')
const {users} = require('./users')
const {people} = require('./people')
const {bots} = require('./bots')
const {promotes} = require('./promotes')
const {activities} = require('./activities')
const {linkedinEngageBot} = require('./linkedin-engage-bot')
const {mediumEngageBot} = require('./medium-engage-bot')
const {mediumMiner} = require('./medium-miner')

module.exports = {
  db: {
    apps, accounts, posts, twitterAutoFollow, users, people, bots, promotes, activities, linkedinEngageBot, mediumEngageBot, mediumMiner
  }
}
