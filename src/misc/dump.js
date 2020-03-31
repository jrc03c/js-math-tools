function dump(obj, excluded=["dump"]){
  Object.keys(obj).forEach(function(key){
    if (excluded.indexOf(key) < 0){
      global[key] = obj[key]
    }
  })
}

module.exports = dump
