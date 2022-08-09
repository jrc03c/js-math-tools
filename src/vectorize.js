const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isEqual = require("./is-equal.js")
const isFunction = require("./is-function.js")
const isUndefined = require("./is-undefined.js")
const max = require("./max.js")
const range = require("./range.js")
const shape = require("./shape.js")

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
    const childArrays = Object.keys(arguments)
      .filter(key => isArray(arguments[key]))
      .map(key => arguments[key])

    childArrays.slice(0, -1).forEach((s, i) => {
      assert(
        isEqual(shape(s), shape(childArrays[i + 1])),
        `When passing multiple arrays into the \`${fn.name}\` function, all of the arrays must have the same shape!`
      )
    })

    if (childArrays.length > 0) {
      const maxLength = max(childArrays.map(a => a.length))

      return range(0, maxLength).map(i => {
        const args = Object.keys(arguments).map(key => {
          if (isArray(arguments[key])) {
            return arguments[key][i]
          } else {
            return arguments[key]
          }
        })

        return temp(...args)
      })
    } else {
      return fn(...arguments)
    }
  }
}

module.exports = vectorize
