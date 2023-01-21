const dropMissing = require("./drop-missing")

function dropUndefined(x) {
  return dropMissing(x)
}

module.exports = dropUndefined
