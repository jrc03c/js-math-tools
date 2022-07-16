const indexOf = require("./index-of.js")
const isArray = require("./is-array.js")

function copy(x) {
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

module.exports = copy
