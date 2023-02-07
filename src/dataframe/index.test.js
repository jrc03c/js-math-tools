const { DataFrame, Series } = require(".")
const flatten = require("../flatten")
const isEqual = require("../is-equal")
const isUndefined = require("../is-undefined")
const normal = require("../normal")
const range = require("../range")
const set = require("../set")
const sort = require("../sort")
const sum = require("../sum")
const zeros = require("../zeros")

test("tests DataFrame emptiness", () => {
  const xShape = [17, 32]
  const x = normal(xShape)
  const df = new DataFrame(x)

  expect(df instanceof DataFrame).toBe(true)
  expect(df.shape).toStrictEqual(xShape)
  expect(!df.isEmpty).toBe(true)
  expect(new DataFrame().isEmpty).toBe(true)

  const clearedValues = set(df.clear().values)
  expect(clearedValues.length).toBe(1)
  expect(isUndefined(clearedValues[0])).toBe(true)
})

test("tests DataFrame selectors", () => {
  const a = normal(100)
  const b = normal(100)
  const c = normal(100)
  const df = new DataFrame({ a, b, c })
  expect(a).toStrictEqual(df.get(null, "a").values)
  expect(b).toStrictEqual(df.get(null, "b").values)
  expect(c).toStrictEqual(df.get(null, "c").values)
  expect(df.values).toStrictEqual(df.T.T.values)
  expect(df.get(null, ["b", "c"]) instanceof DataFrame).toBe(true)
  expect(df.get(null, "a") instanceof Series).toBe(true)
})

test("tests DataFrame assignment", () => {
  const a = normal(100)
  const b = normal(100)
  const c = normal(100)
  let df = new DataFrame({ a, b, c })

  const e = new Series({ e: normal(100) })
  e.index = df.index.slice()
  df = df.assign(e)

  expect(isEqual(df.get(null, "e").values, e.values)).toBe(true)
})

test("tests DataFrame selectors (for missing columns)", () => {
  const a = normal(100)
  const b = normal(100)
  const c = normal(100)
  const df = new DataFrame({ a, b, c })

  expect(() => {
    df.get(null, "foo")
  }).toThrow()
})

test("tests DataFrame copying and index resetting", () => {
  const a = normal(100)
  const b = normal(100)
  const c = normal(100)
  let df1 = new DataFrame({ a, b, c })
  const df2 = df1.copy()
  expect(isEqual(df1, df2)).toBe(true)
  expect(df1 === df2).toBe(false)

  df1.index = range(0, df1.shape[0]).map(() => Math.random().toString())
  expect(isEqual(df1.index, df2.index)).toBe(false)
  df1 = df1.resetIndex()
  expect(isEqual(df1.index, df2.index)).toBe(true)
})

test("tests DataFrame mapping", () => {
  let df = new DataFrame(zeros([3, 3]))

  df = df.apply(col => {
    return col.values.map((v, j) => {
      return col.name + "/" + j
    })
  })

  const newValuesShouldBe = [
    ["col0/0", "col1/0", "col2/0"],
    ["col0/1", "col1/1", "col2/1"],
    ["col0/2", "col1/2", "col2/2"],
  ]

  expect(df.values).toStrictEqual(newValuesShouldBe)
})

test("tests DataFrame mapping", () => {
  let df = new DataFrame(zeros([3, 3]))

  df = df.apply(row => {
    return row.values.map((v, i) => {
      return row.name + "/" + i
    })
  }, 1)

  const newValuesShouldBe = [
    ["row0/0", "row0/1", "row0/2"],
    ["row1/0", "row1/1", "row1/2"],
    ["row2/0", "row2/1", "row2/2"],
  ]

  expect(df.values).toStrictEqual(newValuesShouldBe)
})

test("tests DataFrame missing value dropping", () => {
  const df = new DataFrame([
    [0, null],
    [1, "foo"],
    [2, "bar"],
    [3, null],
    [4, null],
    [null, "uh-oh"],
  ])

  expect(df.dropMissing().shape).toStrictEqual([2, 2])
  expect(df.dropMissing().index).toStrictEqual(["row1", "row2"])
  expect(df.dropMissing(1).isEmpty).toBe(true)
  expect(df.dropMissing(1, "all").shape).toStrictEqual(df.shape)
  expect(df.dropMissing(1, null, 4).shape).toStrictEqual(df.shape)
  expect(df.dropMissing(1, null, 3).shape).toStrictEqual([6, 1])
  expect(df.dropMissing(1, null, 1).isEmpty).toBe(true)
})

