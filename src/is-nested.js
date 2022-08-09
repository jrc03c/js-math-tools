const isArray = require("./is-array.js")

function isNested(x) {
  if (!isArray(x)) return false

  for (let i = 0; i < x.length; i++) {
    if (isArray(x[i])) {
      return true
    }
  }

  return false
}

module.exports = isNested
