const vectorize = require("./vectorize.js")

function isBoolean(x) {
  return typeof x === "boolean"
}

module.exports = vectorize(isBoolean)
