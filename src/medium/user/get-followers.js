const {getFollowerUrls} = require('./get-follower-urls')
const {getDetails} = require('./get-details')
const {chrome} = require('../../chrome')

const getFollowers = async (browser, userFollowersUrl) => {
  await chrome.get(browser, userFollowersUrl)

  const followerUrls = await getFollowerUrls(browser)

  const details = []
  for (let i=0; i< followerUrls.length; i++) {
    details.push(await getDetails(browser, followerUrls[i]))
  }

  return details
}

module.exports = {getFollowers}
