const moment = require('moment')
const {getCollection, set, get, remove, allDocs, snapshotToDocs} = require('./lib')

const dbName = 'posts'

const readyToPost = async () => {
  const collection = getCollection(dbName)

  return collection
    .where('posted', '==', false)
    .where('postAt', '<=', moment().toISOString())
    .orderBy('postAt')
    .get()
    .then(snapshotToDocs)
    .catch(error => ({error}))
}

const posts = {
  getCollection,
  set: set(dbName),
  get: get(dbName),
  remove: remove(dbName),
  allDocs: allDocs(dbName),
  find: {
    readyToPost
  }
}

module.exports = {posts}
