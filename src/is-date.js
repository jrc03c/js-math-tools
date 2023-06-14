function isDate(x) {
  return x instanceof Date && x.toString() !== "Invalid Date"
}

module.exports = isDate
