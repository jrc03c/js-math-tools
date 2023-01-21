const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random")
const abs = require("./abs")
const isEqual = require("./is-equal")
const normal = require("./normal")
const std = require("./std")

test("tests that standard deviations can be correctly computed", () => {
  const a = normal(10000)
  expect(abs(std(a) - 1)).toBeLessThan(0.05)

  const b = random(10000)
  expect(abs(std(b) - 0.28)).toBeLessThan(0.05)

  const c = new Series({ hello: normal(100) })
  expect(isEqual(std(c), std(c.values))).toBe(true)

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(std(d), std(d.values))).toBe(true)

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
    expect(() => std(item)).toThrow()
  })
})
