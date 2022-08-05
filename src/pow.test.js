const normal = require("./normal.js")
const pow = require("./pow.js")
const range = require("./range.js")

test("", () => {
  expect(pow(3, 2)).toBe(9)
  expect(pow([3, 4, 5], 2)).toStrictEqual([9, 16, 25])
  expect(pow(3, [2, 3, 4])).toStrictEqual([9, 27, 81])
  expect(pow([2, 3, 4], [2, 3, 4])).toStrictEqual([4, 27, 256])
})

test("returns NaN when raising powers with non-numerical values", () => {
  expect(pow()).toBeNaN()
  expect(pow(-5)).toBeNaN()
  expect(pow("foo", 10)).toBeNaN()
  expect(pow(10, "foo")).toBeNaN()
  expect(pow(true, false)).toBeNaN()
  expect(pow(() => {})).toBeNaN()
  expect(pow({})).toBeNaN()
  expect(pow([])).toStrictEqual([])
})

test("throws an error when attempting to raise powers with arrays of different shapes", () => {
  expect(() => {
    const x = range(0, 100)
    const p = normal(200)
    pow(x, p)
  }).toThrow()
})
