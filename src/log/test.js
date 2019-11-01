const {log} = require('./')

const start = async () => {
  const sync = (a) => a-2
  const asyncFn = async (a) => {throw new Error(a)}

  const n = log.fn(asyncFn)(4)
  const o = log.fn(sync)(4)

  console.log(await n)
  console.log(o)
}

start()
