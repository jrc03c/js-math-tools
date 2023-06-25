const { DataFrame, Series } = require("./dataframe")
const findAll = require("./find-all")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const isObject = require("./is-object")
const normal = require("./normal")

function makeKey(n) {
  const alpha = "1234567890abcdef"
  let out = ""
  while (out.length < n) out += alpha[parseInt(Math.random() * alpha.length)]
  return out
}

test("tests that all items matching a certain function can be found", () => {
  const a = [1, 2, 3, 4, 5, 6]
  const bTrue = [2, 4, 6]
  const bPred = findAll(a, v => v % 2 === 0)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal(100)
  const dTrue = c.filter(v => v > 0)
  const dPred = findAll(c, v => v > 0)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = normal([5, 5, 5, 5])
  const fTrue = flatten(e).filter(v => v < 0)
  const fPred = findAll(e, v => v < 0)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new Series({
    hello: normal(100).map(v => (Math.random() < 0.5 ? makeKey(8) : v)),
  })

  const hTrue = g.values.filter(v => typeof v === "string")
  const hPred = findAll(g, v => typeof v === "string")
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = new DataFrame({
    foo: normal(100).map(v => (Math.random() < 0.5 ? { hello: "world" } : v)),
    bar: normal(100),
  })

  const jTrue = flatten(i.values).filter(v => isObject(v))
  const jPred = findAll(i, v => isObject(v))
  expect(isEqual(jPred, jTrue)).toBe(true)

  const k = { a: { b: { c: [2, null, "foo"] } } }
  const lTrue = [2]
  const lPred = findAll(k, v => typeof v === "number")
  expect(isEqual(lPred, lTrue)).toBe(true)

  const m = [[[2, 3, 4], 2, 3, 4], 2, 3, 4]
  const nTrue = [3, 3, 3]
  const nPred = findAll(m, 3)
  expect(isEqual(nPred, nTrue)).toBe(true)

  const o = { a: { b: { c: { [Symbol.for("hello")]: "world" } } } }
  const pTrue = ["world"]

  const pPred = findAll(o, v => {
    try {
      return v.startsWith("w")
    } catch (e) {
      return false
    }
  })

  expect(isEqual(pPred, pTrue)).toBe(true)

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
    expect(() => findAll(item, () => true)).toThrow()
  })

  wrongs.forEach(item1 => {
    wrongs.forEach(item2 => {
      expect(() => findAll(item1, item2)).toThrow()
    })
  })
})
