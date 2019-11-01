const {getCollection, set, get, remove, allDocs, snapshotToDocs} = require('./lib')

const dbName = 'bots'

const getTwitterBots = async () => {
  const collection = getCollection(dbName)

  return collection
    .where('accounts.twitter.accessToken', '>', '')
    .get()
    .then(snapshotToDocs)
    .catch(error => ({error}))
}

const bots = {
  getCollection,
  set: set(dbName),
  get: get(dbName),
  remove: remove(dbName),
  allDocs: allDocs(dbName),
  getTwitterBots
}

module.exports = {bots}
