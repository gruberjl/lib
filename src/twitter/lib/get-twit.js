const Twit = require('twit')
const {db} = require('lib')

const twits = {}

const getTwit = async (account) => {
  if (!twits[account.id]) {
    const doc = await db.apps.get('twitter')

    twits[account.id] = new Twit({ // eslint-disable-line
      consumer_key: doc.apiToken,
      consumer_secret: doc.apiSecret,
      access_token: account.accessToken,
      access_token_secret: account.secret
    })
  }

  return twits[account.id]
}

module.exports = {getTwit}
