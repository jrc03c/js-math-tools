const set = require("./set.js")

function union() {
  return set([...arguments])
}

module.exports = union
