const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const normal = require("./normal")
const product = require("./product")

test("tests that the products of values can be computed correctly", () => {
  expect(product([2, 3, 4])).toBe(24)
  expect(product([2, [3, [4]]])).toBe(24)

  const a = normal(100)

  expect(
    isEqual(
      product(a),
      a.reduce((a, b) => a * b, 1)
    )
  ).toBe(true)

  const b = normal([2, 3, 4, 5])

  expect(
    isEqual(
      product(b),
      flatten(b).reduce((a, b) => a * b, 1)
    )
  ).toBe(true)

  const c = new Series({ hello: normal(100) })
  expect(isEqual(product(c), product(c.values))).toBe(true)

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(product(d), product(d.values))).toBe(true)

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
    expect(() => product(item)).toThrow()
  })
})
