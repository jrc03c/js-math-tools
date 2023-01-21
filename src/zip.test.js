const { DataFrame, Series } = require("./dataframe")
const isEqual = require("./is-equal")
const max = require("./max")
const normal = require("./normal")
const range = require("./range")
const zip = require("./zip")

test("tests that arrays and Series can be zipped correctly", () => {
  const a = normal(100)
  const b = normal(100)

  expect(
    isEqual(
      zip(a, b),
      a.map((v, i) => [v, b[i]])
    )
  ).toBe(true)

  const c = normal([10, 10])
  const d = normal([10, 20])
  const e = normal([20, 10])
  const cde = [c, d, e]
  const maxLength = max(cde.map(arr => arr.length))

  expect(
    isEqual(
      zip(...cde),
      range(0, maxLength).map(i => [c[i], d[i], e[i]])
    )
  ).toBe(true)

  const f = new Series({ hello: normal(100) })
  const g = new Series({ goodbye: normal(100) })
  expect(isEqual(zip(f, g), zip(f.values, g.values)))

  const h = new DataFrame({ foo: normal(100), bar: normal(100) })
  const i = new DataFrame({ foo: normal(100), bar: normal(100) })
  const j = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(zip(h, i, j), zip(h.values, i.values, j.values))).toBe(true)

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

  range(0, 100).forEach(() => {
    const vars = range(0, parseInt(Math.random() * wrongs.length - 1) + 1).map(
      () => wrongs[parseInt(Math.random() * wrongs.length)]
    )

    expect(() => zip(...vars)).toThrow()
  })
})
