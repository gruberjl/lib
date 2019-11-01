const {getTwit} = require('../get-twit')

const getRetweeters = async (account, id_str) => new Promise((res) => {
  getTwit(account).then(twit => {
    twit.get('statuses/retweeters/ids', {id: id_str, count: 100, stringify_ids: true}, (error, data) => {
      if (error) return res({error})

      return res(data.ids)
    })
  })
})

module.exports = {getRetweeters}
