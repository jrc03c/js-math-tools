const { DataFrame, Series } = require("./dataframe")
const isFunction = require("./is-function")

test("tests that functions can be identified correctly", () => {
  const rights = [
    x => x,
    function (x) {
      return x
    },
    DataFrame,
    Series,
    new DataFrame().apply,
  ]

  rights.forEach(item => {
    expect(isFunction(item)).toBe(true)
  })

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

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
    { hello: "world" },
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  wrongs.forEach(item => {
    expect(isFunction(item)).toBe(false)
  })
})
