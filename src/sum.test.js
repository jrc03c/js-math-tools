const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const normal = require("./normal")
const sum = require("./sum")

test("tests that the sums of values can be computed correctly", () => {
  expect(sum([2, 3, 4])).toBe(9)
  expect(sum([2, [3, [4]]])).toBe(9)

  const a = normal(100)

  expect(
    isEqual(
      sum(a),
      a.reduce((a, b) => a + b, 0)
    )
  ).toBe(true)

  const b = normal([2, 3, 4, 5])

  expect(
    isEqual(
      sum(b),
      flatten(b).reduce((a, b) => a + b, 0)
    )
  ).toBe(true)

  const c = new Series({ hello: normal(100) })
  expect(isEqual(sum(c), sum(c.values))).toBe(true)

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(sum(d), sum(d.values))).toBe(true)

  const wrongs = [
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
    { hello: "world" },
  ]

  wrongs.forEach(item => {
    expect(() => sum(item)).toThrow()
  })
})
