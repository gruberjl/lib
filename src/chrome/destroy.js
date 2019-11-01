const chromedriver = require('chromedriver')
const sleep = require('await-sleep')

const destroy = async (driver) => {
  await driver.close()
  await driver.quit()
  await chromedriver.stop()
  await sleep(5000)
  driver = null
  return true
}

module.exports = {destroy}
