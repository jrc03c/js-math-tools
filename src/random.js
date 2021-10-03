const ndarray = require("./ndarray.js")
const apply = require("./apply.js")
const isUndefined = require("./is-undefined.js")
const assert = require("./assert.js")
const isNumber = require("./is-number.js")
const copy = require("./copy.js")

// This is an implementation of the xoroshiro256++ algorithm:
// https://prng.di.unimi.it/xoshiro256plusplus.c

const MAX = Math.pow(2, 64)

const s = [
  uint(parseInt(Math.random() * Number.MAX_SAFE_INTEGER)),
  uint(parseInt(Math.random() * Number.MAX_SAFE_INTEGER)),
  uint(parseInt(Math.random() * Number.MAX_SAFE_INTEGER)),
  uint(parseInt(Math.random() * Number.MAX_SAFE_INTEGER)),
]

function uint(x) {
  return BigInt.asUintN(64, BigInt(x))
}

function rotl(x, k) {
  x = uint(x)
  k = BigInt(k)
  return uint(uint(x << k) | uint(x >> uint(64n - k)))
}

function seed(val) {
  if (!isUndefined(val)) {
    assert(
      isNumber(val),
      "If passing a value into the `seed` function, then that value must be a positive integer!"
    )

    assert(
      parseInt(val) === val,
      "If passing a value into the `seed` function, then that value must be a positive integer!"
    )

    s[0] = rotl(val, 8)
    s[1] = rotl(val, 24)
    s[2] = rotl(val, 40)
    s[3] = rotl(val, 56)
  } else {
    return copy(s)
  }
}

function next() {
  const result = uint(rotl(s[0] + s[3], 23) + s[0])
  const t = uint(s[1] << 17n)
  s[2] = uint(s[2] ^ s[0])
  s[3] = uint(s[3] ^ s[1])
  s[1] = uint(s[1] ^ s[2])
  s[0] = uint(s[0] ^ s[3])
  s[2] = uint(s[2] ^ t)
  s[3] = rotl(s[3], 45)
  return parseInt(result) / MAX
}

function random(shape) {
  if (isUndefined(shape)) return next()
  return apply(ndarray(shape), next)
}

module.exports = { random, seed }
