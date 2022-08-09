const { random } = require("./random.js")
const dropNaNPairwise = require("./drop-nan-pairwise.js")
const isEqual = require("./is-equal.js")
const normal = require("./normal.js")
const range = require("./range.js")
const reshape = require("./reshape.js")
const shape = require("./shape.js")

test("drops NaN values pairwise from arrays that don't actually have NaN values", () => {
  const a = [1, 2, 3, 4]
  const b = [5, 6, 7, 8]
  const [aTemp, bTemp] = dropNaNPairwise(a, b)
  expect(aTemp).toStrictEqual(a)
  expect(bTemp).toStrictEqual(b)
})

test("drops NaN values pairwise from arrays that have NaN values", () => {
  const a = [1, 2, "foo", 4]
  const b = [true, 6, 7, 8]
  const [aTemp, bTemp] = dropNaNPairwise(a, b)
  expect(aTemp).toStrictEqual([2, 4])
  expect(bTemp).toStrictEqual([6, 8])
})

test("drops NaN values pairwise from arrays that contain only NaN values", () => {
  const a = range(0, 5).map(() => "foo")
  const b = range(0, 5).map(() => "bar")
  const [aTemp, bTemp] = dropNaNPairwise(a, b)
  expect(aTemp.length).toBe(0)
  expect(bTemp.length).toBe(0)
})

test("drops NaN values pairwise from nested arrays", () => {
  let a = normal(100)
  let b = normal(100)

  for (let i = 0; i < 0.1 * a.length; i++) {
    a[parseInt(random() * a.length)] = "foo"
    b[parseInt(random() * b.length)] = "bar"
  }

  a = reshape(a, [10, 2, 5])
  b = reshape(b, [10, 2, 5])
  const [aPred, bPred] = dropNaNPairwise(a, b)
  expect(isEqual(shape(aPred), shape(bPred))).toBe(true)
})

test("throws an error when attempting to drop NaN values pairwise from arrays with different shapes", () => {
  const a = [1, 2, 3]
  const b = [4, 5, 6, 7, 8, 9, 10]
  expect(() => dropNaNPairwise(a, b)).toThrow()
})

test("throws an error when attempting to drop NaN values pairwise on non-arrays", () => {
  expect(() => {
    dropNaNPairwise()
  }).toThrow()

  expect(() => {
    dropNaNPairwise("foo", "bar")
  }).toThrow()

  expect(() => {
    dropNaNPairwise(3, 4)
  }).toThrow()

  expect(() => {
    dropNaNPairwise({}, [])
  }).toThrow()

  expect(() => {
    dropNaNPairwise(() => {}, true)
  }).toThrow()
})
