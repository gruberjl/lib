const snoowrap = require('snoowrap')
const {db} = require('../db')

const snoowraps = {}

const getSnoowrap = async (account) => {
  if (!snoowraps[account.id]) {
    const doc = await db.apps.get('reddit')

    snoowraps[account.id] = new snoowrap({
      userAgent: 'Reddit',
      clientId: doc.key,
      clientSecret: '',
      refreshToken: account.refreshToken
    })
  }

  return snoowraps[account.id]
}

module.exports = {getSnoowrap}
