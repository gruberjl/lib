const {getCollection, set, get, remove, allDocs} = require('./lib')

const dbName = 'users'

const users = {
  getCollection,
  set: set(dbName),
  get: get(dbName),
  remove: remove(dbName),
  allDocs: allDocs(dbName)
}

module.exports = {users}
