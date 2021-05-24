const indexOf = require("./index-of.js")
const min = require("./min.js")

function argmin(x) {
  try {
    return indexOf(x, min(x))
  } catch (e) {
    return NaN
  }
}

module.exports = argmin
