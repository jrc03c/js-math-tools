const exp = require("./exp.js")
const normal = require("./normal.js")
const apply = require("./apply.js")

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
    expect(exp(pair[0])).toStrictEqual(pair[1])
  })

  const wrongs = ["foo", true, false, null, undefined, {}, () => {}]

  wrongs.forEach(item => {
    expect(exp(item)).toBeNaN()
  })
})
