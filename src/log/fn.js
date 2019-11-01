const Debug = require('debug')
const getParamNames = require('get-parameter-names')

const debugFn = Debug('fn')

const fn = (func) => {
  const debugFunc = debugFn.extend(func.name)
  const paramNames = getParamNames(func)
  let numOfRuns = 0

  return (...args) => {
    numOfRuns++
    const debug = debugFunc.extend(numOfRuns)
    debug('starting with arguments: %o', argsToObj(paramNames, args))
    const result = func(...args, debug)

    if (Promise.resolve(result) != result) {
      debug(`complete with results: ${result}`)
      return result
    }

    return result.then(pResult => {
      debug(`complete with results: ${pResult}`)
      return pResult
    }).catch(err => {
      debug(`complete with error: ${err}`)
      throw err
    })
  }
}

const argsToObj = (paramNames, args) => {
  const result = {}

  for (let i=0; i<paramNames.length; i++) {
    const paramName = paramNames[i] || i
    result[paramName] = args[i]
  }

  return result
}

module.exports = {fn}
