const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const max = require("./max.js")
const isFunction = require("./is-function.js")

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
    const atLeastOneArgumentIsAnArray =
      Object.keys(arguments)
        .map(key => isArray(arguments[key]))
        .indexOf(true) > -1

    if (atLeastOneArgumentIsAnArray) {
      const out = []
      const lengths = Object.keys(arguments)
        .filter(key => isArray(arguments[key]))
        .map(key => arguments[key].length)
      const maxLength = max(lengths)

      lengths.forEach(length => {
        assert(
          length === maxLength,
          `If using arrays for all arguments to this function, then the arrays must all have equal length!`
        )
      })

      for (let i = 0; i < maxLength; i++) {
        const args = Object.keys(arguments).map(key => {
          if (isArray(arguments[key])) return arguments[key][i]
          return arguments[key]
        })

        out.push(temp(...args))
      }

      return out
    } else {
      return fn(...arguments)
    }
  }
}

module.exports = vectorize
