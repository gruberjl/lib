const scrollIntoView = async (browser, element) => {
  await browser.executeScript("arguments[0].scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'})", element)
}

module.exports = {scrollIntoView}
