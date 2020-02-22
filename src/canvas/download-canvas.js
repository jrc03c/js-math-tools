function downloadCanvas(canvas, filename){
  let a = document.createElement("a")
  a.href = canvas.toDataURL()
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadCanvas
