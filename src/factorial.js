const vectorize = require("./vectorize")

function factorial(n) {
  try {
    if (n !== parseInt(n)) return NaN
    if (n <= 1) return 1
    return n * factorial(n - 1)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(factorial)
