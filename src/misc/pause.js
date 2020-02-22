function pause(ms){
  return new Promise(function(resolve, reject){
    try {
      return setTimeout(resolve, ms)
    } catch(e){
      return reject(e)
    }
  })
}

module.exports = pause
