let out = {
  canvas: require("./canvas/__index__.js"),
  math: require("./math/__index__.js"),
  misc: require("./misc/__index__.js"),
}

try {
  module.exports = out
} catch(e){}

try {
  window.JSMathTools = out
} catch(e){}
