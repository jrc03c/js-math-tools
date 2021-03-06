const indexOf = require("./index-of.js")
const range = require("./range.js")
const reshape = require("./reshape.js")

test("tests that items can be found in nested arrays using values", () => {
  const a = [2, 3, 4]
  expect(indexOf(a, 4)).toStrictEqual([2])

  const b = reshape(range(0, 24), [2, 3, 4])
  expect(indexOf(b, b[1][2][0])).toStrictEqual([1, 2, 0])
})

test("tests that items can be found in nested arrays using functions", () => {
  const a = [2, 3, 4]
  expect(indexOf(a, v => v > 3)).toStrictEqual([2])

  const b = reshape(range(0, 24), [2, 3, 4])
  expect(indexOf(b, v => v === b[1][2][0])).toStrictEqual([1, 2, 0])
})

test("tests that arrays and non-arrays can both be found in nested arrays", () => {
  const x = ["foobar", [1, 2, 3, 4, 5], "hello", ["a", "b", "c"]]

  expect(indexOf(x, v => v.length > 5)).toStrictEqual([0])
  expect(indexOf(x, v => v.length === 5)).toStrictEqual([1])

  expect(
    indexOf(x, v => typeof v === "string" && v.length === 5)
  ).toStrictEqual([2])
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

  expect(indexOf(alice, clarissa.age)).toStrictEqual(["friends", 1, "age"])
  expect(indexOf(alice, bob.name)).toStrictEqual(["friends", 0, "name"])
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

  expect(
    indexOf(alice, v => typeof v === "number" && v > bob.age)
  ).toStrictEqual(["friends", 1, "age"])

  expect(
    indexOf(
      alice,
      v => allNames.indexOf(v) > -1 && v !== alice.name && v !== clarissa.name
    )
  ).toStrictEqual(["friends", 0, "name"])
})

test("tests that the function isn't tripped up by faulty functions", () => {
  function errorFn() {
    throw new Error("Oh, no!")
  }

  expect(() => {
    errorFn()
  }).toThrow()

  expect(() => {
    indexOf([2, 3, 4], errorFn)
  }).not.toThrow()
})

test("tests that the function isn't tripped up by circular references", () => {
  const x = { foo: "bar" }
  x.self = x

  expect(indexOf(x, "bar")).toStrictEqual(["foo"])
})
