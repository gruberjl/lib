const {join} = require('path')
const {By} = require('selenium-webdriver')
const {build} = require('../build')
const {destroy} = require('../destroy')
const {scrollIntoView} = require('../scroll-into-view')

describe('chrome/scroll-into-view', function() {
  let browser, element, originalTimeout

  beforeAll(async function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

    browser = await build()
    await browser.get(join('file:///', __dirname, 'testpage.html'))
    element = await browser.findElement(By.css('#scrollIntoView'))
  })

  afterAll(async function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout

    await destroy(browser)
  })

  it('should scroll to center', async function() {
    await scrollIntoView(browser, element)
    const scrollHeight = await browser.executeScript('return window.scrollY')

    expect(scrollHeight).toBeGreaterThan(750)
    expect(scrollHeight).toBeLessThan(1250)
  })
})
