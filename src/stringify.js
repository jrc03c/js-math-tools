const copy = require("./copy.js")

function stringify(x, replacer, space) {
  return JSON.stringify(copy(x), replacer, space)
}

module.exports = stringify