test("tests DataFrame NaN value dropping", () => {
  const df = new DataFrame([
    [0, null, NaN],
    [1, "foo", 234],
    [-10, -20, -30],
    [2, "bar", true],
    [3, null, 3.5],
    [4, null, -3.75],
    [null, "uh-oh", Infinity],
    [1, 2, 3],
    [NaN, NaN, NaN],
  ])

  expect(df.dropNaN(0, "any").values).toStrictEqual([
    [-10, -20, -30],
    [1, 2, 3],
  ])

  expect(df.dropNaN(0, "any").index).toStrictEqual(["row2", "row7"])
  expect(df.dropNaN(0, "any").columns).toStrictEqual(df.columns)

  expect(df.dropNaN(0, "all").values).toStrictEqual([
    [0, null, NaN],
    [1, "foo", 234],
    [-10, -20, -30],
    [2, "bar", true],
    [3, null, 3.5],
    [4, null, -3.75],
    [null, "uh-oh", Infinity],
    [1, 2, 3],
  ])

  expect(df.dropNaN(0, "all").index).toStrictEqual(
    df.index.slice(0, df.index.length - 1)
  )
  expect(df.dropNaN(0, "all").columns).toStrictEqual(df.columns)

  expect(df.dropNaN(0, null, 2).values).toStrictEqual([
    [1, "foo", 234],
    [-10, -20, -30],
    [3, null, 3.5],
    [4, null, -3.75],
    [1, 2, 3],
  ])

  expect(df.dropNaN(0, null, 2).index).toStrictEqual([
    "row1",
    "row2",
    "row4",
    "row5",
    "row7",
  ])

  expect(df.dropNaN(0, null, 2).columns).toStrictEqual(df.columns)

  expect(df.dropNaN(1, "any").isEmpty).toBe(true)
  expect(df.dropNaN(1, "all").values).toStrictEqual(df.values)
  expect(df.dropNaN(1, null, 3).values).toStrictEqual(
    flatten([[0], [1], [-10], [2], [3], [4], [null], [1], [NaN]])
  )
})

test("tests DataFrame sorting", () => {
  const x = new DataFrame([
    [5, 6, 4, 1, 6, 7, 2, 8, 6, 1],
    [3, 8, 9, 6, 10, 1, 8, 5, 9, 6],
    [5, 7, 3, 4, 1, 2, 8, 4, 6, 4],
    [6, 8, 2, 4, 4, 8, 2, 8, 7, 4],
    [3, 3, 7, 5, 1, 8, 9, 2, 6, 8],
    [1, 5, 7, 7, 7, 1, 0, 9, 8, 5],
    [10, 8, 0, 4, 4, 8, 4, 2, 5, 3],
    [9, 2, 6, 0, 10, 6, 3, 5, 10, 8],
    [4, 9, 1, 4, 9, 4, 8, 9, 6, 7],
    [3, 3, 1, 2, 5, 5, 8, 5, 3, 2],
  ])

  const sortedXValues = [
    [3, 8, 9, 6, 10, 1, 8, 5, 9, 6],
    [9, 2, 6, 0, 10, 6, 3, 5, 10, 8],
    [4, 9, 1, 4, 9, 4, 8, 9, 6, 7],
    [1, 5, 7, 7, 7, 1, 0, 9, 8, 5],
    [5, 6, 4, 1, 6, 7, 2, 8, 6, 1],
    [3, 3, 1, 2, 5, 5, 8, 5, 3, 2],
    [6, 8, 2, 4, 4, 8, 2, 8, 7, 4],
    [10, 8, 0, 4, 4, 8, 4, 2, 5, 3],
    [5, 7, 3, 4, 1, 2, 8, 4, 6, 4],
    [3, 3, 7, 5, 1, 8, 9, 2, 6, 8],
  ]

  const sortedX = x.sort(["col4", "col5", "col1"], [false, true, false])
  expect(sortedX.values).toStrictEqual(sortedXValues)

  expect(sortedX.index).toStrictEqual([
    "row1",
    "row7",
    "row8",
    "row5",
    "row0",
    "row9",
    "row3",
    "row6",
    "row2",
    "row4",
  ])

  expect(sortedX.columns).toStrictEqual([
    "col0",
    "col1",
    "col2",
    "col3",
    "col4",
    "col5",
    "col6",
    "col7",
    "col8",
    "col9",
  ])
})

