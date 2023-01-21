const copy = require("./copy")
const indexOf = require("./index-of")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function uncircularCopy(x) {
  function helper(x, checked, currentPath) {
    if (isDataFrame(x) || isSeries(x)) {
      return x.copy()
    }

    checked = checked || []
    currentPath = currentPath || ""

    if (checked.indexOf(x) > -1) {
      const parts = currentPath
        .split("/")
        .slice(currentPath.startsWith("/") ? 1 : 0)

      const isANestedCopy = parts.some((v, i) => {
        const subParts = parts.slice(0, parts.length - i - 1)
        let temp = orig

        subParts.forEach(part => {
          temp = temp[part]
        })

        return temp === x
      })

      if (isANestedCopy) {
        const pathToCopy = orig === x ? "/" : "/" + indexOf(orig, x).join("/")
        return `<reference to "${pathToCopy}">`
      }
    }

    if (typeof x === "object") {
      if (x === null) return null
      checked.push(x)

      if (isArray(x)) {
        return x.map((v, i) => helper(v, checked, currentPath + "/" + i))
      } else {
        const out = {}

        Object.keys(x).forEach(key => {
          out[key] = helper(x[key], checked, currentPath + "/" + key)
        })

        return out
      }
    } else {
      return x
    }
  }

  const orig = x
  return helper(x)
}

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

  try {
    return helper(copy(a), copy(b))
  } catch (e) {
    return helper(uncircularCopy(a), uncircularCopy(b))
  }
}

module.exports = isEqual
