const {getTwit} = require('../get-twit')

const follow = async (account, user_id) => new Promise((res) => {
  getTwit(account).then(twit => {
    twit.post('friendships/create', {user_id}, (error, data) => {
      if (error) return res({error})

      return res(data)
    })
  })
})

module.exports = {follow}
