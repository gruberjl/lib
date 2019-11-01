const getIdFromUrl = async (browser) => {
  const url = await browser.getCurrentUrl()
  return url.split('-').pop()
}

module.exports = {getIdFromUrl}
