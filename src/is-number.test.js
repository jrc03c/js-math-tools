const { DataFrame, Series } = require("./dataframe")
const isNumber = require("./is-number")

test("checks to see if various things are numbers", () => {
  const rights = [0, 1, 2.3, -2.3, Infinity, -Infinity, Math.PI]

  rights.forEach(item => {
    expect(isNumber(item)).toBe(true)
  })

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

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
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  wrongs.forEach(item => {
    expect(isNumber(item)).toBe(false)
  })
})
