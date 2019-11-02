const {By, Key} = require('selenium-webdriver')
const {chrome} = require('../../chrome')

const isBottomOfPage = async (driver) => {
  return await driver.executeScript('if (document.body.scrollHeight == window.innerHeight + window.scrollY) { return true; } else { return false; }')
}

const randomNum = (low, high) => {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

const readUntilEnd = async (driver, waitMin=1, waitMax=3) => {
  const timeout = (new Date().getTime()) + (1000 * 60)
  const body = await driver.findElement(By.css('body'))
  let isBottom = false

  while (!isBottom) {
    await driver.sleep(randomNum(waitMin, waitMax) * 1000)
    await body.sendKeys(Key.PAGE_DOWN)
    isBottom = await isBottomOfPage(driver)
    if (new Date().getTime() > timeout) isBottom = true
  }
}

const clap = async (driver, clapMin=10, clapMax=25) => {
  try {
    const times = randomNum(clapMin,clapMax)

    const url = await driver.getCurrentUrl().toString()
    if (url.includes('/topics/')) return

    let clapBtn = await driver.findElement(By.css('.postActions .clapButton')).catch(() => undefined)
    if (!clapBtn) {
      const svg = await driver.findElement(By.css('svg[width="33"]'))
      clapBtn = await driver.executeScript("return arguments[0].parentNode;", svg)
    }


    await driver.executeScript("arguments[0].scrollIntoView()", clapBtn)
    const body = await driver.findElement(By.css('body'))
    await body.sendKeys(Key.ARROW_UP)
    await body.sendKeys(Key.ARROW_UP)
    await body.sendKeys(Key.ARROW_UP)
    await body.sendKeys(Key.ARROW_UP)
    await body.sendKeys(Key.ARROW_UP)

    for (let i = 0; i < times; i++) {
      await driver.sleep(250)
      await clapBtn.click()
    }

    await driver.sleep(1000)
  } catch (e) {
    const url = (await driver.getCurrentUrl()).toString()
    console.log(`Error clapping on ${url}.`)
    console.log(e)
    console.log('')
  }
}

const followAuthor = async (browser) => {
  let btn = await browser.findElement(By.css('.js-cardUser .button--follow')).catch(() => undefined)

  if (!btn) {
    const btns = await browser.findElements(By.css('section button')).catch(() => [])
    for (let i=0; i< btns.length; i++) {
      const text = await btns[i].getText().catch(() => '')
      if (text == 'Follow') {
        btn = btns[i]
        break
      }
    }
  }

  if (!btn) {
    const url = (await browser.getCurrentUrl()).toString()
    console.log(`Error Following on ${url}.`)
    return
  }

  const txt = await btn.getText()
  if (txt == 'Follow') {
    try {
      await browser.executeScript("arguments[0].scrollIntoView()", btn)
      const body = await browser.findElement(By.css('body'))
      await body.sendKeys(Key.ARROW_UP)
      await body.sendKeys(Key.ARROW_UP)
      await body.sendKeys(Key.ARROW_UP)
      await body.sendKeys(Key.ARROW_UP)
      await body.sendKeys(Key.ARROW_UP)
      await browser.sleep(500)
      await btn.click()
      await browser.sleep(1000)
    } catch (e) {
      console.error('Error clicking follow button')
      console.error(e)
      console.error('')
    }
  }

}

const read = async (browser, url, numOfClaps, doFollowAuthor = true) => {
  await chrome.get(browser, url)
  await readUntilEnd(browser)
  await clap(browser, numOfClaps, numOfClaps)
  if (doFollowAuthor) await followAuthor(browser)
}

module.exports = {read}
