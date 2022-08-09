const isArray = require("./is-array.js")

function isJagged(x) {
  if (!isArray(x)) return false

  let childArrayCount = 0
  let firstChildArrayLength = null

  for (let i = 0; i < x.length; i++) {
    if (isArray(x[i])) {
      childArrayCount++

      if (isJagged(x[i])) {
        return true
      }

      if (firstChildArrayLength === null) {
        firstChildArrayLength = x[i].length
      } else if (x[i].length !== firstChildArrayLength) {
        return true
      }
    }
  }

  if (childArrayCount > 0 && childArrayCount < x.length) {
    return true
  }

  return false
}

module.exports = isJagged
