const floor = require("./floor.js")
const random = require("./random.js")
const zeros = require("./zeros.js")

test("floors some values", () => {
  expect(floor(5.95)).toBe(5)
  expect(floor(-3.25)).toBe(-4)
  expect(floor([1.25, 2.5, 3.75])).toStrictEqual([1, 2, 3])
  expect(floor(random(500))).toStrictEqual(zeros(500))
})

test("returns NaN when attempting to floor non-numerical values", () => {
  expect(floor()).toBeNaN()
  expect(floor("foo")).toBeNaN()
  expect(floor(true)).toBeNaN()
  expect(floor(() => {})).toBeNaN()
  expect(floor({})).toBeNaN()
  expect(floor(null)).toBeNaN()
  expect(floor(undefined)).toBeNaN()
})
