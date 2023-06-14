const { random } = require("./random")
const abs = require("./abs")
const cast = require("./cast")
const int = require("./int")
const isEqual = require("./is-equal")
const max = require("./max")
const normal = require("./normal")
const range = require("./range")

test("tests that both individual values and arrays can be cast", () => {
  // types = ["boolean", "date", "null", "number", "object", "string"]

  const date = new Date()

  expect(cast("true", "boolean")).toBe(true)
  expect(isEqual(cast(date.toJSON(), "date"), date)).toBe(true)
  expect(cast("undefined", "null")).toBe(null)
  expect(cast("234.567", "number")).toBe(234.567)
  expect(isEqual(cast(`{"foo": "bar"}`, "object"), { foo: "bar" })).toBe(true)
  expect(cast(234, "string")).toBe("234")
})

test("tests that the `cast` function correctly casts values into their specified data types", () => {
  // types = ["boolean", "date", "null", "number", "object", "string"]

  // booleans
  const bTrue = []

  const a = range(0, 100).map(() => {
    // true values
    if (random() < 0.5) {
      const possibleValues = [
        true,
        "true",
        "True",
        "TRUE",
        "yes",
        "YES",
        "Yes",
        "Y",
        "y",
      ]

      bTrue.push(true)
      return possibleValues[int(random() * possibleValues.length)]
    }

    // false values
    else {
      const possibleValues = [
        false,
        "false",
        "False",
        "FALSE",
        "no",
        "NO",
        "No",
        "N",
        "n",
      ]

      bTrue.push(false)
      return possibleValues[int(random() * possibleValues.length)]
    }
  })

  const bPred = cast(a, "boolean")
  expect(isEqual(bPred, bTrue)).toBe(true)

  // dates
  const dTrue = []

  const c = range(0, 100).map(() => {
    const date = new Date(int(random() * new Date().getTime()))
    dTrue.push(date)
    const r = random()

    if (r < 0.33) {
      return date.toJSON()
    } else if (r < 0.67) {
      return date.toLocaleDateString()
    } else {
      return date.toString()
    }
  })

  const dPred = cast(c, "date")
  const twentyFourHours = 24 * 60 * 60 * 1000
  const dDiff = dTrue.map((v1, i) => v1 - dPred[i])
  expect(max(abs(dDiff))).toBeLessThan(twentyFourHours)

  // nulls
  const e = range(0, 100).map(() => {
    const possibleValues = [
      "null",
      "none",
      "nan",
      "na",
      "n/a",
      "",
      "undefined",
      null,
      undefined,
    ]

    return possibleValues[int(random() * possibleValues.length)]
  })

  const fTrue = range(0, 100).map(() => null)
  const fPred = cast(e, "null")
  expect(isEqual(fPred, fTrue)).toBe(true)

  // numbers
  const hTrue = []

  const g = range(0, 100).map(() => {
    const r = normal() * 1000
    hTrue.push(r)
    return random() < 0.5 ? r : r.toString()
  })

  const hPred = cast(g, "number")
  expect(isEqual(hPred, hTrue)).toBe(true)

  // object
  const jTrue = []

  const i = range(0, 100).map(() => {
    const obj = {
      x: random(),
      y: random(),
    }

    jTrue.push(obj)
    return JSON.stringify(obj)
  })

  const jPred = cast(i, "object")
  expect(isEqual(jPred, jTrue)).toBe(true)

  // strings
  const k = range(0, 100).map(() => random().toString())
  const lTrue = k.map(v => v.toString())
  const lPred = cast(k, "string")
  expect(isEqual(lPred, lTrue)).toBe(true)
})

test("tests that missing values are correctly cast as null or NaN", () => {
  // types = ["boolean", "date", "null", "number", "object", "string"]

  // booleans
  const a = ["true", null, "false"]
  const bTrue = [true, null, false]
  const bPred = cast(a, "boolean")
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = [
    new Date(1234567890123).toJSON(),
    undefined,
    new Date(12345678901234).toJSON(),
  ]

  // dates
  const dTrue = [new Date(1234567890123), null, new Date(12345678901234)]
  const dPred = cast(c, "date")
  expect(isEqual(dPred, dTrue)).toBe(true)

  // nulls
  const e = [234, "hello", false]
  const fTrue = [null, null, null]
  const fPred = cast(e, "null")
  expect(isEqual(fPred, fTrue)).toBe(true)

  // numbers
  const g = ["234", "NaN", null, Infinity, "Infinity", "three"]
  const hTrue = [234, NaN, NaN, Infinity, Infinity, NaN]
  const hPred = cast(g, "number")
  expect(isEqual(hPred, hTrue)).toBe(true)

  // objects
  const i = [
    JSON.stringify({ hello: "world" }),
    "",
    undefined,
    JSON.stringify({ foo: "bar" }),
    null,
  ]

  const jTrue = [{ hello: "world" }, null, null, { foo: "bar" }, null]
  const jPred = cast(i, "object")
  expect(isEqual(jPred, jTrue)).toBe(true)

  // strings
  const k = [234, { hello: "world" }, "", undefined]
  const lTrue = ["234", JSON.stringify({ hello: "world" }), "", "undefined"]
  const lPred = cast(k, "string")
  expect(isEqual(lPred, lTrue)).toBe(true)
})

