const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random.js")
const abs = require("./abs.js")
const normal = require("./normal.js")
const variance = require("./variance.js")

test("tests that variance can be correctly computed", () => {
  expect(abs(variance(normal(10000)) - 1)).toBeLessThan(0.05)
  expect(abs(variance(normal([10, 10, 10, 10])) - 1)).toBeLessThan(0.05)
  expect(abs(variance(random(10000)) - 0.084)).toBeLessThan(0.05)

  const a = new Series({ hello: normal(100) })
  expect(variance(a)).toBe(variance(a.values))

  const b = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(variance(b)).toBe(variance(b.values))

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
    expect(() => variance(item)).toThrow()
  })
})
