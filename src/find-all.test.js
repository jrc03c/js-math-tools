const findAll = require("./find-all.js")
const range = require("./range.js")
const reshape = require("./reshape.js")

test("tests that items can be found in nested arrays using values", () => {
  const a = [2, 3, 4, 3, 4, 3, 2]
  expect(findAll(a, 3)).toStrictEqual([3, 3, 3])

  const b = reshape(range(0, 24), [2, 3, 4])
  expect(findAll(b, 13)).toStrictEqual([13])
})

test("tests that items can be found in nested arrays using functions", () => {
  const a = [2, 3, 4, 3, 4, 3, 2]
  expect(findAll(a, v => v > 3)).toStrictEqual([4, 4])

  const b = reshape(range(0, 24), [2, 3, 4])
  expect(findAll(b, v => v % 6 === 0)).toStrictEqual([0, 6, 12, 18])
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

  expect(findAll(alice, bob.age)).toStrictEqual([bob.age])
  expect(findAll(alice, clarissa.name)).toStrictEqual([clarissa.name])
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
    findAll(alice, v => typeof v === "number" && v > alice.age)
  ).toStrictEqual([bob.age, clarissa.age])

  expect(
    findAll(alice, v => allNames.indexOf(v) > -1 && v !== "uh-oh")
  ).toStrictEqual([alice.name, bob.name, clarissa.name])
})

test("tests that the function isn't tripped up by faulty functions", () => {
  function errorFn() {
    throw new Error("Oh, no!")
  }

  expect(() => {
    errorFn()
  }).toThrow()

  expect(() => {
    findAll([2, 3, 4], errorFn)
  }).not.toThrow()
})

test("tests that the function isn't tripped up by circular references", () => {
  const x = { foo: "bar" }
  x.self = x

  expect(findAll(x, "bar")).toStrictEqual(["bar"])
})
