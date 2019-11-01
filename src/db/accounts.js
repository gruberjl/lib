const moment = require('moment')
const {getCollection, set, get, remove, allDocs, snapshotToDocs} = require('./lib')

const dbName = 'accounts'

// const isReadyToShare = (account) => {
//   const nextShare = moment(account.lastShare).add(account.nextShare, 'minutes')
//   return nextShare.isSameOrBefore(moment())
// }

const getReadyToShare = () => {
  const collection = getCollection(dbName)

  return collection
    .where('nextShare', '<=', moment().toISOString())
    .get()
    .then(snapshotToDocs)
    .catch(error => ({error}))
}

const accounts = {
  getCollection,
  set: set(dbName),
  get: get(dbName),
  remove: remove(dbName),
  allDocs: allDocs(dbName),
  getReadyToShare
}

module.exports = {accounts}
