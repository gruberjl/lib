const {publication} = require('./publication')
const {article} = require('./article')
const {tag} = require('./tag')
const {user} = require('./user')
const {account} = require('./account')

module.exports = {
  medium: {publication, article, tag, user, account}
}
