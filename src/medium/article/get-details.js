const {By} = require('selenium-webdriver')
const {chrome} = require('../../chrome')

const getDetails = async (browser, url) => {
  try {
    await chrome.get(browser, url)
  } catch(e) {
    console.log(`error getting details on ${url}`)
    console.log(e)
    console.log('')
    return
  }

  const title = await browser.findElement(By.css('meta[name="title"]')).getAttribute('content').catch(() => undefined) || ''
  const description = await browser.findElement(By.css('meta[name="description"]')).getAttribute('content').catch(() => undefined) || ''
  const twitterSite = await browser.findElement(By.css('meta[name="twitter:site"]')).getAttribute('content').catch(() => undefined) || ''
  const authorUrl = await browser.findElement(By.css('link[rel="author"]')).getAttribute('href').catch(() => undefined) || ''
  let authorIsMember = Boolean(await browser.findElement(By.css('.star-15px_svg__svgIcon-use')).catch(() => false))
  const isFollowingAuthor = Boolean(await browser.findElement(By.xpath("//button[text()='Following']")).catch(() => false))

  const cleanUrl = await browser.findElement(By.css('meta[property="og:url"]')).getAttribute('content').catch(() => undefined) || ''
  const image = await browser.findElement(By.css('meta[property="og:image"]')).getAttribute('content').catch(() => undefined) || ''

  let language = await browser.findElement(By.css('html')).getAttribute('lang').catch(() => undefined) || ''
  if (!language || language == '')
    language = await browser.findElement(By.css('.postArticle--full')).getAttribute('lang').catch(() => undefined) || ''

  const tags = []
  let tagEls = await browser.findElements(By.css('.tags li')).catch(() => undefined) || []
  if (!tags || tags.length == 0)
    tagEls = await browser.findElements(By.css('ul.be.bf li')).catch(() => undefined) || []

  for (let i=0; i<tagEls.length; i++) {
    tags.push(await tagEls[i].getText())
  }

  if (!authorIsMember) {
    const headers = await browser.findElements(By.css('header [rel="noopener follow"]')).catch(() => [])
    if (headers.length > 1) {
      await browser.actions().move({origin: headers[1]}).perform()
      await browser.sleep(2500)
      authorIsMember = Boolean(await browser.findElement(By.css('svg[width="39"]')).catch(() => false))
    }
  }

  return {title, description, authorUrl, twitterSite, authorIsMember, url: cleanUrl, image, tags, language, isFollowingAuthor}
}

module.exports = {getDetails}
