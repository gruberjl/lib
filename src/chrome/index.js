const {build} = require('./build')
const {destroy} = require('./destroy')
const {addCookiesToBrowser} = require('./add-cookies-to-browser')
const {getCookiesFromBrowser} = require('./get-cookies-from-browser')
const {get} = require('./get')
const {scrollIntoView} = require('./scroll-into-view')

module.exports = {
  chrome: {build, destroy, addCookiesToBrowser, getCookiesFromBrowser, get, scrollIntoView}
}
