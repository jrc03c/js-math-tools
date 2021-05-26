const mean = require("./mean.js")
const normal = require("./normal.js")
const random = require("./random.js")
const abs = require("./abs.js")

test("gets the mean of arrays", () => {
  expect(mean([2, 3, 4])).toBe(3)
  expect(abs(mean(normal(10000)))).toBeLessThan(0.05)
  expect(abs(mean(random(10000)) - 0.5)).toBeLessThan(0.05)
  expect(abs(mean(normal([10, 10, 10, 10])))).toBeLessThan(0.05)
})

test("returns NaN when attempting to get the mean of non-numerical values", () => {
  expect(mean()).toBeNaN()
  expect(mean([])).toBeNaN()
  expect(mean([1, 2, "three"])).toBeNaN()
  expect(mean("foo")).toBeNaN()
  expect(mean(true)).toBeNaN()
  expect(mean({})).toBeNaN()
  expect(mean(() => {})).toBeNaN()
  expect(mean(null)).toBeNaN()
  expect(mean(undefined)).toBeNaN()
})
