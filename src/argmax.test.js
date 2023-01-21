const { DataFrame, Series } = require("./dataframe")
const argmax = require("./argmax")
const normal = require("./normal")
const range = require("./range")
const shuffle = require("./shuffle")

test("gets the argmax of various kinds of containers", () => {
  const a = shuffle(range(0, 100))
  expect(argmax(a)).toStrictEqual(a.indexOf(99))

  const b = normal([50, 50])
  let maxRow = 0
  let maxCol = 0
  let max = -Infinity

  b.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v > max) {
        max = v
        maxRow = i
        maxCol = j
      }
    })
  })

  expect(argmax(b)).toStrictEqual([maxRow, maxCol])

  const c = new Series(normal(100))

  expect(argmax(c)).toStrictEqual([
    c.index[c.values.indexOf(Math.max(...c.values))],
  ])

  const d = new DataFrame(normal([50, 50]))
  maxRow = 0
  maxCol = 0
  max = -Infinity

  d.values.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v > max) {
        max = v
        maxRow = i
        maxCol = j
      }
    })
  })

  expect(argmax(d)).toStrictEqual([d.index[maxRow], d.columns[maxCol]])

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
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
  ]

  wrongs.forEach(v => {
    expect(() => argmax(v)).toThrow()
  })
})
