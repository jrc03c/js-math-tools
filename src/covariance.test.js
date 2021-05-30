const covariance = require("./covariance.js")
const normal = require("./normal.js")
const abs = require("./abs.js")

test("gets covariance for two arrays, one of which has only one unique value, to be 0", () => {
  const x = [2, 3, 4]
  const y = [1, 1, 1]
  expect(covariance(x, y)).toBe(0)
})

test("gets the covariance of two normally distributed arrays", () => {
  const x = normal(10000)
  const y = normal(10000)
  expect(abs(covariance(x, y))).toBeLessThan(0.15)
})

test("gets the covariance of an array with itself", () => {
  const x = normal(10000)
  expect(covariance(x, x)).toBeGreaterThan(0.85)
})

test("returns NaN when attempting to get the covariance of empty arrays", () => {
  expect(covariance([], [])).toBeNaN()
})

test("throws an error when attempting to get the covariance of arrays of different size", () => {
  const x = normal(100)
  const y = normal(200)
  expect(covariance(x, y)).toBeNaN()
})
