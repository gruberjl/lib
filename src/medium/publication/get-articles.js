const {By} = require('selenium-webdriver')
const moment = require('moment')
const {chrome} = require('../../chrome')

const getArticles = async (browser, publication = 'the-mission', filter='today', excludePremium=false) => {
  const today = moment()
  const yesterday = today.add(-1, 'days')

  await chrome.get(browser, `https://medium.com/${publication}/latest`)
  await fetchArticles(browser)

  const posts = await getPosts(browser)

  const urls = []

  for (let i=0; i<posts.length; i++) {
    const post = posts[i]

    if (excludePremium && post.premium)
      continue

    if (filter === 'today' && !post.date.isSame(today, 'day'))
      continue
    else if (filter === 'yesterday' && !post.date.isSame(yesterday, 'day'))
      continue

    if (!post.url)
      continue

    urls.push(post.url)
  }

  return urls
}

const fetchArticles = async (browser) => {
  for (let i = 0; i < 10; i++) {
    await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)')
    await browser.sleep(3000)
  }
}

const getPosts = async (browser) => {
  const posts = []
  const elements = await browser.findElements(By.className('postArticle'))

  for (let i=0; i<elements.length; i++) {
    posts.push({
      element: elements[i],
      premium: Boolean(await elements[i].findElement(By.className('svgIcon--star')).catch(() => undefined)),
      date: moment(await elements[i].findElement(By.css('time')).getAttribute('datetime').catch(() => undefined)),
      url: await elements[i].findElement(By.css('.postArticle-readMore a')).getAttribute('href').catch(() => undefined)
    })
  }

  return posts
}

module.exports = {getArticles}
