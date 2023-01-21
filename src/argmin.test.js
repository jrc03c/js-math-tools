const { DataFrame, Series } = require("./dataframe")
const argmin = require("./argmin")
const normal = require("./normal")
const range = require("./range")
const shuffle = require("./shuffle")

test("gets the argmin of various kinds of containers", () => {
  const a = shuffle(range(0, 100))
  expect(argmin(a)).toStrictEqual(a.indexOf(0))

  const b = normal([50, 50])
  let minRow = 0
  let minCol = 0
  let min = Infinity

  b.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v < min) {
        min = v
        minRow = i
        minCol = j
      }
    })
  })

  expect(argmin(b)).toStrictEqual([minRow, minCol])

  const c = new Series(normal(100))

  expect(argmin(c)).toStrictEqual([
    c.index[c.values.indexOf(Math.min(...c.values))],
  ])

  const d = new DataFrame(normal([50, 50]))
  minRow = 0
  minCol = 0
  min = Infinity

  d.values.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v < min) {
        min = v
        minRow = i
        minCol = j
      }
    })
  })

  expect(argmin(d)).toStrictEqual([d.index[minRow], d.columns[minCol]])

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
    expect(() => argmin(v)).toThrow()
  })
})
