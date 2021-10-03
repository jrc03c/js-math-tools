const std = require("./std.js")
const normal = require("./normal.js")
const { random } = require("./random.js")
const abs = require("./abs.js")

test("gets the standard deviation of arrays", () => {
  expect(abs(std(normal(10000)) - 1)).toBeLessThan(0.05)
  expect(abs(std(random(10000)) - 0.25)).toBeLessThan(0.05)
  expect(abs(std(normal([10, 10, 10, 10])) - 1)).toBeLessThan(0.05)
})

test("returns NaN when attempting to get the standard deviation of non-numerical values", () => {
  expect(std()).toBeNaN()
  expect(std([])).toBeNaN()
  expect(std(123)).toBeNaN()
  expect(std([1, 2, "three"])).toBeNaN()
  expect(std("foo")).toBeNaN()
  expect(std(true)).toBeNaN()
  expect(std({})).toBeNaN()
  expect(std(() => {})).toBeNaN()
  expect(std(null)).toBeNaN()
  expect(std(undefined)).toBeNaN()
})
