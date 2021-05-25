const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const flatten = require("./flatten.js")
const isEqual = require("./is-equal.js")
const set = require("./set.js")

function count(arr, items) {
  assert(
    !isUndefined(arr),
    "You must pass an array and some items to count into the `count` function!"
  )

  assert(
    isArray(arr),
    "You must pass an array and some items to count into the `count` function!"
  )

  // NOTE: This currently flattens the array that's passed in, which means that it's not possible to count occurrences of arrays within arrays! I'm not sure whether this is desirable behavior or not, so I'm just making a note of it for now. It's not trivial to count occurrences of identical objects, so maybe this function should refuse to operate on objects!
  const temp = flatten(arr)
  items = isUndefined(items) ? set(arr) : items

  if (isArray(items)) {
    return flatten(items).map(function (item1) {
      const c = temp.filter(item2 => isEqual(item1, item2)).length
      return { item: item1, count: c }
    })
  } else {
    return temp.filter(other => other === items).length
  }
}

module.exports = count
