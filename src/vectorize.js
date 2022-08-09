const { DataFrame, Series } = require("./dataframe")
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isEqual = require("./is-equal.js")
const isFunction = require("./is-function.js")
const isSeries = require("./is-series.js")
const isUndefined = require("./is-undefined.js")
const max = require("./max.js")
const range = require("./range.js")
const shape = require("./shape.js")

function isArraySeriesOrDataFrame(x) {
  return isArray(x) || isSeries(x) || isDataFrame(x)
}

function vectorize(fn) {
  assert(
    !isUndefined(fn),
    "You must pass a function into the `vectorize` function!"
  )

  assert(
    isFunction(fn),
    "You must pass a function into the `vectorize` function!"
  )

  return function temp() {
    let hasSeries, hasDataFrames

    const childArrays = Object.keys(arguments)
      .filter(key => {
        const arg = arguments[key]

        if (isArray(arg)) {
          return true
        } else if (isSeries(arg)) {
          hasSeries = true
          return true
        } else if (isDataFrame(arg)) {
          hasDataFrames = true
          return true
        } else {
          return false
        }
      })
      .map(key => arguments[key])

    childArrays.slice(0, -1).forEach((s, i) => {
      assert(
        isEqual(
          isArray(s) ? shape(s) : s.shape,
          isArray(childArrays[i + 1])
            ? shape(childArrays[i + 1])
            : childArrays[i + 1].shape
        ),
        `When passing multiple arrays into the \`${fn.name}\` function, all of the arrays must have the same shape!`
      )
    })

    if (childArrays.length > 0) {
      const maxLength = max(
        childArrays.map(a => (a.length ? a.length : a.values.length))
      )

      const out = range(0, maxLength).map(i => {
        const args = Object.keys(arguments).map(key => {
          if (isArraySeriesOrDataFrame(arguments[key])) {
            if (isArray(arguments[key])) {
              return arguments[key][i]
            } else if (isSeries(arguments[key])) {
              return arguments[key].values[i]
            } else if (isDataFrame(arguments[key])) {
              return arguments[key].values[i]
            }
          } else {
            return arguments[key]
          }
        })

        return temp(...args)
      })

      if (hasDataFrames) {
        try {
          return new DataFrame(out)
        } catch (e) {
          return out
        }
      }

      if (hasSeries) {
        try {
          return new Series(out)
        } catch (e) {
          return out
        }
      }

      return out
    } else {
      return fn(...arguments)
    }
  }
}

module.exports = vectorize
