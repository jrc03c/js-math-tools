const MathError = require("./math-error")

module.exports = function (isTrue, message) {
  if (!isTrue) throw new MathError(message)
}
