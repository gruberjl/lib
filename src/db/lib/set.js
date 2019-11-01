const {getCollection} = require('./get-collection')

const set = (dbName) => (data) => {
  const collection = getCollection(dbName)

  return collection.doc(data.id).set(data)
    .then(() => data)
    .catch(error => ({error}))
}

module.exports = {set}
