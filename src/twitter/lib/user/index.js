const {tweet} = require('./tweet')
const {follow} = require('./follow')
const {engage} = require('./engage')
const {getDetails} = require('./get-details')

module.exports = {
  user: {tweet, follow, engage, getDetails}
}
