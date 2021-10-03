const set = require("./set.js")
const sort = require("./sort.js")
const round = require("./round.js")
const { random } = require("./random.js")
const range = require("./range.js")

test("", () => {
  const x = [2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4]
  const yTrue = [2, 3, 4]
  const yPred = sort(set(x))
  expect(yPred).toStrictEqual(yTrue)
})

test("", () => {
  const x = round(random([10, 10, 10, 10]))
  const yTrue = [0, 1]
  const yPred = sort(set(x))
  expect(yPred).toStrictEqual(yTrue)
})

test("", () => {
  const x = range(10, 20, 0.25)
  const yTrue = x.slice()
  const yPred = set(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("", () => {
  const fn = () => {}
  const obj = { hello: "world" }

  const x = [
    "foo",
    "bar",
    "baz",
    "foo",
    "foo",
    true,
    true,
    false,
    true,
    234,
    234,
    0,
    obj,
    obj,
    obj,
    obj,
    null,
    null,
    null,
    null,
    undefined,
    undefined,
    fn,
    fn,
    fn,
    fn,
    fn,
  ]

  const yTrue = [
    "foo",
    "bar",
    "baz",
    true,
    false,
    234,
    0,
    obj,
    null,
    undefined,
    fn,
  ]

  const yPred = set(x)

  yTrue.forEach(item => {
    expect(yPred.indexOf(item)).toBeGreaterThan(-1)
  })
})
