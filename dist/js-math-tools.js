(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let out = {
  downloadCanvas: require("./download-canvas.js"),
  Plot: require("./plot.js"),
}

module.exports = out

},{"./download-canvas.js":2,"./plot.js":3}],2:[function(require,module,exports){
function downloadCanvas(canvas, filename){
  let a = document.createElement("a")
  a.href = canvas.toDataURL()
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadCanvas

},{}],3:[function(require,module,exports){
let map = require("../math/map.js")
let max = require("../math/max.js")
let downloadCanvas = require("./download-canvas.js")

function Plot(canvas){
  let self = this

  let xmin = -1
  let xmax = 1
  let ymin = -1
  let ymax = 1
  let fillColor = "black"
  let strokeColor = "black"
  let dotSize = 5
  let lineThickness = 1
  let axesAreVisible = true
  let textStyle = {
    family: "monospace",
    size: 12,
    alignment: "center",
    baseline: "middle",
    isBold: false,
    isItalicized: false,
    lineHeight: 14,
    color: "black",
  }

  let context = canvas.getContext("2d")
  let width = canvas.width
  let height = canvas.height

  self.setOpacity = function(a){
    context.globalAlpha = a
  }

  self.setFillColor = function(c){
    fillColor = c
    return self
  }

  self.setLineColor = function(c){
    strokeColor = c
    return self
  }

  self.setDotSize = function(s){
    dotSize = s
    return self
  }

  self.setLineThickness = function(t){
    lineThickness = t
    return self
  }

  self.setAxesAreVisible = function(v){
    axesAreVisible = v
    return self
  }

  self.setTextStyle = function(t){
    textStyle = t
  }

  self.setRange = function(a, b, c, d){
    xmin = a
    xmax = b
    ymin = c
    ymax = d
    return self
  }

  self.splitTextIntoLines = function(text, maxWidth){
    let lines = []
    let words = text.split(" ")
    let temp = ""

    words.forEach(function(word){
      let width = context.measureText(temp + " " + word).width

      if (width > maxWidth){
        lines.push(temp)
        temp = word
      } else {
        temp += " " + word
      }
    })

    if (temp.length > 0){
      lines.push(temp)
    }

    return lines
  }

  self.clear = function(){
    context.clearRect(0, 0, width, height)
    context.fillStyle = "white"
    context.fillRect(0, 0, width, height)
  }

  self.drawAxes = function(){
    if (axesAreVisible){
      context.fillStyle = "none"
      context.strokeStyle = "black"
      context.lineWidth = 1

      context.beginPath()
      context.moveTo(-width/2, map(0, ymin, ymax, -height/2, height/2))
      context.lineTo(width/2, map(0, ymin, ymax, -height/2, height/2))
      context.stroke()

      context.beginPath()
      context.moveTo(map(0, xmin, xmax, -width/2, width/2), -height/2)
      context.lineTo(map(0, xmin, xmax, -width/2, width/2), height/2)
      context.stroke()
    }

    return self
  }

  self.scatter = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length; i++){
      xTemp = map(x[i], xmin, xmax, -width/2, width/2)
      yTemp = map(y[i], ymin, ymax, -height/2, height/2)

      context.beginPath()
      context.ellipse(xTemp, yTemp, dotSize / 2, dotSize / 2, 0, 0, Math.PI * 2)
      if (fillColor !== "none") context.fill()
      if (lineThickness > 0) context.stroke()
    }

    context.restore()
    return self
  }

  self.line = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length-1; i++){
      xTemp1 = map(x[i], xmin, xmax, -width/2, width/2)
      yTemp1 = map(y[i], ymin, ymax, -height/2, height/2)
      xTemp2 = map(x[i+1], xmin, xmax, -width/2, width/2)
      yTemp2 = map(y[i+1], ymin, ymax, -height/2, height/2)

      context.beginPath()
      context.moveTo(xTemp1, yTemp1)
      context.lineTo(xTemp2, yTemp2)
      context.stroke()
    }

    context.restore()
    return self
  }

  self.dottedLine = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length-1; i+=2){
      try {
        xTemp1 = map(x[i], xmin, xmax, -width/2, width/2)
        yTemp1 = map(y[i], ymin, ymax, -height/2, height/2)
        xTemp2 = map(x[i+1], xmin, xmax, -width/2, width/2)
        yTemp2 = map(y[i+1], ymin, ymax, -height/2, height/2)

        context.beginPath()
        context.moveTo(xTemp1, yTemp1)
        context.lineTo(xTemp2, yTemp2)
        context.stroke()
      } catch(e){}
    }

    context.restore()
    return self
  }

  self.bar = function(values, colors){
    let maxValue = max(values)
    self.setRange(1, 2 + values.length, -0.1 * maxValue, 1.1 * maxValue)

    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    let barThickness = 0.5

    for (let i=0; i<values.length; i++){
      context.fillStyle = colors[i]

      let xTemp = map((i + 2) - barThickness / 2, xmin, xmax, -width/2, width/2)
      let yTemp = map(0, ymin, ymax, -height/2, height/2)
      let wTemp = map(barThickness, 0, xmax - xmin, 0, width)
      let hTemp = map(values[i], 0, ymax - ymin, 0, height)

      if (colors[i] !== "none") context.fillRect(xTemp, yTemp, wTemp, hTemp)
      if (lineThickness > 0) context.strokeRect(xTemp, yTemp, wTemp, hTemp)
    }

    self.drawAxes()
    context.restore()
    return self
  }

  self.text = function(text, x, y, maxWidth){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    context.fillStyle = textStyle.color
    context.font = `${textStyle.isBold ? "bold" : ""} ${textStyle.isItalicized ? "italic" : ""} ${textStyle.size}px ${textStyle.family}`
    context.textAlign = textStyle.alignment
    context.textBaseline = textStyle.baseline

    let lines

    if (maxWidth){
      lines = self.splitTextIntoLines(text, map(maxWidth, 0, xmax - xmin, 0, width))
    } else {
      lines = [text]
    }

    lines.forEach(function(line, index){
      context.save()
      context.translate(map(x, xmin, xmax, -width/2, width/2), map(y, ymin, ymax, -height/2, height/2) - index * textStyle.lineHeight)
      context.scale(1, -1)
      context.fillText(line, 0, 0)
      context.restore()
    })

    context.restore()
    return self
  }

  self.getContext = function(){
    return context
  }

  self.download = function(filename){
    filename = filename || "untitled.png"
    downloadCanvas(canvas, filename)
    return self
  }
}

