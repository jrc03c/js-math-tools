function min(arr){
  let out

  arr.forEach(function(x){
    if (out === undefined || x < out){
      out = x
    }
  })

  return out
}

module.exports = min
