const { DataFrame, Series } = require("./dataframe")
const indexOf = require("./index-of")
const isEqual = require("./is-equal")
const normal = require("./normal")
const range = require("./range")
const reshape = require("./reshape")

test("tests that the indices of items can be found correctly", () => {
  expect(indexOf([2, 3, 4], 3)).toStrictEqual([1])
  expect(indexOf([2, 3, 4], v => v % 4 === 0)).toStrictEqual([2])

  const a = reshape(range(0, 100), [10, 10])
  const bTrue = [3, 7]
  const bPred = indexOf(a, 37)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal([2, 3, 4, 5])
  expect(indexOf(c, v => v < 0).length).toBe(4)

  const d = new Series({ hello: normal(100) })
  expect(typeof indexOf(d, v => v < 0)[0]).toBe("string")

  const e = new DataFrame({ foo: [2, 3, 4, 5, 6], bar: [7, 8, 9, 10, 11] })

  const fTrue = ["row3", "bar"]
  const fPred = indexOf(e, 10)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = { a: { b: { c: { d: "hello" } } } }
  const hTrue = ["a", "b", "c", "d"]
  const hPred = indexOf(g, "hello")
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = { baz: { bar: { foo: { [Symbol.for("hello")]: "world" } } } }
  const jTrue = ["baz", "bar", "foo", Symbol.for("hello")]
  const jPred = indexOf(i, "world")
  expect(isEqual(jTrue, jPred)).toBe(true)

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)
  expect(indexOf(selfReferencer, 4)).toStrictEqual([2])

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
  ]

  wrongs.forEach(item => {
    expect(() => indexOf(item, () => true)).toThrow()
  })
})
