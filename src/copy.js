function copy(x) {
  try {
    return structuredClone(x)
  } catch (e) {
    return x
  }
}

module.exports = copy
