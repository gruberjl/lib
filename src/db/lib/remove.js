const {getCollection} = require('./get-collection')

const remove = (dbName) => (doc) => {
  const collection = getCollection(dbName)

  return collection.doc(doc.id).delete()
    .then(() => doc)
    .catch(error => ({error}))
}

module.exports = {remove}
