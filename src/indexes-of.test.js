const indexesOf = require("./indexes-of.js")
const range = require("./range.js")
const reshape = require("./reshape.js")

test("tests that items can be found in nested arrays using values", () => {
  const a = [2, 3, 4, 3, 4, 3, 2]
  expect(indexesOf(a, 3)).toStrictEqual([[1], [3], [5]])

  const b = reshape(range(0, 24), [2, 3, 4])
  expect(indexesOf(b, 13)).toStrictEqual([[1, 0, 1]])
})

test("tests that items can be found in nested arrays using functions", () => {
  const a = [2, 3, 4, 3, 4, 3, 2]
  expect(indexesOf(a, v => v > 3)).toStrictEqual([[2], [4]])

  const b = reshape(range(0, 24), [2, 3, 4])

  expect(indexesOf(b, v => v % 6 === 0)).toStrictEqual([
    [0, 0, 0],
    [0, 1, 2],
    [1, 0, 0],
    [1, 1, 2],
  ])
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

  expect(indexesOf(alice, bob.age)).toStrictEqual([["friends", 0, "age"]])

  expect(indexesOf(alice, clarissa.name)).toStrictEqual([
    ["friends", 1, "name"],
  ])
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
    indexesOf(alice, v => typeof v === "number" && v > alice.age)
  ).toStrictEqual([
    ["friends", 0, "age"],
    ["friends", 1, "age"],
  ])

  expect(
    indexesOf(alice, v => allNames.indexOf(v) > -1 && v !== "uh-oh")
  ).toStrictEqual([["name"], ["friends", 0, "name"], ["friends", 1, "name"]])
})

test("tests that the function isn't tripped up by faulty functions", () => {
  function errorFn() {
    throw new Error("Oh, no!")
  }

  expect(() => {
    errorFn()
  }).toThrow()

  expect(() => {
    indexesOf([2, 3, 4], errorFn)
  }).not.toThrow()
})

test("tests that the function isn't tripped up by circular references", () => {
  const x = { foo: "bar" }
  x.self = x

  expect(indexesOf(x, "bar")).toStrictEqual([["foo"]])
})
