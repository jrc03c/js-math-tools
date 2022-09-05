const copy = require("./copy.js")

function isEqual(a, b) {
  function helper(a, b) {
    const aType = typeof a
    const bType = typeof b
    if (aType !== bType) return false

    if (aType === "undefined") return true
    if (aType === "boolean") return a === b
    if (aType === "symbol") return a === b

    if (aType === "number" || aType === "bigint") {
      if (a.toString() === "NaN" && b.toString() === "NaN") {
        return true
      }

      return a === b
    }

    if (aType === "string") return a === b
    if (aType === "function") return a === b

    if (aType === "object") {
      if (a === null || b === null) {
        return a === null && b === null
      } else {
        const aKeys = Object.keys(a)
        const bKeys = Object.keys(b)
        if (aKeys.length !== bKeys.length) return false

        for (let i = 0; i < aKeys.length; i++) {
          const key = aKeys[i]
          if (!helper(a[key], b[key])) return false
        }

        return true
      }
    }
  }

  return helper(copy(a), copy(b))
}

module.exports = isEqual
