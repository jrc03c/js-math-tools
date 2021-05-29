const setValueAt = require("./set-value-at.js")
const getValueAt = require("./get-value-at.js")
const indexOf = require("./index-of.js")
const normal = require("./normal.js")

test("sets a value in a vector", () => {
  const x = [2, 3, 4, 5, 6]
  const yTrue = [2, 3, 4, 100, 6]
  const yPred = setValueAt(x, 3, 100)
  expect(yPred).toStrictEqual(yTrue)
})

test("sets a value in a tensor", () => {
  const x = normal([2, 3, 4, 5])
  const yPred = setValueAt(x, [0, 1, 1, 4], "foobar")
  expect(indexOf(yPred, "foobar")).toStrictEqual([0, 1, 1, 4])
  expect(getValueAt(yPred, [0, 1, 1, 4])).toBe("foobar")
})

test("sets a value in a tensor using negative indices", () => {
  setValueAt(normal(100), -5, "blah")
  throw new Error("This shouldn't work. I need to fix this!")
})

test("throws an error when attempting to set a value in a non-tensor with a non-index", () => {
  expect(() => {
    setValueAt()
  }).toThrow()

  expect(() => {
    setValueAt(normal(100), "foo")
  }).toThrow()

  expect(() => {
    setValueAt("foo", [2, 3, 4])
  }).toThrow()

  expect(() => {
    setValueAt(true, false)
  }).toThrow()

  expect(() => {
    setValueAt(() => {}, {})
  }).toThrow()

  expect(() => {
    setValueAt(null, undefined)
  }).toThrow()
})
