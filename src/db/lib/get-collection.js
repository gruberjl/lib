const {join} = require('path')
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(join(__dirname, '..', '..', '..', '..' ,'secret.json'))
})

const db = admin.firestore()

const collections = {}

const getCollection = (collectionName) => {
  if (!collections[collectionName])
    collections[collectionName] = db.collection(collectionName)

  return collections[collectionName]
}

module.exports = {getCollection}
