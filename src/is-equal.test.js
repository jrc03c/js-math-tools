const isEqual = require("./is-equal.js")

test("tests equality of primitives", () => {
  expect(isEqual(2, 2)).toBe(true)
  expect(isEqual(-3.5, -3.5)).toBe(true)
  expect(isEqual("foo", "foo")).toBe(true)
  expect(isEqual(true, true)).toBe(true)
  expect(isEqual(false, false)).toBe(true)
  expect(isEqual({}, {})).toBe(true)
  expect(isEqual(undefined, undefined)).toBe(true)
  expect(isEqual(null, null)).toBe(true)
})

test("tests equality of complex objects", () => {
  expect(isEqual({ x: 5 }, { x: 5 })).toBe(true)
  expect(isEqual([2, 3, 4], [2, 3, 4])).toBe(true)

  const fn = () => {}
  expect(isEqual(fn, fn)).toBe(true)

  const a = { name: "James", friends: ["Bill", "Sally"] }
  const b = { name: "James", friends: ["Bill", "Sally"] }
  expect(isEqual(a, b)).toBe(true)
})

test("tests inequality", () => {
  const others = [
    2,
    -3.5,
    "foo",
    true,
    false,
    {},
    undefined,
    null,
    { x: 5 },
    [2, 3, 4],
    { name: "James", friends: ["Bill", "Sally"] },
  ]

  for (let i = 0; i < others.length - 1; i++) {
    for (let j = i; j < others.length; j++) {
      if (i !== j) {
        a = others[i]
        b = others[j]
        expect(isEqual(a, b)).toBe(false)
      }
    }
  }
})
