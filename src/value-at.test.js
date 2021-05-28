const valueAt = require("./value-at.js")
const isEqual = require("./is-equal.js")
const indexOf = require("./index-of.js")
const normal = require("./normal.js")

test("", () => {
  const x = normal([10, 10, 10, 10])
  const valueTrue = x[4][3][2][1]
  const valuePred = valueAt(x, [4, 3, 2, 1])
  expect(valuePred).toBe(valueTrue)
  expect(valueAt(x, [4, 3])).toStrictEqual(x[4][3])
})

test("error", () => {
  expect(() => {
    valueAt()
  }).toThrow()

  expect(() => {
    const x = normal([10, 10, 10, 10])
    valueAt(x, 100)
  }).toThrow()

  expect(() => {
    const x = normal([10, 10, 10, 10])
    valueAt(x, [10, 20, 30])
  }).toThrow()

  expect(() => {
    const x = normal([10, 10, 10, 10])
    valueAt(x, [0, 0, 0, 0, 0])
  }).toThrow()

  expect(() => {
    valueAt(123, 234)
  }).toThrow()

  expect(() => {
    valueAt("foo", "bar")
  }).toThrow()

  expect(() => {
    valueAt(null, undefined)
  }).toThrow()

  expect(() => {
    valueAt(true, false)
  }).toThrow()

  expect(() => {
    valueAt(() => {}, {})
  }).toThrow()
})
