const isFunction = require("./is-function.js")

class Foo {
  static tryThis() {}
  doSomething() {}
}

test("checks to see if various things are functions", () => {
  expect(isFunction(() => {})).toBe(true)
  expect(isFunction(isFunction)).toBe(true)
  expect(isFunction(function () {})).toBe(true)
  expect(isFunction(Foo.tryThis)).toBe(true)
  expect(isFunction(new Foo().doSomething)).toBe(true)

  expect(isFunction(true)).toBe(false)
  expect(isFunction(false)).toBe(false)
  expect(isFunction([1, 2, 3])).toBe(false)
  expect(isFunction("foo")).toBe(false)
  expect(isFunction(234)).toBe(false)
  expect(isFunction({})).toBe(false)
  expect(isFunction(null)).toBe(false)
  expect(isFunction(undefined)).toBe(false)
})
