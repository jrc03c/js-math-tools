function sort(arr, fn){
  let out = arr.slice()
  out.sort(fn)
  return out
}

module.exports = sort
