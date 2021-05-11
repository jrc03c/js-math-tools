let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let max = require("./max.js")

function dropMissingPairwise(a, b){
  assert(isArray(a) && isArray(b), "The two items passed into the `dropMissingPairwise` function must be arrays!")

  let aOut = []
  let bOut = []

  for (let i=0; i<max([a.length, b.length]); i++){
    if (!isUndefined(a[i]) && !isUndefined(b[i])){
      aOut.push(a[i])
      bOut.push(b[i])
    }
  }

  return {a: aOut, b: bOut}
}

module.exports = dropMissingPairwise