test("tests that values that are already in their target type are not changed", () => {
  // types = ["boolean", "date", "null", "number", "object", "string"]
  const date = new Date()

  expect(cast(true, "boolean")).toBe(true)
  expect(cast(false, "boolean")).toBe(false)
  expect(isEqual(cast(date, "date"), date)).toBe(true)
  expect(cast(null, "null")).toBe(null)
  expect(cast(undefined, "null")).toBe(null)
  expect(cast(234, "number")).toBe(234)

  expect(isEqual(cast({ hello: "world" }, "object"), { hello: "world" })).toBe(
    true
  )

  expect(cast("foobar", "string")).toBe("foobar")

  // I'm adding a special test case here because null dates were getting
  // converted to dates at the epoch start time.
  expect(cast(null, "date")).toBe(null)
})

test("tests that all types can be cast into all other types correctly", () => {
  // types = ["boolean", "date", "null", "number", "object", "string"]
  expect(isEqual(cast(true, "date"), null)).toBe(true)
  expect(isEqual(cast(false, "date"), null)).toBe(true)
  expect(isEqual(cast(true, "null"), null)).toBe(true)
  expect(isEqual(cast(false, "null"), null)).toBe(true)
  expect(isEqual(cast(true, "number"), 1)).toBe(true)
  expect(isEqual(cast(false, "number"), 0)).toBe(true)
  expect(isEqual(cast(true, "object"), null)).toBe(true)
  expect(isEqual(cast(false, "object"), null)).toBe(true)
  expect(isEqual(cast(true, "string"), "true")).toBe(true)
  expect(isEqual(cast(false, "string"), "false")).toBe(true)

  const now = new Date()
  expect(isEqual(cast(now, "boolean"), null)).toBe(true)
  expect(isEqual(cast(now, "null"), null)).toBe(true)
  expect(isEqual(cast(now, "number"), now.getTime())).toBe(true)
  expect(isEqual(cast(now, "object"), now)).toBe(true)
  expect(isEqual(cast(now, "string"), now.toJSON())).toBe(true)

  expect(isEqual(cast(null, "boolean"), null)).toBe(true)
  expect(isEqual(cast(null, "date"), null)).toBe(true)
  expect(isEqual(cast(null, "number"), NaN)).toBe(true)
  expect(isEqual(cast(null, "object"), null)).toBe(true)
  expect(isEqual(cast(null, "string"), "null")).toBe(true)

  expect(isEqual(cast(234.567, "boolean"), null)).toBe(true)
  expect(isEqual(cast(1, "boolean"), true)).toBe(true)
  expect(isEqual(cast(0, "boolean"), false)).toBe(true)
  expect(isEqual(cast(234.567, "date"), new Date(234))).toBe(true)
  expect(isEqual(cast(234.567, "null"), null)).toBe(true)
  expect(isEqual(cast(234.567, "object"), null)).toBe(true)
  expect(isEqual(cast(234.567, "string"), "234.567")).toBe(true)

  const obj = { name: "Alice", age: 23 }
  expect(isEqual(cast(obj, "boolean"), null)).toBe(true)
  expect(isEqual(cast(obj, "date"), null)).toBe(true)
  expect(isEqual(cast(obj, "null"), null)).toBe(true)
  expect(isEqual(cast(obj, "number"), NaN)).toBe(true)
  expect(isEqual(cast(obj, "string"), JSON.stringify(obj))).toBe(true)

  expect(isEqual(cast("Hello, world!", "boolean"), null)).toBe(true)
  expect(isEqual(cast("YES", "boolean"), true)).toBe(true)
  expect(isEqual(cast("no", "boolean"), false)).toBe(true)
  expect(isEqual(cast("Hello, world!", "date"), null)).toBe(true)
  expect(isEqual(cast("Hello, world!", "null"), null)).toBe(true)
  expect(isEqual(cast("Hello, world!", "number"), NaN)).toBe(true)
  expect(isEqual(cast(now.toJSON(), "number"), now.getTime())).toBe(true)
  expect(isEqual(cast("234.567", "number"), 234.567)).toBe(true)
  expect(isEqual(cast("234.567", "object"), null)).toBe(true)
  expect(isEqual(cast("Hello, world!", "object"), null)).toBe(true)
  expect(isEqual(cast("true", "object"), null)).toBe(true)
  expect(isEqual(cast(now.toJSON(), "object"), now)).toBe(true)
  expect(isEqual(cast("null", "object"), null)).toBe(true)
  expect(isEqual(cast("undefined", "object"), null)).toBe(true)
  expect(isEqual(cast(JSON.stringify(obj), "object"), obj)).toBe(true)
})
