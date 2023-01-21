const isNumber = require("./is-number")
const product = require("./product")
const reshape = require("./reshape")

function zeros(shape) {
  if (isNumber(shape)) shape = [shape]
  const out = []
  const n = product(shape)
  for (let i = 0; i < n; i++) out.push(0)
  return reshape(out, shape)
}

module.exports = zeros
