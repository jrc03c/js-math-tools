const sqrt = require("./sqrt.js")

test("gets the square root of some numbers", () => {
  expect(sqrt(9)).toBe(3)
  expect(sqrt([9, 16, 25])).toStrictEqual([3, 4, 5])
})

test("returns NaN when attempting to get the square root of non-numerical or negative values", () => {
  expect(sqrt()).toBeNaN()
  expect(sqrt(-5)).toBeNaN()
  expect(sqrt("foo")).toBeNaN()
  expect(sqrt(true)).toBeNaN()
  expect(sqrt(false)).toBeNaN()
  expect(sqrt(() => {})).toBeNaN()
  expect(sqrt({})).toBeNaN()
  expect(sqrt([])).toStrictEqual([])
})
