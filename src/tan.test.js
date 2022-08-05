const chop = require("./chop.js")
const tan = require("./tan.js")

test("gets tangent of common angles", () => {
  expect(chop(tan(0))).toBe(0)
  expect(chop(tan(Math.PI / 4) - 1)).toBe(0)
  expect(tan(Math.PI / 2)).toBeGreaterThan(100000)
  expect(chop(tan((3 * Math.PI) / 4) + 1)).toBe(0)
  expect(chop(tan(Math.PI))).toBe(0)
})

test("returns NaN when attempting to take the tangent of non-numerical values", () => {
  expect(tan()).toBeNaN()
  expect(tan("foo")).toBeNaN()
  expect(tan(true)).toBeNaN()
  expect(tan(false)).toBeNaN()
  expect(tan(null)).toBeNaN()
  expect(tan(undefined)).toBeNaN()
  expect(tan(() => {})).toBeNaN()
  expect(tan({})).toBeNaN()
  expect(tan([])).toStrictEqual([])
})
