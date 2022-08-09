const { random } = require("./random.js")
const dropNaN = require("./drop-nan.js")
const isEqual = require("./is-equal.js")
const isJagged = require("./is-jagged.js")
const normal = require("./normal.js")
const reshape = require("./reshape.js")

test("drops NaN values from an array with no NaN values", () => {
  const a = [1, 2, 3, 4, 5]
  const aTemp = dropNaN(a)
  expect(aTemp).toStrictEqual(a)
})

test("drops NaN values from an array with some NaN values", () => {
  const a = [1, 2, "foo", true, 5]
  const aTemp = dropNaN(a)
  expect(aTemp).toStrictEqual([1, 2, 5])
})

test("drops NaN values from an array with only NaN values", () => {
  const a = ["foo", true, () => {}, {}, null]
  const aTemp = dropNaN(a)
  expect(aTemp.length).toBe(0)
})

test("drops NaN values from nested arrays", () => {
  let x = normal(100)

  for (let i = 0; i < 0.1 * x.length; i++) {
    x[parseInt(random() * x.length)] = null
  }

  x = reshape(x, [2, 5, 2, 5])
  const y = dropNaN(x)
  expect(isEqual(x, y)).toBe(false)
  expect(isJagged(x)).toBe(false)
  expect(isJagged(y)).toBe(true)
})

test("throws errors when attempting to drop NaN values from non-arrays", () => {
  const wrongs = [234, "foo", true, false, null, undefined, () => {}, {}]

  wrongs.forEach(x => {
    expect(() => dropNaN(x)).toThrow()
  })
})
