const isEqual = require("./is-equal.js")
const stringify = require("./stringify.js")

test("test that `stringify` returns the same results as `JSON.stringify` for non-cyclic objects", () => {
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

  expect(isEqual(stringify(alice), JSON.stringify(alice))).toBe(true)

  expect(
    isEqual(stringify(alice, null, 2), JSON.stringify(alice, null, 2))
  ).toBe(true)
})

test("test that `stringify` isn't tripped up by cyclic objects", () => {
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
  alice.friends.push(alice)
  alice.friends.push(bob)
  alice.friends.push(clarissa)

  const temp = JSON.parse(stringify(alice))
  expect(temp.friends[0]).toBe("<cyclic reference>")

  temp.friends.splice(0, 1)
  expect(alice.name).toBe(temp.name)
  expect(alice.age).toBe(temp.age)
  expect(isEqual(alice.friends.slice(1), temp.friends)).toBe(true)
})
