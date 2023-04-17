const { DataFrame, Series } = require("./dataframe")
const count = require("./count")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const range = require("./range")
const round = require("./round")
const normal = require("./normal")
const set = require("./set")

test("tests that values in an array can be counted correctly", () => {
  const a = round(normal(1000))

  set(a).forEach(v => {
    expect(count(a, v)).toBe(a.filter(x => x === v).length)
  })

  const b = new Series(round(normal(1000)))
  const c = new DataFrame(round(normal([100, 10])))

  set(b).forEach(v => {
    expect(count(b, v)).toBe(
      flatten(b.values).filter(x => isEqual(x, v)).length
    )
  })

  set(c).forEach(v => {
    expect(count(c, v)).toBe(
      flatten(c.values).filter(x => isEqual(x, v)).length
    )
  })

  expect(isEqual(count(b), count(b.values))).toBe(true)
  expect(isEqual(count(b, 2), count(b.values, 2)))
  expect(isEqual(count(c), count(c.values))).toBe(true)
  expect(isEqual(count(c, 2), count(c.values, 2))).toBe(true)

  const types = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    x => x,
    function (x) {
      return x
    },
  ]

  const temp = range(0, 1000).map(
    () => types[parseInt(Math.random() * types.length)]
  )

  const tempCounts = count(temp)

  tempCounts.forEach(c => {
    expect(c.count).toBe(temp.filter(v => isEqual(v, c.value)).length)
  })
})
