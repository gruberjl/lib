const {getCollection, set, get, remove, allDocs} = require('./lib')

const dbName = 'promotes'

const promotes = {
  getCollection,
  set: set(dbName),
  get: get(dbName),
  remove: remove(dbName),
  allDocs: allDocs(dbName)
}

module.exports = {promotes}
