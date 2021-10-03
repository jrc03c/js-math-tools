const union = require("./union.js")
const sort = require("./sort.js")
const count = require("./count.js")
const round = require("./round.js")
const { random } = require("./random.js")
const range = require("./range.js")
const scale = require("./scale.js")
const add = require("./add.js")

test("gets the union of manually-defined sets", () => {
  const obj = { hello: "world" }
  const double = x => x * 2

  const a = [
    1,
    2,
    2,
    2,
    2,
    3,
    4,
    4,
    4,
    5,
    "foo",
    "foo",
    "foo",
    true,
    true,
    false,
    obj,
    obj,
    obj,
    null,
    null,
  ]

  const b = [
    2,
    3,
    3,
    4,
    5,
    6,
    6,
    6,
    7,
    "foo",
    "bar",
    "bar",
    true,
    false,
    false,
    double,
    double,
    double,
    undefined,
  ]

  const yTrue = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    "foo",
    "bar",
    true,
    false,
    double,
    obj,
    null,
    undefined,
  ]

  const yPred = union(a, b)
  const yPredCounts = count(yPred)

  yTrue.forEach(item => {
    const c = yPredCounts.filter(other => other.item === item)[0]
    expect(c.count).toBe(1)
  })
})

test("gets the union of randomly-defined sets", () => {
  const a = round(scale(random(1000), 50))
  const b = add(round(scale(random(1000), 50)), 50)
  const yTrue = range(0, 101)
  const yPred = sort(union(a, b))
  expect(yPred).toStrictEqual(yTrue)
})

test("tests alternate `union` syntax", () => {
  const a = range(0, 100)
  const b = range(100, 200)
  const yTrue = range(0, 200)
  const yPred = union([a, b])
  expect(yPred).toStrictEqual(yTrue)
})

test("gets the union of more than 2 sets", () => {
  const a = range(0, 100)
  const b = range(50, 150)
  const c = range(100, 200)
  const yTrue = range(0, 200)
  const yPred = sort(union(a, b, c))
  expect(yPred).toStrictEqual(yTrue)
})

test("does *not* throw an error when attempting to get the union of non-arrays", () => {
  expect(() => {
    union()
  }).not.toThrow()

  expect(() => {
    union([1, 2, 3], "foo")
  }).not.toThrow()

  expect(() => {
    union(() => {}, null, null, undefined, "true", [1, 2, 3, 4, 5])
  }).not.toThrow()
})
