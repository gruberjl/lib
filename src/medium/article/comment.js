const {By} = require('selenium-webdriver')
const {getIdFromUrl} = require('./get-id-from-url')
const {generic} = require('../../comments')
const {chrome} = require('../../chrome')

const comment = async (browser, articleUrl) => {
  if (articleUrl)
    await chrome.get(browser, articleUrl)

  const id = await getIdFromUrl(browser)
  console.log(id)
  await browser.get(`https://medium.com/p/${id}/responses/show`)
  await browser.sleep(1000)
  await openCommentPanel(browser)
  await browser.sleep(1000)
  await writeComment(browser)
  await browser.sleep(1000)
  await publish(browser)
}

const openCommentPanel = async (browser) => {
  const panel = await browser.findElement(By.css('.inlineEditor-placeholder.js-inlineEditorPrompt')).catch(() => undefined)
  await chrome.scrollIntoView(browser, panel)
  await browser.actions({async: true}).move({origin: panel}).press().release().perform()
}

const writeComment = async (browser) => {
  const comment = generic[Math.floor(Math.random()*generic.length)]
  await browser.actions({async: true}).sendKeys(comment).perform()
}

const publish = async (browser) => {
  const btn = await browser.findElement(By.css('.js-publishButton')).catch(() => undefined)
  await btn.click()
  await browser.sleep(3000)
}

module.exports = {comment}
