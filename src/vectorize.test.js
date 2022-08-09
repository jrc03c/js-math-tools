const isEqual = require("./is-equal.js")
const vectorize = require("./vectorize.js")

test("tests function vectorization on single-argument functions", () => {
  const x = [2, 3, 4]
  const double = vectorize(x => x * 2)
  const yTrue = [4, 6, 8]
  const yPred = double(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("tests function vectorization on double-argument functions", () => {
  const mod = vectorize((a, b) => a % b)
  const x = [2, 3, 4, 5, 6]
  const y = 3

  expect(mod(x, y)).toStrictEqual([2, 0, 1, 2, 0])
  expect(mod(y, x)).toStrictEqual([1, 0, 3, 3, 3])
  expect(mod(x, x)).toStrictEqual([0, 0, 0, 0, 0])
  expect(mod(y, y)).toStrictEqual(0)
})

test("tests function vectorization on multi-argument functions", () => {
  const foo = vectorize((a, b, c) => a + b * c)
  const a = [2, 3, 4]
  const b = [5, 6, 7]
  const c = [8, 9, 10]

  expect(foo(a, b, c)).toStrictEqual([42, 57, 74])
  expect(foo(b, c, a)).toStrictEqual([21, 33, 47])
  expect(foo(c, a, b)).toStrictEqual([18, 27, 38])
  expect(foo(5, b, 10)).toStrictEqual([55, 65, 75])
})

test("tests passing weirdly-shaped arrays into vectorized functions", () => {
  const a = [2, [3, 4, [5, 6, 7]]]
  const b = [5, [10, 15, [20, 25, 30]]]
  const c = [7, [13, 19, [25, 31, 37]]]
  const sum = vectorize((a, b) => a + b)
  expect(isEqual(sum(a, b), c)).toBe(true)
})

test("throws an error when attempting to vectorize non-functions or to call a vectorized function with multiple arrays of differing shapes", () => {
  expect(() => {
    vectorize()
  }).toThrow()

  expect(() => {
    const subtract = vectorize((a, b) => a - b)
    subtract([2, 3, 4], [5, 6])
  }).toThrow()

  expect(() => {
    vectorize(123)
  }).toThrow()

  expect(() => {
    vectorize(true)
  }).toThrow()

  expect(() => {
    vectorize(false)
  }).toThrow()

  expect(() => {
    vectorize([])
  }).toThrow()

  expect(() => {
    vectorize({})
  }).toThrow()

  expect(() => {
    vectorize(null)
  }).toThrow()

  expect(() => {
    vectorize(undefined)
  }).toThrow()

  expect(() => {
    vectorize("foo")
  }).toThrow()
})
