const {getTwit} = require('../../get-twit')

const get = async (account, user_id) => new Promise((res) => {
  getTwit(account).then(twit => {
    twit.get('statuses/user_timeline', {user_id}, (error, data) => {
      if (error) return res({error})

      return res(data)
    })
  })
})

module.exports = {get}
