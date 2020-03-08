function set(arr){
  let out = []

  arr.forEach(function(item){
    if (out.indexOf(item) < 0) out.push(item)
  })

  return out
}

module.exports = set
