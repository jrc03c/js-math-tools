const range = require("./range.js")

test("", () => {
  expect(range(5, 10)).toStrictEqual([5, 6, 7, 8, 9])
  expect(range(5, 9, 0.5)).toStrictEqual([5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5])
  expect(range(3, -3)).toStrictEqual([3, 2, 1, 0, -1, -2])
  expect(range(-1, -2, 0.25)).toStrictEqual([-1, -1.25, -1.5, -1.75])
  expect(range(10, 5)).toStrictEqual([10, 9, 8, 7, 6])
  expect(range(10, 6, 0.5)).toStrictEqual([10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5])
  expect(range(1, 1)).toStrictEqual([])
})

test("error", () => {
  expect(() => {
    range()
  }).toThrow()

  expect(() => {
    range("foo", "bar")
  }).toThrow()

  expect(() => {
    range(true, false)
  }).toThrow()

  expect(() => {
    range(() => {}, {})
  }).toThrow()

  expect(() => {
    range(null, undefined)
  }).toThrow()
})
