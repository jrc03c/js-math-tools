let sum = require("./sum.js")

function mean(arr){
  return sum(arr) / arr.length
}

module.exports = mean
