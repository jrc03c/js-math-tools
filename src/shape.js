const isArray = require("./is-array.js")
const isEqual = require("./is-equal.js")
const isUndefined = require("./is-undefined.js")

// note: these have been defined locally even though they already exist as
// standalone functions because importing those functions creates circular
// dependencies :(

function isSeries(x) {
  try {
    return (
      !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/series")
    )
  } catch (e) {
    return false
  }
}

function isDataFrame(x) {
  try {
    return (
      !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/dataframe")
    )
  } catch (e) {
    return false
  }
}

function shape(x) {
  if (isSeries(x)) {
    return x.shape
  }

  if (isDataFrame(x)) {
    return x.shape
  }

  if (isArray(x)) {
    const out = [x.length]
    let childArrayCount = 0

    const childShapes = x.map(v => {
      const s = shape(v)

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
        const childShapesAreIdentical = childShapes
          .slice(0, -1)
          .every((s, i) => {
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
  } else {
    return undefined
  }
}

module.exports = shape
