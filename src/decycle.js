const copy = require("./copy")
const indexOf = require("./index-of")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

module.exports = function decycle(x) {
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
        return x.map((v, i) => helper(v, checked, currentPath + "/" + i))
      } else {
        Object.keys(x).forEach(key => {
          x[key] = helper(x[key], checked, currentPath + "/" + key)
        })

        return x
      }
    } else {
      return x
    }
  }

  const orig = copy(x)
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
