const { DataFrame, Series } = require("./dataframe")
const apply = require("./apply")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const normal = require("./normal")
const reshape = require("./reshape")
const scale = require("./scale")

test("tests that values can be multiplied correctly", () => {
  expect(scale(2, 3)).toBe(6)
  expect(scale(2, 3, 4, 5)).toBe(2 * 3 * 4 * 5)

  const a = normal(100)

  expect(
    isEqual(
      scale(a, 5),
      apply(a, v => v * 5)
    )
  ).toBe(true)

  const b = normal([2, 3, 4, 5])

  expect(
    isEqual(
      scale(b, -234),
      apply(b, v => v * -234)
    )
  ).toBe(true)

  const c = normal([2, 3, 4, 5])
  const d = normal([2, 3, 4, 5])
  const e = normal([2, 3, 4, 5])
  const f = normal([2, 3, 4, 5])

  expect(
    isEqual(
      scale(c, d, e, f),
      reshape(
        scale(flatten(c), flatten(d), flatten(e), flatten(f)),
        [2, 3, 4, 5]
      )
    )
  ).toBe(true)

  const g = new Series({ hello: normal(100) })

  expect(isEqual(scale(g, 5), new Series({ hello: scale(g.values, 5) })))

  const h = new DataFrame({ foo: normal(100), bar: normal(100) })

  expect(
    isEqual(
      scale(h, 5),
      new DataFrame({
        foo: scale(h.get("foo").values, 5),
        bar: scale(h.get("bar").values, 5),
      })
    )
  ).toBe(true)

  const wrongs = [
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

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      expect(scale(a, b)).toBeNaN()
    })
  })
})
