const isUndefined = require("./is-undefined")
const types = require("./helpers/array-types")
const typeStrings = types.map(s => s.name)

function isArray(obj) {
  try {
    if (obj instanceof Array) {
      return true
    }

    if (!isUndefined(obj.constructor)) {
      return (
        types.indexOf(obj.constructor) > -1 ||
        typeStrings.indexOf(obj.constructor.name) > -1
      )
    }

    return false
  } catch (e) {
    return false
  }
}

module.exports = isArray
