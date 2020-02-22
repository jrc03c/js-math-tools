let min = require("./min.js")
let max = require("./max.js")

function normalize(arr){
  let arrMin = min(arr)
  let arrMax = max(arr)
  let arrRange = arrMax - arrMin
  return arr.map(v => (v - arrMin) / arrRange)
}

module.exports = normalize
