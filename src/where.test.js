const where = require("./where.js")
const normal = require("./normal.js")
const getValueAt = require("./get-value-at.js")
const setValueAt = require("./set-value-at.js")
const sign = require("./sign.js")
const set = require("./set.js")

test("tests `where` on a matrix", () => {
  const x = [
    [2, 3, 5, 7],
    [8, 1, 4, 3],
  ]

  const yTrue = {
    "0": [0, 0],
    "1": [1, 0],
    "2": [1, 2],
  }

  const yPred = where(x, v => v % 2 === 0)
  expect(yPred).toStrictEqual(yTrue)
})

test("tests `where` on a tensor", () => {
  let x = normal([5, 5, 5])
  const yPred = where(x, v => v < 0)

  Object.keys(yPred).forEach(key => {
    const idx = yPred[key]
    expect(getValueAt(x, idx)).toBeLessThan(0)
    x = setValueAt(x, idx, 100)
  })

  expect(set(sign(x))).toStrictEqual([1])
})

test("throws an error when attempting to run the `where` function on non-arrays and using non-functions", () => {
  expect(() => {
    where()
  }).toThrow()

  expect(() => {
    where([1, 2, 3], "foo")
  }).toThrow()

  expect(() => {
    where("foo", () => true)
  }).toThrow()

  expect(() => {
    where(123, 456)
  }).toThrow()

  expect(() => {
    where(true, false)
  }).toThrow()

  expect(() => {
    where(null, undefined)
  }).toThrow()

  expect(() => {
    where(() => {}, {})
  }).toThrow()

  expect(() => {
    where({}, () => {})
  }).toThrow()
})
