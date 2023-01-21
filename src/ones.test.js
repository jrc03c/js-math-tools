const { DataFrame, Series } = require("./dataframe")
const ones = require("./ones")
const shape = require("./shape")

test("tests that arrays of 1s can be generated correctly", () => {
  expect(ones(5)).toStrictEqual([1, 1, 1, 1, 1])

  expect(ones([2, 3])).toStrictEqual([
    [1, 1, 1],
    [1, 1, 1],
  ])

  expect(shape(ones([2, 3, 4, 5]))).toStrictEqual([2, 3, 4, 5])

  const wrongs = [
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    Symbol.for("Hello, world!"),
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

  wrongs.forEach(item => {
    expect(() => ones(item)).toThrow()
  })
})
