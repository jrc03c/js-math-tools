const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")

function copy(x) {
  function helper(x, checked) {
    checked = checked || []

    if (checked.indexOf(x) > -1) {
      return "<cyclic reference>"
    }

    if (typeof x === "object") {
      if (x === null) return null
      checked.push(x)

      if (isArray(x)) {
        return x.map(v => helper(v, checked))
      } else {
        const out = {}

        Object.keys(x).forEach(key => {
          out[key] = helper(x[key], checked)
        })

        return out
      }
    } else {
      return x
    }
  }

  return helper(x)
}

module.exports = copy
