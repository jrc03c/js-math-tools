const { DataFrame, Series } = require("../dataframe")
const isEqual = require("../is-equal")
const isUndefined = require("../is-undefined")
const normal = require("../normal")
const range = require("../range")
const scale = require("../scale")
const set = require("../set")
const sort = require("../sort")

test("tests Series stuff", () => {
  expect(new Series().isEmpty).toBe(true)
  const isSeries = s => s instanceof Series

  const x = normal(100)
  const series = new Series(x)

  expect(isSeries(series)).toBe(true)
  expect(series.shape).toStrictEqual([100])
  expect(series.isEmpty).toBe(false)
  expect(isEqual(series.apply(v => v * 2).values, scale(x, 2))).toBe(true)

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
  expect(isEqual(series3.dropMissing().values, [2, 3, 5])).toBe(true)

  const series4 = new Series([2, 5, 3, 4])
  expect(series4.sort().values).toStrictEqual([2, 3, 4, 5])
  expect(series4.sort((a, b) => b - a).values).toStrictEqual([5, 4, 3, 2])

  const series5 = new Series(["a", "b", "c", "b", "a"])
  series5.name = "foo"
  series5.index = series5.index.map((row, i) => "foo" + i)

  const yPred = series5.getDummies()

  const yTrue = new DataFrame({
    foo_a: [1, 0, 0, 0, 1],
    foo_b: [0, 1, 0, 1, 0],
    foo_c: [0, 0, 1, 0, 0],
  })

  yTrue.index = yTrue.index.map((row, i) => "foo" + i)

  expect(
    isEqual(
      yPred.get(null, sort(yPred.columns)),
      yTrue.get(null, sort(yTrue.columns))
    )
  ).toBe(true)

  expect(series5.toDataFrame().shape).toStrictEqual([5, 1])

  const series6 = new Series(["foo", true, false, null, 1, 0, -1, {}, () => {}])
  series6.name = "Blah"
  series6.index = series6.values.map((v, i) => "b" + i)

  const series7 = series6.dropNaN()
  expect(isEqual(series7.values, [1, 0, -1]))
  expect(isEqual(series7.index, ["b4", "b5", "b6"]))
  expect(series7.name).toBe("Blah")

  const series8 = new Series(normal(100))
  expect(series8.length).toBe(100)
  expect(series8.width).toBe(undefined)

  const series9 = new Series(normal(100))
  const series10 = series9.shuffle()
  expect(isEqual(series9, series10)).toBe(false)
  expect(isEqual(series9.sort(), series10.sort())).toBe(true)
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
