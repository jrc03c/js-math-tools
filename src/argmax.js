const indexOf = require("./index-of.js")
const max = require("./max.js")

function argmax(x) {
  try {
    return indexOf(x, max(x))
  } catch (e) {
    return NaN
  }
}

module.exports = argmax
