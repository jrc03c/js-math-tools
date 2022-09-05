const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten.js")
const mode = require("./mode.js")
const normal = require("./normal.js")
const round = require("./round.js")
const set = require("./set.js")
const sort = require("./sort.js")

test("tests that the mode of an array, series, or dataframe can be found correctly", () => {
  expect(mode([2, 2, 2, 3, 4])).toBe(2)
  expect(mode([2, 3, 3, 3, 4])).toBe(3)
  expect(mode([2, 3, 4, 4, 4])).toBe(4)
  expect(mode([2, 2, 3, 3])).toStrictEqual([2, 3])

  const a = round(normal([2, 3, 4, 5]))
  expect(mode(a)).toStrictEqual(mode(flatten(a)))

  const b = set(normal(100))
  expect(sort(mode(b))).toStrictEqual(sort(b))

  const c = new Series({ hello: round(normal(100)) })
  expect(mode(c)).toStrictEqual(mode(c.values))

  const d = new DataFrame({ foo: round(normal(100)), bar: round(normal(100)) })
  expect(mode(d)).toStrictEqual(mode(d.values))

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
    expect(() => mode(item)).toThrow()
  })
})
