const { DataFrame, Series } = require("./dataframe")
const normal = require("./normal")
const reshape = require("./reshape")
const shape = require("./shape")

test("tests that arrays can be reshaped correctly", () => {
  expect(shape(reshape(normal(100), [2, 5, 10]))).toStrictEqual([2, 5, 10])

  expect(shape(reshape(normal([2, 3, 4, 5]), [5, 4, 3, 2]))).toStrictEqual([
    5, 4, 3, 2,
  ])

  expect(shape(reshape(normal([2, 3, 4, 5]), 2 * 3 * 4 * 5))).toStrictEqual([
    2 * 3 * 4 * 5,
  ])

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

  const x = normal(100)

  wrongs.forEach(item => {
    expect(() => reshape(x, item)).toThrow()
  })

  wrongs.forEach(item => {
    expect(() => reshape(item, [2, 3, 4])).toThrow()
  })
})
