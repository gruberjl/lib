const {getCollection} = require('./get-collection')
const {snapshotToDocs} = require('./snapshot-to-docs')

const allDocs = (dbName) => () => {
  const collection = getCollection(dbName)

  return collection.get()
    .then(snapshotToDocs)
    .catch(error => ({error}))
}

module.exports = {allDocs}
