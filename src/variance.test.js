const variance = require("./variance.js")
const normal = require("./normal.js")
const { random } = require("./random.js")
const abs = require("./abs.js")

test("gets the variance of arrays", () => {
  expect(abs(variance(normal(10000)) - 1)).toBeLessThan(0.05)
  expect(abs(variance(random(10000)) - 0.0625)).toBeLessThan(0.05)
  expect(abs(variance(normal([10, 10, 10, 10])) - 1)).toBeLessThan(0.05)
})

test("returns NaN when attempting to get the variance of non-numerical values", () => {
  expect(variance()).toBeNaN()
  expect(variance([])).toBeNaN()
  expect(variance(123)).toBeNaN()
  expect(variance([1, 2, "three"])).toBeNaN()
  expect(variance("foo")).toBeNaN()
  expect(variance(true)).toBeNaN()
  expect(variance({})).toBeNaN()
  expect(variance(() => {})).toBeNaN()
  expect(variance(null)).toBeNaN()
  expect(variance(undefined)).toBeNaN()
})
