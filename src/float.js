const vectorize = require("./vectorize.js")

function float(x) {
  try {
    const temp = JSON.parse(x)
    if (typeof temp === "number") return temp
    return NaN
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(float)
