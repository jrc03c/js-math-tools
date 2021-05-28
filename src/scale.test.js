const scale = require("./scale.js")

test("multiply some numbers", () => {
  expect(scale(3, 5)).toBe(15)
  expect(scale([3, 4, 5], 5)).toStrictEqual([15, 20, 25])
  expect(scale(3, [5, 6, 7])).toStrictEqual([15, 18, 21])
  expect(scale([2, 3, 4], [5, 6, 7])).toStrictEqual([10, 18, 28])
})

test("returns NaN when attempting to multiply non-numerical values", () => {
  expect(scale()).toBeNaN()
  expect(scale(5)).toBeNaN()
  expect(scale("foo", 5)).toBeNaN()
  expect(scale(5, "foo")).toBeNaN()
  expect(scale(true, false)).toBeNaN()
  expect(scale(null, undefined)).toBeNaN()
  expect(scale(() => {}, {})).toBeNaN()
})
