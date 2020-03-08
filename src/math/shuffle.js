let floor = require("./floor.js")
let random = require("./random.js")

function shuffle(arr){
  let out = arr.slice()

  for (let i=0; i<arr.length; i++){
    let index1 = floor(random() * arr.length)
    let index2 = floor(random() * arr.length)
    let buffer = out[index1]
    out[index1] = out[index2]
    out[index2] = buffer
  }

  return out
}

module.exports = shuffle
