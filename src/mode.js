const count = require("./count.js")
const flatten = require("./flatten.js")
const set = require("./set.js")
const sort = require("./sort.js")

function mode(arr) {
  try {
    if (arr.length === 0) return NaN

    const temp = flatten(arr)
    if (temp.length === 0) return NaN

    const counts = {}
    const tempSet = set(temp)

    tempSet.forEach(item => {
      counts[item] = count(temp, item)
    })

    const sortedTempSet = sort(tempSet, (a, b) => counts[b] - counts[a])
    const mostCountedItem = sortedTempSet[0]

    const out = sort(
      sortedTempSet.filter(item => counts[item] === counts[mostCountedItem])
    )

    if (out.length === 1) return out[0]
    return out
  } catch (e) {
    return NaN
  }
}

module.exports = mode
