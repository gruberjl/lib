module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "extends": ["eslint:recommended", "plugin:node/recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "rules": {
    "no-console": "off",
    "semi": ["warn", "never"],
    "indent": ["warn", 2]
  }
}
