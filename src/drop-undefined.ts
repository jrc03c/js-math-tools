const dropMissing = require("./drop-missing.js")

function dropUndefined(x) {
  return dropMissing(x)
}

module.exports = dropUndefined
