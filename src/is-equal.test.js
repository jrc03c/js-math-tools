const { DataFrame, Series } = require("./dataframe")
const copy = require("./copy.js")
const isEqual = require("./is-equal.js")

test("tests equality of primitives", () => {
  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

  const variables = [
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
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  variables.forEach(item => {
    const clone = copy(item)
    expect(isEqual(item, clone)).toBe(true)

    if (typeof item === "object" && item !== null) {
      expect(item !== clone).toBe(true)
    }
  })
})