test("tests DataFrame filtering", () => {
  const x = new DataFrame({
    foo: [2, 3, 4],
    bar: [10, 100, 1000],
    baz: [0, 0, 0],
  })

  // test row filtering (that returns a dataframe)
  const f1 = x.filter(row => row.values.every(v => v % 2 === 0))
  expect(f1.shape).toStrictEqual([2, 3])
  expect(sort(f1.columns)).toStrictEqual(["bar", "baz", "foo"])
  expect(sort(f1.index)).toStrictEqual(["row0", "row2"])
  expect(isEqual(sort(flatten(f1.values)), [0, 0, 2, 4, 10, 1000])).toBe(true)

  // test row filtering (that returns a series)
  const f2 = x.filter(row => {
    return row.name === "row1"
  })

  expect(f2 instanceof Series).toBe(true)
  expect(f2.name).toBe("row1")
  expect(sort(f2.index)).toStrictEqual(["bar", "baz", "foo"])
  expect(isEqual(sort(f2.values), [0, 3, 100])).toBe(true)

  // test column filtering (that returns a dataframe)
  const f3 = x.filter(col => sum(col.values) < 1000, 1)

  expect(f3.shape).toStrictEqual([3, 2])
  expect(sort(f3.columns)).toStrictEqual(["baz", "foo"])
  expect(sort(f3.index)).toStrictEqual(["row0", "row1", "row2"])
  expect(sort(flatten(f3.values))).toStrictEqual([0, 0, 0, 2, 3, 4])

  // test column filtering (that returns a series)
  const f4 = x.filter(col => {
    return col.name === "baz"
  }, 1)

  expect(f4 instanceof Series).toBe(true)
  expect(f4.name).toBe("baz")
  expect(sort(f4.index)).toStrictEqual(["row0", "row1", "row2"])
  expect(sort(f4.values)).toStrictEqual([0, 0, 0])
})

test("tests DataFrame one-hot encoding", () => {
  const x = new DataFrame({
    favoriteIceCream: [
      "chocolate",
      "strawberry",
      "strawberry",
      "chocolate",
      "chocolate",
      "vanilla",
      "chocolate",
      "rocky road",
    ],

    randomNumber: [7, 3, 4, 7, 2, 1, 6, 7],
  })

  const yPred = x.getDummies(["favoriteIceCream", "randomNumber"])

  const yTrue = new DataFrame({
    favoriteIceCream_chocolate: [1, 0, 0, 1, 1, 0, 1, 0],
    favoriteIceCream_rockyRoad: [0, 0, 0, 0, 0, 0, 0, 1],
    favoriteIceCream_strawberry: [0, 1, 1, 0, 0, 0, 0, 0],
    favoriteIceCream_vanilla: [0, 0, 0, 0, 0, 1, 0, 0],

    randomNumber_1: [0, 0, 0, 0, 0, 1, 0, 0],
    randomNumber_2: [0, 0, 0, 0, 1, 0, 0, 0],
    randomNumber_3: [0, 1, 0, 0, 0, 0, 0, 0],
    randomNumber_4: [0, 0, 1, 0, 0, 0, 0, 0],
    randomNumber_6: [0, 0, 0, 0, 0, 0, 1, 0],
    randomNumber_7: [1, 0, 0, 1, 0, 0, 0, 1],
  })

  expect(isEqual(yPred, yTrue.get(null, sort(yTrue.columns)))).toBe(true)

  expect(isEqual(yPred, x.getDummies().get(null, sort(yPred.columns)))).toBe(
    true
  )

  const favoriteIceCreamColumns = sort(
    yTrue.columns.filter(c => c.includes("favoriteIceCream"))
  )
  const randomNumberColumns = sort(
    yTrue.columns.filter(c => c.includes("randomNumber"))
  )

  expect(
    isEqual(
      x.getDummies("favoriteIceCream").get(null, favoriteIceCreamColumns),
      yTrue.get(null, favoriteIceCreamColumns)
    )
  ).toBe(true)

  expect(
    isEqual(
      x.getDummies("randomNumber").get(null, randomNumberColumns),
      yTrue.get(null, randomNumberColumns)
    )
  ).toBe(true)
})

test("tests appending a single vector to a DataFrame", () => {
  const a = new DataFrame({ foo: [2, 3, 4], bar: [5, 6, 7] })
  const b = [10, 20, 30, 40]
  const c = a.append(b)
  const d = a.append(b, 1)

  expect(c.shape).toStrictEqual([4, 4])

  expect(
    isEqual(c.values, [
      [2, 5, undefined, undefined],
      [3, 6, undefined, undefined],
      [4, 7, undefined, undefined],
      [10, 20, 30, 40],
    ])
  ).toBe(true)

  expect(c.columns).toStrictEqual(["foo", "bar", "col2", "col3"])
  expect(c.index).toStrictEqual(["row0", "row1", "row2", "row3"])

  expect(d.shape).toStrictEqual([4, 3])

  expect(
    isEqual(d.values, [
      [2, 5, 10],
      [3, 6, 20],
      [4, 7, 30],
      [undefined, undefined, 40],
    ])
  ).toBe(true)

  expect(d.columns).toStrictEqual(["foo", "bar", "col2"])
  expect(d.index).toStrictEqual(["row0", "row1", "row2", "row3"])
})

