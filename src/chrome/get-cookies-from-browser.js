const getCookiesFromBrowser = async (browser) => {
  return await browser.manage().getCookies()
}

module.exports = {getCookiesFromBrowser}
