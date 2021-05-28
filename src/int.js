const vectorize = require("./vectorize.js")

function int(x) {
  try {
    const temp = JSON.parse(x)
    if (typeof temp === "number") return parseInt(temp)
    return NaN
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(int)