module.exports = Plot

},{"../math/map.js":32,"../math/max.js":33,"./download-canvas.js":2}],4:[function(require,module,exports){
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

},{"./canvas/__index__.js":1,"./math/__index__.js":5,"./misc/__index__.js":64}],5:[function(require,module,exports){
let out = {
  abs: require("./abs.js"),
  add: require("./add.js"),
  arccos: require("./arccos.js"),
  arcsin: require("./arcsin.js"),
  arctan: require("./arctan.js"),
  ceil: require("./ceil.js"),
  chop: require("./chop.js"),
  clamp: require("./clamp.js"),
  cohensd: require("./cohens-d.js"),
  correl: require("./correl.js"),
  cos: require("./cos.js"),
  count: require("./count.js"),
  covariance: require("./covariance.js"),
  distance: require("./distance.js"),
  dot: require("./dot.js"),
  flatten: require("./flatten.js"),
  floor: require("./floor.js"),
  isArray: require("./is-array.js"),
  isBoolean: require("./is-boolean.js"),
  isEqual: require("./is-equal.js"),
  isFunction: require("./is-function.js"),
  isNumber: require("./is-number.js"),
  isString: require("./is-string.js"),
  isUndefined: require("./is-undefined.js"),
  lerp: require("./lerp.js"),
  log: require("./log.js"),
  map: require("./map.js"),
  max: require("./max.js"),
  mean: require("./mean.js"),
  median: require("./median.js"),
  min: require("./min.js"),
  mode: require("./mode.js"),
  ndarray: require("./ndarray.js"),
  normal: require("./normal.js"),
  normalize: require("./normalize.js"),
  ones: require("./ones.js"),
  pow: require("./pow.js"),
  random: require("./random.js"),
  range: require("./range.js"),
  reverse: require("./reverse.js"),
  round: require("./round.js"),
  scale: require("./scale.js"),
  // seed: require("./seed.js"),
  set: require("./set.js"),
  shape: require("./shape.js"),
  shuffle: require("./shuffle.js"),
  sign: require("./sign.js"),
  sin: require("./sin.js"),
  slice: require("./slice.js"),
  sort: require("./sort.js"),
  sqrt: require("./sqrt.js"),
  std: require("./std.js"),
  sum: require("./sum.js"),
  tan: require("./tan.js"),
  transpose: require("./transpose.js"),
  variance: require("./variance.js"),
  vectorize: require("./vectorize.js"),
  zeros: require("./zeros.js"),
}

module.exports = out

},{"./abs.js":6,"./add.js":7,"./arccos.js":8,"./arcsin.js":9,"./arctan.js":10,"./ceil.js":11,"./chop.js":12,"./clamp.js":13,"./cohens-d.js":14,"./correl.js":15,"./cos.js":16,"./count.js":17,"./covariance.js":18,"./distance.js":19,"./dot.js":20,"./flatten.js":21,"./floor.js":22,"./is-array.js":23,"./is-boolean.js":24,"./is-equal.js":25,"./is-function.js":26,"./is-number.js":27,"./is-string.js":28,"./is-undefined.js":29,"./lerp.js":30,"./log.js":31,"./map.js":32,"./max.js":33,"./mean.js":34,"./median.js":35,"./min.js":36,"./mode.js":37,"./ndarray.js":38,"./normal.js":39,"./normalize.js":40,"./ones.js":41,"./pow.js":42,"./random.js":43,"./range.js":44,"./reverse.js":45,"./round.js":46,"./scale.js":47,"./set.js":49,"./shape.js":50,"./shuffle.js":51,"./sign.js":52,"./sin.js":53,"./slice.js":54,"./sort.js":55,"./sqrt.js":56,"./std.js":57,"./sum.js":58,"./tan.js":59,"./transpose.js":60,"./variance.js":61,"./vectorize.js":62,"./zeros.js":63}],6:[function(require,module,exports){
let assert = require("../misc/assert.js")
let vectorize = require("./vectorize.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")

let abs = vectorize(function(x){
  assert(!isUndefined(x), "You must pass exactly one number into the `abs` function!")
  assert(isNumber(x), "The `abs` function only works on numbers!")
  return Math.abs(x)
})

module.exports = abs

// tests
if (!module.parent && typeof(window) === "undefined"){
  let result = abs(3)
  assert(result === 3, `abs(3) should be 3, but instead is ${result}!`)

  result = abs(-3)
  assert(result === 3, `abs(-3) should be 3, but instead is ${result}!`)

  result = abs(17.25)
  assert(result === 17.25, `abs(17.25) should be 17.25, but instead is ${result}!`)

  result = abs(-101.5)
  assert(result === 101.5, `abs(-101.5) should be 101.5, but instead is ${result}!`)

  x = [-2, 3, -4]
  yTrue = [2, 3, 4]
  yPred = abs(x)

  for (let i=0; i<yTrue.length; i++){
    assert(yTrue[i] === yPred[i], `abs(${x[i]}) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)
  }

  x = [
    [1, -2, -3],
    [4, -5, 6],
    [-7, 8, -9],
  ]

  yTrue = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]

  yPred = abs(x)

  for (let r=0; r<yTrue.length; r++){
    for (let c=0; c<yTrue[r].length; c++){
      assert(yTrue[r][c] === yPred[r][c], `abs(${x[r][c]}) should be ${yTrue[r][c]}, but instead is ${yPred[r][c]}!`)
    }
  }

  let hasFailed

  try {
    hasFailed = false
    abs("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs("foo") should have failed!`)

  try {
    hasFailed = false
    abs(["foo", "bar", "baz"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(["foo", "bar", "baz"]) should have failed!`)

  try {
    hasFailed = false
    abs({x: 5})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs({x: 5}) should have failed!`)

  try {
    hasFailed = false
    abs(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(true) should have failed!`)

  let foo

  try {
    hasFailed = false
    abs(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],7:[function(require,module,exports){
let assert = require("../misc/assert.js")
let vectorize = require("./vectorize.js")
let isNumber = require("./is-number.js")
let isString = require("./is-string.js")
let isUndefined = require("./is-undefined.js")

let add = vectorize(function(){
  let out = 0
  let argKeys = Object.keys(arguments)
  let argValues = argKeys.map(key => arguments[key])
  let argTypes = argValues.map(value => typeof(value))

  argValues.forEach(value => assert(isNumber(value) || isString(value), "The `add` function only works on strings or numbers!"))

  argValues.forEach(value => assert(!isUndefined(value), "You must pass numbers or equally-sized arrays of numbers into the `add` function!"))

  if (argTypes.indexOf("string") > -1) out = ""

  argValues.forEach(x => out += x)

  return out
})

module.exports = add

// tests
if (!module.parent && typeof(window) === "undefined"){
  let a = 3
  let b = 4
  cTrue = a + b
  cPred = add(a, b)
  assert(cTrue === cPred, `add(${a}, ${b}) should be ${cTrue}, but instead is ${cPred}!`)

  a = -4
  b = 22.5
  cTrue = a + b
  cPred = add(a, b)
  assert(cTrue === cPred, `add(${a}, ${b}) should be ${cTrue}, but instead is ${cPred}!`)

  a = [2, 3, 4]
  b = -10
  cTrue = [-8, -7, -6]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = -10
  b = [2, 3, 4]
  cTrue = [-8, -7, -6]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = [2, 3, 4]
  b = [5, 6, 7]
  cTrue = [7, 9, 11]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = [[2, 3, 4], [5, 6, 7]]
  b = 10
  cTrue = [[12, 13, 14], [15, 16, 17]]
  cPred = add(a, b)

  for (let row=0; row<cTrue.length; row++){
    for (let col=0; col<cTrue[row].length; col++){
      assert(cTrue[row][col] === cPred[row][col], `add(${a[row][col]}, ${b}) should be ${cTrue[row][col]}, but instead is ${cPred[row][col]}!`)
    }
  }

  a = [[2, 3, 4], [5, 6, 7]]
  b = [10, 20, 30]
  let hasFailed

  try {
    hasFailed = false
    add(a, b)
  } catch(e){
    hasFailed = true
  }

  if (!hasFailed) assert(false, `add(${a}, ${b}) should have failed!`)

  a = "hello, "
  b = ["foo", "bar", "baz"]
  cTrue = ["hello, foo", "hello, bar", "hello, baz"]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = true
  b = 3

  try {
    hasFailed = false
    add(a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add(${a}, ${b}) should have failed!`)

  a = [2, 3, 4]
  b = [5, 6, "seven"]
  cTrue = [7, 9, "4seven"]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b[i]}) should be ${cTrue[i]}, but instead was ${cPred[i]}!`)

  let foo

  try {
    hasFailed = false
    add(3, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add(3, foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-string.js":28,"./is-undefined.js":29,"./vectorize.js":62}],8:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let arccos = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `arccos` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `arccos` function!")
  assert(x >= -1 && x <= 1, "The `arccos` function is only defined for -1 <= x <= 1!")
  return Math.acos(x)
})

module.exports = arccos

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")

  let x = 0
  let yTrue = Math.PI / 2
  let yPred = arccos(x)
  assert(yTrue === yPred, `arccos(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 1
  yTrue = 0
  yPred = arccos(x)
  assert(yTrue === yPred, `arccos(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    arccos()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos() should have failed!`)

  try {
    hasFailed = false
    arccos("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos("foo") should have failed!`)

  try {
    hasFailed = false
    arccos(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(true) should have failed!`)

  try {
    hasFailed = false
    arccos(-2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(-2) should have failed!`)

  try {
    hasFailed = false
    arccos(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(2) should have failed!`)

  try {
    hasFailed = false
    arccos({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos({}) should have failed!`)

  try {
    hasFailed = false
    arccos(random(100))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arccos(random(100)) should have succeeded!`)

  try {
    hasFailed = false
    arccos(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    arccos(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./random.js":43,"./vectorize.js":62}],9:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let arcsin = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `arcsin` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `arcsin` function!")
  assert(x >= -1 && x <= 1, "The `arcsin` function is only defined for -1 <= x <= 1!")
  return Math.asin(x)
})

module.exports = arcsin

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")

  let x = 0
  let yTrue = 0
  let yPred = arcsin(x)
  assert(yTrue === yPred, `arcsin(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 1
  yTrue = Math.PI / 2
  yPred = arcsin(x)
  assert(yTrue === yPred, `arcsin(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    arcsin()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin() should have failed!`)

  try {
    hasFailed = false
    arcsin("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin("foo") should have failed!`)

  try {
    hasFailed = false
    arcsin(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(true) should have failed!`)

  try {
    hasFailed = false
    arcsin(-2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(-2) should have failed!`)

  try {
    hasFailed = false
    arcsin(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(2) should have failed!`)

  try {
    hasFailed = false
    arcsin({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin({}) should have failed!`)

  try {
    hasFailed = false
    arcsin(random(100))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arcsin(random(100)) should have succeeded!`)

  try {
    hasFailed = false
    arcsin(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    arcsin(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./random.js":43,"./vectorize.js":62}],10:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let arctan = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `arctan` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `arctan` function!")
  return Math.atan(x)
})

module.exports = arctan

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")

  let x = 0
  let yTrue = 0
  let yPred = arctan(x)
  assert(yTrue === yPred, `arctan(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 1
  yTrue = Math.PI / 4
  yPred = arctan(x)
  assert(yTrue === yPred, `arctan(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    arctan()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan() should have failed!`)

  try {
    hasFailed = false
    arctan("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan("foo") should have failed!`)

  try {
    hasFailed = false
    arctan(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan(true) should have failed!`)

  try {
    hasFailed = false
    arctan(-2)
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arctan(-2) should have succeeded!`)

  try {
    hasFailed = false
    arctan(2)
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arctan(2) should have succeeded!`)

  try {
    hasFailed = false
    arctan({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan({}) should have failed!`)

  try {
    hasFailed = false
    arctan(random(100))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arctan(random(100)) should have succeeded!`)

  try {
    hasFailed = false
    arctan(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    arctan(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./random.js":43,"./vectorize.js":62}],11:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let ceil = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `ceil` function!")
  assert(isNumber(x), "The `ceil` function only works on numbers!")
  return Math.ceil(x)
})

module.exports = ceil

// tests
if (!module.parent && typeof(window) === "undefined"){
  let x = 3.5
  let yTrue = 4
  let yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 3.25
  yTrue = 4
  yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = -17.2
  yTrue = -17
  yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [2.5, 3.4, 7.9]
  yTrue = [3, 4, 8]
  yPred = ceil(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `ceil(${x[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed
  x = "foo"

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  x = [true, 2, 3]

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  x = {x: 5}

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  let foo

  try {
    hasFailed = false
    ceil(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],12:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let abs = require("./abs.js")
let vectorize = require("./vectorize.js")

let chop = vectorize(function(x, threshold){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `chop` function!")
  assert(isNumber(x), "The `chop` function only works on numbers!")

  threshold = isUndefined(threshold) ? 1e-10 : threshold
  assert(isNumber(threshold), "The `chop` function only works on numbers!")

  return abs(x) < threshold ? 0 : x
})

module.exports = chop

// tests
if (!module.parent && typeof(window) === "undefined"){
  let x = 1
  let y = chop(x)
  assert(y === 1, `chop(1) should be 1, but instead is ${y}!`)

  x = 0
  y = chop(x)
  assert(y === 0, `chop(0) should be 0, but instead is ${y}!`)

  x = 1e-15
  y = chop(x)
  assert(y === 0, `chop(1e-15) should be 0, but instead is ${y}!`)

  x = 100
  y = chop(x)
  assert(y === 100, `chop(100) should be 100, but instead is ${y}!`)

  x = -100
  y = chop(x)
  assert(y === -100, `chop(-100) should be -100, but instead is ${y}!`)

  x = [1e-20, 1e-15, 1e-5]
  let yTrue = [0, 0, 1e-5]
  yPred = chop(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `chop(x[i]) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)

  x = [1, 1, 1]
  thresholds = [1e-1, 1e0, 1e1]
  yTrue = [1, 1, 0]
  yPred = chop(x, thresholds)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `chop(x[i]) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    chop(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(true) should have failed!`)

  try {
    hasFailed = false
    chop({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop({}) should have failed!`)

  try {
    hasFailed = false
    chop("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop("foo") should have failed!`)

  try {
    hasFailed = false
    chop(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(() => {})) should have failed!`)

  try {
    hasFailed = false
    chop([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop([1, 2, "three"]) should have failed!`)

  try {
    let foo
    hasFailed = false
    chop(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(foo) should have failed!`)

  try {
    hasFailed = false
    chop([2, 3, 4], [5, 6, "seven"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop([2, 3, 4], [5, 6, "seven"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],13:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let clamp = vectorize(function(x, a, b){
  assert(!isUndefined(x) && !isUndefined(a) && !isUndefined(b), "You must pass exactly three numbers (or three equally-sized arrays of numbers) into the `clamp` function!")

  assert(isNumber(x), "The `clamp` function only works on numbers!")
  assert(isNumber(a), "The `clamp` function only works on numbers!")
  assert(isNumber(b), "The `clamp` function only works on numbers!")

  assert(a < b, `The minimum parameter, a, must be less than the maximum parameter, b.`)

  if (x < a) return a
  if (x > b) return b
  return x
})

module.exports = clamp

// tests
if (!module.parent && typeof(window) === "undefined"){
  let x = 5
  let a = 1
  let b = 10
  let yTrue = 5
  let yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = -100
  a = 1
  b = 10
  yTrue = a
  yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 999
  a = 1
  b = 10
  yTrue = b
  yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = [0, 100, 1000]
  a = 5
  b = 500
  yTrue = [5, 100, 500]
  yPred = clamp(x, a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `clamp(${x[i]}, ${a}, ${b}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = [0, 100, 1000]
  a = [5, 10, 15]
  b = [100, 200, 300]
  yTrue = [5, 100, 300]
  yPred = clamp(x, a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `clamp(${x[i]}, ${a[i]}, ${b[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}.`)

  x = 5
  a = 10
  b = 1
  let hasFailed = false

  try {
    clamp(x, a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(${x}, ${a}, ${b}) should have failed!`)

  x = "foo"
  a = "bar"
  b = "baz"
  hasFailed = false

  try {
    clamp(x, a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(${x}, ${a}, ${b}) should have failed!`)

  let foo
  hasFailed = false

  try {
    clamp(foo, foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(foo, foo, foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],14:[function(require,module,exports){
let mean = require("./mean.js")
let sqrt = require("./sqrt.js")
let variance = require("./variance.js")

function cohensd(arr1, arr2){
  let m1 = mean(arr1)
  let m2 = mean(arr2)
  let s = sqrt((variance(arr1) + variance(arr2)) / 2)
  return (m1 - m2) / s
}

module.exports = cohensd

},{"./mean.js":34,"./sqrt.js":56,"./variance.js":61}],15:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let covariance = require("./covariance.js")
let std = require("./std.js")

function correl(x, y){
  assert(!isUndefined(x) && !isUndefined(y), "You must pass two equally-sized one-dimensional arrays into the `correl` function!")
  assert(isArray(x) && isArray(y), "The `correl` function works on exactly two one-dimensional arrays!")
  assert(x.length === y.length, "The two one-dimensional arrays passed into the `correl` function must have the same length!")

  x.concat(y).forEach(function(value){
    assert(isNumber(value), "The two one-dimensional arrays passed into the `correl` function must contain only numbers!")
  })

  return covariance(x, y) / (std(x) * std(y))
}

module.exports = correl

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let add = require("./add.js")
  let scale = require("./scale.js")

  let x = normal([10000])
  let y = normal([10000])
  let r = correl(x, y)

  assert(abs(r) < 0.05, `correl(normal([10000]), normal([10000])) should be approximately 0, but instead was ${r}!`)

  y = add(x, scale(0.01, normal([10000])))
  r = correl(x, y)
  assert(r > 0.95, `correl(x, x + 0.01 * normal([10000])) should be approximately 1, but instead was ${r}!`)

  y = add(scale(-1, x), scale(0.01, normal([10000])))
  r = correl(x, y)
  assert(r < -0.95, `correl(x, -x + 0.01 * normal([10000])) should be approximately -1, but instead was ${r}!`)

  let hasFailed

  try {
    hasFailed = false
    correl(1, 2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(1, 2) should have failed!`)

  try {
    hasFailed = false
    correl(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(true, false) should have failed!`)

  try {
    hasFailed = false
    correl([], {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([], {}) should have failed!`)

  try {
    hasFailed = false
    correl("foo", "bar")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl("foo", "bar") should have failed!`)

  try {
    hasFailed = false
    correl([2, 3, 4], ["a", "b", "c"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([2, 3, 4], ["a", "b", "c"]) should have failed!`)

  try {
    hasFailed = false
    correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]]) should have failed!`)

  let fn = () => {}

  try {
    hasFailed = false
    correl(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    correl(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(foo, foo) should have failed!`)

  assert(isNaN(correl([2, 3, 4], [1, 1, 1])), `correl([2, 3, 4], [1, 1, 1]) should be NaN!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./add.js":7,"./covariance.js":18,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./scale.js":47,"./std.js":57}],16:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let cos = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a single number or single array of numbers into the `cos` function!")
  assert(isNumber(x), "The `cos` function only works on numbers!")
  return Math.cos(x)
})

module.exports = cos

// tests
if (!module.parent && typeof(window) === "undefined"){
  let min = require("./min.js")
  let max = require("./max.js")
  let normal = require("./normal.js")
  let chop = require("./chop.js")

  let x = normal([10000]).map(v => v * 100)
  let y = cos(x)

  assert(min(y) >= -1, "Values produced by the `cos` function should never be below -1!")
  assert(max(y) <= 1, "Values produced by the `cos` function should never be above 1!")

  x = 0
  y = cos(x)
  assert(y === 1, `cos(0) should be 1, but instead is ${y}!`)

  x = Math.PI / 2
  y = cos(x)
  assert(chop(y) === 0, `cos(Math.PI / 2) should be 0, but instead is ${y}!`)

  x = Math.PI
  y = cos(x)
  assert(y === -1, `cos(Math.PI) should be -1, but instead is ${y}!`)

  x = 3 * Math.PI / 2
  y = cos(x)
  assert(chop(y) === 0, `cos(3 * Math.PI / 2) should be 0, but instead is ${y}!`)

  let hasFailed

  try {
    hasFailed = false
    cos("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos("foo") should have failed!`)

  try {
    hasFailed = false
    cos(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(true) should have failed!`)

  try {
    hasFailed = false
    cos({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos({}) should have failed!`)

  try {
    hasFailed = false
    cos([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    cos(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    cos(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./chop.js":12,"./is-number.js":27,"./is-undefined.js":29,"./max.js":33,"./min.js":36,"./normal.js":39,"./vectorize.js":62}],17:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let flatten = require("./flatten.js")

function count(arr, items){
  assert(!isUndefined(arr), "You must an array and an item to count to the `count` function!")
  assert(isArray(arr), "You must an array and an item to count to the `count` function!")

  // NOTE: This currently flattens the array that's passed in, which means that it's not possible to count occurrences of arrays within arrays! I'm not sure whether this is desirable behavior or not, so I'm just making a note of it for now. It's not trivial to count occurrences of identical objects, so maybe this function should refuse to operate on objects!
  let temp = flatten(arr)

  if (isArray(items)){
    return flatten(items).map(function(item1){
      return temp.filter(item2 => item2 === item1).length
    })
  } else {
    return temp.filter(other => other === items).length
  }
}

module.exports = count

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")
  let round = require("./round.js")
  let abs = require("./abs.js")

  let x = [2, 2, 2, 3, 4, 2, 2]
  let yTrue = 5
  let yPred = count(x, 2)
  assert(yTrue === yPred)

  x = [true, true, false, false, false, "a", "a", "a", "a", "a"]
  yTrue = [2, 3, 5]
  yPred = count(x, [true, false, "a"])
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `count([true, true, false, false, false, "a", "a", "a", "a", "a"], [true, false, "a"]) should be [2, 3, 5]!`)

  x = round(random([10000]))
  let y1 = count(x, 0)
  let y2 = count(x, 1)
  assert(abs(y1 - 5000) < 0.05 * 5000, `count(round(random([10000])), 0) should be approximately 5000!`)
  assert(abs(y2 - 5000) < 0.05 * 5000, `count(round(random([10000])), 1) should be approximately 5000!`)

  assert(count([2, 3, 4]) === 0, `count([2, 3, 4]) should be 0!`)

  let hasFailed

  try {
    hasFailed = false
    count()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count() should have failed!`)

  try {
    hasFailed = false
    count(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(234) should have failed!`)

  try {
    hasFailed = false
    count(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(true) should have failed!`)

  try {
    hasFailed = false
    count("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count("foo") should have failed!`)

  try {
    hasFailed = false
    count({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count({}) should have failed!`)

  try {
    hasFailed = false
    count(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(() => {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./flatten.js":21,"./is-array.js":23,"./is-undefined.js":29,"./random.js":43,"./round.js":46}],18:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let mean = require("./mean.js")

function covariance(x, y){
  assert(!isUndefined(x) && !isUndefined(y), "You must pass two equally-sized one-dimensional arrays into the `covariance` function!")

  assert(isArray(x) && isArray(y), "The `covariance` function only works on two equally-sized one-dimensional arrays of numbers!")

  x.concat(y).forEach(function(v){
    assert(isNumber(v), "The `covariance` function only works on two equally-sized one-dimensional arrays of numbers!")
  })

  assert(x.length === y.length, "The two one-dimensional arrays passed into the `covariance` function must be of equal length!")

  let mx = mean(x)
  let my = mean(y)
  let out = 0
  for (let i=0; i<x.length; i++) out += (x[i] - mx) * (y[i] - my)
  return out / x.length
}

module.exports = covariance

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let chop = require("./chop.js")

  let x = [2, 3, 4]
  let y = [1, 1, 1]
  let cv = covariance(x, y)
  assert(cv === 0, `covariance([2, 3, 4], [1, 1, 1]) should be 0, but instead was ${cv}!`)

  x = normal([10000])
  y = normal([10000])
  cv = covariance(x, y)
  assert(abs(cv) < 0.05, `covariance(normal([10000]), normal(10000)) should be approximately 0, but instead is ${cv}!`)

  y = covariance(x, x)
  assert(y > 0.95, `covariance(x, x) should be approximately 1, but instead is ${y}!`)

  assert(isNaN(covariance([], [])), `covariance([], []) should be NaN!`)

  let hasFailed

  try {
    hasFailed = false
    covariance([1, 2, 3], [1, 2, 3, 4])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([1, 2, 3], [1, 2, 3, 4]) should have failed!`)

  try {
    hasFailed = false
    covariance(["foo", "bar", "baz"], ["a", "b", "c"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance(["foo", "bar", "baz"], ["a", "b", "c"]) should have failed!`)

  try {
    let foo
    hasFailed = false
    covariance([foo], [foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([foo], [foo]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    covariance([fn], [fn])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([fn], [fn]) should have failed!`)

  try {
    hasFailed = false
    covariance({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance({}, {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./chop.js":12,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./mean.js":34,"./normal.js":39}],19:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let shape = require("./shape.js")
let flatten = require("./flatten.js")
let pow = require("./pow.js")
let sum = require("./sum.js")
let add = require("./add.js")
let scale = require("./scale.js")

function distance(a, b){
  assert(!isUndefined(a) && !isUndefined(b), "You must pass two congruently-shaped arrays of numbers into the `distance` function!")

  let shape1 = shape(a)
  let shape2 = shape(b)

  assert(shape1.length === shape2.length, "You must pass two congruently-shaped arrays of numbers into the `distance` function!")

  assert(sum(add(shape1, scale(shape2, -1))) === 0, "You must pass two congruently-shaped arrays of numbers into the `distance` function!")

  flatten(a).concat(flatten(b)).forEach(function(value){
    assert(isNumber(value), "The `distance` function only works on numbers!")
  })

  return pow(sum(pow(add(a, scale(b, -1)), 2)), 0.5)
}

module.exports = distance

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")

  let a = [4, 6]
  let b = [1, 2]
  assert(distance(a, b) === 5, `distance([4, 6], [1, 2]) should be 5!`)

  a = [-2, -2]
  b = [-1, -1]
  assert(distance(a, b) === pow(2, 0.5), `distance([-2, -2], [-1, -1]) should be sqrt(2)!`)

  a = normal([5, 5, 5, 5])
  assert(distance(a, a) === 0, `distance(x, x) should be 0!`)

  let hasFailed

  try {
    hasFailed = false
    distance()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance() should have failed!`)

  try {
    hasFailed = false
    distance(normal(5), normal(6))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance(normal(5), normal(6)) should have failed!`)

  try {
    hasFailed = false
    distance(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance(true, false) should have failed!`)

  try {
    hasFailed = false
    distance("foo", "bar")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance("foo", "bar") should have failed!`)

  try {
    hasFailed = false
    distance({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance({}, {}) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    distance(fn, fn,)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    distance(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance(foo, foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./add.js":7,"./flatten.js":21,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./pow.js":42,"./scale.js":47,"./shape.js":50,"./sum.js":58}],20:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isEqual = require("./is-equal.js")
let flatten = require("./flatten.js")
let shape = require("./shape.js")
let sum = require("./sum.js")
let scale = require("./scale.js")
let transpose = require("./transpose.js")

function dot(a, b){
  assert(!isUndefined(a) && !isUndefined(b), "You must pass two arrays of numbers into the `dot` function!")
  assert(isArray(a) && isArray(b), "You must pass two arrays of numbers into the `dot` function!")

  flatten(a).concat(flatten(b)).forEach(function(val){
    assert(isNumber(val), "The `dot` function only works on numbers!")
  })

  let aShape = shape(a)
  let bShape = shape(b)

  assert(aShape.length <= 2 && bShape.length <= 2, "I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!")
  assert(aShape[aShape.length-1] === bShape[0], `There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${aShape[aShape.length-1]} !== ${bShape[0]})`)

  if (aShape.length === 1 && bShape.length === 1){
    return sum(scale(a, b))
  } else if (aShape.length === 1 && bShape.length === 2){
    return transpose(b).map(col => dot(a, col))
  } else if (aShape.length === 2 && bShape.length === 1){
    return a.map(row => dot(row, b))
  } else if (aShape.length === 2 && bShape.length === 2){
    let bTranspose = transpose(b)
    let out = []

    for (let i=0; i<a.length; i++){
      let row = []

      for (let j=0; j<bTranspose.length; j++){
        row.push(dot(a[i], bTranspose[j]))
      }

      out.push(row)
    }

    return out
  }
}

module.exports = dot

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")

  let a = [2, 3, 4]
  let b = [5, 6, 7]
  let yTrue = 56
  let yPred = dot(a, b)
  assert(isEqual(yTrue, yPred), `dot([2, 3, 4], [5, 6, 7]) should be 56!`)

  a = [[2, 3], [4, 5], [6, 7]]
  b = [[8, 9, 10], [11, 12, 13]]
  yTrue = [[49, 54, 59], [87, 96, 105], [125, 138, 151]]
  yPred = dot(a, b)
  assert(isEqual(yTrue, yPred), `dot([[2, 3], [4, 5], [6, 7]], [[8, 9, 10], [11, 12, 13]]) should be [[49, 54, 59], [87, 96, 105], [125, 138, 151]]!`)

  a = [4, 3, 2, 1]
  b = [[12, 11], [10, 9], [8, 7], [6, 5]]
  yTrue = [100, 90]
  yPred = dot(a, b)
  assert(isEqual(yTrue, yPred), `dot([4, 3, 2, 1], [[12, 11], [10, 9], [8, 7], [6, 5]]) should be [100, 90]!`)

  a = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]
  b = [11, 12, 13, 14, 15]
  yTrue = [205, 530]
  yPred = dot(a, b)
  assert(isEqual(yTrue, yPred), `dot([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], [11, 12, 13, 14, 15]) should be [100, 90]!`)

  let hasFailed

  try {
    hasFailed = false
    dot()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot() should have failed!`)

  try {
    hasFailed = false
    dot(2, 3)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(2, 3) should have failed!`)

  try {
    hasFailed = false
    dot(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(true, false) should have failed!`)

  try {
    hasFailed = false
    dot("foo", "bar")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot("foo", "bar") should have failed!`)

  try {
    hasFailed = false
    dot(normal([2, 3]), normal([2, 3]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(normal([2, 3]), normal([2, 3])) should have failed!`)

  try {
    hasFailed = false
    dot(normal([2, 3, 4]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot([2, 3, 4]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    dot(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    dot(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(foo, foo) should have failed!`)

  try {
    hasFailed = false
    dot({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot({}, {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./flatten.js":21,"./is-array.js":23,"./is-equal.js":25,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./scale.js":47,"./shape.js":50,"./sum.js":58,"./transpose.js":60}],21:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")

function flatten(arr){
  assert(!isUndefined(arr), "You must pass one array into the `flatten` function!")
  assert(isArray(arr), "The `flatten` function only works on arrays!")

  let out = []

  arr.forEach(function(value){
    if (isArray(value)){
      out = out.concat(flatten(value))
    } else {
      out.push(value)
    }
  })

  return out
}

module.exports = flatten

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")

  let x = [2, 3, 4]
  let yTrue = [2, 3, 4]
  let yPred = flatten(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `flatten([2, 3, 4]) should be [2, 3, 4]!`)

  x = [[2, 3, 4], [5, 6, 7]]
  yTrue = [2, 3, 4, 5, 6, 7]
  yPred = flatten(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `flatten([[2, 3, 4], [5, 6, 7]]) should be [2, 3, 4, 5, 6, 7]!`)

  x = normal([2, 3, 4, 5])
  yPred = flatten(x)
  assert(yPred.length === 120, `flatten(normal([2, 3, 4, 5])) should have 120 values!`)

  let hasFailed

  try {
    hasFailed = false
    flatten()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten() should have failed!`)

  try {
    hasFailed = false
    flatten({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten({}) should have failed!`)

  try {
    hasFailed = false
    flatten(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten(true) should have failed!`)

  try {
    hasFailed = false
    flatten("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten("foo") should have failed!`)

  try {
    hasFailed = false
    flatten(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten(() => {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-array.js":23,"./is-undefined.js":29,"./normal.js":39}],22:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let floor = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `floor` function!")

  assert(isNumber(x), "The `floor` function only works on numbers!")

  return Math.floor(x)
})

module.exports = floor

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")
  let zeros = require("./zeros.js")

  let x = 5.95
  let yTrue = 5
  let yPred = floor(x)
  assert(yTrue === yPred, `floor(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = -3.25
  yTrue = -4
  yPred = floor(x)
  assert(yTrue === yPred, `floor(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [1.25, 2.5, 3.75]
  yTrue = [1, 2, 3]
  yPred = floor(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `floor(${x[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = random([500])
  yTrue = zeros([500])
  yPred = floor(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `floor(${x[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    floor("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor("foo") should have failed!`)

  try {
    hasFailed = false
    floor({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor({}) should have failed!`)

  try {
    hasFailed = false
    floor([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor([1, 2, "three"]) should have failed!`)

  try {
    let foo
    hasFailed = false
    floor(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor(foo) should have failed!`)

  try {
    hasFailed = false
    floor(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor(() => {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./random.js":43,"./vectorize.js":62,"./zeros.js":63}],23:[function(require,module,exports){
function isArray(obj){
  return obj instanceof Array
}

module.exports = isArray

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")

  assert(isArray([]), `isArray([]) should return true!`)
  assert(isArray([2, 3, 4]), `isArray([2, 3, 4]) should return true!`)
  assert(isArray(new Array()), `isArray(new Array()) should return true!`)
  assert(!isArray({}), `isArray({}) should return false!`)
  assert(!isArray({push: () => {}}), `isArray({push: () => {}}) should return false!`)
  assert(!isArray("foo"), `isArray("foo") should return false!`)
  assert(!isArray(true), `isArray(true) should return false!`)
  assert(!isArray(false), `isArray(false) should return false!`)
  assert(!isArray(() => {}), `isArray(() => {}) should return false!`)
  assert(!isArray(3), `isArray(3) should return false!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66}],24:[function(require,module,exports){
function isBoolean(x){
  return typeof(x) === "boolean"
}

module.exports = isBoolean

},{}],25:[function(require,module,exports){
let isArray = require("./is-array.js")

function isEqual(a, b){
  let aType = typeof(a)
  let bType = typeof(b)
  if (aType !== bType) return false

  if (aType === "undefined") return true
  if (aType === "boolean") return a === b
  if (aType === "number") return a === b
  if (aType === "string") return a === b

  if (aType === "object"){
    if (a === null || b === null){
      return a === null && b === null
    } else {
      let aKeys = Object.keys(a)
      let bKeys = Object.keys(b)
      if (aKeys.length !== bKeys.length) return false

      for (let i=0; i<aKeys.length; i++){
        let key = aKeys[i]
        if (!b.hasOwnProperty(key)) return false
        if (!isEqual(a[key], b[key])) return false
      }

      return true
    }
  }
}

module.exports = isEqual

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")

  assert(isEqual(2, 2), `isEqual(2, 2) should be true!`)
  assert(isEqual(-3.5, -3.5), `isEqual(-3.5, -3.5) should be true!`)
  assert(isEqual("foo", "foo"), `isEqual("foo", "foo") should be true!`)
  assert(isEqual(true, true), `isEqual(true, true) should be true!`)
  assert(isEqual(false, false), `isEqual(false, false) should be true!`)
  assert(isEqual({}, {}), `isEqual({}, {}) should be true!`)
  assert(isEqual(undefined, undefined), `isEqual(undefined, undefined) should be true!`)
  assert(isEqual(null, null), `isEqual(null, null) should be true!`)
  assert(isEqual({x: 5}, {x: 5}), `isEqual({x: 5}, {x: 5}) should be true!`)
  assert(isEqual([2, 3, 4], [2, 3, 4]), `isEqual([2, 3, 4], [2, 3, 4]) should be true!`)

  let a = {name: "James", friends: ["Bill", "Sally"]}
  let b = {name: "James", friends: ["Bill", "Sally"]}
  assert(isEqual(a, b), `isEqual(a, b) should be true!`)

  let others = [2, -3.5, "foo", true, false, {}, undefined, null, {x: 5}, [2, 3, 4], {name: "James", friends: ["Bill", "Sally"]}]

  for (let i=0; i<others.length-1; i++){
    for (let j=i; j<others.length; j++){
      if (i !== j){
        a = others[i]
        b = others[j]
        assert(!isEqual(a, b), `isEqual(a, b) should be false! (a: ${JSON.stringify(a)}, b: ${JSON.stringify(b)})`)
      }
    }
  }

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-array.js":23}],26:[function(require,module,exports){
function isFunction(fn){
  return typeof(fn) === "function"
}

module.exports = isFunction

},{}],27:[function(require,module,exports){
function isNumber(x){
  return typeof(x) === "number"
}

module.exports = isNumber

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")

  assert(isNumber(3), `3 is a number!`)
  assert(isNumber(-3.5), `-3.5 is a number!`)
  assert(isNumber(2573.2903482093482035023948, `2573.2903482093482035023948 is a number!`))
  assert(!isNumber("35"), `"35" is not a number!`)
  assert(!isNumber("foo"), `"foo" is not a number!`)
  assert(!isNumber([2, 3, 4]), `[2, 3, 4] is not a number!`)
  assert(!isNumber({x: 5}), "{x: 5} is not a number!")
  assert(!isNumber(true), `true is not a number!`)
  assert(!isNumber(false), `false is not a number!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66}],28:[function(require,module,exports){
function isString(s){
  return typeof(s) === "string"
}

module.exports = isString

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")

  assert(isString("hi"), `"hi" is a string!`)
  assert(isString(""), `"" is a string!`)
  assert(isString(``), `\`\` is a string!`)
  assert(isString('foo', `'foo' is a string!`))
  assert(!isString(3), `3 is not a string!`)
  assert(!isString(true), `true is not a string!`)
  assert(!isString(false), `false is not a string!`)
  assert(!isString({x: 5}), `{x: 5} is not a string!`)
  assert(!isString(["a", "b", "c"]), `["a", "b", "c"] is not a string!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66}],29:[function(require,module,exports){
function isUndefined(x){
  return x === null || typeof(x) === "undefined"
}

module.exports = isUndefined

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")

  assert(!isUndefined("foo"), `isUndefined("foo") should be false, but instead was true!`)
  assert(!isUndefined({}), `isUndefined({}) should be false, but instead was true!`)
  assert(!isUndefined(3), `isUndefined(3) should be false, but instead was true!`)
  assert(!isUndefined([]), `isUndefined([]) should be false, but instead was true!`)
  assert(!isUndefined(true), `isUndefined(true) should be false, but instead was true!`)
  assert(!isUndefined(false), `isUndefined(false) should be false, but instead was true!`)
  assert(!isUndefined(() => {}), `isUndefined(() => {}) should be false, but instead was true!`)

  let x
  assert(isUndefined(x), `isUndefined(x) should be true, but instead was false!`)

  let hasFailed

  try {
    hasFailed = false
    isUndefined(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `isUndefined(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66}],30:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let lerp = vectorize(function(a, b, f){
  assert(!isUndefined(a) && !isUndefined(b) && !isUndefined(f), "You must pass exactly three numbers (or three equally-sized arrays of numbers) into the `lerp` function!")

  assert(isNumber(a) && isNumber(b) && isNumber(f), "The `lerp` function only works on numbers!")

  return f * (b - a) + a
})

module.exports = lerp

// tests
if (!module.parent && typeof(window) === "undefined"){
  let a = 0
  let b = 1
  let f = 1
  let c = lerp(a, b, f)
  assert(c === 1, `lerp(0, 1, 1) should be 1, but instead was ${c}!`)

  a = -1
  b = 1
  f = 0.5
  c = lerp(a, b, f)
  assert(c === 0, `lerp(-1, 1, 0.5) should be 0, but instead was ${c}!`)

  a = -100
  b = 100
  f = 0.75
  c = lerp(a, b, f)
  assert(c === 50, `lerp(-100, 100, 0.75) should be 50, but instead was ${c}!`)

  a = [1, 2, 3]
  b = [2, 3, 4]
  f = [0.5, 0.75, 0.9]
  let cTrue = [1.5, 2.75, 3.9]
  let cPred = lerp(a, b, f)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `lerp(${a[i]}, ${b[i]}, ${f[i]}) should be ${cTrue[i]}, but instead was ${cPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    lerp(3, 4, "foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(3, 4, "foo") should have failed!`)

  try {
    hasFailed = false
    lerp([1], [2, 3], 0.75)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp([1], [2, 3], 0.75) should have failed!`)

  try {
    hasFailed = false
    lerp({}, {}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp({}, {}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    lerp(foo, foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(foo, foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    lerp(fn, fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(fn, fn, fn) should have failed!`)

  try {
    hasFailed = false
    lerp(1, 2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(1, 2) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],31:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let log = vectorize(function(x, base){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `log` function!")
  assert(isNumber(x), "You must pass a single number or a single array of numbers into the `log` function!")

  base = isUndefined(base) ? Math.E : base
  assert(isNumber(base), "The base parameter of the `log` function must be a number or an array of numbers!")

  return Math.log(x) / Math.log(base)
})

module.exports = log

// tests
if (!module.parent && typeof(window) === "undefined"){
  let abs = require("./abs.js")
  let chop = require("./chop.js")

  let x = Math.E
  let base = Math.E
  let yTrue = 1
  let yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 10
  base = 10
  yTrue = 1
  yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 100
  base = 10
  yTrue = 2
  yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [100, 1000, 10000]
  base = 10
  yTrue = [2, 3, 4]
  yPred = log(x, base)
  for (let i=0; i<yTrue.length; i++) assert(chop(abs(yTrue[i] - yPred[i])) === 0, `log(${x[i]}, ${base}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = 64
  base = [2, 4, 8]
  yTrue = [6, 3, 2]
  yPred = log(x, base)
  for (let i=0; i<yTrue.length; i++) assert(chop(abs(yTrue[i] - yPred[i])) === 0, `log(${x[i]}, ${base}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  assert(log([]).length === 0, `log([]) should have produced an empty array!`)

  let hasFailed

  try {
    hasFailed = false
    log()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log() should have failed!`)

  try {
    hasFailed = false
    log("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log("foo") should have failed!`)

  try {
    hasFailed = false
    log({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log({}) should have failed!`)

  try {
    hasFailed = false
    log(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(true) should have failed!`)

  try {
    hasFailed = false
    log(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    log(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./chop.js":12,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],32:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let map = vectorize(function(x, a, b, c, d){
  assert(!isUndefined(x) && !isUndefined(a) && !isUndefined(b) && !isUndefined(c) && !isUndefined(d), "You should pass five numbers (or five equally-sized arrays of numbers) into the `map` function!")

  assert(isNumber(x) && isNumber(a) && isNumber(b) && isNumber(c) && isNumber(d), "The `map` function only works on numbers!")

  return (d - c) * (x - a) / (b - a) + c
})

module.exports = map

// tests
if (!module.parent && typeof(window) === "undefined"){
  let x = 1
  let a = 0
  let b = 2
  let c = 0
  let d = 10
  let yTrue = 5
  let yPred = map(x, a, b, c, d)
  assert(yTrue === yPred, `map(${x}, ${a}, ${b}, ${c}, ${c}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 2
  a = 1
  b = 3
  c = 100
  d = 500
  yTrue = 300
  yPred = map(x, a, b, c, d)
  assert(yTrue === yPred, `map(${x}, ${a}, ${b}, ${c}, ${c}) should be ${yTrue}, but instead is ${yPred}!`)

  x = [1, 2, 3]
  a = 0
  b = 4
  c = 100
  d = 500
  yTrue = [200, 300, 400]
  yPred = map(x, a, b, c, d)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `map(${x[i]}, ${a}, ${b}, ${c}, ${d}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    map(1, 2, 3, 4, "five")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, "five") should have failed!`)

  try {
    hasFailed = false
    map()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map() should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    map(1, 2, 3, 4, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, foo) should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, () => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, () => {}) should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, true) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],33:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let flatten = require("./flatten.js")

function max(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `max` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `max` function!")

  let temp = flatten(arr)

  temp.forEach(function(value){
    assert(isNumber(value), "The `max` function only works on numbers or arrays of numbers!")
  })

  let out = -Infinity

  temp.forEach(function(x){
    if (x > out){
      out = x
    }
  })

  return out === -Infinity ? undefined : out
}

module.exports = max

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let random = require("./random.js")
  let min = require("./min.js")

  let x = [2, 3, 4]
  let y = max(x)
  assert(y === 4, `max([2, 3, 4]) should be 4, but instead was ${y}!`)

  x = [-10, -5, -20]
  y = max(x)
  assert(y === -5, `max([-10, -5, -20]) should be -5, but instead was ${y}!`)

  x = random([10000])
  y = max(x)
  assert(y <= 1 && y >= 0, `max(random([10000])) should be >= 0 and <= 1!`)

  x = normal([10000])
  xMin = min(x)
  xMax = max(x)
  xRange = xMax - xMin
  x = x.map(v => (v - xMin) / xRange)
  assert(max(x) === 1, `max(normalizedData) should be 1!`)

  let hasFailed

  try {
    hasFailed = false
    max()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max() should have failed!`)

  try {
    hasFailed = false
    max(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(2) should have failed!`)

  try {
    hasFailed = false
    max(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(true) should have failed!`)

  try {
    hasFailed = false
    max({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max({}) should have failed!`)

  try {
    hasFailed = false
    max(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(() => {}) should have failed!`)

  try {
    hasFailed = false
    max([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    max("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max("foo") should have failed!`)

  try {
    let foo
    hasFailed = false
    max(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./flatten.js":21,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./min.js":36,"./normal.js":39,"./random.js":43}],34:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let sum = require("./sum.js")

function mean(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `mean` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `mean` function!")

  let temp = flatten(arr)

  temp.forEach(function(value){
    assert(isNumber(value), "The `mean` function only works on arrays of numbers!")
  })

  return sum(temp) / temp.length
}

module.exports = mean

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let random = require("./random.js")
  let abs = require("./abs.js")

  let x = [2, 3, 4]
  let yTrue = 3
  let yPred = mean(x)
  assert(yTrue === yPred, `mean(2, 3, 4) should be 3, but instead is ${yPred}!`)

  x = normal([10000])
  yPred = mean(x)
  assert(abs(yPred) < 0.05, `mean(normal([10000])) should be approximately 0, but instead was ${yPred}!`)

  x = random([10000])
  yPred = mean(x)
  assert(yPred - 0.5 < 0.05, `mean(random([10000])) should be approximately 0.5, but instead was ${yPred}!`)

  x = normal([10, 10, 10, 10])
  yPred = mean(x)
  assert(abs(yPred) < 0.05, `mean(normal([10, 10, 10, 10])) should be approximately 0, but instead was ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    mean()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean() should have failed!`)

  try {
    hasFailed = false
    mean("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean("foo") should have failed!`)

  try {
    hasFailed = false
    mean({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean({}) should have failed!`)

  try {
    hasFailed = false
    mean(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(true) should have failed!`)

  try {
    let foo
    hasFailed = false
    mean(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(foo) should have failed!`)

  try {
    hasFailed = false
    mean(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(() => {}) should have failed!`)

  try {
    hasFailed = false
    mean([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./flatten.js":21,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./random.js":43,"./sum.js":58}],35:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let sort = require("./sort.js")

function median(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `median` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `median` function!")

  let temp = flatten(arr)

  temp.forEach(function(item){
    assert(isNumber(item), "The `median` function only works on numbers!")
  })

  temp = sort(temp, function(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })

  let out

  if (temp.length % 2 === 0){
    out = (temp[temp.length / 2 - 1] + temp[temp.length / 2]) / 2
  } else {
    out = temp[Math.floor(temp.length / 2)]
  }

  return out
}

module.exports = median

// tests
if (!module.parent && typeof(window) === "undefined"){
  let shuffle = require("./shuffle.js")
  let normal = require("./normal.js")
  let random = require("./random.js")
  let round = require("./round.js")
  let scale = require("./scale.js")

  let x = [2, 4, 3]
  let yTrue = 3
  let yPred = median(x)
  assert(yTrue === yPred, `median([2, 4, 3]) should be 3, but instead was ${yPred}!`)

  let x1 = round(scale(random([5, 5, 5, 5]), 100))
  let x2 = shuffle(x1)
  let x3 = shuffle(x1)
  let x4 = shuffle(x1)
  let y1 = median(x1)
  let y2 = median(x2)
  let y3 = median(x3)
  let y4 = median(x4)
  assert(y1 === y2 && y2 === y3 && y3 === y4, "The `median` function should return the same median for shuffled versions of the same array!")

  assert(isNaN(median([])), `median([]) should be NaN!`)

  let hasFailed

  try {
    hasFailed = false
    median()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median() should have failed!`)

  try {
    hasFailed = false
    median("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median("foo") should have failed!`)

  try {
    hasFailed = false
    median([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    median([true])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([true]) should have failed!`)

  try {
    hasFailed = false
    median([{}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([{}]) should have failed!`)

  try {
    let foo
    hasFailed = false
    median([foo, foo, foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([foo, foo, foo]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    median([fn, fn, fn,])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([fn, fn, fn]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./flatten.js":21,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./random.js":43,"./round.js":46,"./scale.js":47,"./shuffle.js":51,"./sort.js":55}],36:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")

function min(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `min` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `min` function!")

  let temp = flatten(arr)

  temp.forEach(function(item){
    assert(isNumber(item), "The `min` function only works on arrays of numbers!")
  })

  let out = Infinity

  temp.forEach(function(x){
    if (x < out){
      out = x
    }
  })

  return out === Infinity ? undefined : out
}

module.exports = min

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")

  let x = [4, 2, 3]
  let yTrue = 2
  let yPred = min(x)
  assert(yTrue === yPred, `min([4, 2, 3]) should be 2, but instead was ${yPred}!`)

  x = [[-50, 50, 234], [100, -100, 0]]
  yTrue = -100
  yPred = min(x)
  assert(yTrue === yPred, `min([[-50, 50, 234], [100, -100, 0]]) should be -100, but instead was ${yPred}!`)

  x = random([2, 3, 4, 5])
  yPred = min(x)
  assert(yPred <= 1 && yPred >= 0, `min(random([2, 3, 4, 5])) should be >= 0 and <= 1!`)

  let hasFailed

  try {
    hasFailed = false
    min()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min() should have failed!`)

  try {
    hasFailed = false
    min(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min(234) should have failed!`)

  try {
    hasFailed = false
    min({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min({}) should have failed!`)

  try {
    hasFailed = false
    min("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min("foo") should have failed!`)

  try {
    hasFailed = false
    min(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min(true) should have failed!`)

  try {
    hasFailed = false
    min([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    min([() => {}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([() => {}]) should have failed!`)

  try {
    let foo
    hasFailed = false
    min([foo, foo, foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([foo, foo, foo]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./flatten.js":21,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./random.js":43}],37:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let flatten = require("./flatten.js")
let count = require("./count.js")
let set = require("./set.js")
let sort = require("./sort.js")

function mode(arr){
  assert(!isUndefined(arr), "You must pass one array into the `mode` function!")
  assert(isArray(arr), "You  must pass one array into the `mode` function!")

  let temp = flatten(arr)
  let counts = {}
  let refs = {}
  let tempSet = set(temp)

  tempSet.forEach(function(item){
    counts[item] = count(temp, item)
    refs[item] = item
  })

  let sortedTempSet = sort(tempSet, function(a, b){
    let count1 = counts[a]
    let count2 = counts[b]

    if (count1 > count2) return -1
    if (count1 < count2) return 1
    return 0
  })

  let mostCountedItem = sortedTempSet[0]
  let out = sortedTempSet.filter(item => counts[item] === counts[mostCountedItem])
  return out
}

module.exports = mode

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")
  let round = require("./round.js")
  let shuffle = require("./shuffle.js")
  let scale = require("./scale.js")

  let x = [2, 3, 3, 3, 2, 4]
  let yTrue = [3]
  let yPred = mode(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `mode([2, 3, 3, 3, 2, 4]) should be 3, but instead was ${yPred}!`)

  let x1 = round(scale(random([5, 5, 5, 5]), 100))
  let x2 = shuffle(x1)
  let x3 = shuffle(x1)
  let x4 = shuffle(x1)
  let y1 = mode(x1)
  let y2 = mode(x2)
  let y3 = mode(x3)
  let y4 = mode(x4)
  for (let i=0; i<y1.length; i++) assert(y1[i] === y2[i], "The `mode` function should return the same mode for shuffled versions of the same array!")
  for (let i=0; i<y1.length; i++) assert(y2[i] === y3[i], "The `mode` function should return the same mode for shuffled versions of the same array!")
  for (let i=0; i<y1.length; i++) assert(y3[i] === y4[i], "The `mode` function should return the same mode for shuffled versions of the same array!")

  let hasFailed

  try {
    hasFailed = false
    mode()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode() should have failed!`)

  try {
    hasFailed = false
    mode("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode("foo") should have failed!`)

  try {
    hasFailed = false
    mode({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode({}) should have failed!`)

  try {
    hasFailed = false
    mode(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode(() => {}) should have failed!`)

  try {
    hasFailed = false
    mode(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode(true) should have failed!`)

  try {
    hasFailed = false
    mode()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode() should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./count.js":17,"./flatten.js":21,"./is-array.js":23,"./is-undefined.js":29,"./random.js":43,"./round.js":46,"./scale.js":47,"./set.js":49,"./shuffle.js":51,"./sort.js":55}],38:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let floor = require("./floor.js")
let range = require("./range.js")

let error = "You must pass an integer or a one-dimensional array of integers into the `ndarray` function!"

function ndarray(shape){
  assert(!isUndefined(shape), error)

  if (!isArray(shape)) shape = [shape]

  assert(shape.length > 0, error)

  shape.forEach(function(x){
    assert(isNumber(x), error)
    assert(floor(x) === x, error)
    assert(x >= 0, error)
  })

  if (shape.length === 1){
    return range(0, shape[0]).map(v => undefined)
  } else {
    let out = []
    for (let i=0; i<shape[0]; i++) out.push(ndarray(shape.slice(1, shape.length)))
    return out
  }
}

module.exports = ndarray

// tests
if (!module.parent && typeof(window) === "undefined"){
  let flatten = require("./flatten.js")

  assert(ndarray(3).length === 3, `ndarray(3) should have a length of 3!`)
  assert(ndarray([3]).length === 3, `ndarray([3]) should have a length of 3!`)
  assert(ndarray([3, 2]).length === 3, `ndarray([3, 2]) should have a length of 3!`)
  assert(flatten(ndarray([2, 3, 4])).length === 24, `flatten(ndarray([2, 3, 4])) should have a length of 24!`)

  let hasFailed

  try {
    hasFailed = false
    ndarray()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray() should have failed!`)

  try {
    hasFailed = false
    ndarray("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray("foo") should have failed!`)

  try {
    hasFailed = false
    ndarray(3.5)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(3.5) should have failed!`)

  try {
    hasFailed = false
    ndarray(-10)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(-10) should have failed!`)

  try {
    hasFailed = false
    ndarray({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray({}) should have failed!`)

  try {
    hasFailed = false
    ndarray(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(true) should have failed!`)

  try {
    hasFailed = false
    ndarray([])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray([]) should have failed!`)

  try {
    hasFailed = false
    ndarray(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    ndarray(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(foo) should have failed!`)

  try {
    hasFailed = false
    ndarray([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./flatten.js":21,"./floor.js":22,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./range.js":44}],39:[function(require,module,exports){
let isUndefined = require("./is-undefined.js")
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")
let random = require("./random.js")

function normal(shape){
  function n(){
    let u1 = random()
    let u2 = random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  if (isUndefined(shape)) return n()
  return apply(ndarray(shape), n)
}

module.exports = normal

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")
  let std = require("./std.js")
  let mean = require("./mean.js")
  let abs = require("./abs.js")
  let seed = require("./seed.js")
  let distance = require("./distance.js")

  let x = normal([10000])
  let m = mean(x)
  let s = std(x)

  assert(abs(m) < 0.05, `normal([10000]) should have a mean of approximately 0!`)
  assert(abs(s - 1) < 0.05, `normal([10000]) should have a standard deviation of approximately 1!`)

  x = normal([10, 10, 10, 10])
  m = mean(x)
  s = std(x)

  assert(abs(m) < 0.05, `normal([10, 10, 10, 10]) should have a mean of approximately 0!`)
  assert(abs(s - 1) < 0.05, `normal([10, 10, 10, 10]) should have a standard deviation of approximately 1!`)

  // seed(230498230498)
  // let a = normal(10000)
  // seed(230498230498)
  // let b = normal(10000)
  // assert(distance(a, b) === 0, "Two normally-distributed arrays seeded with the same value should be identical!")

  let hasFailed

  try {
    hasFailed = false
    normal("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normal("foo") should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/apply.js":65,"../misc/assert.js":66,"./abs.js":6,"./distance.js":19,"./is-undefined.js":29,"./mean.js":34,"./ndarray.js":38,"./random.js":43,"./seed.js":48,"./std.js":57}],40:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let min = require("./min.js")
let max = require("./max.js")
let apply = require("../misc/apply.js")

function normalize(arr){
  assert(!isUndefined(arr), "You must pass an array of numbers into the `normalize` function!")
  assert(isArray(arr), "You must pass an array of numbers into the `normalize` function!")

  flatten(arr).forEach(function(value){
    assert(isNumber(value), "The `normalize` function only works on numbers!")
  })

  let arrMin = min(arr)
  let arrMax = max(arr)
  let arrRange = arrMax - arrMin
  return apply(arr, v => (v - arrMin) / arrRange)
}

module.exports = normalize

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")
  let normal = require("./normal.js")
  let add = require("./add.js")
  let scale = require("./scale.js")

  let x = normal(10000)
  let y = normalize(x)
  assert(min(y) === 0, `The minimum value of normalize(normal(10000)) should be 0!`)
  assert(max(y) === 1, `The maximum value of normalize(normal(10000)) should be 1!`)

  x = add(scale(random(10000), 100), -250)
  y = normalize(x)
  assert(min(y) === 0, `The minimum value of normalize(add(scale(random(10000), 100), -250)) should be 0!`)
  assert(max(y) === 1, `The minimum value of normalize(add(scale(random(10000), 100), -250)) should be 1!`)

  let hasFailed

  try {
    hasFailed = false
    normalize()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize() should have failed!`)

  try {
    hasFailed = false
    normalize([true])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize(true) should have failed!`)

  try {
    hasFailed = false
    normalize(["foo"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize(["foo"]) should have failed!`)

  try {
    hasFailed = false
    normalize([{}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize([{}]) should have failed!`)

  try {
    let foo
    hasFailed = false
    normalize([foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize([foo]) should have failed!`)

  try {
    hasFailed = false
    normalize([() => {}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize([() => {}]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/apply.js":65,"../misc/assert.js":66,"./add.js":7,"./flatten.js":21,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./max.js":33,"./min.js":36,"./normal.js":39,"./random.js":43,"./scale.js":47}],41:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function ones(shape){
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")
  let sum = require("./sum.js")
  let mean = require("./mean.js")
  let std = require("./std.js")
  let flatten = require("./flatten.js")

  let x = ones([2, 3, 4, 5])
  assert(sum(x) === 2 * 3 * 4 * 5, `sum(ones([2, 3, 4, 5])) should be 2 * 3 * 4 * 5!`)
  assert(mean(x) === 1, `mean(ones([2, 3, 4, 5])) should be 1!`)
  assert(std(x) === 0, `std(ones([2, 3, 4, 5])) should be 0!`)
  assert(sum(x) === flatten(x).length, `sum(ones([2, 3, 4, 5])) should be the same as flatten(ones([2, 3, 4, 5])).length!`)

  let hasFailed

  try {
    hasFailed = false
    ones()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones() should have failed!`)

  try {
    hasFailed = false
    ones("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones("foo") should have failed!`)

  try {
    hasFailed = false
    ones(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones(true) should have failed!`)

  try {
    hasFailed = false
    ones({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones({}) should have failed!`)

  try {
    let foo
    hasFailed = false
    ones(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones(foo) should have failed!`)

  try {
    hasFailed = false
    ones([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    ones(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones(() => {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/apply.js":65,"../misc/assert.js":66,"./flatten.js":21,"./mean.js":34,"./ndarray.js":38,"./std.js":57,"./sum.js":58}],42:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")

let pow = vectorize(function(x, p){
  assert(!isUndefined(x) && !isUndefined(p), "You must pass two numbers (or two equally-sized arrays of numbers) into the `pow` function!")
  assert(isNumber(x) && isNumber(p), "You must pass two numbers (or two equally-sized arrays of numbers) into the `pow` function!")

  return Math.pow(x, p)
})

module.exports = pow

// tests
if (!module.parent && typeof(window) === "undefined"){
  let x = 3
  let p = 2
  let yTrue = 9
  let yPred = pow(x, p)
  assert(yTrue === yPred, `pow(${x}, ${p}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [3, 4, 5]
  p = 2
  yTrue = [9, 16, 25]
  yPred = pow(x, p)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `pow(${x[i]}, ${p}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = 3
  p = [2, 3, 4]
  yTrue = [9, 27, 81]
  yPred = pow(x, p)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `pow(${x}, ${p[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = [2, 3, 4]
  p = [2, 3, 4]
  yTrue = [4, 27, 256]
  yPred = pow(x, p)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `pow(${x[i]}, ${p[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    pow()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow() should have failed!`)

  try {
    hasFailed = false
    pow(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(2) should have failed!`)

  try {
    hasFailed = false
    pow(2, "three")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(2, "three") should have failed!`)

  try {
    hasFailed = false
    pow("two", 3)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow("two", 3) should have failed!`)

  try {
    hasFailed = false
    pow(true, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(true, true) should have failed!`)

  try {
    hasFailed = false
    pow({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow({}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    pow(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    pow(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(fn, fn) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],43:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")
let isUndefined = require("./is-undefined.js")
// let seed = require("./seed.js")

// function lcg(){
//   let a = 13
//   let c = 911
//   let m = 11584577
//   let s = seed()
//   let out = (a * s + c) % m
//   seed(out)
//   return out / m
// }

function random(shape){
  if (isUndefined(shape)) return Math.random()
  return apply(ndarray(shape), random)
}

module.exports = random

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")
  let distance = require("./distance.js")
  let min = require("./min.js")
  let max = require("./max.js")
  let abs = require("./abs.js")
  let mean = require("./mean.js")

  let x = random([10, 10, 10, 10])
  assert(min(x) >= 0 && max(x) <= 1, `random([10, 10, 10, 10]) should be in the range [0, 1]!`)
  assert(abs(mean(x)) - 0.5 < 0.05, `random([10, 10, 10, 10]) should have a mean of approximately 0.5!`)

  x = random()
  assert(x >= 0 && x <= 1, `random() should be in the range [0, 1]!`)

  // seed(203948203948)
  // let a = random([10, 10, 10, 10])
  // seed(203948203948)
  // let b = random([10, 10, 10, 10])
  // assert(distance(a, b) === 0, "Two random arrays seeded with the same value should be identical!")

  let hasFailed

  try {
    hasFailed = false
    random("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random("foo") should have failed!`)

  try {
    hasFailed = false
    random(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random(true) should have failed!`)

  try {
    hasFailed = false
    random({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random({}) should have failed!`)

  try {
    hasFailed = false
    random(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random(() => {}) should have failed!`)

  try {
    hasFailed = false
    random([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/apply.js":65,"../misc/assert.js":66,"./abs.js":6,"./distance.js":19,"./is-undefined.js":29,"./max.js":33,"./mean.js":34,"./min.js":36,"./ndarray.js":38}],44:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")

function range(a, b, step=1){
  assert(!isUndefined(a) && !isUndefined(b) && !isUndefined(step), "You must pass two numbers and optionally a step value to the `range` function!")
  assert(isNumber(a) && isNumber(b) && isNumber(step), "You must pass two numbers and optionally a step value to the `range` function!")
  assert(step > 0, "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)")

  let shouldReverse = false

  if (a > b){
    shouldReverse = true
    let buffer = a
    a = b + step
    b = buffer + step
  }

  let out = []
  for (let i=a; i<b; i+=step) out.push(i)
  if (shouldReverse) out.reverse()
  return out
}

module.exports = range

// tests
if (!module.parent && typeof(window) === "undefined"){
  let yTrue = [5, 6, 7, 8, 9]
  let yPred = range(5, 10)
  for (let i=0; i<yTrue; i++) assert(yTrue[i] === yPred[i], `range(5, 10) should be [5, 6, 7, 8, 9]!`)

  yTrue = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5]
  yPred = range(5, 10, 0.5)
  for (let i=0; i<yTrue; i++) assert(yTrue[i] === yPred[i], `range(5, 10, 0.5) should be [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5]!`)

  yTrue = [3, 2, 1, 0, -1, -2]
  yPred = range(3, -3)
  for (let i=0; i<yTrue; i++) assert(yTrue[i] === yPred[i], `range(3, -3) should be [3, 2, 1, 0, -1, -2]!`)

  yTrue = [-1, -1.25, -1.5, -1.75]
  yPred = range(-1, -2, 0.25)
  for (let i=0; i<yTrue; i++) assert(yTrue[i] === yPred[i], `range(-1, -2, 0.25) should be [-1, -1.25, -1.5, -1.75]!`)

  let hasFailed

  try {
    hasFailed = false
    range()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range() should have failed!`)

  try {
    hasFailed = false
    range(1, 2, -3)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range(1, 2, -3) should have failed!`)

  try {
    hasFailed = false
    range("foo", "bar", "baz")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range("foo", "bar", "baz") should have failed!`)

  try {
    hasFailed = false
    range([], [], [])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range([], [], []) should have failed!`)

  try {
    hasFailed = false
    range(true, true, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range(true, true, true) should have failed!`)

  try {
    hasFailed = false
    range({}, {}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range({}, {}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    range(foo, foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range(foo, foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    range(fn, fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range(fn, fn, fn) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29}],45:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")

function reverse(arr){
  assert(!isUndefined(arr), "You must pass an array into the `reverse` function!")
  assert(isArray(arr), "You must pass an array into the `reverse` function!")

  let out = []
  for (let i=arr.length-1; i>=0; i--) out.push(arr[i])
  return out
}

module.exports = reverse

// tests
if (!module.parent && typeof(window) === "undefined"){
  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-array.js":23,"./is-undefined.js":29}],46:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let round = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `round` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `round` function!")

  return Math.round(x)
})

module.exports = round

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")
  let set = require("./set.js")
  let sort = require("./sort.js")

  let yTrue = 2
  let yPred = round(2.34)
  assert(yTrue === yPred, `round(2.34) should be 2, but instead was ${yPred}!`)

  yTrue = 3
  yPred = round(2.5)
  assert(yTrue === yPred, `round(2.5) should be 3, but instead was ${yPred}!`)

  yTrue = -4
  yPred = round(-3.75)
  assert(yTrue === yPred, `round(-3.75) should be -4, but instead was ${yPred}!`)

  yPred = sort(set(round(random([10, 10, 10, 10]))), function(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })

  assert(yPred[0] === 0 && yPred[1] === 1 && yPred.length === 2, `sort(set(round(random([10, 10, 10, 10])))) should be [0, 1]!`)

  let hasFailed

  try {
    hasFailed = false
    round()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round() should have failed!`)

  try {
    hasFailed = false
    round("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round("foo") should have failed!`)

  try {
    hasFailed = false
    round(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round(true) should have failed!`)

  try {
    hasFailed = false
    round({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round({}) should have failed!`)

  try {
    hasFailed = false
    round(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    round(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./random.js":43,"./set.js":49,"./sort.js":55,"./vectorize.js":62}],47:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let scale = vectorize(function(a, b){
  assert(!isUndefined(a) && !isUndefined(b), "You must pass two numbers (or an array of numbers and a number, or a number and an array of numbers, or two arrays of numbers) into the `scale` function!")
  assert(isNumber(a) && isNumber(b), "You must pass two numbers (or an array of numbers and a number, or a number and an array of numbers, or two arrays of numbers) into the `scale` function!")

  return a * b
})

module.exports = scale

// tests
if (!module.parent && typeof(window) === "undefined"){
  let a = 3
  let b = 5
  let yTrue = 15
  let yPred = scale(a, b)
  assert(yTrue === yPred, `scale(${a}, ${b}) should be ${yTrue}, but instead was ${yPred}!`)

  a = [3, 4, 5]
  b = 5
  yTrue = [15, 20, 25]
  yPred = scale(a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `scale(${a[i]}, ${b}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  a = 3
  b = [5, 6, 7]
  yTrue = [15, 18, 21]
  yPred = scale(a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `scale(${a}, ${b[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  a = [2, 3, 4]
  b = [5, 6, 7]
  yTrue = [10, 18, 28]
  yPred = scale(a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `scale(${a[i]}, ${b[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    scale()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale() should have failed!`)

  try {
    hasFailed = false
    scale("two", "three")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale("two", "three") should have failed!`)

  try {
    hasFailed = false
    scale(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale(true, false) should have failed!`)

  try {
    hasFailed = false
    scale({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale({}, {}) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    scale(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    scale(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale(foo, foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],48:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let s = parseInt(Math.random() * 999999)

function seed(val){
  if (!isUndefined(val)){
    assert(isNumber(val), "If passing a value into the `seed` function, then that value must be a positive integer!")
    assert(parseInt(val) === val, "If passing a value into the `seed` function, then that value must be a positive integer!")
    assert(val >= 0, "If passing a value into the `seed` function, then that value must be a positive integer!")
  }

  if (!isUndefined(val)) s = val
  else return s
}

module.exports = seed

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29}],49:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let flatten = require("./flatten.js")

function set(arr){
  assert(!isUndefined(arr), "You must pass an array into the `set` function!")
  assert(isArray(arr), "You must pass an array into the `set` function!")

  let out = []

  flatten(arr).forEach(function(item){
    if (out.indexOf(item) < 0) out.push(item)
  })

  return out
}

module.exports = set

// tests
if (!module.parent && typeof(window) === "undefined"){
  let sort = require("./sort.js")
  let round = require("./round.js")
  let random = require("./random.js")
  let range = require("./range.js")

  function alphasort(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  let x = [2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4]
  let yTrue = [2, 3, 4]
  let yPred = sort(set(x), alphasort)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `set([2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4]) should be [2, 3, 4]!`)

  x = round(random([10, 10, 10, 10]))
  yTrue = [0, 1]
  yPred = sort(set(x), alphasort)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `set(round(random([10, 10, 10, 10]))) should be [0, 1]!`)

  x = range(10, 20, 0.25)
  yTrue = x.slice()
  yPred = set(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `set(range(10, 20, 0.25)) should be the same as range(10, 20, 0.25)!`)

  x = ["foo", "bar", "baz", "foo", "foo", true, true, false, true, 234, 234, 0]
  yTrue = ["foo", "bar", "baz", true, false, 234, 0]
  yPred = set(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `set(["foo", "bar", "baz", "foo", "foo", true, true, false, true, 234, 234, 0]) should be ["foo", "bar", "baz", true, false, 234, 0]!`)

  let hasFailed

  try {
    hasFailed = false
    set()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set() should have failed!`)

  try {
    hasFailed = false
    set("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set("foo") should have failed!`)

  try {
    hasFailed = false
    set(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set(234) should have failed!`)

  try {
    hasFailed = false
    set(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set(true) should have failed!`)

  try {
    hasFailed = false
    set({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set({}) should have failed!`)

  try {
    hasFailed = false
    set(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    set(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./flatten.js":21,"./is-array.js":23,"./is-undefined.js":29,"./random.js":43,"./range.js":44,"./round.js":46,"./sort.js":55}],50:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let max = require("./max.js")

function shape(arr){
  assert(!isUndefined(arr), "You must pass an array into the `shape` function!")
  assert(isArray(arr), "You must pass an array into the `shape` function!")

  let out = [arr.length]
  let childrenAreArrays = arr.map(x => isArray(x))

  if (childrenAreArrays.indexOf(true) > -1){
    assert(childrenAreArrays.indexOf(false) < 0, "The array passed into the `shape` function has some children that are not themselves arrays!")

    let lengths = arr.map(x => x.length)
    let maxLength = max(lengths)

    lengths.forEach(function(length){
      assert(length === maxLength, "The array passed into the `shape` function has some children of inconsistent length!")
    })

    out = out.concat(shape(arr[0]))
  }

  return out
}

module.exports = shape

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")

  let yTrue = 500
  let yPred = shape(normal(yTrue))[0]
  assert(yTrue === yPred, `shape(normal(500)) should be 500, but instead was ${yPred}!`)

  yTrue = [2, 3, 4]
  yPred = shape(normal(yTrue))
  for (let i=0; i<yTrue.shape; i++) assert(yTrue[i] === yPred[i], `shape(normal([2, 3, 4])) should be [2, 3, 4]!`)

  let hasFailed

  try {
    hasFailed = false
    shape()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape() should have failed!`)

  try {
    hasFailed = false
    shape("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape("foo") should have failed!`)

  try {
    hasFailed = false
    shape(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape(234) should have failed!`)

  try {
    hasFailed = false
    shape(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape(true) should have failed!`)

  try {
    hasFailed = false
    shape({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape({}) should have failed!`)

  try {
    hasFailed = false
    shape(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    shape(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape(foo) should have failed!`)

  try {
    hasFailed = false
    shape([[2, 3, 4], [5, 6]])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape([[2, 3, 4], [5, 6]]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-array.js":23,"./is-undefined.js":29,"./max.js":33,"./normal.js":39}],51:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let floor = require("./floor.js")
let random = require("./random.js")

function shuffle(arr){
  assert(!isUndefined(arr), "You must pass a one-dimensional array into the `shuffle` function!")
  assert(isArray(arr), "You must pass a one-dimensional array into the `shuffle` function!")

  arr.forEach(function(item){
    assert(!isArray(item), "You must pass a one-dimensional array into the `shuffle` function!")
  })

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

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let seed = require("./seed.js")
  let distance = require("./distance.js")

  let a = normal(10000)
  let b = shuffle(a)

  assert(distance(a, b) > 0, `shuffle(a) should not be in the same order as a!`)

  // a = normal(10000)
  // seed(20394230948)
  // a1 = shuffle(a)
  // seed(20394230948)
  // a2 = shuffle(a)
  //
  // assert(distance(a1, a2) === 0, `Shuffling using the same seed should produce the same results!`)

  let hasFailed

  try {
    hasFailed = true
    shuffle()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle() should have failed!`)

  try {
    hasFailed = true
    shuffle("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle("foo") should have failed!`)

  try {
    hasFailed = true
    shuffle(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(true) should have failed!`)

  try {
    hasFailed = true
    shuffle({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle({}) should have failed!`)

  try {
    hasFailed = true
    shuffle(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(234) should have failed!`)

  try {
    hasFailed = true
    shuffle(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(() => {}) should have failed!`)

  try {
    hasFailed = true
    shuffle(random([2, 3, 4]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(random([2, 3, 4])) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./distance.js":19,"./floor.js":22,"./is-array.js":23,"./is-undefined.js":29,"./normal.js":39,"./random.js":43,"./seed.js":48}],52:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let sign = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `sign` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `sign` function!")

  if (x < 0) return -1
  if (x > 1) return 1
  return 0
})

module.exports = sign

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")
  let normal = require("./normal.js")
  let round = require("./round.js")
  let set = require("./set.js")
  let sort = require("./sort.js")
  let chop = require("./chop.js")
  let scale = require("./scale.js")
  let add = require("./add.js")

  function alphasort(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  let x = sort(set(sign(chop(normal(10000)))), alphasort)
  assert(x[0] === -1 && x[1] === 0 && x[2] === 1, `sort(set(sign(chop(normal(10000)))), alphasort) should be [-1, 0, 1]!`)

  x = sign(add(random(10000), 100))
  x.forEach(v => assert(v >= 0), `sign(add(random(10000), 100)) should only result in positive values!`)

  x = sign(scale(random(10000), -1))
  x.forEach(v => assert(v <= 0), `sign(scale(random(10000), -1)) should only result in negative values!`)

  let hasFailed

  try {
    hasFailed = false
    sign()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign() should have failed!`)

  try {
    hasFailed = false
    sign("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign("foo") should have failed!`)

  try {
    hasFailed = false
    sign(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign(true) should have failed!`)

  try {
    hasFailed = false
    sign({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign({}) should have failed!`)

  try {
    hasFailed = false
    sign(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    sign(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign(foo) should have failed!`)

  try {
    hasFailed = false
    sign([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./add.js":7,"./chop.js":12,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./random.js":43,"./round.js":46,"./scale.js":47,"./set.js":49,"./sort.js":55,"./vectorize.js":62}],53:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let sin = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `sin` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `sin` function!")

  return Math.sin(x)
})

module.exports = sin

// tests
if (!module.parent && typeof(window) === "undefined"){
  let min = require("./min.js")
  let max = require("./max.js")
  let range = require("./range.js")

  let x = sin(range(0, 10 * Math.PI, Math.PI / 180))
  assert(min(x) === -1 && max(x) === 1, `sin(range(0, 10 * Math.PI, Math.PI / 100)) should be in the range [-1, 1]!`)

  let hasFailed

  try {
    hasFailed = false
    sin()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin() should have failed!`)

  try {
    hasFailed = false
    sin("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin("foo") should have failed!`)

  try {
    hasFailed = false
    sin(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin(true) should have failed!`)

  try {
    hasFailed = false
    sin({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin({}) should have failed!`)

  try {
    hasFailed = false
    sin(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    sin(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-number.js":27,"./is-undefined.js":29,"./max.js":33,"./min.js":36,"./range.js":44,"./vectorize.js":62}],54:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let isArray = require("./is-array.js")
let range = require("./range.js")
let flatten = require("./flatten.js")
let shape = require("./shape.js")
let floor = require("./floor.js")

function slice(arr, indices){
  assert(!isUndefined(arr), "You must pass an array into the `slice` function!")
  assert(isArray(arr), "You must pass an array into the `slice` function!")

  if (isUndefined(indices)) return arr.slice()

  assert(isArray(indices), "The indices passed into the `slice` function must be a one-dimensional array of integers or null values.")

  flatten(indices).forEach(function(idx){
    assert(isUndefined(idx) || (isNumber(idx) && floor(idx) === idx), "The indices passed into the `slice` function must be a one-dimensional array of integers or null values.")
  })

  let idx = indices[0]
  if (isUndefined(idx)) idx = range(0, arr.length)
  if (isNumber(idx)) idx = [idx]

  let out = []

  idx.forEach(function(i){
    assert(i < arr.length, "Index out of bounds in the `slice` function!")
    if (i < 0) i += arr.length

    let item = arr[i]

    if (isArray(item)){
      out.push(slice(arr[i], indices.slice(1, indices.length)))
    } else {
      out.push(arr[i])
    }
  })

  if (shape(out).indexOf(1) > -1) out = flatten(out)

  return out
}

module.exports = slice

// tests
if (!module.parent && typeof(window) === "undefined"){
  let distance = require("./distance.js")

  let x = [[2, 3, 4], [5, 6, 7], [8, 9, 10]]
  let yTrue = [3, 6, 9]
  let yPred = slice(x, [null, 1])

  x = [[2, 3, 4], [5, 6, 7], [8, 9, 10]]
  yTrue = [[2, 3], [8, 9]]
  yPred = slice(x, [[0, 2], [0, 1]])

  assert(distance(yTrue, yPred) === 0, `slice([[2, 3, 4], [5, 6, 7], [8, 9, 10]], [[0, 2], [0, 1]]) should be [[2, 3], [8, 9]]!`)

  x = [5, 6, 7]
  assert(slice(x, [-1])[0] === 7, `slice([5, 6, 7], [-1]) should be [7]!`)

  x = [[2, 3, 4], [5, 6, 7], [8, 9, 10]]
  yTrue = [9]
  yPred = slice(x, [-1, -2])
  assert(distance(yTrue, yPred) === 0, `slice([[2, 3, 4], [5, 6, 7], [8, 9, 10]], [-1, -2]) should be [9]!`)

  let hasFailed

  try {
    hasFailed = false
    slice()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice() should have failed!`)

  try {
    hasFailed = false
    slice([2, 3, 4], [1.5, 2.5, 3.5])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice([2, 3, 4], [1.5, 2.5, 3.5]) should have failed!`)

  try {
    hasFailed = false
    slice([2, 3, 4], 0)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice([2, 3, 4], 0) should have failed!`)

  try {
    hasFailed = false
    slice("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice("foo") should have failed!`)

  try {
    hasFailed = false
    slice(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice(234) should have failed!`)

  try {
    hasFailed = false
    slice({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice({}) should have failed!`)

  try {
    hasFailed = false
    slice(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    slice(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./distance.js":19,"./flatten.js":21,"./floor.js":22,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./range.js":44,"./shape.js":50}],55:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")

function sort(arr, fn){
  assert(!isUndefined(arr) && !isUndefined(fn), "You must pass an array and a function into the `sort` function!")
  assert(isArray(arr), "You must pass an array and a function into the `sort` function!")
  assert(typeof(fn) === "function", "You must pass an array and a function into the `sort` function!")

  let out = arr.slice()
  out.sort(fn)
  return out
}

module.exports = sort

// tests
if (!module.parent && typeof(window) === "undefined"){
  let shuffle = require("./shuffle.js")
  let range = require("./range.js")
  let distance = require("./distance.js")
  let normal = require("./normal.js")

  function alphasort(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  let x = shuffle(range(1, 7))
  let yTrue = range(1, 7)
  let yPred = sort(x, alphasort)
  assert(distance(yTrue, yPred) === 0, `sort(shuffle(range(1, 7)), alphasort) should be range(1, 7)!`)

  x = [{x: 5}, {x: 3}, {x: 10}]
  yTrue = [{x: 10}, {x: 5}, {x: 3}]
  yPred = sort(x, function(a, b){
    if (a.x < b.x) return 1
    if (a.x > b.x) return -1
    return 0
  })

  for (let i=0; i<yPred.length-1; i++){
    assert(yPred[i].x > yPred[i+1].x, "The objects should've been reverse-sorted by x-value!")
  }

  x = normal(10000)
  yPred = sort(x, alphasort)

  for (let i=0; i<yPred.length-1; i++){
    assert(yPred[i] < yPred[i+1], `${yPred[i]} should be less than ${yPred[i+1]}!`)
  }

  x = ["b", "c", "a", "d", "f", "e"]
  yTrue = ["a", "b", "c", "d", "e", "f"]
  yPred = sort(x, alphasort)

  for (let i=0; i<yTrue.length; i++){
    assert(yTrue[i] === yPred[i], `sort(["b", "c", "a", "d", "f", "e"], alphasort) should be ["a", "b", "c", "d", "e", "f"]!`)
  }

  let hasFailed

  try {
    hasFailed = false
    sort()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort() should have failed!`)

  try {
    hasFailed = false
    sort([], [])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort([], []) should have failed!`)

  try {
    hasFailed = false
    sort("foo", "foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort("foo", "foo") should have failed!`)

  try {
    hasFailed = false
    sort(true, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort(true, true) should have failed!`)

  try {
    hasFailed = false
    sort({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort({}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    sort(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort(foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    sort(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort(fn, fn) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./distance.js":19,"./is-array.js":23,"./is-undefined.js":29,"./normal.js":39,"./range.js":44,"./shuffle.js":51}],56:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let sqrt = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `sqrt` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `sqrt` function!")
  assert(x >= 0, "The `sqrt` function only operates on zero or positive numbers!")

  return Math.sqrt(x)
})

module.exports = sqrt

// tests
if (!module.parent && typeof(window) === "undefined"){
  let distance = require("./distance.js")

  let x = 4
  let yTrue = 2
  let yPred = sqrt(x)
  assert(yTrue === yPred, `sqrt(4) should be 2, but instead was ${yPred}!`)

  x = [9, 4, 16]
  yTrue = [3, 2, 4]
  yPred = sqrt(x)
  assert(distance(yTrue, yPred) === 0, `sqrt([9, 4, 16]) should be [3, 2, 4]!`)

  let hasFailed

  try {
    hasFailed = false
    sqrt()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt() should have failed!`)

  try {
    hasFailed = false
    sqrt("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt("foo") should have failed!`)

  try {
    hasFailed = false
    sqrt(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt(true) should have failed!`)

  try {
    hasFailed = false
    sqrt({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt({}) should have failed!`)

  try {
    hasFailed = false
    sqrt(-4)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt(-4) should have failed!`)

  try {
    hasFailed = false
    sqrt(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    sqrt(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./distance.js":19,"./is-number.js":27,"./is-undefined.js":29,"./vectorize.js":62}],57:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let mean = require("./mean.js")
let pow = require("./pow.js")
let sqrt = require("./sqrt.js")

function std(arr){
  assert(!isUndefined(arr), "You must pass an array of numbers into the `std` function!")
  assert(isArray(arr), "You must pass an array of numbers into the `std` function!")

  let temp = flatten(arr)
  if (temp.length === 0) return undefined

  temp.forEach(function(v){
    assert(isNumber(v), "You must pass an array of numbers into the `std` function!")
  })

  let m = mean(temp)
  let out = 0
  temp.forEach(x => out += pow(x - m, 2))
  return sqrt(out / temp.length)
}

module.exports = std

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let add = require("./add.js")
  let scale = require("./scale.js")

  let x = normal(10000)
  assert(abs(std(x) - 1) < 0.05, `std(normal(10000)) should be approximately 1!`)

  x = add(scale(x, 100), -250)
  assert(abs(std(x) - 100) < 5, `std(normal(10000) * 100 - 250) should be approximately 100!`)

  let hasFailed

  try {
    hasFailed = false
    std()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std() should have failed!`)

  try {
    hasFailed = false
    std(123)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std(123) should have failed!`)

  try {
    hasFailed = false
    std("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std("foo") should have failed!`)

  try {
    hasFailed = false
    std(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std(true) should have failed!`)

  try {
    hasFailed = false
    std({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std({}) should have failed!`)

  try {
    hasFailed = false
    std(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    std(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./add.js":7,"./flatten.js":21,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./mean.js":34,"./normal.js":39,"./pow.js":42,"./scale.js":47,"./sqrt.js":56}],58:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")

function sum(arr){
  assert(!isUndefined(arr), "You must pass an array of numbers into the `sum` function!")
  assert(isArray(arr), "You must pass an array of numbers into the `sum` function!")

  let temp = flatten(arr)

  temp.forEach(function(v){
    assert(isNumber(v), "You must pass an array of numbers into the `sum` function!")
  })

  let out = 0
  temp.forEach(v => out += v)
  return out
}

module.exports = sum

// tests
if (!module.parent && typeof(window) === "undefined"){
  let range = require("./range.js")
  let normal = require("./normal.js")
  let abs = require("./abs.js")

  let x = [2, 3, 4]
  let yTrue = 9
  let yPred = sum(x)
  assert(yTrue === yPred, `sum([2, 3, 4]) should be 9, but instead is ${yPred}!`)

  x = range(-100, 101)
  yTrue = 0
  yPred = sum(x)
  assert(yTrue === yPred, `sum(range(-100, 101)) should be 0, but instead is ${yPred}!`)

  x = []
  yTrue = 0
  yPred = sum(x)
  assert(yTrue === yPred, `sum([]) should be 0, but instead was ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    sum()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum() should have failed!`)

  try {
    hasFailed = false
    sum("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum("foo") should have failed!`)

  try {
    hasFailed = false
    sum(123)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum(123) should have failed!`)

  try {
    hasFailed = false
    sum(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum(true) should have failed!`)

  try {
    hasFailed = false
    sum(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum(() => {}) should have failed!`)

  try {
    hasFailed = false
    sum({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum({}) should have failed!`)

  try {
    hasFailed = false
    sum([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./flatten.js":21,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./range.js":44}],59:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")
let floor = require("./floor.js")

let tan = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `tan` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `tan` function!")

  let k = (x - Math.PI / 2) / Math.PI
  if (k === floor(k)) return undefined
  return Math.tan(x)
})

module.exports = tan

// tests
if (!module.parent && typeof(window) === "undefined"){
  let abs = require("./abs.js")
  let normal = require("./normal.js")

  let x = Math.PI / 4
  let yTrue = 1
  let yPred = tan(x)
  assert(abs(yTrue - yPred) < 0.01, `tan(pi / 4) should be 1, but instead was ${yPred}!`)

  x = -Math.PI / 2
  yTrue = undefined
  yPred = tan(x)
  assert(yTrue === yPred, "tan(-pi / 2) should be undefined, but instead was ${yPred}!")

  x = 2 * Math.PI
  yTrue = 0
  yPred = tan(x)
  assert(abs(yTrue - yPred) < 0.01, `tan(2 * pi) should be 0, but instead was ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    tan()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan() should have failed!`)

  try {
    hasFailed = false
    tan(normal(10000))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `tan(normal(10000)) should not have failed!`)

  try {
    hasFailed = false
    tan("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan("foo") should have failed!`)

  try {
    hasFailed = false
    tan(true,)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan(true) should have failed!`)

  try {
    hasFailed = false
    tan({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan({}) should have failed!`)

  try {
    hasFailed = false
    tan(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    tan(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./floor.js":22,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./vectorize.js":62}],60:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let shape = require("./shape.js")
let reverse = require("./reverse.js")
let ndarray = require("./ndarray.js")

function transpose(arr){
  assert(!isUndefined(arr), "You must pass an array into the `transpose` function!")
  assert(isArray(arr), "You must pass an array into the `transpose` function!")

  let theShape = shape(arr)
  assert(theShape.length <= 2, "I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!")

  if (theShape.length === 1){
    return reverse(arr)
  } else if (theShape.length === 2){
    let out = ndarray(reverse(theShape))

    for (let row=0; row<theShape[0]; row++){
      for (let col=0; col<theShape[1]; col++){
        out[col][row] = arr[row][col]
      }
    }

    return out
  }
}

module.exports = transpose

// tests
if (!module.parent && typeof(window) === "undefined"){
  let isEqual = require("./is-equal.js")

  let x = [2, 3, 4]
  let yTrue = [4, 3, 2]
  let yPred = transpose(x)
  assert(isEqual(yTrue, yPred), `transpose([2, 3, 4]) should be [4, 3, 2]!`)

  x = [[2, 3, 4], [5, 6, 7], [8, 9, 10]]
  yTrue = [[2, 5, 8], [3, 6, 9], [4, 7, 10]]
  yPred = transpose(x)
  assert(isEqual(yTrue, yPred), `transpose([[2, 3, 4], [5, 6, 7], [8, 9, 10]]) should be [[2, 5, 8], [3, 6, 9], [4, 7, 10]]!`)

  x = [["a", "b", "c", "d"], ["e", "f", "g", "h"]]
  yTrue = [["a", "e"], ["b", "f"], ["c", "g"], ["d", "h"]]
  yPred = transpose(x)
  assert(isEqual(yTrue, yPred), `transpose([["a", "b", "c", "d"], ["e", "f", "g", "h"]]) should be [["a", "e"], ["b", "f"], ["c", "g"], ["d", "h"]]!`)

  let hasFailed

  try {
    hasFailed = false
    transpose()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose() should have failed!`)

  try {
    hasFailed = false
    transpose([[2, 3, 4], [5, 6]])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose([[2, 3, 4], [5, 6]]) should have failed!`)

  try {
    hasFailed = false
    transpose({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose({}) should have failed!`)

  try {
    hasFailed = false
    transpose(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose(() => {}) should have failed!`)

  try {
    hasFailed = false
    transpose("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose("foo") should have failed!`)

  try {
    hasFailed = false
    transpose(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose(234) should have failed!`)

  try {
    hasFailed = false
    transpose(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose(true) should have failed!`)

  try {
    hasFailed = false
    transpose(ndarray([2, 3, 4]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose() should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-array.js":23,"./is-equal.js":25,"./is-undefined.js":29,"./ndarray.js":38,"./reverse.js":45,"./shape.js":50}],61:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let pow = require("./pow.js")
let std = require("./std.js")

function variance(arr){
  assert(!isUndefined(arr), "You must pass an array of numbers into the `variance` function!")
  assert(isArray(arr), "You must pass an array of numbers into the `std` function!")

  let temp = flatten(arr)

  temp.forEach(function(val){
    assert(isNumber(val), "You must pass an array of numbers into the `std` function!")
  })

  return pow(std(temp), 2)
}

module.exports = variance

// tests
if (!module.parent && typeof(window) === "undefined"){
  let abs = require("./abs.js")
  let normal = require("./normal.js")
  let scale = require("./scale.js")

  let x = normal(10000)
  let yTrue = 1
  let yPred = variance(x)
  assert(abs(yTrue - yPred) < 0.05, `variance(normal(10000)) should be approximately 1, but instead is ${yPred}!`)

  x = scale(normal([10, 10, 10, 10]), 2)
  yTrue = 4
  yPred = variance(x)
  assert(abs(yTrue - yPred) < 0.05, `variance(normal(10000) * 2) should be approximately 4, but instead is ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    variance()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance() should have failed!`)

  try {
    hasFailed = false
    variance("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance("foo") should have failed!`)

  try {
    hasFailed = false
    variance(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance(true) should have failed!`)

  try {
    hasFailed = false
    variance(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance(() => {}) should have failed!`)

  try {
    hasFailed = false
    variance({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance({}) should have failed!`)

  try {
    let foo
    hasFailed = false
    variance(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance(foo) should have failed!`)

  try {
    hasFailed = false
    variance([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./abs.js":6,"./flatten.js":21,"./is-array.js":23,"./is-number.js":27,"./is-undefined.js":29,"./normal.js":39,"./pow.js":42,"./scale.js":47,"./std.js":57}],62:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isFunction = require("./is-function.js")
let isArray = require("./is-array.js")
let max = require("./max.js")

function vectorize(fn){
  assert(!isUndefined(fn), "You must pass a function into the `vectorize` function!")
  assert(isFunction(fn), "You must pass a function into the `vectorize` function!")

  return function temp(){
    let atLeastOneArgumentIsAnArray = (Object.keys(arguments).map(key => isArray(arguments[key])).indexOf(true) > -1)

    if (atLeastOneArgumentIsAnArray){
      let out = []
      let lengths = Object.keys(arguments).filter(key => isArray(arguments[key])).map(key => arguments[key].length)
      let maxLength = max(lengths)

      lengths.forEach(function(length){
        assert(length === maxLength, `If using arrays for all arguments to this function, then the arrays must all have equal length!`)
      })

      for (let i=0; i<maxLength; i++){
        let args = Object.keys(arguments).map(key => {
          if (isArray(arguments[key])) return arguments[key][i]
          return arguments[key]
        })
        out.push(temp(...args))
      }

      return out
    } else {
      return fn(...arguments)
    }
  }
}

module.exports = vectorize

// tests
if (!module.parent && typeof(window) === "undefined"){
  let isEqual = require("./is-equal.js")

  let x = [2, 3, 4]
  let double = vectorize(x => x * 2)
  let yTrue = [4, 6, 8]
  let yPred = double(x)
  assert(isEqual(yTrue, yPred), "double([2, 3, 4]) should be [4, 6, 8]!")

  x = [0, 1, 2, 3]
  let tens = vectorize(x => 10)
  yTrue = [10, 10, 10, 10]
  yPred = tens(x)
  assert(isEqual(yTrue, yPred), "tens([0, 1, 2, 3]) should be [10, 10, 10, 10]!")

  x = [[[[1, 2, 3, 4]]]]
  let square = vectorize(x => x * x)
  yTrue = [[[[1, 4, 9, 16]]]]
  yPred = square(x)
  assert(isEqual(yTrue, yPred), "square([[[[1, 2, 3, 4]]]]) should be [[[[1, 4, 9, 16]]]]!")

  x = ["a", "b", "c"]
  let foo = vectorize(x => x + "foo")
  yTrue = ["afoo", "bfoo", "cfoo"]
  yPred = foo(x)
  assert(isEqual(yTrue, yPred), `foo(["a", "b", "c"]) should be ["afoo", "bfoo", "cfoo"]!`)

  let hasFailed

  try {
    hasFailed = false
    vectorize()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize() should have failed!`)

  try {
    hasFailed = false
    let add = vectorize((a, b) => a + b)
    add([2, 3, 4], [5, 6])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add([2, 3, 4], [5, 6]) should have failed!`)

  try {
    hasFailed = false
    vectorize(123)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize(123) should have failed!`)

  try {
    hasFailed = false
    vectorize("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize("foo") should have failed!`)

  try {
    hasFailed = false
    vectorize(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize(true) should have failed!`)

  try {
    hasFailed = false
    vectorize({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize({}) should have failed!`)

  try {
    let foo
    hasFailed = false
    vectorize(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize(foo) should have failed!`)

  try {
    hasFailed = false
    vectorize([])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize([]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":66,"./is-array.js":23,"./is-equal.js":25,"./is-function.js":26,"./is-undefined.js":29,"./max.js":33}],63:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function zeros(shape){
  return apply(ndarray(shape), x => 0)
}

module.exports = zeros

},{"../misc/apply.js":65,"./ndarray.js":38}],64:[function(require,module,exports){
let out = {
  apply: require("./apply.js"),
  assert: require("./assert.js"),
  downloadJSON: require("./download-json.js"),
  dump: require("./dump.js"),
  pause: require("./pause.js"),
}

module.exports = out

},{"./apply.js":65,"./assert.js":66,"./download-json.js":67,"./dump.js":68,"./pause.js":69}],65:[function(require,module,exports){
let vectorize = require("../math/vectorize.js")

let apply = vectorize(function(x, fn){
  return fn(x)
})

module.exports = apply

},{"../math/vectorize.js":62}],66:[function(require,module,exports){
module.exports = function(isTrue, message){
  if (!isTrue) throw new Error(message)
}

},{}],67:[function(require,module,exports){
function downloadJSON(obj, filename){
  let a = document.createElement("a")
  a.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, "\t"))}`
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadJSON

},{}],68:[function(require,module,exports){
(function (global){
function dump(obj, excluded=["dump"]){
  Object.keys(obj).forEach(function(key){
    if (excluded.indexOf(key) < 0){
      global[key] = obj[key]
    }
  })
}

module.exports = dump

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],69:[function(require,module,exports){
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

},{}]},{},[4]);
