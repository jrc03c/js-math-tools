const isEqual = require("../is-equal.js")
const isSeries = s => s instanceof Series
const isUndefined = require("../is-undefined.js")
const normal = require("../normal.js")
const range = require("../range.js")
const scale = require("../scale.js")
const { Series } = require("../dataframe")
const set = require("../set.js")

test("tests Series stuff", () => {
  const x = normal(100)
  const series = new Series(x)

  expect(isSeries(series)).toBe(true)
  expect(series.shape).toStrictEqual([100])
  expect(series.isEmpty).toBe(false)
  expect(new Series().isEmpty).toBe(true)
  expect(series.apply(v => v * 2).values).toStrictEqual(scale(x, 2))

  const clearedValues = set(series.clear().values)
  expect(clearedValues.length).toBe(1)
  expect(isUndefined(clearedValues[0])).toBe(true)

  expect(series.values).toStrictEqual(series.reverse().reverse().values)
  expect(series.get(range(10, 15)).values).toStrictEqual(x.slice(10, 15))
  expect(series.iloc(range(10, 15)).values).toStrictEqual(x.slice(10, 15))
  expect(series.loc(series.index.slice(10, 15)).values).toStrictEqual(
    x.slice(10, 15)
  )

  const series2 = series.copy()
  expect(isEqual(series, series2)).toBe(true)
  expect(series === series2).toBe(false)

  const series3 = new Series([2, 3, null, 5])
  expect(series3.dropMissing().values).toStrictEqual([2, 3, 5])

  const series4 = new Series([2, 5, 3, 4])
  expect(series4.sort().values).toStrictEqual([2, 3, 4, 5])
  expect(series4.sort(true).values).toStrictEqual([2, 3, 4, 5])
  expect(series4.sort("ascending").values).toStrictEqual([2, 3, 4, 5])
  expect(series4.sort(false).values).toStrictEqual([5, 4, 3, 2])
  expect(series4.sort("descending").values).toStrictEqual([5, 4, 3, 2])
})

test("throws an error when attempting to do unsavory things with Series", () => {
  const x = new Series(normal(100))

  expect(() => {
    x.get("foobar")
  }).toThrow()

  expect(() => {
    x.get(-1)
  }).toThrow()
})
