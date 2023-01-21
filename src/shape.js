const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isEqual = require("./is-equal")
const isSeries = require("./is-series")
const isUndefined = require("./is-undefined")

function helper(x) {
  if (!isArray(x)) {
    return undefined
  }

  const out = [x.length]
  let childArrayCount = 0

  const childShapes = x.map(v => {
    const s = helper(v)

    if (!isUndefined(s)) {
      childArrayCount++

      if (s.length === 1) {
        return s[0]
      } else {
        return s
      }
    } else {
      return s
    }
  })

  if (childArrayCount > 0) {
    if (childArrayCount === x.length) {
      const childShapesAreIdentical = childShapes.slice(0, -1).every((s, i) => {
        return isEqual(s, childShapes[i + 1])
      })

      if (childShapesAreIdentical) {
        return out.concat(childShapes[0])
      } else {
        out.push(childShapes)
        return out
      }
    } else {
      out.push(childShapes)
      return out
    }
  } else {
    return out
  }
}

function shape(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return shape(x.values)
  }

  assert(
    isArray(x),
    "The `shape` function only works on arrays, Series, and DataFrames!"
  )

  return helper(x)
}

module.exports = shape
