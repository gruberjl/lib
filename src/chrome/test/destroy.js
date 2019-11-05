const {build} = require('../build')
const {destroy} = require('../destroy')

describe('chrome/destroy', function() {
  let browser, originalTimeout

  beforeAll(async function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

    browser = await build()
  })

  afterAll(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
  })

  it('should destroy browser', async function() {
    const result = await destroy(browser)

    expect(result).toBe(true)
  })
})
