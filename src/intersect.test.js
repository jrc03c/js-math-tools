const intersect = require("./intersect.js")
const range = require("./range.js")
const shuffle = require("./shuffle.js")
const sort = require("./sort.js")
const reshape = require("./reshape.js")

test("gets the intersection of manually-defined arrays", () => {
  const a = [2, 3, 4, 5]
  const b = [3, 4, 5, 6]
  const c = [4, 5, 6, 7]
  const yTrue = [4, 5]
  const yPred = intersect(a, b, c)
  expect(yPred).toStrictEqual(yTrue)
})

test("gets the intersection of randomly-defined tensors", () => {
  const a = reshape(range(0, 120), [40, 3])
  const b = reshape(range(60, 180), [3, 4, 10])
  const c = reshape(range(80, 200), [6, 2, 5, 2])
  const yTrue = range(80, 120)
  const yPred = sort(intersect(a, b, c))
  expect(yPred).toStrictEqual(yTrue)
})

test("does *not* throw an error when attempting to the intersection of non-arrays", () => {
  expect(() => {
    intersect()
  }).not.toThrow()

  expect(() => {
    intersect([1, 2, 3], "foo")
  }).not.toThrow()

  expect(() => {
    intersect("foo", [1, 2, 3])
  }).not.toThrow()

  expect(() => {
    intersect(true, false)
  }).not.toThrow()

  expect(() => {
    intersect(undefined, null)
  }).not.toThrow()

  expect(() => {
    intersect(() => {}, {}, "blah")
  }).not.toThrow()
})
