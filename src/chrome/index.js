const {build} = require('./build')
const {destroy} = require('./destroy')
const {addCookiesToBrowser} = require('./add-cookies-to-browser')
const {getCookiesFromBrowser} = require('./get-cookies-from-browser')

module.exports = {chrome: {build, destroy, addCookiesToBrowser, getCookiesFromBrowser}}
