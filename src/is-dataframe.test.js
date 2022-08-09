const { DataFrame, Series } = require("./dataframe")
const isDataFrame = require("./is-dataframe.js")
const normal = require("./normal.js")

test("tests that dataframes can be correctly identified", () => {
  const rights = [
    new DataFrame(),
    new DataFrame({ foo: [2, 3, 4], bar: [5, 6, 7] }),
    new DataFrame(normal([100, 5])),
  ]

  rights.forEach(df => {
    expect(isDataFrame(df)).toBe(true)
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
    new Series(),
    new Series(normal(100)),
    () => {},
    {},
  ]

  wrongs.forEach(x => {
    expect(isDataFrame(x)).toBe(false)
  })
})
