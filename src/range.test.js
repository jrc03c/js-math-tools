const { DataFrame, Series } = require("./dataframe")
const range = require("./range")

test("tests that ranges of values can be generated correctly", () => {
  expect(range(0, 10)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  expect(range(2, 5, 0.5)).toStrictEqual([2, 2.5, 3, 3.5, 4, 4.5])
  expect(range(5, -5, 2)).toStrictEqual([5, 3, 1, -1, -3])
  expect(() => range(5, -5, -2)).toThrow()
  expect(() => range(0, 10, -5)).toThrow()

  const wrongs = [
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

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      wrongs.forEach(c => {
        expect(() => range(a, b, c)).toThrow()
      })
    })
  })
})
