const dropNaN = require("./drop-nan.js")
const flatten = require("./flatten.js")
const sort = require("./sort.js")

function median(arr) {
  try {
    const flattenedArr = flatten(arr)
    let temp = dropNaN(flattenedArr)
    if (temp.length === 0) return NaN
    if (temp.length < flattenedArr.length) return NaN
    temp = sort(temp)

    let out

    if (temp.length % 2 === 0) {
      out = (temp[temp.length / 2 - 1] + temp[temp.length / 2]) / 2
    } else {
      out = temp[Math.floor(temp.length / 2)]
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = median
