function isNumber(x) {
  return typeof x === "number" && !isNaN(x)
}

module.exports = isNumber
