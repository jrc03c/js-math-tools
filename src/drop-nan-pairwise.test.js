const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random")
const dropNaNPairwise = require("./drop-nan-pairwise")
const isEqual = require("./is-equal")
const isJagged = require("./is-jagged")
const normal = require("./normal")

test("tests that NaN values can be correctly dropped pairwise", () => {
  const a = [2, 3, 4]
  const b = [5, 6, 7]
  expect(isEqual(dropNaNPairwise(a, b), [a, b])).toBe(true)

  const c = [2, 3, "foo", null, 6]
  const d = [true, 8, 9, 10, 11]

  expect(
    isEqual(dropNaNPairwise(c, d), [
      [3, 6],
      [8, 11],
    ])
  ).toBe(true)

  const e = [[[2, 3, {}, 5]]]
  const f = [[[x => x, 7, 8, 9]]]

  expect(isEqual(dropNaNPairwise(e, f), [[[[3, 5]]], [[[7, 9]]]])).toBe(true)

  const g = new Series(normal(100))
  g.values[parseInt(random() * g.values.length)] = "foo"
  const h = new Series(normal(100))
  h.values[parseInt(random() * h.values.length)] = "bar"
  const iTrue = dropNaNPairwise(g.values, h.values)
  const iPred = dropNaNPairwise(g, h)
  expect(isEqual(iPred, iTrue)).toBe(true)

  const j = new DataFrame(normal([100, 5]))

  j.values[parseInt(random() * j.shape[0])][
    parseInt(random() * j.shape[1])
  ] = false

  const k = new DataFrame(normal([100, 5]))

  k.values[parseInt(random() * k.shape[0])][parseInt(random() * k.shape[1])] =
    undefined

  const lTrue = dropNaNPairwise(j.values, k.values)
  const lPred = dropNaNPairwise(j, k)
  expect(isEqual(lPred, lTrue)).toBe(true)

  const m = normal([2, 3, 4, 5])
  m[0][1][2][3] = "null"
  const n = normal([2, 3, 4, 5])
  n[1][2][3][4] = "not null"

  expect(isJagged(dropNaNPairwise(m, n))).toBe(true)

  const wrongs = [
    [0, 1],
    [2.3, -2.3],
    [Infinity, -Infinity],
    [NaN, "foo"],
    [true, false],
    [null, undefined],
    [Symbol.for("Hello, world!"), [2, 3, 4]],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      x => x,
    ],
    [
      function (x) {
        return x
      },
      { hello: "world" },
    ],
    [normal([2, 3, 4, 5]), normal([5, 4, 3, 2])],
  ]

  wrongs.forEach(pair => {
    expect(() => dropNaNPairwise(pair[0], pair[1])).toThrow()
  })
})
