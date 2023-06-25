const indexOf = require("./index-of")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function copy(x) {
  function helper(x) {
    if (typeof x === "object") {
      if (x === null) {
        return null
      }

      if (isArray(x)) {
        if (!(x instanceof Array)) {
          return x.slice()
        }

        return x.map(v => copy(v))
      }

      if (isSeries(x)) {
        const out = x.copy()
        out.values = copy(out.values)
        return out
      }

      if (isDataFrame(x)) {
        const out = x.copy()
        out.values = copy(x.values)
        return out
      }

      if (x instanceof Date) {
        return new Date(x.getTime())
      }

      x = decycle(x)
      const out = {}

      Object.keys(x)
        .concat(Object.getOwnPropertySymbols(x))
        .forEach(key => {
          out[key] = copy(x[key])
        })

      return out
    } else {
      return x
    }
  }

  return helper(decycle(x))
}

function decycle(x) {
  function helper(x, checked, currentPath) {
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
        if (
          typeof x.constructor !== "undefined" &&
          x.constructor.name !== "Array"
        ) {
          return x.slice()
        }

        return x.map((v, i) => helper(v, checked, currentPath + "/" + i))
      } else {
        Object.keys(x)
          .concat(Object.getOwnPropertySymbols(x))
          .forEach(key => {
            x[key] = helper(x[key], checked, currentPath + "/" + key.toString())
          })

        return x
      }
    } else {
      return x
    }
  }

  const orig = x
  let out = helper(orig)

  if (isDataFrame(x)) {
    const temp = x.copy()
    temp._values = out.values
    temp._columns = out.columns
    temp._index = out.index
    out = temp
  }

  if (isSeries(x)) {
    const temp = x.copy()
    temp.name = out.name
    temp._values = out.values
    temp._index = out.index
    out = temp
  }

  return out
}

module.exports = { copy, decycle }
