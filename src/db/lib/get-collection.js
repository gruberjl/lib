const fs = require('fs')
const {join} = require('path')
const admin = require('firebase-admin')

const certificateFilePath = join(__dirname, '..', '..', '..', '..', '..' ,'secret.json')
if (!fs.existsSync(certificateFilePath)) {
  throw new Error(`Cannot find firebase-admin certificate. It should be a json at ${certificateFilePath}`)
}

admin.initializeApp({
  credential: admin.credential.cert(certificateFilePath)
})

const db = admin.firestore()

const collections = {}

const getCollection = (collectionName) => {
  if (!collections[collectionName])
    collections[collectionName] = db.collection(collectionName)

  return collections[collectionName]
}

module.exports = {getCollection}
