const indexOf = require("./index-of.js")
const normal = require("./normal.js")
const seed = require("./seed.js")
const isUndefined = require("./is-undefined.js")

test("gets the index of a value in a tensor", () => {
  const x = normal([10, 10, 10, 10])
  const indexTrue = [5, 4, 2, 7]
  const indexPred = indexOf(x, x[5][4][2][7])
  expect(indexPred).toStrictEqual(indexTrue)
})

test("gets the index of a value in a vector", () => {
  const x = normal(100)
  const indexTrue = 57
  const indexPred = indexOf(x, x[57])[0]
  expect(indexPred).toBe(indexTrue)
})

test("returns null when the index of a value is not found", () => {
  const x = normal(100)
  expect(isUndefined(indexOf(x, "foo"))).toBe(true)
})

test("gets the index of objects with and without requiring identity", () => {
  const x = ["foo", "bar", { hello: "world" }]
  const indexTrue = 2
  const indexPred = indexOf(x, { hello: "world" })[0]
  expect(indexPred).toBe(indexTrue)
  expect(isUndefined(indexOf(x, { hello: "world" }, true))).toBe(true)
})
