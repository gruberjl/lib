const {lint} = require('./lint')
const {test} = require('./test')
const {gitCommit} = require('./git-commit')
const {npmVersion} = require('./npm-version')
const {gitPush} = require('./git-push')

const start = async () => {
  const commitMessage = process.argv[0]
  const npmVersionNum = process.argv[1]

  if (npmVersionNum!='major' || npmVersionNum!='minor' || npmVersionNum!='patch')
    throw new Error('command line argument "npm version number" is missing or incorrect.')

  const lintResults = await lint()
  if (lintResults.errorCount > 0)
    throw new Error('Linter failed.\n%s', lintResults.results)

  const testResults = await test()
  if (!testResults)
    throw new Error('Tests failed')

  await gitCommit(commitMessage)
  await npmVersion(npmVersionNum)
  await gitPush()
}

start()
