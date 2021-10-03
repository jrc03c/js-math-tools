const median = require("./median.js")
const shuffle = require("./shuffle.js")
const normal = require("./normal.js")
const { random } = require("./random.js")
const round = require("./round.js")
const scale = require("./scale.js")
const add = require("./add.js")

test("gets the median of arrays of numbers", () => {
  expect(median([2, 3, 4])).toBe(3)
  expect(median([4, 2, 3])).toBe(3)
  expect(median([4, 2, 3, 5])).toBe(3.5)

  const x = round(scale(add(normal(1000), 100), 100))
  const m = median(x)

  for (let i = 0; i < 10; i++) {
    expect(median(shuffle(x))).toBe(m)
  }
})

test("returns NaN when attempting to get the median of non-numerical values", () => {
  expect(median()).toBeNaN()
  expect(median([])).toBeNaN()
  expect(median(123)).toBeNaN()
  expect(median([1, 2, "three"])).toBeNaN()
  expect(median("foo")).toBeNaN()
  expect(median(true)).toBeNaN()
  expect(median({})).toBeNaN()
  expect(median(() => {})).toBeNaN()
  expect(median(null)).toBeNaN()
  expect(median(undefined)).toBeNaN()
})
