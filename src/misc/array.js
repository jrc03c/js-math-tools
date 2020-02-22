Array.prototype.asyncForEach = async function(fn){
  for (let i=0; i<this.length; i++) await fn(this[i], i, this)
  return this
}

Array.prototype.alphaSort = function(key){
  return this.sort(function(a, b){
    if (key){
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    } else {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    }
  })
}
