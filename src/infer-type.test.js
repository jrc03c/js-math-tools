const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random")
const inferType = require("./infer-type")
const isEqual = require("./is-equal")
const normal = require("./normal")
const range = require("./range")

function makeKey(n) {
  const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
  let out = ""

  while (out.length < n) {
    out += alpha[parseInt(Math.random() * alpha.length)]
  }

  return out
}

test("correctly infers a variety of data types from strings", () => {
  const a = ["2", "3", "4.567"]

  const bTrue = {
    type: "number",
    values: a.map(v => parseFloat(v)),
    isInteger: false,
  }

  const bPred = inferType(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const bTrue2 = {
    type: "number",
    values: a.map(v => parseInt(v)),
    isInteger: true,
  }

  const bPred2 = inferType(a.map(v => v.split(".")[0]))
  expect(isEqual(bPred2, bTrue2)).toBe(true)

  const c = ["true", "True", "TRUE", "false", "False", "FALSE", "yes", "no"]

  const dTrue = {
    type: "boolean",
    values: [true, true, true, false, false, false, true, false],
  }

  const dPred = inferType(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = range(0, 10).map(() => {
    const d = new Date()
    const r = random()

    if (r < 0.33) {
      return d.toJSON()
    } else if (r < 0.67) {
      return d.toLocaleDateString()
    } else {
      return d.toString()
    }
  })

  const fTrue = { type: "date", values: e.map(v => new Date(v)) }
  const fPred = inferType(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = range(0, 10).map(() => JSON.stringify({ hello: Math.random() }))
  const hTrue = { type: "object", values: g.map(v => JSON.parse(v)) }
  const hPred = inferType(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = ["null", "NaN", "None", "undefined", ""]
  const jTrue = { type: "null", values: i.map(() => null) }
  const jPred = inferType(i)
  expect(isEqual(jPred, jTrue)).toBe(true)

  const k = range(0, 10).map(() => makeKey(8))
  const lTrue = { type: "string", values: k }
  const lPred = inferType(k)
  expect(isEqual(lPred, lTrue)).toBe(true)

  const m = new Series({ hello: normal(100) })
  const n = m.apply(v => v.toString())
  const oTrue = { type: "number", values: m, isInteger: false }
  const oPred = inferType(n)
  expect(isEqual(oPred, oTrue)).toBe(true)

  const p = [
    "true",
    "foobar",
    "234",
    "5.67",
    "false",
    "FALSE",
    "False",
    "TRUE",
    "yes",
    "YES",
    "NO",
  ]

  const qTrue = {
    type: "boolean",

    values: [
      true,
      null,
      null,
      null,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
    ],
  }

  const qPred = inferType(p)
  expect(isEqual(qPred, qTrue)).toBe(true)

  const r = new DataFrame({ foo: [2, "3", 4], bar: [5, 6, "seven"] })

  const sTrue = {
    type: "number",
    values: new DataFrame({ foo: [2, 3, 4], bar: [5, 6, NaN] }),
    isInteger: true,
  }

  const sPred = inferType(r)
  expect(isEqual(sPred, sTrue)).toBe(true)

  const wrongs = [
    Symbol.for("Hello, world!"),
    x => x,
    function (x) {
      return x
    },
  ]

  wrongs.forEach(item => {
    expect(() => inferType(item)).toThrow()
  })
})

test("tests that values that are already in their target type are not changed", () => {
  // types = ["boolean", "date", "null", "number", "object", "string"]
  expect(isEqual(inferType(true), { type: "boolean", value: true })).toBe(true)

  expect(isEqual(inferType(false), { type: "boolean", value: false })).toBe(
    true
  )

  const d = new Date()
  expect(isEqual(inferType(d), { type: "date", value: d })).toBe(true)

  expect(isEqual(inferType(null), { type: "null", value: null })).toBe(true)

  expect(isEqual(inferType(undefined), { type: "null", value: null })).toBe(
    true
  )

  expect(
    isEqual(inferType(234), { type: "number", value: 234, isInteger: true })
  ).toBe(true)

  expect(
    isEqual(inferType({ hello: "world" }), {
      type: "object",
      value: { hello: "world" },
    })
  ).toBe(true)

  expect(
    isEqual(inferType("foobar"), { type: "string", value: "foobar" })
  ).toBe(true)
})

test("tests the special, weird case of inferType(0), which was previously throwing an error", () => {
  const results = inferType(0)
  expect(results.type).toBe("number")
  expect(results.value).toBe(0)
  expect(results.isInteger).toBe(true)
})
