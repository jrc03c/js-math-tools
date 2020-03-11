let flatten = require("./flatten.js")

function set(arr){
  let out = []

  flatten(arr).forEach(function(item){
    if (out.indexOf(item) < 0) out.push(item)
  })

  return out
}

module.exports = set
