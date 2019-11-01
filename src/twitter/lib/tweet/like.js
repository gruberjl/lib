const {getTwit} = require('../get-twit')

const like = (account, id_str) => new Promise((res) => {
  getTwit(account).then(twit => {
    twit.post('favorites/create', {id:id_str}, (error, data) => {
      if (error) return res({error})

      return res(data)
    })
  })
})

module.exports = {
  like
}
