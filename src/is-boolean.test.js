const { DataFrame, Series } = require("./dataframe")
const isBoolean = require("./is-boolean")

test("tests that booleans can be identified correctly", () => {
  const rights = [true, false, 1 > 0, 1 < 0, 1 === 0]

  rights.forEach(item => {
    expect(isBoolean(item)).toBe(true)
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
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  wrongs.forEach(item => {
    expect(isBoolean(item)).toBe(false)
  })
})
