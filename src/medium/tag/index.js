const {By} = require('selenium-webdriver')
const {chrome} = require('../../chrome')

const getArticles = async (browser, tag="productivity") => {
  await chrome.get(browser, `https://medium.com/tag/${tag}/latest`)
  await fetchArticles(browser)
  const urls = await getPostUrls(browser)
  return urls
}

const fetchArticles = async (browser) => {
  for (let i = 0; i < 10; i++) {
    await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)')
    await browser.sleep(3000)
  }
}

const getPostUrls = async (browser) => {
  const urls = []
  const els = await browser.findElements(By.css('.postArticle-readMore a'))

  for (let i=0; i<els.length; i++) {
    const url = await els[i].getAttribute('href').catch(error => ({error}))
    if (!url.error)
      urls.push(url)
  }

  return urls
}

module.exports = {tag: {getArticles}}
