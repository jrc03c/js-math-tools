const { random } = require("./random.js")
const dropMissing = require("./drop-missing.js")
const isEqual = require("./is-equal.js")
const isJagged = require("./is-jagged.js")
const normal = require("./normal.js")
const reshape = require("./reshape.js")

test("drops missing values from an array with no missing values", () => {
  const a = [1, 2, 3, 4, 5]
  const aTemp = dropMissing(a)
  expect(aTemp).toStrictEqual(a)
})

test("drops missing values from an array with some missing values", () => {
  const a = [1, 2, null, undefined, 5]
  const aTemp = dropMissing(a)
  expect(aTemp).toStrictEqual([1, 2, 5])
})

test("drops missing values from an array with only missing values", () => {
  const a = [null, undefined, null, undefined, null]
  const aTemp = dropMissing(a)
  expect(aTemp.length).toBe(0)
})

test("drops missing values from nested arrays", () => {
  let x = normal(100)

  for (let i = 0; i < 0.1 * x.length; i++) {
    x[parseInt(random() * x.length)] = null
  }

  x = reshape(x, [2, 5, 2, 5])
  const y = dropMissing(x)
  expect(isEqual(x, y)).toBe(false)
  expect(isJagged(x)).toBe(false)
  expect(isJagged(y)).toBe(true)
})

test("throws errors when attempting to drop missing values from non-arrays", () => {
  const wrongs = [234, "foo", true, false, null, undefined, () => {}, {}]

  wrongs.forEach(x => {
    expect(() => dropMissing(x)).toThrow()
  })
})
