const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const flatten = require("./flatten.js")

function set(arr) {
  assert(!isUndefined(arr), "You must pass an array into the `set` function!")
  assert(isArray(arr), "You must pass an array into the `set` function!")

  const out = []
  const temp = {}

  flatten(arr).forEach(function (item) {
    const key =
      typeof item === "undefined"
        ? "undefined"
        : typeof item === "function"
        ? item.toString()
        : JSON.stringify(item)

    if (!temp[key]) out.push(item)
    temp[key] = true
  })

  return out
}

module.exports = set

// // tests
// if (!module.parent && typeof window === "undefined") {
//   const sort = require("./sort.js")
//   const round = require("./round.js")
//   const random = require("./random.js")
//   const range = require("./range.js")
//
//   function alphasort(a, b) {
//     if (a < b) return -1
//     if (a > b) return 1
//     return 0
//   }
//
//   const x = [2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4]
//   const yTrue = [2, 3, 4]
//   const yPred = sort(set(x), alphasort)
//   for (const i = 0; i < yTrue.length; i++)
//     assert(
//       yTrue[i] === yPred[i],
//       `set([2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4]) should be [2, 3, 4]!`
//     )
//
//   x = round(random([10, 10, 10, 10]))
//   yTrue = [0, 1]
//   yPred = sort(set(x), alphasort)
//   for (const i = 0; i < yTrue.length; i++)
//     assert(
//       yTrue[i] === yPred[i],
//       `set(round(random([10, 10, 10, 10]))) should be [0, 1]!`
//     )
//
//   x = range(10, 20, 0.25)
//   yTrue = x.slice()
//   yPred = set(x)
//   for (const i = 0; i < yTrue.length; i++)
//     assert(
//       yTrue[i] === yPred[i],
//       `set(range(10, 20, 0.25)) should be the same as range(10, 20, 0.25)!`
//     )
//
//   x = ["foo", "bar", "baz", "foo", "foo", true, true, false, true, 234, 234, 0]
//   yTrue = ["foo", "bar", "baz", true, false, 234, 0]
//   yPred = set(x)
//   for (const i = 0; i < yTrue.length; i++)
//     assert(
//       yTrue[i] === yPred[i],
//       `set(["foo", "bar", "baz", "foo", "foo", true, true, false, true, 234, 234, 0]) should be ["foo", "bar", "baz", true, false, 234, 0]!`
//     )
//
//   const hasFailed
//
//   try {
//     hasFailed = false
//     set()
//   } catch (e) {
//     hasFailed = true
//   }
//
//   assert(hasFailed, `set() should have failed!`)
//
//   try {
//     hasFailed = false
//     set("foo")
//   } catch (e) {
//     hasFailed = true
//   }
//
//   assert(hasFailed, `set("foo") should have failed!`)
//
//   try {
//     hasFailed = false
//     set(234)
//   } catch (e) {
//     hasFailed = true
//   }
//
//   assert(hasFailed, `set(234) should have failed!`)
//
//   try {
//     hasFailed = false
//     set(true)
//   } catch (e) {
//     hasFailed = true
//   }
//
//   assert(hasFailed, `set(true) should have failed!`)
//
//   try {
//     hasFailed = false
//     set({})
//   } catch (e) {
//     hasFailed = true
//   }
//
//   assert(hasFailed, `set({}) should have failed!`)
//
//   try {
//     hasFailed = false
//     set(() => {})
//   } catch (e) {
//     hasFailed = true
//   }
//
//   assert(hasFailed, `set(() => {}) should have failed!`)
//
//   try {
//     const foo
//     hasFailed = false
//     set(foo)
//   } catch (e) {
//     hasFailed = true
//   }
//
//   assert(hasFailed, `set(foo) should have failed!`)
//
//   console.log("All tests passed!")
// }
