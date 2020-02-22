let vectorize = require("../math/vectorize.js")

let apply = vectorize(function(x, fn){
  return fn(x)
})

module.exports = apply
