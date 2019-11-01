const {By} = require('selenium-webdriver')

const getFollowerUrls = async (browser, userFollowersUrl, maxFollowers=1000) => {
  if (await browser.getCurrentUrl().toString() != userFollowersUrl)
    await browser.get(userFollowersUrl)

  let isComplete = false
  let lastExportLength

  while (!isComplete) {
    try {
      await gotoBottom(browser)
      await browser.sleep(3000)

      const els = await getEls(browser)
      if (els.length > maxFollowers || lastExportLength == els.length)
        isComplete = true

      lastExportLength = els.length
    } catch (e) {
      console.error('Error in projects/smmbot/src/lib/medium/user/get-follower-urls.js')
      console.error(e)
      console.error('')
    }
  }

  const urls = await getUrls(browser)
  return urls.slice(0, maxFollowers)
}

const gotoBottom = async (browser) => {
  await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)')
}

const getEls = async (browser) => {
  return await browser.findElements(By.css('a.avatar'))
}

const getUrls = async (browser) => {
  const els = await getEls(browser)
  const urls = []

  for (let i=0; i< els.length; i++) {
    urls.push(await els[i].getAttribute('href'))
  }

  return urls
}

module.exports = {getFollowerUrls}
