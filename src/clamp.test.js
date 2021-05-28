const clamp = require("./clamp.js")

test("clamps 5 to be between 1 and 10", () => {
  expect(clamp(5, 1, 10)).toBe(5)
})

test("clamps -100 to be between 1 and 10", () => {
  expect(clamp(-100, 1, 10)).toBe(1)
})

test("clamps 100 to be between 1 and 10", () => {
  expect(clamp(100, 1, 10)).toBe(10)
})

test("clamps an array of values", () => {
  expect(clamp([0, 100, 1000], 5, 500)).toStrictEqual([5, 100, 500])
})

test("clamps an array of values to arrays of ranges", () => {
  const x = [1, 10, 100]
  const a = [5, 6, 7]
  const b = [50, 60, 70]
  const yPred = clamp(x, a, b)
  const yTrue = [5, 10, 70]
  expect(yPred).toStrictEqual(yTrue)
})

test("returns NaN when attempting to clamp non-numerical values", () => {
  expect(clamp("foo", 1, 10)).toBeNaN()
  expect(clamp(1, "foo", 10)).toBeNaN()
  expect(clamp(1, 10, "foo")).toBeNaN()
})
