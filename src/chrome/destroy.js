const destroy = async (browser) => {
  await browser.close()
  return true
}

module.exports = {destroy}
