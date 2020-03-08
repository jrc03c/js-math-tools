function count(arr, item){
  return arr.filter(other => other === item).length
}

module.exports = count
