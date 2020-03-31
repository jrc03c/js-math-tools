let out = {
  canvas: require("./canvas/__index__.js"),
  math: require("./math/__index__.js"),
  misc: require("./misc/__index__.js"),
}

out.dump = function(){
  out.misc.dump(out.canvas)
  out.misc.dump(out.math)
  out.misc.dump(out.misc)
}

try {
  module.exports = out
} catch(e){}

try {
  window.JSMathTools = out
} catch(e){}
