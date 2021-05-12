// question: should this use JSON.parse()?
const vectorize = require("./vectorize.js")
module.exports = vectorize(x => parseFloat(x))
