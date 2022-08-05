const isUndefined = require("./is-undefined.js")
const mean = require("./mean.js")

function covariance(x, y) {
  try {
    const mx = mean(x)
    const my = mean(y)
    const n = Math.max(x.length, y.length)
    let out = 0

    for (let i = 0; i < n; i++) {
      if (isUndefined(x[i])) return NaN
      if (isUndefined(y[i])) return NaN
      out += (x[i] - mx) * (y[i] - my)
    }

    return out / x.length
  } catch (e) {
    return NaN
  }
}

module.exports = covariance
