const assert = require("./assert.js")
const set = require("./set.js")

function union() {
  const arrays = Object.values(arguments)
  return set([...arrays])
}

module.exports = union