test("tests appending a matrix to a DataFrame", () => {
  const a = new DataFrame({ foo: [2, 3, 4], bar: [5, 6, 7] })

  const b = [
    [10, 20, 30, 40],
    [50, 60, 70, 80],
  ]

  const c = a.append(b)
  const d = a.append(b, 1)

  expect(c.shape).toStrictEqual([5, 4])

  expect(
    isEqual(c.values, [
      [2, 5, undefined, undefined],
      [3, 6, undefined, undefined],
      [4, 7, undefined, undefined],
      [10, 20, 30, 40],
      [50, 60, 70, 80],
    ])
  ).toBe(true)

  expect(c.columns).toStrictEqual(["foo", "bar", "col2", "col3"])
  expect(c.index).toStrictEqual(["row0", "row1", "row2", "row3", "row4"])

  expect(d.shape).toStrictEqual([3, 6])

  expect(
    isEqual(d.values, [
      [2, 5, 10, 20, 30, 40],
      [3, 6, 50, 60, 70, 80],
      [4, 7, undefined, undefined, undefined, undefined],
    ])
  ).toBe(true)

  expect(d.columns).toStrictEqual([
    "foo",
    "bar",
    "col2",
    "col3",
    "col4",
    "col5",
  ])

  expect(d.index).toStrictEqual(["row0", "row1", "row2"])
})

test("tests appending a Series to a DataFrame", () => {
  const a = new DataFrame({ foo: [2, 3, 4], bar: [5, 6, 7] })
  const b = new Series([10, 20, 30, 40])
  b.name = "bee"

  const c = a.append(b)
  const d = a.append(b, 1)

  expect(c.shape).toStrictEqual([4, 4])

  expect(
    isEqual(c.values, [
      [2, 5, undefined, undefined],
      [3, 6, undefined, undefined],
      [4, 7, undefined, undefined],
      [10, 20, 30, 40],
    ])
  ).toBe(true)

  expect(c.columns).toStrictEqual(["foo", "bar", "col2", "col3"])
  expect(c.index).toStrictEqual(["row0", "row1", "row2", "bee"])

  expect(d.shape).toStrictEqual([4, 3])

  expect(
    isEqual(d.values, [
      [2, 5, 10],
      [3, 6, 20],
      [4, 7, 30],
      [undefined, undefined, 40],
    ])
  ).toBe(true)

  expect(d.columns).toStrictEqual(["foo", "bar", "bee"])
  expect(d.index).toStrictEqual(["row0", "row1", "row2", "row3"])
})

test("tests appending a DataFrame to a DataFrame", () => {
  const a = new DataFrame({ foo: [2, 3, 4], bar: [5, 6, 7] })

  const b = new DataFrame([
    [10, 20, 30, 40],
    [50, 60, 70, 80],
  ])

  b.columns[1] = "bar"
  b.index[0] = "beeRow0"

  const c = a.append(b)
  const d = a.append(b, 1)

  expect(c.shape).toStrictEqual([5, 5])

  expect(
    isEqual(c.values, [
      [2, 5, undefined, undefined, undefined],
      [3, 6, undefined, undefined, undefined],
      [4, 7, undefined, undefined, undefined],
      [undefined, 20, 10, 30, 40],
      [undefined, 60, 50, 70, 80],
    ])
  ).toBe(true)

  expect(c.columns).toStrictEqual(["foo", "bar", "col0", "col2", "col3"])

  expect(d.shape).toStrictEqual([4, 6])

  expect(
    isEqual(d.values, [
      [2, 5, undefined, undefined, undefined, undefined],
      [3, 6, 50, 60, 70, 80],
      [4, 7, undefined, undefined, undefined, undefined],
      [undefined, undefined, 10, 20, 30, 40],
    ])
  ).toBe(true)

  expect(d.index).toStrictEqual(["row0", "row1", "row2", "beeRow0"])
})

test("tests DataFrame dimensions", () => {
  const x = new DataFrame(normal([100, 25]))
  expect(x.length).toBe(100)
  expect(x.width).toBe(25)
})
