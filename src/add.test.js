const { DataFrame, Series } = require("./dataframe")
const add = require("./add")
const isEqual = require("./is-equal")
const normal = require("./normal")
const print = require("./print")

test("tests that values can be added together correctly", () => {
  const a = normal(100)
  const b = normal(100)
  const cTrue = a.map((v, i) => v + b[i])

  const d = new Series({ d: normal(100) })
  const e = normal(100)
  const fTrue = new Series({ d: d.values.map((v, i) => v + e[i]) })

  const g = new Series({ g: normal(100) })
  const h = new Series({ h: normal(100) })
  const iTrue = new Series({ data: g.values.map((v, i) => v + h.values[i]) })

  const j = new DataFrame({ j1: normal(100), j2: normal(100) })
  const k = normal([100, 2])

  const lTrue = new DataFrame({
    j1: j.get("j1").values.map((v, i) => v + k[i][0]),
    j2: j.get("j2").values.map((v, i) => v + k[i][1]),
  })

  const m = new DataFrame({ m1: normal(100), m2: normal(100) })
  const n = new DataFrame({ n1: normal(100), n2: normal(100) })

  const oTrue = new DataFrame({
    col0: m.get("m1").values.map((v, i) => v + n.values[i][0]),
    col1: m.get("m2").values.map((v, i) => v + n.values[i][1]),
  })

  const rights = [
    [2, 3, 5],
    [-5.7, 5.7, 0],
    [Infinity, -Infinity, NaN],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      [
        [20, 30, 40],
        [50, 60, 70],
      ],
      [
        [22, 33, 44],
        [55, 66, 77],
      ],
    ],
    [
      [2, "three", 4],
      [5, 6, Symbol.for("seven")],
      [7, NaN, NaN],
    ],
    [a, b, cTrue],
    [b, a, cTrue],
    [d, e, fTrue],
    [e, d, fTrue],
    [g, h, iTrue],
    [h, g, iTrue],
    [j, k, lTrue],
    [k, j, lTrue],
    [m, n, oTrue],
    [n, m, oTrue],
  ]

  rights.forEach(trio => {
    const [a, b, cTrue] = trio
    const cPred = add(a, b)

    if (!isEqual(cPred, cTrue)) {
      print(cPred)
      print(cTrue)
    }

    expect(isEqual(cPred, cTrue)).toBe(true)
  })

  const wrongs = [
    [234, NaN],
    ["foo", "bar"],
    [true, false],
    [null, undefined],
    [Symbol.for("Hello, world!"), Symbol.for("Goodbye, world!")],
    [x => x, x => 2 * x],
    [
      function (x) {
        return x
      },
      function (x) {
        return 2 * x
      },
    ],
    [{ hello: "world" }, { goodbye: "world" }],
  ]

  wrongs.forEach(pair => {
    expect(add(pair[0], pair[1])).toBeNaN()
  })
})
