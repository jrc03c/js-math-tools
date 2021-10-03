const sign = require("./sign.js")
const { random } = require("./random.js")
const normal = require("./normal.js")
const set = require("./set.js")
const sort = require("./sort.js")
const scale = require("./scale.js")
const add = require("./add.js")
const ones = require("./ones.js")

test("gets the sign of some numbers", () => {
  const a = sort(set(sign(normal(10000))).concat(0))
  expect(a).toStrictEqual([-1, 0, 1])

  const b = sign(add(random([10, 10, 10, 10]), 100))
  expect(b).toStrictEqual(ones([10, 10, 10, 10]))

  const c = sign(add(random([10, 10, 10, 10]), -100))
  expect(c).toStrictEqual(scale(ones([10, 10, 10, 10]), -1))

  expect(sign([])).toStrictEqual([])
})

test("returns NaN when attempting to get the sign of non-numerical values", () => {
  expect(sign()).toBeNaN()
  expect(sign("foo")).toBeNaN()
  expect(sign(true)).toBeNaN()
  expect(sign(false)).toBeNaN()
  expect(sign(() => {})).toBeNaN()
  expect(sign({})).toBeNaN()
  expect(sign(null)).toBeNaN()
  expect(sign(undefined)).toBeNaN()
})
