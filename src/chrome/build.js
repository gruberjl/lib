require('chromedriver')
const webdriver = require('selenium-webdriver')

const build = async () => {
  var chromeCapabilities = webdriver.Capabilities.chrome()
  chromeCapabilities.set('goog:chromeOptions', {'args': ['--disable-notifications']})

  const browser = new webdriver.Builder().withCapabilities(chromeCapabilities).build()
  await browser.get('https://www.gitbit.org')

  return browser
}

module.exports = {
  build
}
