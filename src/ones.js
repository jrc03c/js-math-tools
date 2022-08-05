const isNumber = require("./is-number.js")
const reshape = require("./reshape.js")

function ones(shape) {
  if (isNumber(shape)) shape = [shape]
  const out = []
  let n = 1
  shape.forEach(v => (n *= v))
  for (let i = 0; i < n; i++) out.push(1)
  return reshape(out, shape)
}

module.exports = ones
