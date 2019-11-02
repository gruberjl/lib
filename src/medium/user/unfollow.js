const {By} = require('selenium-webdriver')
const {chrome} = require('../../chrome')

const unfollow = async (browser, userUrl) => {
  await chrome.get(browser, userUrl)
  await browser.sleep(2000)

  const btns = await browser.findElements(By.css('button')).catch(() => [])

  for (let i=0; i<btns.length; i++) {
    const text = await btns[i].getText().catch(() => '')
    if (text == 'Following') {
      await btns[i].click().catch(() => undefined)
      return true
    }
  }

  return false
}

module.exports = {unfollow}
