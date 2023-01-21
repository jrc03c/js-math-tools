const { DataFrame, Series } = require("./dataframe")
const isObject = require("./is-object")

test("tests that objects can be correctly identified", () => {
  class Foo {}

  const selfReferencer = { hello: "world" }
  selfReferencer.self = selfReferencer

  const rights = [
    new Foo(),
    { hello: "world" },
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  rights.forEach(item => {
    expect(isObject(item)).toBe(true)
  })

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
  ]

  wrongs.forEach(item => {
    expect(isObject(item)).toBe(false)
  })
})
