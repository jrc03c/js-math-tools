const range = require("./range.js")
const reverse = require("./reverse.js")

test("", () => {
  expect(reverse([2, 3, 5, 4])).toStrictEqual([4, 5, 3, 2])
  expect(reverse(range(-100, 100))).toStrictEqual(range(99, -101))

  const x = [
    [2, 3, 4],
    [5, 6, 7],
  ]

  const y = [
    [5, 6, 7],
    [2, 3, 4],
  ]

  expect(reverse(x)).toStrictEqual(y)
})

test("error", () => {
  expect(() => {
    reverse()
  }).toThrow()

  expect(() => {
    reverse(234)
  }).toThrow()

  expect(() => {
    reverse("foo")
  }).toThrow()

  expect(() => {
    reverse({})
  }).toThrow()

  expect(() => {
    reverse(() => {})
  }).toThrow()

  expect(() => {
    reverse(true)
  }).toThrow()

  expect(() => {
    reverse(false)
  }).toThrow()

  expect(() => {
    reverse(null)
  }).toThrow()

  expect(() => {
    reverse(undefined)
  }).toThrow()
})
