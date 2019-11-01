const {getTwit} = require('../get-twit')

const search = (account, query) => new Promise((res) => {
  getTwit(account).then(twit => {
    const settings = { q: query, count: 100, include_entities: true, lang: 'en' }

    twit.get('search/tweets', settings, (error, data) => {
      if (error) return res({error})

      return res(data.statuses)
    })
  })
})

module.exports = {search}
