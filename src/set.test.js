const { DataFrame, Series } = require("./dataframe")
const isEqual = require("./is-equal")
const normal = require("./normal")
const round = require("./round")
const set = require("./set")
const sort = require("./sort")

test("tests that sets of values can be correctly selected", () => {
  expect(set([2, 2, 2, 3, 4])).toStrictEqual([2, 3, 4])
  expect(sort(set([4, [3, 3, [2, 2, 2]]]))).toStrictEqual([2, 3, 4])

  const a = set(round(normal(100)))

  a.slice(0, -1).forEach((u, i) => {
    a.slice(i + 1).forEach(v => {
      expect(u).not.toBe(v)
    })
  })

  const b = new Series({ hello: round(normal(100)) })
  expect(isEqual(set(b), set(b.values))).toBe(true)

  const c = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(set(c), set(c.values))).toBe(true)

  const others = [
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

  others.forEach(item => {
    expect(() => set(item)).toThrow()
  })
})
