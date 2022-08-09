const { DataFrame, Series } = require("./dataframe")
const isSeries = require("./is-series.js")
const normal = require("./normal.js")

test("tests that series can be correctly identified", () => {
  const rights = [
    new Series(),
    new Series({ foo: [2, 3, 4] }),
    new Series(normal(100)),
  ]

  rights.forEach(s => {
    expect(isSeries(s)).toBe(true)
  })

  const wrongs = [
    234,
    "foo",
    true,
    false,
    null,
    undefined,
    [],
    normal([2, 3, 4, 5]),
    new DataFrame(),
    new DataFrame(normal([100, 5])),
    () => {},
    {},
  ]

  wrongs.forEach(x => {
    expect(isSeries(x)).toBe(false)
  })
})
