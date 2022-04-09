const find = require("./find.js")
const range = require("./range.js")
const reshape = require("./reshape.js")

test("tests that items can be found in nested arrays using values", () => {
  const a = [2, 3, 4]
  expect(find(a, 4)).toBe(4)

  const b = reshape(range(0, 24), [2, 3, 4])
  expect(find(b, 13)).toBe(13)
})

test("tests that items can be found in nested arrays using functions", () => {
  const a = [2, 3, 4]
  expect(find(a, v => v > 3)).toBe(4)

  const b = reshape(range(0, 24), [2, 3, 4])
  expect(find(b, v => v > 12 && v < 14)).toBe(13)
})

test("tests that arrays and non-arrays can both be found in nested arrays", () => {
  const x = ["foobar", [1, 2, 3, 4, 5], "hello", ["a", "b", "c"]]

  expect(find(x, v => v.length > 5)).toBe("foobar")
  expect(find(x, v => v.length === 5)).toStrictEqual([1, 2, 3, 4, 5])
  expect(find(x, v => typeof v === "string" && v.length === 5)).toBe("hello")
})

test("tests that items can be found in objects using values", () => {
  class Person {
    constructor(name, age) {
      const self = this
      self.name = name
      self.age = age
      self.friends = []
    }
  }

  const alice = new Person("Alice", 23)
  const bob = new Person("Bob", 45)
  const clarissa = new Person("Clarissa", 67)
  alice.friends.push(bob)
  alice.friends.push(clarissa)

  expect(find(alice, clarissa.age)).toBe(clarissa.age)
  expect(find(alice, bob.name)).toBe(bob.name)
})

test("tests that items can be found in objects using functions", () => {
  class Person {
    constructor(name, age) {
      const self = this
      self.name = name
      self.age = age
      self.friends = []
    }
  }

  const alice = new Person("Alice", 23)
  const bob = new Person("Bob", 45)
  const clarissa = new Person("Clarissa", 67)
  alice.friends.push(bob)
  alice.friends.push(clarissa)

  const allNames = [alice.name, bob.name, clarissa.name]

  expect(find(alice, v => typeof v === "number" && v > bob.age)).toBe(
    clarissa.age
  )

  expect(
    find(
      alice,
      v => allNames.indexOf(v) > -1 && v !== alice.name && v !== clarissa.name
    )
  ).toBe(bob.name)
})

test("tests that the function isn't tripped up by faulty functions", () => {
  function errorFn() {
    throw new Error("Oh, no!")
  }

  expect(() => {
    errorFn()
  }).toThrow()

  expect(() => {
    find([2, 3, 4], errorFn)
  }).not.toThrow()
})

test("tests that the function isn't tripped up by circular references", () => {
  const x = { foo: "bar" }
  x.self = x

  expect(find(x, "bar")).toBe("bar")
})
