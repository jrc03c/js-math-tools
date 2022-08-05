const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const union = require("./union.js")

function intersect() {
  const arrays = Object.values(arguments).map(v => {
    if (isArray(v)) return flatten(v)
    return [v]
  })

  const out = []
  const allValues = union(arrays)

  allValues.forEach(value => {
    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i].indexOf(value) < 0) {
        return
      }
    }

    out.push(value)
  })

  return out
}

module.exports = intersect
