const {getTwit} = require('../get-twit')

const post = (account, status) => new Promise((res) => {
  getTwit(account).then(twit => {
    twit.post('statuses/update', {status}, (error, data) => {
      if (error) return res({error})

      return res(data)
    })
  })
})

module.exports = {post}
