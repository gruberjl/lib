const {read} = require('./read')
const {getDetails} = require('./get-details')
const {comment} = require('./comment')

module.exports = {
  article: {read, getDetails, comment}
}
