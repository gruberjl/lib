const {getCollection, set, get, remove, allDocs} = require('./lib')

const dbName = 'apps'

const apps = {
  getCollection,
  set: set(dbName),
  get: get(dbName),
  remove: remove(dbName),
  allDocs: allDocs(dbName)
}

module.exports = {apps}
