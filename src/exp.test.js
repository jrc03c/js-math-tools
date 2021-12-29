const exp = require("./exp.js")
const normal = require("./normal.js")
const apply = require("./apply.js")
const distance = require("./distance.js")
const product = require("./product.js")
const shape = require("./shape.js")

test("", () => {
  const x = normal([2, 3, 4, 5])
  const y = apply(x, v => Math.pow(Math.E, v))

  const rights = [
    [0, 1],
    [-1, 1 / Math.E],
    [2, Math.E * Math.E],
    [
      [2, 3, 4],
      [Math.pow(Math.E, 2), Math.pow(Math.E, 3), Math.pow(Math.E, 4)],
    ],
    [x, y],
  ]

  rights.forEach(pair => {
    expect(
      distance(exp([pair[0]]), [pair[1]]) / product(shape([pair[0]]))
    ).toBeLessThan(1e-5)
  })

  const wrongs = ["foo", true, false, null, undefined, {}, () => {}]

  wrongs.forEach(item => {
    expect(exp(item)).toBeNaN()
  })
})
