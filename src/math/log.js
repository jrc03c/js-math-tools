let vectorize = require("./vectorize.js")

let log = vectorize(function(x, base){
  base = typeof(base) === "undefined" ? Math.E : base
  return Math.log(x) / Math.log(base)
})

module.exports = log
