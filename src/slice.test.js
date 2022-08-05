const flatten = require("./flatten.js")
const slice = require("./slice.js")
const zeros = require("./zeros.js")

test("gets a slice of a vector", () => {
  const x = [5, 6, 7]
  expect(slice(x, [-1])[0]).toBe(7)
})

test("gets a slice of a matrix", () => {
  const x = [
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10],
  ]

  const yTrue = [[3], [6], [9]]
  const yPred = slice(x, [null, 1])
  expect(yPred).toStrictEqual(yTrue)
})

test("gets a slice of a matrix using reverse indices", () => {
  const x = [
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10],
  ]

  const yTrue = [[9]]
  const yPred = slice(x, [-1, -2])
  expect(yPred).toStrictEqual(yTrue)
})

test("gets a slice of a tensor", () => {
  const x = zeros([10, 10, 10])
  x[5][4][3] = 1
  expect(flatten(slice(x, [5, 4, 3]))).toStrictEqual([1])
  expect(flatten(slice(x, [0, 0, null]))).toStrictEqual(x[0][0])
})

test("throws an error when attempting to take non-array slices of non-arrays", () => {
  expect(() => {
    slice()
  }).toThrow()

  expect(() => {
    slice(2, 3)
  }).toThrow()

  expect(() => {
    slice("foo", "bar")
  }).toThrow()

  expect(() => {
    slice(() => {}, {})
  }).toThrow()

  expect(() => {
    slice(true, false)
  }).toThrow()

  expect(() => {
    slice(null, undefined)
  }).toThrow()
})
