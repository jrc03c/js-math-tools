const getValueAt = require("./get-value-at.js")
const normal = require("./normal.js")

test("", () => {
  const x = normal([10, 10, 10, 10])
  const valueTrue = x[4][3][2][1]
  const valuePred = getValueAt(x, [4, 3, 2, 1])
  expect(valuePred).toBe(valueTrue)
  expect(getValueAt(x, [4, 3])).toStrictEqual(x[4][3])
})

test("error", () => {
  expect(() => {
    getValueAt()
  }).toThrow()

  expect(() => {
    const x = normal([10, 10, 10, 10])
    getValueAt(x, 100)
  }).toThrow()

  expect(() => {
    const x = normal([10, 10, 10, 10])
    getValueAt(x, [10, 20, 30])
  }).toThrow()

  expect(() => {
    const x = normal([10, 10, 10, 10])
    getValueAt(x, [0, 0, 0, 0, 0])
  }).toThrow()

  expect(() => {
    getValueAt(123, 234)
  }).toThrow()

  expect(() => {
    getValueAt("foo", "bar")
  }).toThrow()

  expect(() => {
    getValueAt(null, undefined)
  }).toThrow()

  expect(() => {
    getValueAt(true, false)
  }).toThrow()

  expect(() => {
    getValueAt(() => {}, {})
  }).toThrow()
})
