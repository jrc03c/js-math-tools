function isArray(obj) {
  try {
    return (
      obj instanceof Array ||
      (typeof obj.constructor !== "undefined" &&
        obj.constructor.name === "Array")
    )
  } catch (e) {
    return false
  }
}

module.exports = isArray
