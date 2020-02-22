let vectorize = require("./vectorize.js")

let sign = vectorize(function(x){
  if (x < 0) return -1
  if (x > 1) return 1
  return 0
})

module.exports = sign
