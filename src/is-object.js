const isArray = require("./is-array")
const isUndefined = require("./is-undefined")

function isObject(x) {
  return typeof x === "object" && !isUndefined(x) && !isArray(x)
}

module.exports = isObject
