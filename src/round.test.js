const round = require("./round.js")
const { random } = require("./random.js")
const zeros = require("./zeros.js")
const sort = require("./sort.js")
const set = require("./set.js")

test("rounds some values", () => {
  expect(round(5.95)).toBe(6)
  expect(round(5.05)).toBe(5)
  expect(round(-3.25)).toBe(-3)
  expect(round(-3.75)).toBe(-4)
  expect(round([1.25, 2.5, 3.75])).toStrictEqual([1, 3, 4])
  expect(sort(set(round(random(500))))).toStrictEqual([0, 1])
})

test("returns NaN when attempting to round non-numerical values", () => {
  expect(round()).toBeNaN()
  expect(round("foo")).toBeNaN()
  expect(round(true)).toBeNaN()
  expect(round(() => {})).toBeNaN()
  expect(round({})).toBeNaN()
  expect(round(null)).toBeNaN()
  expect(round(undefined)).toBeNaN()
})
