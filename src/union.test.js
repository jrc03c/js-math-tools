const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const normal = require("./normal")
const range = require("./range")
const round = require("./round")
const set = require("./set")
const sort = require("./sort")
const union = require("./union")

test("tests that set unions can be determined correctly", () => {
  const a = round(normal(100))
  const b = round(normal(100))
  const cTrue = sort(set(a.concat(b)))
  const cPred = sort(union(a, b))
  expect(isEqual(cPred, cTrue)).toBe(true)

  const d = round(normal([2, 3, 4, 5]))
  const e = round(normal([10, 10]))
  const fTrue = sort(set(flatten(d).concat(flatten(e))))
  const fPred = sort(union(d, e))
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new Series({ hello: normal(100) })
  const h = new Series({ goodbye: normal(100) })
  const i = new Series(normal(20))

  expect(isEqual(union(g, h, i), union(g.values, h.values, i.values))).toBe(
    true
  )

  const j = new DataFrame(round(normal([100, 100])))
  const k = new DataFrame(round(normal([50, 25])))
  const l = new DataFrame(round(normal([25, 50])))
  const m = new DataFrame(round(normal([100, 100])))

  expect(
    isEqual(union(j, k, l, m), union(j.values, k.values, l.values, m.values))
  ).toBe(true)

  const variables = [
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
    [2, 3, 4],
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  range(0, 100).forEach(() => {
    const vars = range(0, 100).map(
      () => variables[parseInt(Math.random() * variables.length)]
    )

    expect(() => union(...vars)).not.toThrow()
  })

  expect(
    isEqual(union(variables.concat(variables), variables), set(variables))
  ).toBe(true)
})
