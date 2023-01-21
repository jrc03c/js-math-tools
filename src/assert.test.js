const assert = require("./assert")

test("asserts a true statement", () => {
  expect(assert(true, "Yay!")).toBe(undefined)
})

test("throws an error when asserting a false statement", () => {
  expect(() => {
    assert(false, "Uh-oh!")
  }).toThrow()
})
