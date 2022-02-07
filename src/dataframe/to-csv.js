const toCSVString = require("./to-csv-string.js")

function toCSV(df, filename, shouldIncludeIndex) {
  const out = toCSVString(df, shouldIncludeIndex)

  // browser
  try {
    let newFilename = filename

    if (filename.includes("/")) {
      const parts = filename.split("/")
      newFilename = parts[parts.length - 1]
    }

    const a = document.createElement("a")
    a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(out)}`
    a.download = newFilename
    a.dispatchEvent(new MouseEvent("click"))
  } catch (e) {}

  // node
  try {
    const fs = require("fs")
    const path = require("path")
    fs.writeFileSync(path.resolve(filename), out, "utf8")
  } catch (e) {}

  return df
}

module.exports = toCSV
