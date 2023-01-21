const { DataFrame, Series } = require("./dataframe")
const abs = require("./abs")
const isEqual = require("./is-equal")
const normal = require("./normal")

test("tests that absolute values can be computed correctly", () => {
  const x = normal(100)
  const y = normal(100)
  const z = normal(100)

  const xPos = x.map(v => Math.abs(v))
  const yPos = y.map(v => Math.abs(v))
  const zPos = z.map(v => Math.abs(v))

  const rights = [
    [0, 0],
    [1, 1],
    [2.3, 2.3],
    [-2.3, 2.3],
    [Infinity, Infinity],
    [-Infinity, Infinity],
    [
      [2, -3, 4],
      [2, 3, 4],
    ],
    [
      [
        [-2, 3, -4],
        [5, -6, 7],
      ],
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
    ],
    [new Series({ stuff: x }), new Series({ stuff: xPos })],
    [new DataFrame({ x, y, z }), new DataFrame({ x: xPos, y: yPos, z: zPos })],
  ]

  rights.forEach(pair => {
    expect(isEqual(abs(pair[0]), pair[1]))
  })

  const wrongs = [
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
    expect(abs(v)).toBeNaN()
  })
})
