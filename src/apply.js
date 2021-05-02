let vectorize = require("./vectorize.js")

let apply = vectorize(function(x, fn){
  return fn(x)
})

module.exports = apply
