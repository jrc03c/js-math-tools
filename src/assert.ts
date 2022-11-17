const MathError = require("./math-error.js")

module.exports = function (isTrue, message) {
  if (!isTrue) throw new MathError(message)
}
