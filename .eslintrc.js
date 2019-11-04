module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "jasmine": true
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "extends": ["eslint:recommended", "plugin:node/recommended", 'plugin:jasmine/recommended'],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "plugins": ["jasmine"],
  "rules": {
    "no-console": "off",
    "semi": ["warn", "never"],
    "indent": ["warn", 2]
  }
}
