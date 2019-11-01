const moment = require('moment')

const getDetails = async (twit, fieldName='screen_name', ids, cb) => {
  twit.post('users/lookup', {[fieldName]:ids, include_entities: true, tweet_mode:'extended'}, (err, data) => {
    const response = data.map(user => ({
      id_str: user.id_str,
      name: user.name,
      screen_name: user.screen_name,
      location: user.location,
      protected: user.protected,
      description: user.description,
      followers_count: user.followers_count,
      friends_count: user.friends_count,
      verified: user.verified,
      lastPost: user.status ? moment(user.status.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toISOString(): moment().set('year', 1970).toISOString(),
      language: user.lang || user.status ? user.status.lang : ''
    }))

    cb(err, response)
  })
}

module.exports = {getDetails}
