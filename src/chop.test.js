const chop = require("./chop.js")

test("chops 1 to be 1", () => {
  expect(chop(1)).toBe(1)
})

test("chops -1 to be -1", () => {
  expect(chop(-1)).toBe(-1)
})

test("chops 0 to be 0", () => {
  expect(chop(0)).toBe(0)
})

test("chops 1e-15 to be 0", () => {
  expect(chop(1e-15)).toBe(0)
})

test("chops -1e-15 to be 0", () => {
  expect(chop(-1e-15)).toBe(0)
})

test("chops an array of values", () => {
  const x = [1e-20, 1e-15, 1e-5]
  const yTrue = [0, 0, 1e-5]
  const yPred = chop(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("chops an array of values with an array of thresholds", () => {
  const x = [1, 1, 1]
  const thresholds = [1e-1, 1, 1e1]
  const yTrue = [1, 1, 0]
  const yPred = chop(x, thresholds)
  expect(yPred).toStrictEqual(yTrue)
})

test("returns NaN when attempting to chop non-numerical values", () => {
  expect(chop("foo")).toBeNaN()
})

test("chops an array of values with an array of mixed types for thresholds", () => {
  const x = [1, 1, 1]
  const thresholds = [1e-10, 1e-20, "smol"]
  const yTrue = [1, 1, NaN]
  const yPred = chop(x, thresholds)
  expect(yPred).toStrictEqual(yTrue)
})

test("throws an error when attempting to chop arrays of values using an array of thresholds of a different shape", () => {
  expect(() => {
    chop([2, 3, 4], [1e-5, 1e-10, 1e-15, 1e-20])
  }).toThrow()
})
