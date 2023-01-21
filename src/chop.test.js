const { DataFrame, Series } = require("./dataframe")
const chop = require("./chop")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const range = require("./range")
const reshape = require("./reshape")
const shuffle = require("./shuffle")

test("tests that values can be chopped correctly", () => {
  const r = reshape(
    shuffle(
      range(-40, 40).map(i => Math.pow(10, i) * (Math.random() < 0.5 ? -1 : 1))
    ),
    [2, 4, 10]
  )

  const s = new Series({ hello: shuffle(flatten(r)) })

  const d = new DataFrame({
    foo: shuffle(flatten(r)),
    bar: shuffle(flatten(r)),
  })

  const rights = [
    [0, 0],
    [1, 1],
    [2.3, 2.3],
    [-2.3, -2.3],
    [Infinity, Infinity],
    [-Infinity, -Infinity],
    [
      [2, 3, 4],
      [2, 3, 4],
    ],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
    ],
    [
      r,
      reshape(
        flatten(r).map(v => (Math.abs(v) < 1e-10 ? 0 : v)),
        [2, 4, 10]
      ),
    ],
    [s, s.copy().apply(v => (Math.abs(v) < 1e-10 ? 0 : v))],
    [d, d.copy().apply(col => col.apply(v => (Math.abs(v) < 1e-10 ? 0 : v)))],
  ]

  rights.forEach(pair => {
    expect(isEqual(chop(pair[0]), pair[1])).toBe(true)
  })

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

  wrongs.forEach(v => {
    expect(chop(v)).toBeNaN()
  })

  expect(
    isEqual(
      chop(new Series(["foo", "bar", "baz"])),
      new Series([NaN, NaN, NaN])
    )
  ).toBe(true)

  expect(
    isEqual(
      chop(new DataFrame({ foo: ["a", "b", "c"], bar: ["d", "e", "f"] })),
      new DataFrame({ foo: [NaN, NaN, NaN], bar: [NaN, NaN, NaN] })
    )
  ).toBe(true)
})
