function downloadJSON(obj, filename){
  let a = document.createElement("a")
  a.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, "\t"))}`
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadJSON
