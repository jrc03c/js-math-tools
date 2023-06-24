const isUndefined = require("./is-undefined")

const types = [
  Array,
  ArrayBuffer,
  BigInt64Array,
  BigUint64Array,
  Float32Array,
  Float64Array,
  Int16Array,
  Int32Array,
  Int8Array,
  Uint16Array,
  Uint32Array,
  Uint8Array,
  Uint8ClampedArray,
]

const typeStrings = types.map(s => s.name)

function isArray(obj) {
  try {
    if (obj instanceof Array) {
      return true
    }

    if (!isUndefined(obj.constructor)) {
      return (
        types.indexOf(obj.constructor) > -1 ||
        typeStrings.indexOf(obj.constructor.name) > -1
      )
    }

    return false
  } catch (e) {
    return false
  }
}

module.exports = isArray
