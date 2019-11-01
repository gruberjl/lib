const sleep = require('await-sleep')
const {chrome} = require('../../chrome')
const {db} = require('../../db')

const login = async (accountId = 'gruberjl-medium') => {
  const account = await db.accounts.get(accountId)
  const browser = await chrome.build()
  await chrome.addCookiesToBrowser(browser, account.cookies)
  await browser.get('https://medium.com')

  await sleep(120000)

  const cookies = await chrome.getCookiesFromBrowser(browser)
  account.cookies = cookies

  await db.accounts.set(account)

  await chrome.destroy(browser)
}

module.exports = {login}
