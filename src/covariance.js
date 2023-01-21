const assert = require("./assert")
const isArray = require("./is-array")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const mean = require("./mean")
const shape = require("./shape")

function covariance(x, y) {
  if (isSeries(x)) {
    return covariance(x.values, y)
  }

  if (isSeries(y)) {
    return covariance(x, y.values)
  }

  assert(
    isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
    "The `covariance` function only works on 1-dimensional arrays and Series!"
  )

  assert(
    x.length === y.length,
    "The two arrays or Series passed into the `covariance` function must have the same length!"
  )

  try {
    const mx = mean(x)
    const my = mean(y)

    if (!isNumber(mx) || !isNumber(my)) {
      return NaN
    }

    const n = Math.max(x.length, y.length)
    let out = 0

    for (let i = 0; i < n; i++) {
      if (!isNumber(x[i])) return NaN
      if (!isNumber(y[i])) return NaN
      out += (x[i] - mx) * (y[i] - my)
    }

    return out / x.length
  } catch (e) {
    return NaN
  }
}

module.exports = covariance
