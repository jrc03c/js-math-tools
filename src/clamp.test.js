const { DataFrame, Series } = require("./dataframe")
const clamp = require("./clamp")
const isEqual = require("./is-equal")
const normal = require("./normal")

test("tests that values can be clamped correctly", () => {
  const s = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [0, 0],
    [1, 1],
    [2.3, 1],
    [-2.3, 0],
    [Infinity, 1],
    [-Infinity, 0],
    [
      [2, 3, 4],
      [1, 1, 1],
    ],
    [
      [
        [2, -3, 4],
        [-5, 6, -7],
      ],
      [
        [1, 0, 1],
        [0, 1, 0],
      ],
    ],
    [s, s.copy().apply(v => (v > 1 ? 1 : v < 0 ? 0 : v))],
    [d, d.copy().apply(col => col.apply(v => (v > 1 ? 1 : v < 0 ? 0 : v)))],
  ]

  rights.forEach(pair => {
    expect(isEqual(clamp(pair[0], 0, 1), pair[1])).toBe(true)
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
    expect(clamp(v, 0, 1)).toBeNaN()
  })

  expect(
    isEqual(
      clamp(new Series(["a", "b", "c"]), 0, 1),
      new Series([NaN, NaN, NaN])
    )
  ).toBe(true)

  expect(
    isEqual(
      clamp(
        new DataFrame([
          ["a", "d"],
          ["b", "e"],
          ["c", "f"],
        ])
      ),
      new DataFrame([
        [NaN, NaN],
        [NaN, NaN],
        [NaN, NaN],
      ])
    )
  ).toBe(true)
})
