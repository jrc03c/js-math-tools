const { random } = require("./random.js")
const dropMissingPairwise = require("./drop-missing-pairwise.js")
const isEqual = require("./is-equal.js")
const normal = require("./normal.js")
const range = require("./range.js")
const reshape = require("./reshape.js")
const shape = require("./shape.js")

test("drops missing values pairwise from arrays that don't actually have missing values", () => {
  const a = [1, 2, 3, 4]
  const b = [5, 6, 7, 8]
  const [aTemp, bTemp] = dropMissingPairwise(a, b)
  expect(aTemp).toStrictEqual(a)
  expect(bTemp).toStrictEqual(b)
})

test("drops missing values pairwise from arrays that have missing values", () => {
  const a = [1, 2, null, 4]
  const b = [undefined, 6, 7, 8]
  const [aTemp, bTemp] = dropMissingPairwise(a, b)
  expect(aTemp).toStrictEqual([2, 4])
  expect(bTemp).toStrictEqual([6, 8])
})

test("drops missing values pairwise from arrays that contain only missing values", () => {
  const a = range(0, 5).map(() => null)
  const b = range(0, 5).map(() => undefined)
  const [aTemp, bTemp] = dropMissingPairwise(a, b)
  expect(aTemp.length).toBe(0)
  expect(bTemp.length).toBe(0)
})

test("drops missing values pairwise from nested arrays", () => {
  let a = normal(100)
  let b = normal(100)

  for (let i = 0; i < 0.1 * a.length; i++) {
    a[parseInt(random() * a.length)] = null
    b[parseInt(random() * b.length)] = undefined
  }

  a = reshape(a, [10, 2, 5])
  b = reshape(b, [10, 2, 5])
  const [aPred, bPred] = dropMissingPairwise(a, b)
  expect(isEqual(shape(aPred), shape(bPred))).toBe(true)
})

test("throws an error when attempting to drop missing values pairwise from arrays with different shapes", () => {
  const a = [1, 2, 3]
  const b = [4, 5, 6, 7, 8, 9, 10]
  expect(() => dropMissingPairwise(a, b)).toThrow()
})

test("throws an error when attempting to drop missing values pairwise on non-arrays", () => {
  expect(() => {
    dropMissingPairwise()
  }).toThrow()

  expect(() => {
    dropMissingPairwise("foo", "bar")
  }).toThrow()

  expect(() => {
    dropMissingPairwise(3, 4)
  }).toThrow()

  expect(() => {
    dropMissingPairwise({}, [])
  }).toThrow()

  expect(() => {
    dropMissingPairwise(() => {}, true)
  }).toThrow()
})
