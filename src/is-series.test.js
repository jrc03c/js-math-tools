const { DataFrame, Series } = require("./dataframe")
const isSeries = require("./is-series")
const normal = require("./normal")

class SubSeries extends Series {}

test("tests that series can be correctly identified", () => {
  expect(isSeries(new Series(normal(100)))).toBe(true)
  expect(isSeries(new SubSeries(normal(100)))).toBe(true)

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
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    selfReferencer,
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  wrongs.forEach(item => {
    expect(isSeries(item)).toBe(false)
  })
})
