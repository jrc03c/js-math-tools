const ceil = require("./ceil.js")

test("rounds 3.75 up to 4", () => {
  const x = 3.75
  const yTrue = 4
  const yPred = ceil(x)
  expect(yPred).toBe(yTrue)
})

test("rounds 3.25 up for 4", () => {
  const x = 3.25
  const yTrue = 4
  const yPred = ceil(x)
  expect(yPred).toBe(yTrue)
})

test("rounds -17.2 up to 17", () => {
  const x = -17.2
  const yTrue = -17
  const yPred = ceil(x)
  expect(yPred).toBe(yTrue)
})

test("rounds an array of values up", () => {
  const x = [2.5, 3.4, 7.9]
  const yTrue = [3, 4, 8]
  const yPred = ceil(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("returns NaN when trying to round a non-numerical value", () => {
  expect(ceil("foo")).toBeNaN()
})
