const ceil = require("./ceil.js")
const ones = require("./ones.js")
const { random } = require("./random.js")

test("ceils some values", () => {
  expect(ceil(5.95)).toBe(6)
  expect(ceil(-3.25)).toBe(-3)
  expect(ceil([1.25, 2.5, 3.75])).toStrictEqual([2, 3, 4])
  expect(ceil(random(500))).toStrictEqual(ones(500))
})

test("returns NaN when attempting to ceil non-numerical values", () => {
  expect(ceil()).toBeNaN()
  expect(ceil("foo")).toBeNaN()
  expect(ceil(true)).toBeNaN()
  expect(ceil(() => {})).toBeNaN()
  expect(ceil({})).toBeNaN()
  expect(ceil(null)).toBeNaN()
  expect(ceil(undefined)).toBeNaN()
})
