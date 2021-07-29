const get = async (browser, url, ignoreQuery=true, forceRefresh=false) => {
  if (forceRefresh) {
    await browser.get(url)
    return
  }

  const currentUrl = (await browser.getCurrentUrl().toString()).toLowerCase()
  if (ignoreQuery && currentUrl.toLowerCase().split('?')[0] == url.toLowerCase()) {
    return
  }

  if (currentUrl == url) {
    return
  }

  await browser.get(url)
}

module.exports = {get}
