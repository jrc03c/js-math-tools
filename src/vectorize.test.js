const vectorize = require("./vectorize.js")

test("tests function vectorization", () => {
  const x = [2, 3, 4]
  const double = vectorize(x => x * 2)
  const yTrue = [4, 6, 8]
  const yPred = double(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("tests function vectorization", () => {
  const x = [0, 1, 2, 3]
  const tens = vectorize(() => 10)
  const yTrue = [10, 10, 10, 10]
  const yPred = tens(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("tests function vectorization", () => {
  const x = [[[[1, 2, 3, 4]]]]
  const square = vectorize(x => x * x)
  const yTrue = [[[[1, 4, 9, 16]]]]
  const yPred = square(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("tests function vectorization", () => {
  const x = ["a", "b", "c"]
  const foo = vectorize(x => x + "foo")
  const yTrue = ["afoo", "bfoo", "cfoo"]
  const yPred = foo(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("throws an error when attempting to vectorize non-functions or to call a vectorized function with multiple arrays of differing sizes", () => {
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
