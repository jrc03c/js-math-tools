const sum = require("./sum.js")
const range = require("./range.js")
const normal = require("./normal.js")
const abs = require("./abs.js")

test("sums [2, 3, 4] to get 9", () => {
  const x = [2, 3, 4]
  const yTrue = 9
  const yPred = sum(x)
  expect(yPred).toBe(yTrue)
})

test("sums the range from -100 to 100 to get 0", () => {
  const x = range(-100, 101)
  const yTrue = 0
  const yPred = sum(x)
  expect(yPred).toBe(yTrue)
})

test("returns NaN when `sum` is called with no arguments", () => {
  expect(sum()).toBeNaN()
})

test("returns NaN when `sum` is called on an empty array", () => {
  expect(sum([])).toBeNaN()
})

test("returns NaN when `sum` is called on non-numerical values", () => {
  expect(sum(["foo", "bar", "baz"])).toBeNaN()
  expect(sum("foo")).toBeNaN()
})

test("sums [2, 3, 'four'] to be 5", () => {
  expect(sum([2, 3, "four"])).toBe(5)
})
