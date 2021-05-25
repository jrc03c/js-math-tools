const assert = require("./assert.js")
const mean = require("./mean.js")
const dropNaNPairwise = require("./drop-nan-pairwise.js")

function covariance(x, y) {
  try {
    assert(
      x.length === y.length,
      "The two arrays passed into the `covariance` function have different lengths!"
    )

    const [xTemp, yTemp] = dropNaNPairwise(x, y)
    if (xTemp.length === 0 || yTemp.length === 0) return NaN

    assert(
      xTemp.length === yTemp.length,
      "The two arrays passed into the `covariance` function have different lengths after NaN values are dropped!"
    )

    const mx = mean(xTemp)
    const my = mean(yTemp)
    let out = 0

    for (let i = 0; i < xTemp.length; i++) {
      out += (xTemp[i] - mx) * (yTemp[i] - my)
    }

    return out / xTemp.length
  } catch (e) {
    return NaN
  }
}

module.exports = covariance
