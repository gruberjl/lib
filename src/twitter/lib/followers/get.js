const {getTwit} = require('../get-twit')

const get = (account, options = { screen_name: 'gruberjl' }) => new Promise((res) => {
  getTwit(account).then(twit => {
    twit.get('followers/ids', options,  (error, data) => {
      if (error) return res({error})

      return res(data)
    })
  })
})

module.exports = {get}
