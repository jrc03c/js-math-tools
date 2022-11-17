const isNumber = require("./is-number.js")
const product = require("./product.js")
const reshape = require("./reshape.js")

function zeros(shape) {
  if (isNumber(shape)) shape = [shape]
  const out = []
  const n = product(shape)
  for (let i = 0; i < n; i++) out.push(0)
  return reshape(out, shape)
}

module.exports = zeros
