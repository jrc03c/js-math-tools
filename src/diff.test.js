const diff = require("./diff.js")
const isEqual = require("./is-equal.js")
const range = require("./range.js")
const reshape = require("./reshape.js")
const shuffle = require("./shuffle.js")
const sort = require("./sort.js")

test("gets the difference of two manually-defined sets", () => {
  const a = [2, 3, 4, 5, 6]
  const b = [2, 3, 4, 7, 8]
  const yTrue = [5, 6]
  const yPred = diff(a, b)
  expect(yPred).toStrictEqual(yTrue)
})

test("gets the difference of two randomly-defined tensors", () => {
  const a = reshape(shuffle(range(0, 100)), [5, 20])
  const b = reshape(shuffle(range(-50, 50)), [25, 4])
  const yTrue = range(50, 100)
  const yPred = sort(diff(a, b))
  expect(yPred).toStrictEqual(yTrue)
})

test("gets the difference of two lists that contain objects", () => {
  const a = [{ foo: "bar" }, { hello: "world" }]
  const b = [{ foo: "bar" }, { hello: "nobody" }]
  const yTrue = [{ hello: "world" }]
  const yPred = diff(a, b)
  expect(isEqual(yTrue, yPred)).toBe(true)
})

test("throws an error when attempting to get the difference of two non-arrays", () => {
  expect(() => {
    diff()
  }).toThrow()

  expect(() => {
    diff([1, 2, 3], "foo")
  }).toThrow()

  expect(() => {
    diff("foo", [1, 2, 3])
  }).toThrow()

  expect(() => {
    diff(true, false)
  }).toThrow()

  expect(() => {
    diff(null, undefined)
  }).toThrow()

  expect(() => {
    diff(() => {}, {})
  }).toThrow()
})
