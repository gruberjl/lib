const {getCollection} = require('./get-collection')
const {set} = require('./set')
const {remove} = require('./remove')
const {get} = require('./get')
const {allDocs} = require('./all-docs')
const {snapshotToDocs} = require('./snapshot-to-docs')

module.exports = {
  getCollection, set, remove, get, allDocs, snapshotToDocs
}
