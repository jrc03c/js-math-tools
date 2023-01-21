const { DataFrame, Series } = require("./dataframe")
const isEqual = require("./is-equal")
const normal = require("./normal")
const seed = require("./random").seed
const shuffle = require("./shuffle")
const sort = require("./sort")

test("tests that arrays, Series, and DataFrames can be correctly shuffled", () => {
  const a = normal(100)
  const b = shuffle(a)
  expect(isEqual(a, b)).toBe(false)
  expect(a.length).toBe(b.length)
  expect(isEqual(sort(a), sort(b))).toBe(true)

  const c = normal(100)
  seed(1234567)
  const d = shuffle(c)
  seed(1234567)
  const e = shuffle(c)
  expect(isEqual(d, e)).toBe(true)

  const f = new Series({ hello: normal(100) })
  const g = shuffle(f)
  expect(isEqual(f, g)).toBe(false)
  expect(f.name).toBe(g.name)
  expect(isEqual(sort(f.values), sort(g.values))).toBe(true)
  expect(isEqual(sort(f.index), sort(g.index))).toBe(true)

  const h = new DataFrame({ foo: normal(100), bar: normal(100) })
  const i = shuffle(h)
  expect(isEqual(h, i)).toBe(false)
  expect(isEqual(h.columns, i.columns)).toBe(true)
  expect(isEqual(sort(h.values), sort(i.values))).toBe(true)
  expect(isEqual(sort(h.index), sort(i.index))).toBe(true)

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
    expect(() => shuffle(item)).toThrow()
  })
})
