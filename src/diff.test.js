const { DataFrame, Series } = require("./dataframe")
const diff = require("./diff")
const isEqual = require("./is-equal")
const range = require("./range")
const reshape = require("./reshape")
const shuffle = require("./shuffle")
const sort = require("./sort")

test("tests that the differences of sets can be computed correctly", () => {
  const a = [2, 3, 4]
  const b = [3, 4, 5]
  expect(isEqual(diff(a, b), [2])).toBe(true)

  const c = [2, [3, [4, [5, [6]]]]]
  const d = [[[[2, 3, 4]]], [8, 9, 10]]
  expect(isEqual(diff(c, d), [5, 6])).toBe(true)

  const e = new Series({ foo: [2, 3, 4, 5, 6] })
  const f = new Series([4, 5, 6])
  expect(isEqual(diff(e, f), [2, 3])).toBe(true)

  const g = new DataFrame(reshape(shuffle(range(0, 100)), [10, 10]))
  const h = reshape(shuffle(range(-5, 95)), [2, 5, 5, 2])
  expect(isEqual(sort(diff(g, h)), [95, 96, 97, 98, 99])).toBe(true)

  expect(diff([undefined], [undefined])).toStrictEqual([])

  const wrongs = [
    [0, 1],
    [2.3, -2.3],
    [Infinity, -Infinity],
    [NaN, "foo"],
    [true, false],
    [null, undefined],
    [Symbol.for("Hello, world!"), x => x],
    [
      function (x) {
        return x
      },
      { hello: "world" },
    ],
  ]

  wrongs.forEach(pair => {
    expect(() => diff(pair[0], pair[1])).toThrow()
  })

  const variables = [
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
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  let temp = []

  variables.forEach(v => {
    range(0, Math.random() * 10 + 5).forEach(() => {
      temp.push(v)
    })
  })

  temp = shuffle(temp)
  expect(diff(temp, variables)).toStrictEqual([])
})
