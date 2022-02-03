const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")

function isObject(x) {
  return typeof x === "object" && !isUndefined(x) && !isArray(x)
}

module.exports = isObject
