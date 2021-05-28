const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")

function copy(x) {
  if (typeof x === "object") {
    if (isUndefined(x)) {
      return x
    } else if (isArray(x)) {
      return x.map(copy)
    } else {
      const out = {}

      Object.keys(x).forEach(function (key) {
        out[key] = copy(x[key])
      })

      return out
    }
  } else {
    return x
  }
}

module.exports = copy
