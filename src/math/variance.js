let pow = require("./pow.js")
let std = require("./std.js")

function variance(arr){
  return pow(std(arr), 2)
}

module.exports = variance
