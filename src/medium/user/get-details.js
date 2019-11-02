const {By} = require('selenium-webdriver')
const {chrome} = require('../../chrome')

const getDetails = async (browser, url) => {
  await chrome.get(browser, url)

  try {
    const mediumUsername = await getUsername(browser)
    const details = {
      mediumUrl: url,
      twitterUrl: await getTwitterUrl(browser),
      mediumUsername,
      followerCount: await getFollowerCount(browser, mediumUsername),
      followingCount: await getFollowingCount(browser, mediumUsername),
      isMember: await isMember(browser),
      firstName: await getFirstName(browser),
      lastName: await getLastName(browser)
    }

    return details
  } catch (e) {
    console.log(e)
  }
}

const getTwitterUrl = async (browser) => {
  return await browser.findElement(By.css('a[href^="https://twitter.com/"')).getAttribute('href').catch(() => undefined) || false
}

const getUsername = async (browser) => {
  const text = await browser.findElement(By.css('meta[name="twitter:app:url:iphone"]')).getAttribute('content')
  return text.replace('medium://', '')
}

const unabbreviateNumber = (num) => {
  if (num.includes('k'))
    return Number(num.replace('k', '')) * 1000

  if (num.includes('K'))
    return Number(num.replace('K', '')) * 1000

  return Number(num)
}

const getFollowerCount = async (browser, username) => {
  const text = await browser.findElement(By.css(`a[href="/${username}/followers"]`)).getText().catch(() => undefined) || 0
  if (text === 0)
    return 0
  return unabbreviateNumber(text.split(' ')[0])
}

const getFollowingCount = async (browser, username) => {
  const text = await browser.findElement(By.css(`a[href="/${username}/following"]`)).getText().catch(() => undefined) || 0
  if (text === 0)
    return 0
  return unabbreviateNumber(text.split(' ')[0])
}

const isMember = async (browser) => {
  const els = await browser.findElements(By.css('div'))
  let isMember = false

  for (let i=0; i<els.length; i++) {
    const text = await els[i].getText().catch(() => '')
    if (text.includes('Medium member since')) {
      isMember = true
      break
    }
  }

  return isMember
}

const getFirstName = async (browser) => {
  return await browser.findElement(By.css('meta[property="profile:first_name"]')).getAttribute('content').catch(() => undefined) || ''
}

const getLastName = async (browser) => {
  return await browser.findElement(By.css('meta[property="profile:last_name"]')).getAttribute('content').catch(() => undefined) || ''
}

module.exports = {getDetails}
