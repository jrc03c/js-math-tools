const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const ndarray = require("./ndarray")
const shape = require("./shape")

test("tests that arrays of any (non-jagged) shape can be created successfully", () => {
  expect(
    isEqual(ndarray(5), [undefined, undefined, undefined, undefined, undefined])
  ).toBe(true)

  expect(shape(ndarray([2, 3, 4, 5]))).toStrictEqual([2, 3, 4, 5])
  expect(flatten(ndarray([2, 3, 4, 5])).length).toBe(2 * 3 * 4 * 5)

  const wrongs = [
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
    expect(() => ndarray(item)).toThrow()
  })
})
